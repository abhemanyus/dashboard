import React, { useContext, memo } from 'react'
import { useParams } from 'react-router'
import { UserContext } from '../App'
import {useTitle} from '../hardware/CustomHooks'

function Detail() {
    useTitle("Detail")
    const {uid} = useParams()
    const {UserState} = useContext(UserContext)
    const user = UserState.Users.find(user => user.id === parseInt(uid))
    if (user) return (
        <div className="p-4 m-4 text-center">
            <h1 className="font-bold">User ID: {user.id}</h1>
            <h2>User name: {user.name}</h2>
            <h2>User email: {user.email}</h2>
        </div>
    )
    return (
        <div className="p-4 m-4 text-center">
            <h1 className="text-red-700">User not found!</h1>
        </div>
    )
}

export default memo(Detail)
