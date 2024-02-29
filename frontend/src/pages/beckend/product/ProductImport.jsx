import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";


import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProductServie from "../../../services/ProductService";
import { urlImage } from "../../../Api/config";
const ProductImport = () => {
    const [productsale, setProductsale] = useState([]);
    const [showProductModal, setShowProductModal] = useState(false);
    const [reload, setReLoad] = useState(0);
    const [product, setProduct] = useState([]);
    //productsale
    useEffect(() => {
        (async () => {
            const result = await ProductServie.getStore();
            console.log("🚀 ~ getStore:", result)
            setProductsale(result.products);
            setReLoad(false);
        })();
    }, [reload]);
    //product
    useEffect(() => {
        (async () => {
            const result = await ProductServie.index();
            console.log("🚀 ~ getProduct:", result)
            setProduct(result.products);
            setReLoad(false);
        })();
    }, [reload]);

    const handleImportProductById = (id) => {
        const id1 = id;
        const qty = document.getElementById("qty" + id).value;
        const price = document.getElementById("price" + id).value;
        const productstore = {
            id: id1,
            qty: qty,
            price: price,
        };
        (async function () {
            const result = await ProductServie.storeProductStore(productstore);
            // window.location.reload(); // Reload the page
            // toast.success(result.message);
            // console.error("aaa", productstore);
            toast("nhap hang thanh cong");
        })();
    };

    return (

        <div className="content">
            <ToastContainer />
            <div className="row my-3">
                <div className="col-12 my-2">
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
                                <th>Tên danh mục</th>
                                <th>Tên thương hiệu</th>
                                <th>Tổng số lượng</th>
                                {/* <th>Tổng giá</th> */}
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
                                            <td>{productsale.categoryname}</td>
                                            <td>{productsale.brandname}</td>
                                            <td>{productsale.sum_qty || 0}</td>
                                            {/* <td>{productsale.avg_priceroot}</td> */}
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
                dialogClassName="custom-modal-lg"
                onHide={() => setShowProductModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Chọn sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Tên sản phẩm</th>
                                <th className="text-center" style={{ width: "140px" }}>
                                    Hình ảnh
                                </th>
                                <th className="text-center" style={{ width: "140px" }}>
                                    Giá nhập
                                </th>
                                <th className="text-center" style={{ width: "140px" }}>
                                    Số lượng
                                </th>

                                <th></th>
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
                                    <td>
                                        {/* Input giá nhập*/}
                                        <input type="number" min="1000" id={"price" + product.id} />
                                    </td>
                                    <td>
                                        {/* Input số lươngj */}
                                        <input
                                            type="number"
                                            min="1"
                                            id={"qty" + product.id}
                                        />
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

export default ProductImport;
