import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { urlImage } from '../../../Api/config'
import TopicServie from '../../../services/TopicService'



export default function TopicShow() {
    const { id } = useParams()

    const [topic, setTopic] = useState([])

    useEffect(() => {

        const fetch = async () => {
            const response = await TopicServie.show(id)
            console.log("🚀 ~ file: BrandEdit.jsx:16 ~ fetch ~ response:", response)
            setTopic(response.topic)
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

                                            <Link className="btn btn-primary btn-sm" to={'/admin/topic/index'} style={{ color: "white" }}>về trang chính</Link>

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
                                                <td style={{ textAlign: "center" }}>{topic.id}</td>
                                            </tr>
                                            <tr>
                                                <td>slug</td>
                                                <td style={{ textAlign: "center" }}>{topic.slug}</td>
                                            </tr>
                                            <tr>
                                                <td>sort_order</td>
                                                <td style={{ textAlign: "center" }}>{topic.sort_order}</td>
                                            </tr>
                                            <tr>
                                                <td>status</td>
                                                <td style={{ textAlign: "center" }}>{topic.status}</td>
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

