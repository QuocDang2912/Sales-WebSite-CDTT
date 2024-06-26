import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import PageService from '../../../services/PageService'
import { urlImage } from '../../../Api/config'


export default function PageShow() {

    const { id } = useParams()

    const [page, setPage] = useState([])

    useEffect(() => {

        const fetch = async () => {
            const response = await PageService.show(id)
            setPage(response.page)
        }
        fetch()

    }, [id])


    return (
        <div class="content">
            <section class="content-header my-2">
                <h1 class="d-inline">Chi tiết</h1>
                <div class="row mt-2 align-items-center">
                    <div class="col-md-12 text-end">
                        <a href="/admin/page/index" class="btn btn-primary btn-sm">
                            <i class="fa fa-arrow-left"></i> Về danh sách
                        </a>

                    </div>
                </div>
            </section>
            <section class="content-body my-2">

                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th style={{ width:"30px" }}>Tên trường</th>
                            <th style={{ textAlign: "center" }}>Giá trị</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Id</td>
                            <td style={{ textAlign: "center" }}>{page.id}</td>
                        </tr>
                        <tr>
                            <td>title</td>
                            <td style={{ textAlign: "center" }}>{page.title}</td>
                        </tr>
                        <tr>
                            <td>slug</td>
                            <td style={{ textAlign: "center" }}>{page.slug}</td>
                        </tr>
                        <tr>
                            <td>detail</td>
                            <td style={{ textAlign: "center" }}>{page.detail}</td>
                        </tr>
                        <tr>
                            <td>type</td>
                            <td style={{ textAlign: "center" }}>{page.type}</td>
                        </tr>
                        <tr>
                            <td>image</td>
                            <td style={{ textAlign: "center", width: "200px" }}>
                                <img style={{ width: "200px", height: "200px" }} className="img-fluid" src={urlImage + "post/" + page.image} alt={page.image} />
                            </td>
                        </tr>
                        <tr>
                            <td>status</td>
                            <td style={{ textAlign: "center" }}>{page.status}</td>
                        </tr>
                    </tbody>
                </table>

            </section>
        </div >
    )
}