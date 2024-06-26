import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import ProductServie from '../../../services/ProductService'
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

export default function ProductSaleUpdate() {
    const [reload, setReLoad] = useState(0);


    const [productsale, setProductsale] = useState([])

    const [date_begin, setdate_begin] = useState([]);
    const [date_end, setdate_end] = useState([]);
    const [pricesale, setpricesale] = useState(null);
    const [qty, setqty] = useState(null);


    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            const response = await ProductServie.showSale(id)
            console.log("🚀 ~ fetch ~ response:", response)
            setProductsale(response.productsale)
            const productsale = response.productsale;
            setdate_begin(productsale.date_begin)
            setdate_end(productsale.date_end)
            setpricesale(productsale.pricesale)
            setqty(productsale.qty)

        };
        fetch();
    }, [id]);

    //hàm thêm

    const handleSubmit = (e) => {
        e.preventDefault();
        const brand = new FormData();
        brand.append("date_begin", date_begin);
        brand.append("date_end", date_end);
        brand.append("pricesale", pricesale);
        brand.append("qty", qty);

        (async () => {
            const result = await ProductServie.updateSale(brand, id);
            toast(result.message);
            console.log("ssss", result);
            navigate("/admin/product/productsale", { replace: true });
        })();
    };
    return (
        <div>
            <section className="hdl-content">
                <div className="container-fluid">
                    <div className="row">
                        <ToastContainer />
                        <div className="col-md-12">
                            {/*CONTENT  */}
                            <div className="content">
                                <section className="content-header my-2">
                                    <h1 className="d-inline">cập nhập giảm giá</h1>
                                    <hr style={{ border: "none" }} />
                                    <div className="row mt-2 align-items-center">
                                        <div className="col-md-12 text-end">
                                            <Link className="btn btn-primary btn-sm" to={'/admin/product/productsale'} style={{ color: "white" }}>về trang chính</Link>
                                        </div>
                                    </div>
                                </section>
                                <section className="content-body">
                                    <form onSubmit={handleSubmit}>

                                        <div className="mb-3">
                                            <label>
                                                <strong>tên sản phẩm (*)</strong>
                                            </label>
                                            <input
                                                type="text"
                                                value={productsale.product_name}
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label>
                                                <strong>Giá giảm(*)</strong>
                                            </label>
                                            <input
                                                type="number"
                                                onChange={(e) => setpricesale(e.target.value)}
                                                value={pricesale}
                                                placeholder="giá giảm"
                                                className="form-control"
                                                required
                                                min={1}
                                                max={productsale.product_price}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label>
                                                <strong>Số lượng </strong>
                                            </label>
                                            <input
                                                min={0}
                                                type="number"
                                                onChange={(e) => setqty(e.target.value)}
                                                value={qty}
                                                className="form-control"
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label>
                                                <strong>Ngày bắt đầu</strong>
                                            </label>
                                            <input
                                                type="datetime-local"
                                                onChange={(e) => setdate_begin(e.target.value)}
                                                value={date_begin}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label>
                                                <strong>Ngày kết thúc</strong>
                                            </label>
                                            <input
                                                type="datetime-local"
                                                onChange={(e) => setdate_end(e.target.value)}
                                                value={date_end}
                                            />
                                        </div>
                                        <div className="mb-3 text-end">
                                            <button
                                                type="submit"
                                                className="btn btn-success"
                                                name="THEM"
                                            >
                                                <i className="fa fa-save" /> Lưu[Thêm]
                                            </button>
                                        </div>
                                    </form>
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
