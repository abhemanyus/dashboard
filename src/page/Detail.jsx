import React from 'react'
import { useParams } from 'react-router'

function Detail() {
    const {uid} = useParams()
    return (
        <div>
            <h1>User ID {uid}</h1>
        </div>
    )
}

export default Detail
