import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../../services/UserService";
import { useDispatch } from "react-redux";
import { setCurrent } from "../../../state/UserSlice";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const dispatch = useDispatch()

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async () => {
        try {
            const result = await UserService.login({ username, password });
            console.log(result.user);
            // lưu vào redux và local
            dispatch(setCurrent(result.user))
            localStorage.setItem('user', JSON.stringify(result.user))
            if (result.user.roles === "customer") {
                navigate("/");
            } else {
                navigate("/admin");

            }
        } catch (error) {
            console.error("Error during login:", error);
            // Handle login failure
            setMessage("Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        handleLogin();
    };

    return (
        <section className="hdl-maincontent py-2">
            <form onSubmit={handleSubmit} name="logincustomer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <p>Để gửi bình luận, liên hệ hay để mua hàng cần phải có tài khoản</p>
                        </div>
                        <div className="col-md-8">
                            <div className="mb-3">
                                <label htmlFor="username" className="text-main">Tên tài khoản (*)</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="form-control"
                                    placeholder="Nhập tài khoản đăng nhập"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="text-main">Mật khẩu (*)</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="form-control" placeholder="Mật khẩu"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-main btn-success" name="LOGIN">Đăng nhập</button>
                            </div>
                            <p className={message ? "text-success" : "text-danger"}>{message}</p>
                            <p><u className="text-main">Chú ý</u>: (*) Thông tin bắt buộc phải nhập</p>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
}