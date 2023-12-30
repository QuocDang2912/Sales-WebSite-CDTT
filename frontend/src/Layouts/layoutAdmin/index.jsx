import React from 'react'
import './LayoutAdminStyle.css';

import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Dashboard from '../../components/Dashboard';
import HeaderAdmin from '../../components/HeaderAdmin';
export default function LayoutAdmin() {


    return (
        <div>
            <HeaderAdmin />
            <section class="hdl-content">
                <div class="container-fluid">
                    <div class="row">
                        {/* bảng điều kiển */}
                        <Dashboard />
                        {/* end  bảng điều kiển */}
                        <div class="col-md-10">

                            <div class="content">

                                <section class="content-body my-2">
                                    <Outlet />

                                </section>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
