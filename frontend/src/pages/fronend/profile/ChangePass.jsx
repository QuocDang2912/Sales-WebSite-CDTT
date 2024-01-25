import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import UserServie from '../../../services/UserService';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
export default function ChangePass() {

    const [inputs, setInputs] = useState({});


    let user = useSelector((state) => state.user.current)
    console.log("🚀 ~ profile ~ user:", user)


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        const fetch = async () => {
            try {
                const res = await UserServie.changePass(inputs, user.id)
                console.log("🚀 ~ fetch ~ res:", res)
                toast.success("đổi mk thành công");
                inputs({})

            } catch (error) {
                toast.error("đổi mk thất bại");
            }
        }
        fetch()
    }




    return (
        <div>
            <section className="bg-light">
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb py-2 my-0">
                            <li className="breadcrumb-item">
                                <a className="text-main" href="index.html">Trang chủ</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">Đổi mật khẩu</li>
                        </ol>
                    </nav>
                </div>
            </section>
            <section className="hdl-maincontent py-2">
                <div className="container">
                    <div className="row">
                        <div className="call-login--register border-bottom">
                            <ul className="nav nav-fills py-0 my-0">
                                <li className="nav-item">
                                    <a className="nav-link" href="login.html">
                                        <i className="fa fa-phone-square" aria-hidden="true" />
                                        0987654321
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="login.html">Đăng nhập</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="register.html">Đăng ký</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="profile.html">Hồ Diên Lợi</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-9 order-1 order-md-2">
                            <form onSubmit={handleSubmit} >


                                <h1 className="fs-2 text-main">Thông tin tài khoản</h1>
                                <table className="table table-borderless">

                                    <tbody>
                                        <tr>
                                            <td style={{ width: '20%' }}>Mật khẩu cũ</td>
                                            <td>
                                                <input type="password" name="old_password"
                                                    value={inputs.old_password || ""}
                                                    onChange={handleChange}
                                                    className="form-control" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Mật khẩu mới</td>
                                            <td>
                                                <input type="password" name="new_password"


                                                    value={inputs.new_password || ""}
                                                    onChange={handleChange}

                                                    className="form-control" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <button className="btn btn-main" type="submit" name="CHANEGPASSWORD">
                                                    Đổi mật khẩu
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>

    )
}
