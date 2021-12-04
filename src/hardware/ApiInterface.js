const BASE_URL = "http://localhost:5000/";

// Return a list of user objects, or empty list
export const getList = async () => {    
    try {
        // GET-request to BASE_URL <BASE_URL>/list
        const res = await fetch(BASE_URL + 'list')
        if (res.status !== 200) throw new Error('Request not successful')
        const data = await res.json()
        return data
    } catch (error) {
        console.error(error)
        return []
    }
}

// Return a user dict if id is valid, or empty dict
export const getUser = async (user_id) => {
    try {
        // GET-request to <BASE_URL>/user/<user_id>
        const res = await fetch(BASE_URL + 'user/' + user_id)
        if (res.status !== 200) throw new Error('Request not successful')
        const data = await res.json()
        return data
    } catch (error) {
        console.error(error)
        return {}
    }
}

// Update a user with provided parameters, and return new user if successful, or empty dict if not
export const updateUser = async (user_id, params) => {
    try {
        // PUT-request to <BASE_URL>/user/<user_id>
        const res = await fetch(BASE_URL + 'user/' + user_id, {
            method: 'PUT',
            body: JSON.stringify(params)
        })
        if (res.status !== 200) throw new Error('Request not successful')
        const data = await res.json()
        return data
    } catch (error) {
        console.error(error)
        return {}
    }
}

// Return list of updates from a given timestamp if successful, or return an empty list.
// timestamp is a Date object
export const updateList = async (timestamp) => {
    try {
        let formatStamp = timestamp.toISOString()
        formatStamp = formatStamp.slice(0, formatStamp.length - 1)
        const res = await fetch(BASE_URL + 'list' + '?timestamp=' + formatStamp)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
        return []
    }
}

// Delete user by user id, and return deleted user if successful
export const deleteUser = async (user_id) => {    
    try {
        // DELETE-request to BASE_URL <BASE_URL>/list
        const res = await fetch(BASE_URL + 'user/' + user_id, {
            method: 'DELETE'
        })
        if (res.status !== 200) throw new Error('Request not successful')
        const data = await res.json()
        return data
    } catch (error) {
        console.error(error)
        return []
    }
}

// Delete all Users in the database, and return the number of deleted users in as {"count": 532532}
export const deleteList = async () => {    
    try {
        // DELETE-request to BASE_URL <BASE_URL>/list
        const res = await fetch(BASE_URL + 'list', {
            method: 'DELETE'
        })
        if (res.status !== 200) throw new Error('Request not successful')
        const data = await res.json()
        return data
    } catch (error) {
        console.error(error)
        return {}
    }
}

// Create a user, and return it if successful
export const createUser = async (user) => {
    try {
        const res = await fetch(BASE_URL + 'user', {
            method: 'POST',
            body: JSON.stringify(user)
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.error(error)
        return {}
    }
}