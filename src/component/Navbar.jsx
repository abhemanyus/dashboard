import React, {memo} from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <ul>
            <NavLink to='/' style={({ isActive }) => ({color: isActive ? 'red' : 'blue'})}>Home</NavLink>
            <NavLink to='/231/detail' style={({ isActive }) => ({color: isActive ? 'red' : 'blue'})}>Detail</NavLink>
            <NavLink to='/231/update' style={({ isActive }) => ({color: isActive ? 'red' : 'blue'})}>Update</NavLink>
        </ul>
    )
}

export default memo(Navbar)
