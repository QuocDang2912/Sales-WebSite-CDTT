import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { urlImage } from '../../../Api/config'
import UserServie from '../../../services/UserService'



export default function CustomerShow() {
    const { id } = useParams()

    const [user, setUser] = useState([])

    useEffect(() => {

        const fetch = async () => {
            const response = await UserServie.show(id)
            console.log("🚀 ~ file: BrandEdit.jsx:16 ~ fetch ~ response:", response)
            setUser(response.user)
        }
        fetch()

    }, [id])


    return (
        <div>

            <section className="hdl-content">
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-md-10">
                            {/*CONTENT  */}
                            <div className="content">
                                <section className="content-header my-2">
                                    <h1 className="d-inline">Chi tiết</h1>
                                    <div className="row mt-2 align-items-center">
                                        <div className="col-md-12 text-end">
                                            {/* <a href="brand_index.html" className="btn btn-primary btn-sm"> */}
                                            <Link className="btn btn-primary btn-sm" to={'/admin/customer/index'} style={{ color: "white" }}>về trang chính</Link>
                                            {/* </a> */}
                                            {/* <a href="brand_edit.html" className="btn btn-success btn-sm">
                                                    <i className="fa fa-edit" /> Sửa
                                                </a>
                                                <a href="brand_index.html" className="btn btn-danger btn-sm">
                                                    <i className="fa fa-trash" /> Xóa
                                                </a> */}
                                        </div>
                                    </div>
                                </section>
                                <section className="content-body my-2">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 180 }}>Tên trường</th>
                                                <th style={{ textAlign: "center" }}>Giá trị</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Id</td>
                                                <td style={{ textAlign: "center" }}>{user.id}</td>
                                            </tr>
                                            <tr>
                                                <td>name</td>
                                                <td style={{ textAlign: "center" }}>{user.name}</td>
                                            </tr>
                                            <tr>
                                                <td>username</td>
                                                <td style={{ textAlign: "center" }}>{user.username}</td>
                                            </tr>
                                            <tr>
                                                <td>gender</td>
                                                <td style={{ textAlign: "center" }}>{user.gender}</td>
                                            </tr>
                                            <tr>
                                                <td>phone</td>
                                                <td style={{ textAlign: "center" }}>{user.phone}</td>
                                            </tr>
                                            <tr>
                                                <td>email</td>
                                                <td style={{ textAlign: "center" }}>{user.email}</td>
                                            </tr>
                                            <tr>
                                                <td>roles</td>
                                                <td style={{ textAlign: "center" }}>{user.roles}</td>
                                            </tr>
                                            <tr>
                                                <td>status</td>
                                                <td style={{ textAlign: "center" }}>{user.status}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </section>
                            </div>
                            {/*END CONTENT*/}
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}
