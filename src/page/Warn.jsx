import React, {memo} from 'react'
import {useTitle} from '../hardware/CustomHooks'

function Warn() {
    useTitle("Warn")
    return (
        <div>
            <h1>This is not how you&apos;re supposed to use this!</h1>
        </div>
    )
}

export default memo(Warn)
