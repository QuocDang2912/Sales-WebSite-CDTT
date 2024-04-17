import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
        <section class="section-conten padding-y" style={{ minHeight: "84vh" }}>
            <div class="card mx-auto" style={{ maxWidth: "380px", marginTop: "100px" }}>
                <div className="card-body">
                    <h4 className="card-title mb-4">Đăng Nhập</h4>
                    <form onSubmit={handleSubmit} name="logincustomer">
                        <a href="#st" style={{ backgroundColor: "#405D9D", color: "#fff" }} className="btn btn-facebook btn-block mb-2"> <i className="fab fa-facebook-f" /> &nbsp;  Đăng nhập với Facebook</a>
                        <a href="#st" style={{ backgroundColor: "#af0000", color: "#fff" }} className="btn btn-google btn-block mb-4"> <i className="fab fa-google" /> &nbsp;  Đăng nhập với Google</a>
                        <div className="form-group">
                            <input className="form-control1" placeholder="Username" type="text"
                                name="username"
                                value={username}
                                onChange={handleUsernameChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input className="form-control1" placeholder="Password" type="password"
                                name="password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">Đăng Nhập</button>
                            <p className={message ? "text-danger" : "text-success"}>{message}</p>
                        </div>
                    </form>
                </div>

            </div>
            <p class="text-center mt-4">Bạn đã có tài khoản ? <Link to={'/register'}>Đăng Ký</Link></p>
            <br></br>
        </section>
    );
}