import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import DiscountcodeService from '../../../services/DiscountcodeService'



export default function DiscountCodeShow() {
    const { id } = useParams()

    const [DiscountCode, setDiscountCode] = useState([])

    useEffect(() => {

        const fetch = async () => {
            try {
                const response = await DiscountcodeService.show(id)
                console.log("🚀 ~ file: BrandEdit.jsx:16 ~ fetch ~ response:", response)
                setDiscountCode(response.Discountcode)
            } catch (error) {
                console.log("🚀 ~ fetch ~ error:", error)

            }
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
                                            <Link className="btn btn-primary btn-sm" to={'/admin/discountcode/index'} style={{ color: "white" }}>về trang chính</Link>
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
                                                <td style={{ textAlign: "center" }}>{DiscountCode.id}</td>
                                            </tr>
                                            <tr>
                                                <td>code</td>
                                                <td style={{ textAlign: "center" }}>{DiscountCode.code}</td>
                                            </tr>
                                            <tr>
                                                <td>Ngày bắc đầu </td>
                                                <td style={{ textAlign: "center" }}>{DiscountCode.expires_bd}</td>
                                            </tr>
                                            <tr>
                                                <td>Ngày kết thúc</td>
                                                <td style={{ textAlign: "center" }}>{DiscountCode.expires_kt}</td>
                                            </tr>
                                            <tr>
                                                <td>title</td>
                                                <td style={{ textAlign: "center" }}>{DiscountCode.title}</td>
                                            </tr>
                                            <tr>
                                                <td>percentage</td>
                                                <td style={{ textAlign: "center" }}>{DiscountCode.percentage}</td>
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
