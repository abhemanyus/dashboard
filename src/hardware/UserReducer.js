import * as Action from './UserActions.js'
import * as API from './ApiInterface.js'

export const defaultState = {
    Users: [],
    Count: 0,
    Timestamp: new Date(0)
}

export const UserReducer = async (state, action) => {
    switch(action.type) {
        case Action.CREATE_LIST: {
            // Create timestamp for further requests
            const timestamp = new Date()
            // Get full list from API
            const users = await API.getList() 
            // Count users
            const count = users.length
            console.info("List with " + count + " Entries Created")
            return {Users: users, Count: count, Timestamp: timestamp}
        }

        case Action.CREATE_USER: {
            // Send user data to server, receive created user
            const user = await API.createUser(action.data)
            // Terminate if user not returned
            if (!user) return state
            console.info("User " + user._id + " Created")
            return {...state, Users: [...state.Users, user]}
        }

        case Action.UPDATE_LIST: {
            const timestamp = new Date()
            // Get list of changes from last timestamp
            const listChanges = await API.updateList(state.Timestamp)
            // Create copy of old users for merging
            const oldUsers = [...state.Users]
            // merge lists if changes are present
            const updatedLength = listChanges.length
            if (listChanges) {
                const tmpLength = listChanges.length
                for (let i = 0; i < tmpLength; i++) {
                    oldUsers.forEach((user, index) => {
                        if (user._id == listChanges[i]._id) {
                            oldUsers[index] = listChanges[i]
                            delete listChanges[i]
                        }
                    })
                }
            }
            // Append the rest of the changes to Users and return it all
            const users = [...oldUsers, ...listChanges]
            const count = oldUsers.length + listChanges.length
            console.log("Updated " + updatedLength + " Entries")
            return {Users: users, Count: count, Timestamp: timestamp}
        }

        case Action.UPDATE_USER: {
            // Send update request to server and receive updated user
            const data = await API.updateUser(action.data._id, action.data)
            // if unsuccessful, return state and terminate
            if (!data) return state
            // Duplicate Users for merging
            const oldUsers = state.Users
            // Find old user entry and update
            oldUsers.map(user => {
                if (user._id == data._id) return data
                return user
            })
            console.info("User " + data._id + " Updated")
            return {...state, Users: oldUsers}
        }

        case Action.DELETE_USER: {
            const data = await API.deleteUser(action.data)
            if (!data) return state
            // Duplicate Users for merging
            const oldUsers = state.Users
            // Filter out deleted user
            const newUsers = oldUsers.filter(user => user._id !== data._id)
            console.info("User " + data._id + " Deleted")
            return {...state, Users: newUsers}
        }

        case Action.DELETE_LIST: {
            const timestamp = new Date()
            const data = await API.deleteList()
            if (!data) return state
            console.info("List Deleted")
            return {...state, Users: {}, Timestamp: timestamp}
        }
    }
}