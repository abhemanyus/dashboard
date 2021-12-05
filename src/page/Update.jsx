import React, { useContext, memo } from 'react'
import { useParams } from 'react-router'
import { UserContext } from '../App'
import {useTitle} from '../hardware/CustomHooks'

function Update() {
    useTitle("Update")
    const {uid} = useParams()
    const {UserState} = useContext(UserContext)
    const user = UserState.Users.find(user => user._id === uid)
    if (user) return (
        <div>
            <h1>User ID {uid}</h1>
        </div>
    )
    return (
        <div>
            <h1>User not found!</h1>
        </div>
    )
}

export default memo(Update)
