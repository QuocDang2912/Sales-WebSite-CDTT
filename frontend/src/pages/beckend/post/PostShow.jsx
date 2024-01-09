import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { urlImage } from '../../../Api/config'
import PostServie from '../../../services/PostService'


export default function PostShow() {
    const { id } = useParams()

    const [post, setPost] = useState([])

    useEffect(() => {

        const fetch = async () => {
            const response = await PostServie.show(id)
            console.log("🚀 ~ file: BrandEdit.jsx:16 ~ fetch ~ response:", response)
            setPost(response.post)
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
                                            <Link className="btn btn-primary btn-sm" to={'/admin/post/index'} style={{ color: "white" }}>về trang chính</Link>
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
                                                <td style={{ textAlign: "center" }}>{post.id}</td>
                                            </tr>
                                            <tr>
                                                <td>title</td>
                                                <td style={{ textAlign: "center" }}>{post.title}</td>
                                            </tr>
                                            <tr>
                                                <td>slug</td>
                                                <td style={{ textAlign: "center" }}>{post.slug}</td>
                                            </tr>
                                            <tr>
                                                <td>detail</td>
                                                <td style={{ textAlign: "center" }}>{post.detail}</td>
                                            </tr>
                                            <tr>
                                                <td>type</td>
                                                <td style={{ textAlign: "center" }}>{post.type}</td>
                                            </tr>
                                            <tr>
                                                <td>imgae</td>
                                                <td style={{ textAlign: "center", width: "200px" }}>
                                                    <img style={{ width: "200px", height: "200px" }} className="img-fluid" src={urlImage + "post/" + post.image} alt={post.image} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>status</td>
                                                <td style={{ textAlign: "center" }}>{post.status}</td>
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
