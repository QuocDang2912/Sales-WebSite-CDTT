import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import CustomerService from '../../../services/CustomerService';
import emailjs from "@emailjs/browser";

export default function UserByEmail() {
    const [email, setEmail] = useState("")
    const handleLogin = async (event) => {

        const value = {
            email: email
        }
        try {
            const UserByEmail = await CustomerService.getUserByEmail(value)
            console.log("🚀 ~ handleLogin ~ UserByEmail:", UserByEmail)
            emailjs
                .send(
                    "service_2r7tmf4",
                    "template_myhbp3v",
                    {
                        user_email: UserByEmail.user.email,
                        user_name: UserByEmail.user.name,
                        user_id: UserByEmail.user.id
                    },
                    {
                        publicKey: "iXZfEVDWkI_F9ygEm",
                    }
                )
                .then(
                    () => {
                        console.log("gửi email thành công!");
                    },
                    (error) => {
                        console.log("gửi email...", error.text);
                    }
                );
            toast.success("vui lòng kiểm tra email để xác nhận reset mật khẩu")

        } catch (error) {
            console.log("🚀 ~ handleLogin ~ error:", error)
            toast.error("Email không hợp lệ")

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
                        <p>
                            Để reset mật khẩu vui lòng nhập email
                        </p>
                    </div>
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="password" className="text-main">
                                Email (*)
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="form-control"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} required
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
                                onClick={handleLogin}
                            >
                                Tiếp tục
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
