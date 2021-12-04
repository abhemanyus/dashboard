import React, {memo} from 'react'

function Counter({count}) {
    return (
        <h1>{count}</h1>
    )
}

export default memo(Counter)
