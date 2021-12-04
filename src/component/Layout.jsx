import React, {memo} from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout({children}) {
    return (
        <main>
            <Navbar/>
            {children}
            <Footer/>
        </main>
    )
}

export default memo(Layout)
