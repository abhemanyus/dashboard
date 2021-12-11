import React, { memo } from 'react'
import AnimatedNumber from 'react-animated-numbers'

function Counter({ count }) {
    return (
        <div className="p-5 m-5 mx-auto w-min border-4 border-gray-500 border-solid shadow-sm">
            <AnimatedNumber
                includeComma
                animateToNumber={count}
                fontStyle={{ fontSize: 40 }}
                configs={(number, index) => {
                    return { mass: 3, tension: 400 * (index + 1), friction: 100 };
                }}
            /></div>
    )
}

export default memo(Counter)
