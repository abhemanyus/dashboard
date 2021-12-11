import * as Action from './UserActions.js'

export const defaultState = {
    Users: [],
    Count: 0,
    Timestamp: new Date(0)
}

export const UserReducer = (state, action) => {
    switch(action.type) {
        case Action.CREATE_LIST: {
            // Create timestamp for further requests
            const timestamp = new Date()
            // Get full list from API
            const users = action.data 
            // Count users
            const count = users.length
            console.info("List with " + count + " Entries Created")
            return {Users: users, Count: count, Timestamp: timestamp}
        }

        // case Action.CREATE_USER: {
        //     // Send user data to server, receive created user
        //     const user = await API.createUser(action.data)
        //     // Terminate if user not returned
        //     if (!user) return state
        //     console.info("User " + user.id + " Created")
        //     return {...state, Users: [...state.Users, user]}
        // }

        case Action.UPDATE_LIST: {
            const timestamp = new Date()
            // Get list of changes from last timestamp
            const listChanges = action.data
            // Create copy of old users for merging
            const oldUsers = [...state.Users]
            const newUsers = []
            // merge lists if changes are present
            listChanges.forEach(user => {
                const olusr = oldUsers.find(usr => usr.id == user.id)
                if (olusr) {
                    olusr.name = user.name
                    olusr.email = user.email
                }
                else {
                    newUsers.push(user)
                }
            })
            // Append the rest of the changes to Users and return it all
            const users = [...oldUsers, ...newUsers]
            const count = users.length
            console.log("Updated " + newUsers.length + " Entries")
            return {Users: users, Count: count, Timestamp: timestamp}
        }

        case Action.UPDATE_USER: {
            // Send update request to server and receive updated user
            const data = action.data
            // if unsuccessful, return state and terminate
            if (!data) return state
            // Duplicate Users for merging
            const oldUsers = state.Users
            // Find old user entry and update
            const user = oldUsers.findIndex(usr => usr.id == data.id)
            oldUsers[user] = data

            console.info("User " + data.id + " Updated")
            return {...state, Users: oldUsers}
        }

        case Action.DELETE_USER: {
            const data = action.data
            if (!data) return state
            // Duplicate Users for merging
            const oldUsers = state.Users
            // Filter out deleted user
            const newUsers = oldUsers.filter(user => user.id !== data.id)
            console.info("User " + data.id + " Deleted")
            return {...state, Users: newUsers}
        }

        // case Action.DELETE_LIST: {
        //     const timestamp = new Date()
        //     const data = await API.deleteList()
        //     if (!data) return state
        //     console.info("List Deleted")
        //     return {...state, Users: {}, Timestamp: timestamp}
        // }

        default: return state
    }
}