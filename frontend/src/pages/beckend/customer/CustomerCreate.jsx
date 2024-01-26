import React, { useEffect, useState } from 'react'
import UserServie from '../../../services/UserService';
import { Link, useNavigate } from 'react-router-dom';

export default function CustomerCreate() {
    const [name, setname] = useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [gender, setgender] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setemail] = useState("");
    const [roles, setroles] = useState("");

    const [status, setStatus] = useState(1);

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = new FormData();
        user.append("name", name);
        user.append("username", username);
        user.append("password", password);
        user.append("gender", gender);
        user.append("email", email);
        user.append("phone", phone);
        user.append("roles", roles || "customer");
        user.append("status", status);
        (async () => {
            const result = await UserServie.store(user);
            alert(result.message);
            navigate("/admin/customer/index", { replace: true });
        })();
    };


    return (
        <div>
            <div className="content">
                <section className="content-header my-2">
                    <h1 className="d-inline">Thêm thành viên</h1>
                    <div className="row mt-2 align-items-center">
                        <div className="col-md-12 text-end">
                            <Link className="btn btn-primary btn-sm" style={{ color: "white" }} to='/admin/customer/index'>quay về trang chủ </Link>
                        </div>
                    </div>
                </section>
                <section className="content-body my-2">
                    <form onSubmit={handleSubmit} id='idreset' encType="multipart/form-data">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label><strong>Tên đăng nhập(*)</strong></label>
                                    <input onChange={(e) => setusername(e.target.value)} type="text" name="username" className="form-control" placeholder="Tên đăng nhập" />
                                </div>
                                <div className="mb-3">
                                    <label><strong>Mật khẩu(*)</strong></label>
                                    <input onChange={(e) => setpassword(e.target.value)} type="password" name="password" className="form-control" placeholder="Mật khẩu" />
                                </div>

                                <div className="mb-3">
                                    <label><strong>Email(*)</strong></label>
                                    <input onChange={(e) => setemail(e.target.value)} type="text" name="email" className="form-control" placeholder="Email" />
                                </div>

                                <div className="mb-3">
                                    <label><strong>Điện thoại(*)</strong></label>
                                    <input onChange={(e) => setPhone(e.target.value)} type="text" name="phone" className="form-control" placeholder="Điện thoại" />
                                </div>
                                <div className="mb-3">
                                    <label><strong>roles(*)</strong></label>
                                    <select onChange={(e) => setroles(e.target.value)} value={roles} name="roles" className="form-select" >
                                        <option value>none</option>
                                        <option value="customer">customer</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label><strong>Họ tên (*)</strong></label>
                                    <input onChange={(e) => setname(e.target.value)} type="text" name="name" className="form-control" placeholder="Họ tên" />
                                </div>
                                <div className="mb-3">
                                    <label><strong>Giới tính</strong></label>
                                    <select onChange={(e) => setgender(e.target.value)} name="gender" id="gender" className="form-select">
                                        <option>Chọn giới tinh</option>
                                        <option value={1}>Nam</option>
                                        <option value={0}>Nữ</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label><strong>Trạng thái</strong></label>
                                    <select onChange={(e) => setStatus(e.target.value)} name="status" className="form-select">
                                        <option value={1}>Xuất bản</option>
                                        <option value={2}>Chưa xuất bản</option>
                                    </select>
                                </div>
                                <button className="btn btn-success btn-sm" name="THEM">
                                    <i className="fa fa-save" /> Lưu [Thêm]
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>

        </div>
    )
}
