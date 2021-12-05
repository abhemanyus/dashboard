import React, {memo} from 'react'
import {useTitle} from '../hardware/CustomHooks'

function NotFound () {
    useTitle("404")
    return (
        <div>
            <h1>There is nothing here!</h1>
        </div>
    )
}

export default memo(NotFound) 
