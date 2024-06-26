import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";


import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProductServie from "../../../services/ProductService";
import { urlImage } from "../../../Api/config";
import style from "./Style.css"

const ProductImport = () => {
    const [productsale, setProductsale] = useState([]);
    const [showProductModal, setShowProductModal] = useState(false);
    const [reload, setReLoad] = useState(0);
    const [product, setProduct] = useState([]);
    const [isAddingProduct, setIsAddingProduct] = useState(false); // Trạng thái thêm sản phẩm

    useEffect(() => {
        // Load product sale
        (async () => {
            const result = await ProductServie.getStore();
            console.log("🚀 ~ getStore:", result);
            setProductsale(result.products);
        })();
    }, [reload]);

    useEffect(() => {
        // Load product
        (async () => {
            const result = await ProductServie.index();
            console.log("🚀 ~ getProduct:", result);
            setProduct(result.products);
        })();
    }, [reload]);

    const handleImportProductById = async (id) => {
        setIsAddingProduct(true); // Đánh dấu đang thêm sản phẩm
        const qty = document.getElementById("qty" + id).value;
        const price = document.getElementById("price" + id).value;
        const productstore = {
            id: id,
            qty: qty,
            price: price,
        };
        try {
            await ProductServie.storeProductStore(productstore);
            // Thêm sản phẩm thành công, cập nhật lại dữ liệu
            setReLoad(reload + 1);
            setIsAddingProduct(false); // Kết thúc việc thêm sản phẩm
            toast("nhap hang thanh cong");
        } catch (error) {
            setIsAddingProduct(false); // Kết thúc việc thêm sản phẩm do lỗi
            console.error("Error adding product:", error);
            toast.error("Đã xảy ra lỗi khi thêm sản phẩm.");
        }
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
                dialogClassName="custom-modal-dialog"
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
                                        <input
                                            className="form-control"
                                            max={product.price}
                                            type="number" min="1000" id={"price" + product.id}
                                        />
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
