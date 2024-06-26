import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Make sure you import the CSS file for react-toastify
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomerService from '../../../services/CustomerService';

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const { user_id } = useParams()
    const navigate = useNavigate();

    const handleClick = async () => {
        if (password !== newpassword) {
            toast.error("Mật khẩu mới và nhập lại mật khẩu không giống nhau.");
            return;
        }
        if (password.length < 8) {
            toast.error("Mật khẩu phải có ít nhất 8 ký tự.");
            return;
        }
        const value = {
            id: user_id,
            password: password
        }
        try {
            const resetPASS = await CustomerService.resetPassword(value)
            console.log("🚀 ~ handleClick ~ resetPASS:", resetPASS)
            toast.success("reset mật khẩu thành công")
            navigate('/login')
        } catch (error) {

        }
    }

    return (
        <section
            className="hdl-maincontent py-2"
            style={{ backgroundColor: "white" }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <p>Tạo tài khoản để trải nghiệm ngay nào!</p>
                    </div>
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="username" className="text-main">
                                Mật khẩu mới (*)
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="newpassword"
                                className="form-control"
                                placeholder="Nhập mật khẩu mới"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmpassword" className="text-main">
                                Vui lòng nhập lại mật khẩu (*)
                            </label>
                            <input
                                type="password"
                                name="confirmpassword"
                                id="confirmpassword"
                                className="form-control"
                                placeholder="Nhập lại mật khẩu"
                                value={newpassword}
                                onChange={(e) => setNewpassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <button
                                className="btn btn-main btn-success"
                                style={{
                                    backgroundColor: "#006ba1",
                                    borderColor: "#006ba1",
                                    color: "white",
                                }}
                                onClick={handleClick}
                            >
                                Reset mật khẩu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
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
        </section>
    )
}
