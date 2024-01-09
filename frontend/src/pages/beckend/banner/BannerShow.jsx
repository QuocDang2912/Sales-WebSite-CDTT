import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams, } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import { urlImage } from '../../../Api/config'
import BennerService from '../../../services/BannerService'
export default function BannerShow() {
    const { id } = useParams()

    const [banner, setBanner] = useState([])

    useEffect(() => {

        const fetch = async () => {
            const response = await BennerService.show(id)
            console.log("🚀 ~ file: BrandEdit.jsx:16 ~ fetch ~ response:", response)
            setBanner(response.banner)
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

                                            {/* <a href="banner_edit.html" className="btn btn-success btn-sm"> */}
                                            <Link className="btn btn-primary btn-sm" to={'/admin/banner/index'} style={{ color: "white" }}>về trang chính</Link>
                                            {/* </a> */}
                                            {/* <a href="banner_index.html" className="btn btn-danger btn-sm">
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
                                                <td style={{ textAlign: "center" }}>{banner.id}</td>
                                            </tr>
                                            <tr>
                                                <td>name</td>
                                                <td style={{ textAlign: "center" }}>{banner.name}</td>
                                            </tr>
                                            <tr>
                                                <td>link</td>
                                                <td style={{ textAlign: "center" }}>{banner.link}</td>
                                            </tr>
                                            <tr>
                                                <td>vị trí</td>
                                                <td style={{ textAlign: "center" }}>{banner.position}</td>
                                            </tr>
                                            <tr>
                                                <td>description</td>
                                                <td style={{ textAlign: "center" }}>{banner.description}</td>
                                            </tr>
                                            <tr>
                                                <td>imgae</td>
                                                <td style={{ textAlign: "center", width: "200px" }}>
                                                    <img style={{ width: "200px", height: "200px" }} className="img-fluid" src={urlImage + "banner/" + banner.image} alt={banner.image} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>status</td>
                                                <td style={{ textAlign: "center" }}>{banner.status}</td>
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
