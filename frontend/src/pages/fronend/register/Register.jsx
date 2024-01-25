import { useState } from 'react';
import UserServie from '../../../services/UserService';
import { ToastContainer, toast } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [inputs, setInputs] = useState({});
    const navi = useNavigate()

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value, roles: "customer", status: 1 }))
    }
    const handleSubmit = (event) => {

        (
            async () => {

                try {
                    const res = await UserServie.store(inputs);
                    toast.success("Đăng Ký Thành công");

                    // Clear the form inputs after successful registration
                    setInputs({
                        name: '',
                        phone: '',
                        gender: '',
                        username: '',
                        email: '',
                        password: '',
                    });
                    navi("/")


                    console.log("🚀 ~ res:", res);
                } catch (error) {
                    console.error("ngu:", error);
                    // Handle error if registration fails
                    toast.error("Đăng Ký Thất bại");
                }
            }
        )()
        event.preventDefault();
        console.log(inputs);
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
                            <li className="breadcrumb-item active" aria-current="page">
                                Đăng ký tài khoản
                            </li>
                        </ol>
                    </nav>
                </div>
            </section>
            <section className="hdl-maincontent py-2">
                <form onSubmit={handleSubmit} method="post" name="registercustomer">
                    <div className="container">
                        <h1 className="fs-2 text-main text-center">ĐĂNG KÝ TÀI KHOẢN</h1>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="name" className="text-main">Họ tên(*)</label>
                                    <input type="text" name="name"
                                        value={inputs.name || ""}
                                        onChange={handleChange}
                                        id="name" className="form-control" placeholder="nhập họ tên" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="text-main">Điện thoại(*)</label>
                                    <input type="text" name="phone"
                                        value={inputs.phone || ""}
                                        onChange={handleChange}
                                        id="phone" className="form-control" placeholder="Nhập điện thoại" required />
                                </div>

                                <div className="mb-3">
                                    <label><strong>Giới tính</strong></label>
                                    <select name="gender"
                                        value={inputs.gender || ""}
                                        onChange={handleChange}
                                        id="gender" className="form-select">
                                        <option>Chọn giới tinh</option>
                                        <option value={1}>Nam</option>
                                        <option value={0}>Nữ</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="username" className="text-main">Tên tài khoản(*)</label>
                                    <input type="text" name="username"
                                        value={inputs.username || ""}
                                        onChange={handleChange}
                                        id="username" className="form-control" placeholder="Nhập tài khoản đăng nhập" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="text-main">Email(*)</label>
                                    <input type="email" name="email"
                                        value={inputs.email || ""}
                                        onChange={handleChange}
                                        id="email" className="form-control" placeholder="Nhập email" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="text-main">Mật khẩu(*)</label>
                                    <input type="password" name="password"
                                        value={inputs.password || ""}
                                        onChange={handleChange}
                                        id="password" className="form-control" placeholder="Mật khẩu" required />
                                </div>
                                {/* <div className="mb-3">
                                    <label htmlFor="password_re" className="text-main">Xác nhận Mật khẩu(*)</label>
                                    <input type="password" name="password_re" id="password_re" className="form-control" placeholder="Xác nhận mật khẩu" required />
                                </div> */}
                                <div className="mb-3">
                                    <button style={{ backgroundColor: "#ff0099" }} className="btn btn-main" name="REGISTER">Đăng ký</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
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
            {/* Same as */}

        </div>

    )
}
