import React, {memo} from 'react'

function Warn() {
    return (
        <div>
            <h1>This is not how you&apos;re supposed to use this!</h1>
        </div>
    )
}

export default memo(Warn)
