import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import DiscountcodeService from '../../../services/DiscountcodeService'
import ProductServie from '../../../services/ProductService'

export default function ProductSaleShow() {
    const { id } = useParams()

    const [productsale, setProductsale] = useState([])

    useEffect(() => {

        const fetch = async () => {
            try {
                const response = await ProductServie.showSale(id)
                setProductsale(response.productsale)
                console.log("🚀 ~ fetch ~ ProductServie showSale:", response)

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
                                            <Link className="btn btn-primary btn-sm" to={'/admin/product/productsale'} style={{ color: "white" }}>về trang chính</Link>
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
                                                <td style={{ textAlign: "center" }}>{productsale.id}</td>
                                            </tr>
                                            <tr>
                                                <td>Tên sản phẩm  </td>
                                                <td style={{ textAlign: "center" }}>{productsale.product_name}</td>
                                            </tr>
                                            <tr>
                                                <td>Ngày bắc đầu </td>
                                                <td style={{ textAlign: "center" }}>{productsale.date_begin
                                                }</td>
                                            </tr>
                                            <tr>
                                                <td>Ngày kết thúc</td>
                                                <td style={{ textAlign: "center" }}>{productsale.date_end}</td>
                                            </tr>
                                            <tr>
                                                <td>số lượng</td>
                                                <td style={{ textAlign: "center" }}>{productsale.qty}</td>
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
