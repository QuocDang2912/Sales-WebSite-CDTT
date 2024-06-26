import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ProductService from "../../../services/ProductService";
import style from "./Style.css"
import {
    FaEdit,
    FaEye,
    FaToggleOff,
    FaToggleOn,
    FaTrash,
} from "react-icons/fa";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { urlImage } from "../../../Api/config";
import { Link } from "react-router-dom";
const ProductSale = () => {
    const [productsale, setProductsale] = useState([]);
    const [showProductModal, setShowProductModal] = useState(false);
    const [product, setProduct] = useState([]);
    const [reload, setReLoad] = useState(0);
    //productsale
    useEffect(() => {
        (async () => {
            const result = await ProductService.sale();
            console.log("🚀 ~ result:", result)
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
            setReLoad(reload + 1)
            // window.location.reload(); // Reload the page
            toast("thêm khuyến mãi thanh cong");
        })();
    };
    const handleDelete = async (id) => {
        try {
            const result = await ProductService.destroySale(id);
            setReLoad(reload + 1); // Reload brands
            toast("Xoa thanh cong");
        } catch (error) {
            console.error("Error deleting brand: ", error);
        }
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
                                <th className="text-center">Tên sản phẩm</th>
                                <th className="text-center">Giá bán</th>
                                <th className="text-center">Giá khuyến mãi</th>
                                <th className="text-center">Ngày bắt đầu</th>
                                <th className="text-center">Ngày kết thúc</th>
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
                                            <td> <div className="name">
                                                <a href="#st">{productsale.name}</a>
                                            </div>
                                                <div className="function_style">
                                                    <Link
                                                        to={"/admin/product/saleEdit/" + productsale.id}
                                                        className="px-1 text-primary"
                                                    >
                                                        <FaEdit />
                                                    </Link>
                                                    <Link
                                                        to={"/admin/product/saleShow/" + productsale.id}
                                                        className="px-1 text-info"
                                                    >
                                                        <FaEye />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(productsale.id)}
                                                        className="px-1 text-danger"
                                                        style={{
                                                            border: "none",
                                                            backgroundColor: "transparent",
                                                        }}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(productsale.price)}

                                            </td>
                                            <td className="text-center">
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(productsale.pricesale)}
                                            </td>
                                            <td className="text-center">{productsale.date_begin}</td>
                                            <td className="text-center">{productsale.date_end}</td>
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
                aria-labelledby="example-modal-sizes-title-lg"
                // centered
                onHide={() => setShowProductModal(false)}
                dialogClassName="custom-modal-dialog"
            >
                <Modal.Header closeButton
                >
                    <Modal.Title id="example-modal-sizes-title-lg">Chọn sản phẩm</Modal.Title>
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
                                    Giá khuyến mãi
                                </th>
                                <th className="text-center" style={{ width: "140px" }}>
                                    Số lượng
                                </th>
                                <th>Ngày bắt đầu</th>
                                <th>Ngày kết thúc</th>
                                <th>Hành động</th>
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
                                        <input
                                            max={product.price} type="number" min="1" id={"pricesale" + product.id} />
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
