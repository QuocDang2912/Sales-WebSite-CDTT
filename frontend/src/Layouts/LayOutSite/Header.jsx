import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaRegUser } from "react-icons/fa";
import { setCurrent } from '../../state/UserSlice';
export default function Header() {

    const dispatch = useDispatch()

    let cartItem = useSelector((state) => state.cart.items)
    const totalItem = cartItem.reduce((total, item) => { // tổng item
        return total + item.count
    }, 0)

    let user = useSelector((state) => state.user.current)
    console.log("🚀 ~ Header ~ user:", user)
    // logout
    const handleLogout = () => {
        dispatch(setCurrent({}))
        localStorage.clear()
    }
    let showUser = JSON.stringify(user) == '{}' ?
        <>
            <li className="nav-item">
                <Link className="nav-link" to={"/login"}>
                    Đăng nhập
                </Link>
                {/* <a className="nav-link" href="login.html">Đăng nhập</a> */}
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={"/register"}>
                    Đăng Ký
                </Link>
            </li>
        </>
        : <>
            <li className="nav-item">
                <a className="nav-link" >
                    <FaRegUser className=' dropdown-toggle ' data-bs-toggle="dropdown" aria-expanded="false" />
                    {user.name}

                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" onClick={handleLogout}>logout</a></li>
                        <li>
                            <Link to={`/profile`} className="dropdown-item" >thông tin</Link>
                        </li>
                    </ul>
                </a>
            </li>
        </>




    return (
        <section className="hdl-header1">
            <div className="container">
                <div className="row">
                    <div className="col-6 col-sm-6 col-md-2 py-1">
                        <a href="index.html">
                            <img style={{ width: "200px", height: "120px" }} src={require("../../assets/images.jpg")} className="img-fluid" alt="Logo" />
                        </a>
                    </div>
                    <div className="col-12 col-sm-9 d-none d-md-block col-md-5 py-3">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Nhập nội dung tìm kiếm" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <span className="input-group-text bg-main" id="basic-addon2">
                                <i className="fa fa-search" aria-hidden="true" />
                            </span>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 d-none d-md-block col-md-4 text-center py-2">
                        <div className="call-login--register border-bottom">
                            <ul className="nav nav-fills py-0 my-0">
                                <li className="nav-item">
                                    <a className="nav-link" href="login.html">
                                        <i className="fa fa-phone-square" aria-hidden="true" />
                                        {user.phone}
                                    </a>
                                </li>
                                {showUser}
                            </ul>
                        </div>

                        <div className="fs-6 py-2">
                            ĐỔI TRẢ HÀNG HOẶC HOÀN TIỀN <span className="text-main">TRONG 3 NGÀY</span>
                        </div>
                    </div>
                    <div className="col-6 col-sm-6 col-md-1 text-end py-4 py-md-2">
                        <Link to={"/cart"}>
                            <div className="box-cart float-end">
                                <i className="fa fa-shopping-bag" aria-hidden="true" />
                                <span>{totalItem}</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section >

    )
}
