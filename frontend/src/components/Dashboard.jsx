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
                    Bảng điều khiển
                </div>
                <nav class="m-2 mainmenu">
                    <ul class="main">
                        <li class="hdlitem item-sub" id="item1" onClick={() => handleItemClick('item1')} >
                            <FaProductHunt className="icon-left" />
                            <a href="#st">Quản lý sản phẩm</a>
                            <FaPlus className="icon-right" />
                            <ul class="submenu">
                                <li>

                                    <Link to='/admin/product/index'>Tất cả sản phẩm</Link>
                                </li>
                                <li>
                                    <Link to='/admin/category/index'>Quản lý danh mục</Link>
                                </li>
                                <li>
                                    <Link to='/admin/brand/index'>Quản lý thương hiệu</Link>

                                </li>

                                <li>
                                    <Link to='/admin/product/productsale'>Sản phẩm khuyến mãi</Link>
                                </li>
                                <li>
                                    <Link to='/admin/product/productImport'>Nhập hàng</Link>
                                </li>
                            </ul>
                        </li>
                        <li class="hdlitem item-sub" id="item2" onClick={() => handleItemClick('item2')}>
                            <FaProductHunt className="icon-left" />
                            <a href="#st">Quản lý bài viết</a>
                            <FaPlus className="icon-right" />
                            <ul class="submenu">
                                <li>
                                    <Link to='/admin/post/index'>Tất cả bài viết</Link>
                                </li>
                                <li>
                                    <Link to='/admin/topic/index'>Chủ đề</Link>
                                </li>
                                <li>
                                    <Link to='/admin/page/index'>Quản lý trang đơn</Link>
                                </li>
                            </ul>
                        </li>
                        <li class="hdlitem item-sub" id="item3" onClick={() => handleItemClick('item3')}>
                            <FaProductHunt className="icon-left" />
                            <a href="#stst">Quản lý bán hàng</a>
                            <FaPlus className="icon-right" />
                            <ul class="submenu">
                                <li>
                                    <Link to='/admin/order/index'>Tất cả đơn hàng</Link>
                                </li>
                                <li>
                                    <Link to='/admin/orderExport/index'>Xuất hàng</Link>
                                </li>
                                <li>
                                    <Link to='/admin/order/thong-ke'>Báo cáo - Thống kê</Link>
                                </li>
                            </ul>
                        </li>
                        <li class="hdlitem">
                            <FaProductHunt className="icon-left" />
                            <Link to='/admin/customer/index'>Quản lý thành viên</Link>
                        </li>
                        <li class="hdlitem">
                            <FaProductHunt className="icon-left" />
                            <Link to='/admin/contact/index'>Quản lý liên hệ</Link>
                        </li>
                        <li class="hdlitem">
                            <FaProductHunt className="icon-left" />
                            <Link to='/admin/discountcode/index'>Mã giảm giá</Link>
                        </li>
                        <li class="hdlitem item-sub" id="item4" onClick={() => handleItemClick('item4')}>
                            <FaProductHunt className="icon-left" />
                            <a href="#stst">Giao diện</a>
                            <FaPlus className="icon-right" />
                            <ul class="submenu">
                                <li>
                                    <Link to='/admin/menu/index'>Menu</Link>
                                </li>
                                <li>
                                    <Link to='/admin/banner/index'>Quản lý Banner</Link>
                                </li>
                            </ul>
                        </li>
                        <li class="hdlitem item-sub" id="item5" onClick={() => handleItemClick('item5')}>
                            <FaProductHunt className="icon-left" />
                            <a href="#stst">Hệ thống</a>
                            <FaPlus className="icon-right" />
                            <ul class="submenu">
                                <li>
                                    <Link to='/admin/user/index'>Quản trị viên</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div >
        </div >
    )
}
