import React, {memo} from 'react'
import User from './User'

function UserList({users}) {
    if (users) return (
        <ul>
            {users.map(user => <User key={user._id} user={user}/>)}
        </ul>
    )
    return (<ul></ul>)
}

export default memo(UserList)
