import React, {memo} from 'react'
// import Navbar from './Navbar'
// import Footer from './Footer'
import { Outlet } from 'react-router'

function Layout() {
    return (
        <main>
            {/* <Navbar/> */}
            <Outlet/>
            {/* <Footer/> */}
        </main>
    )
}

export default memo(Layout)
