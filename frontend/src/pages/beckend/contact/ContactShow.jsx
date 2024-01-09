import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import ContactServie from '../../../services/ContactService'


export default function ContactShow() {
    const { id } = useParams()

    const [contacts, setcontacts] = useState([])

    useEffect(() => {

        const fetch = async () => {
            const response = await ContactServie.show(id)
            console.log("🚀 ~ file: BrandEdit.jsx:16 ~ fetch ~ response:", response)
            setcontacts(response.contact)
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
                                            {/* <a  className="btn btn-primary btn-sm"> */}
                                            <Link className="btn btn-primary btn-sm" to={'/admin/contact/index'} style={{ color: "white" }}>về trang chính</Link>
                                            {/* </a> */}
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
                                                <td style={{ textAlign: "center" }}>{contacts.id}</td>
                                            </tr>
                                            <tr>
                                                <td>user_id</td>
                                                <td style={{ textAlign: "center" }}>{contacts.user_id}</td>
                                            </tr>
                                            <tr>
                                                <td>name</td>
                                                <td style={{ textAlign: "center" }}>{contacts.name}</td>
                                            </tr>
                                            <tr>
                                                <td>email</td>
                                                <td style={{ textAlign: "center" }}>{contacts.email}</td>
                                            </tr>
                                            <tr>
                                                <td>phone</td>
                                                <td style={{ textAlign: "center" }}>{contacts.phone}</td>
                                            </tr>
                                            <tr>
                                                <td>title</td>
                                                <td style={{ textAlign: "center" }}>{contacts.title}</td>
                                            </tr>
                                            <tr>
                                                <td>content</td>
                                                <td style={{ textAlign: "center" }}>{contacts.content}</td>
                                            </tr>
                                            <tr>
                                                <td>replay_id</td>
                                                <td style={{ textAlign: "center" }}>{contacts.replay_id}</td>
                                            </tr>
                                            <tr>
                                                <td>status</td>
                                                <td style={{ textAlign: "center" }}>{contacts.status}</td>
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
