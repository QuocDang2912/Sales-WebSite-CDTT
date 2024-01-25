import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ProductService from "../../../services/ProductService";
import style from "./Style.css"


import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { urlImage } from "../../../Api/config";
const ProductSale = () => {
    const [productsale, setProductsale] = useState([]);
    const [showProductModal, setShowProductModal] = useState(false);
    const [product, setProduct] = useState([]);
    const [reload, setReLoad] = useState(0);
    //productsale
    useEffect(() => {
        (async () => {
            const result = await ProductService.sale();
            setProductsale(result.products);
            setReLoad(false);
        })();
    }, [reload]);
    //product
    useEffect(() => {
        (async () => {
            const result = await ProductService.index();
            setProduct(result.products);
            setReLoad(false);
        })();
    }, [reload]);

    const handleImportProductById = (id) => {
        const id1 = id;
        const price_sale = document.getElementById("pricesale" + id).value;
        const qty = document.getElementById("qty" + id).value;
        const date_begin = document.getElementById("date_begin" + id).value;
        const date_end = document.getElementById("date_end" + id).value;
        const productstore = {
            product_id: id1,
            pricesale: price_sale,
            qty: qty,
            date_begin: date_begin,
            date_end: date_end,
        };
        (async function () {
            const result = await ProductService.storesale(productstore);
            console.log("🚀 ~ result:", result)
            window.location.reload(); // Reload the page
            // toast.success(result.message);
            // console.error("aaa", productstore);
            toast("thêm khuyến mãi thanh cong");
        })();
    };

    return (
        <div className="content">
            <ToastContainer />
            <div className="row my-3">
                <div className="col-md-6 my-2">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setShowProductModal(true)}
                    >
                        Chọn sản phẩm
                    </button>
                </div>
            </div>

            {/* Hiển thị thông tin sản phẩm đã chọn */}
            <div className="row">
                <div className="col-12">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th className="text-center" style={{ width: "140px" }}>
                                    Hình ảnh
                                </th>
                                <th>Tên sản phẩm</th>
                                <th>Giá bán</th>
                                <th>Gía sale</th>
                                <th>Ngay bat dau</th>
                                <th>Ngay ket thuc</th>
                            </tr>
                        </thead>
                        <tbody id="bodyproduct">
                            {productsale &&
                                productsale.map((productsale, index) => {
                                    return (
                                        <tr>
                                            <td>
                                                <img
                                                    className="img-fluid"
                                                    src={urlImage + "product/" + productsale.image}
                                                    alt={productsale.image}
                                                />
                                            </td>
                                            <td>{productsale.name}</td>
                                            <td>{productsale.price}</td>
                                            <td>{productsale.pricesale}</td>
                                            <td>{productsale.date_begin}</td>
                                            <td>{productsale.date_end}</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal chọn sản phẩm */}
            <Modal

                show={showProductModal}
                size="lg"
                // aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => setShowProductModal(false)}
            >
                <Modal.Header closeButton
                >
                    <Modal.Title >Chọn sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Tên sản phẩm</th>
                                <th className="text-center" style={{ width: "140px" }}>
                                    Hình ảnh
                                </th>
                                <th>Giá gốc</th>
                                <th className="text-center" style={{ width: "140px" }}>
                                    Giá sale
                                </th>
                                <th className="text-center" style={{ width: "140px" }}>
                                    Số lượng
                                </th>
                                <th>Ngày bắt đầu</th>
                                <th>Ngày kết thúc</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>
                                        <img
                                            className="img-fluid"
                                            src={urlImage + "product/" + product.image}
                                            alt={product.image}
                                        />
                                    </td>

                                    <td>{product.price}</td>
                                    <td>
                                        {/* Input số lượng */}
                                        <input type="number" min="1" id={"pricesale" + product.id} />
                                    </td>
                                    <td>
                                        {/* Input số lượng */}
                                        <input type="number" min="1" id={"qty" + product.id} />
                                    </td>
                                    <td>
                                        <input
                                            type="datetime-local"
                                            id={"date_begin" + product.id}
                                        />
                                    </td>
                                    <td>
                                        <input type="datetime-local" id={"date_end" + product.id} />
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => handleImportProductById(product.id)}
                                        >
                                            Chọn
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ProductSale;
