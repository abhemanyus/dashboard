import React, {memo} from 'react'
import { useContext } from 'react'
import { UserContext } from '../App'
import { deleteUser } from '../hardware/UsefulActions.js'
import { Link } from 'react-router-dom'

function User({user}) {
    const { dispatch } = useContext(UserContext)
    return (
        <li className="flex flex-col justify-between md:flex-row">
            <div className="flex-grow p-1 m-1 font-bold">{user.name}</div>
            <div className="flex-grow p-1 m-1">{user.email}</div>
            <Link to={'/user/' + user.id + '/update'}><button className="p-2 m-4 text-white bg-blue-600 rounded hover:bg-blue-800">Update</button></Link>
            <button onClick={() => deleteUser(dispatch, user.id)} className="p-2 m-4 text-white bg-red-600 rounded hover:bg-red-800">Delete</button>
        </li>
    )
}

export default memo(User)
