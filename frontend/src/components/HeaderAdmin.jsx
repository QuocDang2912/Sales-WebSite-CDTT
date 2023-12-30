import React from 'react'

export default function HeaderAdmin() {
    return (
        <section class="hdl-header sticky-top">
            <div class="container-fluid">
                <ul class="menutop">
                    <li>
                        <a href='#st'>
                            <i class="fa-brands fa-dashcube"></i> Shop Thời trang
                        </a>
                    </li>
                    <li class="text-phai">
                        <a href='#st'>
                            <i class="fa-solid fa-power-off"></i> Thoát
                        </a>
                    </li>
                    <li class="text-phai">
                        <a href='#st'>
                            <i class="fa fa-user" aria-hidden="true"></i> Chào quản lý
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    )
}
