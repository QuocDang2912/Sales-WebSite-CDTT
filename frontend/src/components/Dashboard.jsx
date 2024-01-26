import React from 'react'
import { Link } from 'react-router-dom'
import { FaPlus, FaProductHunt } from 'react-icons/fa'
export default function Dashboard() {
    function handleItemClick(item) {
        const hdlitem = document.getElementById(item);
        hdlitem.classList.toggle("active");
    }
    return (
        <div class="col-md-2 bg-dark p-0 hdl-left">
            <div class="hdl-left">
                <div class="dashboard-name">
                    Bản điều khiển
                </div>
                <nav class="m-2 mainmenu">
                    <ul class="main">
                        <li class="hdlitem item-sub" id="item1" onClick={() => handleItemClick('item1')} >
                            <FaProductHunt className="icon-left" />
                            <a href="#st">Sản phẩm</a>
                            <FaPlus className="icon-right" />
                            <ul class="submenu">
                                <li>

                                    <Link to='/admin/product/index'>Tất cả sản phẩm</Link>
                                </li>
                                <li>
                                    <a href="product_import.html">Nhập hàng</a>
                                </li>
                                <li>
                                    <Link to='/admin/category/index'>Loại(category)</Link>
                                </li>
                                <li>
                                    <Link to='/admin/brand/index'>Thương hiệu(brand)</Link>

                                </li>

                                <li>
                                    <Link to='/admin/product/productsale'>ProductSale</Link>
                                </li>
                                <li>
                                    <Link to='/admin/product/productImport'>productImport</Link>
                                </li>
                            </ul>
                        </li>
                        <li class="hdlitem item-sub" id="item2" onClick={() => handleItemClick('item2')}>
                            <FaProductHunt className="icon-left" />
                            <a href="#st">Bài viết</a>
                            <FaPlus className="icon-right" />
                            <ul class="submenu">
                                <li>
                                    <Link to='/admin/post/index'>post</Link>
                                </li>
                                <li>
                                    <Link to='/admin/topic/index'>chủ đề</Link>
                                </li>
                                <li>
                                    <Link to='/admin/page/index'>trang đơn</Link>
                                </li>
                            </ul>
                        </li>
                        <li class="hdlitem item-sub" id="item3" onClick={() => handleItemClick('item3')}>
                            <FaProductHunt className="icon-left" />
                            <a href="#stst">Quản lý bán hàng</a>
                            <FaPlus className="icon-right" />
                            <ul class="submenu">
                                <li>
                                    <Link to='/admin/order/index'>tất cả đơn hàng</Link>
                                </li>
                                <li>
                                    <Link to='/admin/orderExport/index'>Xuất hàng</Link>
                                    {/* <a href="order_export.html">Xuất hàng</a> */}
                                </li>
                            </ul>
                        </li>
                        <li class="hdlitem">
                            <FaProductHunt className="icon-left" />
                            <Link to='/admin/customer/index'>customer</Link>
                        </li>
                        <li class="hdlitem">
                            <FaProductHunt className="icon-left" />
                            <Link to='/admin/contact/index'>liên hệ(contact)</Link>
                        </li>
                        <li class="hdlitem item-sub" id="item4" onClick={() => handleItemClick('item4')}>
                            <FaProductHunt className="icon-left" />
                            <a href="#stst">Giao diện</a>
                            <FaPlus className="icon-right" />
                            <ul class="submenu">
                                <li>
                                    <Link to='/admin/menu/index'>menu</Link>
                                </li>
                                <li>
                                    <Link to='/admin/banner/index'>Banner</Link>
                                </li>
                            </ul>
                        </li>
                        <li class="hdlitem item-sub" id="item5" onClick={() => handleItemClick('item5')}>
                            <FaProductHunt className="icon-left" />
                            <a href="#stst">Hệ thống</a>
                            <FaPlus className="icon-right" />
                            <ul class="submenu">
                                <li>
                                    <Link to='/admin/user/index'>user</Link>
                                </li>

                                <li>
                                    <a href="config_index.html">Cấu hình</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div >
        </div >
    )
}
