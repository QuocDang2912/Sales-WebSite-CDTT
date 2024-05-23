import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import Menu from '../../pages/fronend/home/Menu'

export default function LayOutSite() {
    return (
        <div style={{ backgroundColor: "white" }}>
            <Header />
            <Menu />
            <Outlet />
            <Footer />
        </div>
    )
}
