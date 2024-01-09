import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import { urlImage } from '../../../Api/config'
import CategoryServie from '../../../services/CategoryService'
export default function CategoryShow() {
    const { id } = useParams()

    const [categorys, setCategorys] = useState([])

    useEffect(() => {

        const fetch = async () => {
            const response = await CategoryServie.show(id)
            console.log("🚀 ~ file: BrandEdit.jsx:16 ~ fetch ~ response:", response)
            setCategorys(response.category)
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
                                            <Link className="btn btn-primary btn-sm" to={'/admin/category/index'} style={{ color: "white" }}>về trang chính</Link>

                                            {/* <a href="category_edit.html" className="btn btn-success btn-sm">
                                                <i className="fa fa-edit" /> Sửa
                                            </a>
                                            <a href="category_index.html" className="btn btn-danger btn-sm">
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
                                                <th>Giá trị</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Id</td>
                                                <td style={{ textAlign: "center" }}>{categorys.id}</td>
                                            </tr>
                                            <tr>
                                                <td>name</td>
                                                <td style={{ textAlign: "center" }}>{categorys.name}</td>
                                            </tr>
                                            <tr>
                                                <td>slug</td>
                                                <td style={{ textAlign: "center" }}>{categorys.slug}</td>
                                            </tr>
                                            <tr>
                                                <td>description</td>
                                                <td style={{ textAlign: "center" }}>{categorys.description}</td>
                                            </tr>
                                            <tr>
                                                <td>parent_id</td>
                                                <td style={{ textAlign: "center" }}>{categorys.parent_id}</td>
                                            </tr>
                                            <tr>
                                                <td>sort_order</td>
                                                <td style={{ textAlign: "center" }}>{categorys.sort_order}</td>
                                            </tr>
                                            <tr>
                                                <td>image</td>
                                                <td style={{ textAlign: "center", width: "200px" }}>
                                                    <img style={{ width: "200px", height: "200px" }} className="img-fluid" src={urlImage + "category/" + categorys.image} alt={categorys.image} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>status</td>
                                                <td style={{ textAlign: "center" }}>{categorys.status}</td>
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
