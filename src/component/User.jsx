import React, {memo} from 'react'

function User({user}) {
    return (
        <li>{user._id}</li>
    )
}

export default memo(User)
