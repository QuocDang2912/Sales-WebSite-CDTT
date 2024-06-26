import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import Menu from '../../pages/fronend/home/Menu'
import DialogflowMessenger from './DialogflowMessenger'
import ScrollToTop from "react-scroll-to-top";

export default function LayOutSite() {

    return (
        <div style={{ backgroundColor: "white" }}>
            <Header />
            <Menu />
            <DialogflowMessenger />
            <Outlet />
            <ScrollToTop style={{ right: 30, bottom: 86, backgroundColor: "#42A5F5" }} smooth top='200' />
            <Footer />
        </div>
    )
}
