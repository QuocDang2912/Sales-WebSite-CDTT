
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import UserServie from '../../../services/UserService';
export default function UserEdit() {
    const [name, setname] = useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [gender, setgender] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setemail] = useState("");
    const [roles, setroles] = useState("");
    const [status, setStatus] = useState(1);
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {

        const fetch = async () => {
            const response = await UserServie.show(id)
            console.log("🚀 ~ file: BrandEdit.jsx:16 ~ fetch ~ response:", response)
            const user = response.user;
            console.log("🚀 ~ file: UserEdit.jsx:24 ~ fetch ~ user:", user)
            setname(user.name)
            setusername(user.username)
            setpassword(user.password)
            setgender(user.gender)
            setPhone(user.phone)
            setemail(user.email)
            setroles(user.roles)
            setStatus(user.status);
        }
        fetch()

    }, [id])
    const handleSubmitEdit = (e) => {
        e.preventDefault();
        const user = new FormData();
        user.append("name", name);
        user.append("username", username);
        user.append("password", password);
        user.append("gender", gender);
        user.append("email", email);
        user.append("phone", phone);
        user.append("roles", roles);
        user.append("status", status);
        (async () => {
            const result = await UserServie.update(user, id);
            console.log("🚀 ~ file: BrandEdit.jsx:43 ~ result:", result)
            alert(result.message);
            // toast.success(result.message);
            navigate("/admin/user/index", { replace: true });
        })();
    }


    return (
        <div>
            <form onSubmit={handleSubmitEdit} action method="post" encType="multipart/form-data">
                <div className="content">
                    <section className="content-header my-2">
                        <h1 className="d-inline">Cập nhật thành viên</h1>
                        <div className="row mt-2 align-items-center">
                            <div className="col-md-12 text-end">
                                <button className="btn btn-success btn-sm" name="CAPNHAT">
                                    <i className="fa fa-save" /> Lưu [Cập nhật]
                                </button>
                                <Link className="btn btn-primary btn-sm" style={{ color: "white" }} to='/admin/user/index'>quay về trang chủ </Link>

                            </div>
                        </div>
                    </section>
                    <section className="content-body my-2">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label><strong>Tên đăng nhập(*)</strong></label>
                                    <input onChange={(e) => setusername(e.target.value)} value={username} type="text" name="username" className="form-control" placeholder="Tên đăng nhập" />
                                </div>
                                <div className="mb-3">
                                    <label><strong>Mật khẩu(*)</strong></label>
                                    <input onChange={(e) => setpassword(e.target.value)} value={password} type="password" name="password" className="form-control" placeholder="Mật khẩu" />
                                </div>
                                {/* <div className="mb-3">
                                    <label><strong>Xác nhận mật khẩu(*)</strong></label>
                                    <input type="password" name="re_password" className="form-control" placeholder="Xác nhận mật khẩu" />
                                </div> */}
                                <div className="mb-3">
                                    <label><strong>Email(*)</strong></label>
                                    <input onChange={(e) => setemail(e.target.value)} value={email} type="text" name="email" className="form-control" placeholder="Email" />
                                </div>

                                <div className="mb-3">
                                    <label><strong>Điện thoại(*)</strong></label>
                                    <input onChange={(e) => setPhone(e.target.value)} value={phone} type="text" name="phone" className="form-control" placeholder="Điện thoại" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label><strong>Họ tên (*)</strong></label>
                                    <input onChange={(e) => setname(e.target.value)} value={name} type="text" name="name" className="form-control" placeholder="Họ tên" />
                                </div>
                                <div className="mb-3">
                                    <label><strong>Giới tính</strong></label>
                                    <select onChange={(e) => setgender(e.target.value)} value={gender} name="gender" id="gender" className="form-select">
                                        <option>Chọn giới tinh</option>
                                        <option value={1}>Nam</option>
                                        <option value={0}>Nữ</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label><strong>Trạng thái</strong></label>
                                    <select onChange={(e) => setStatus(e.target.value)} value={status} name="status" className="form-select">
                                        <option value={1}>Xuất bản</option>
                                        <option value={2}>Chưa xuất bản</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </form>

        </div>
    )
}
