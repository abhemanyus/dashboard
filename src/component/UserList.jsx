import React, {memo} from 'react'
import User from './User'

function UserList({users}) {
    if (users) return (
        <ul className="flex flex-col justify-evenly p-4 mx-auto">
            {users.map(user => <User key={user.id} user={user}/>)}
        </ul>
    )
    return (<ul></ul>)
}

export default memo(UserList)
