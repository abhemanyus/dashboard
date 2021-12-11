import React, { useContext, memo } from 'react'
import { useParams } from 'react-router'
import { UserContext } from '../App'
import { useTitle, useForm } from '../hardware/CustomHooks'
import { updateUser } from '../hardware/UsefulActions'


function Update() {
    useTitle("Update")
    const {uid} = useParams()
    const {UserState, dispatch} = useContext(UserContext)
    const user = UserState.Users.find(user => user.id === parseInt(uid))
    const [values, updateValues] = useForm({ name: "", email: "" })
    if (user) return (
        <div className="p-4 m-4 text-center">
            <h1 className="font-bold">User ID {uid}</h1>
            <form className="flex flex-col justify-center md:flex-row" onSubmit={(event) => {
                event.preventDefault()
                updateUser(dispatch, {...user, ...values})
            }}>
                <input className="block flex-grow p-2 m-2" type="text" name="name" value={values.name} placeholder={user.name} onChange={updateValues}/>
                <input className="block flex-grow p-2 m-2" type="text" name="email" value={values.email} placeholder={user.email} onChange={updateValues}/>
                <button className="p-2 m-2 text-white bg-blue-600 rounded hover:bg-blue-800" type="submit">Update</button>
            </form>
        </div>
    )
    return (
        <div className="p-4 m-4 text-center">
            <h1 className="text-red-700">User not found!</h1>
        </div>
    )
}

export default memo(Update)
