import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import UserService from "./../../../services/UserService";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProductServie from "../../../services/ProductService";
import { urlImage } from "../../../Api/config";
import OrderServie from "../../../services/OrderService";
import OrderDetailService from "../../../services/OrderDetailService";

const OrderExport = () => {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [showProductModal, setShowProductModal] = useState(false);
    const [user, setUser] = useState([]);
    const [product, setProduct] = useState([]);
    const [reload, setReLoad] = useState(0);
    useEffect(() => {
        (async () => {
            const result = await UserService.index();
            console.log("🚀 ~ result:", result.user)
            setUser(result.user);
            setReLoad(false);
        })();
    }, [reload]);
    // console.log("aaaaaaaa",user);
    useEffect(() => {
        (async () => {
            const result = await ProductServie.productAll1();
            console.log("🚀 ~ result:", result.product)
            setProduct(result.product);
            setReLoad(false);
        })();
    }, [reload]);
    // console.log("product",product);


    const handleSelectCustomer = (customer) => {
        setSelectedCustomer(customer);
        setShowCustomerModal(false);
    };

    const handleSelectProduct = (product) => {
        // Kiểm tra xem sản phẩm đã được chọn hay chưa
        const isProductSelected = selectedProducts.find(
            (selectedProduct) => selectedProduct.id === product.id
        );

        if (!isProductSelected) {
            // Thêm số lượng và tính thành tiền cho mỗi sản phẩm
            const selectedProductWithQuantity = {
                ...product,
                quantity: 1,
                total: product.price,
            };
            setSelectedProducts([...selectedProducts, selectedProductWithQuantity]);
            // Cập nhật tổng tiền hóa đơn
            setTotalAmount((prevTotal) => prevTotal + product.price);
        }

        // Tắt modal chọn sản phẩm
        setShowProductModal(false);
    };

    const handleRemoveProduct = (productId) => {
        // Loại bỏ sản phẩm khỏi danh sách đã chọn và cập nhật tổng tiền
        const removedProduct = selectedProducts.find(
            (product) => product.id === productId
        );
        const updatedProducts = selectedProducts.filter(
            (product) => product.id !== productId
        );
        setSelectedProducts(updatedProducts);
        setTotalAmount((prevTotal) => prevTotal - removedProduct.total);
    };

    const handleProductQuantityChange = (productId, newQuantity) => {
        // Cập nhật số lượng và tính lại thành tiền cho mỗi sản phẩm khi số lượng thay đổi
        const updatedProducts = selectedProducts.map((product) => {
            if (product.id === productId) {
                const newTotal = product.price * newQuantity;
                return { ...product, quantity: newQuantity, total: newTotal };
            }
            return product;
        });
        setSelectedProducts(updatedProducts);
        // Cập nhật tổng tiền hóa đơn
        const newTotalAmount = updatedProducts.reduce(
            (total, product) => total + product.total,
            0
        );
        setTotalAmount(newTotalAmount);
    };

    const handleSaveOrder = async () => {

        try {
            const orderData = {
                // Thêm thông tin đơn hàng, sản phẩm, số lượng và giá vào đây
                user_id: selectedCustomer.id,
                delivery_name: selectedCustomer.name,
                delivery_gender: selectedCustomer.gender,
                delivery_email: selectedCustomer.email,
                delivery_phone: selectedCustomer.phone,
                // delivery_address: selectedCustomer.address,
                // vì user của mình chưa có địa chỉ nên gán cứng
                delivery_address: "quảng ngãi",
                note: "oo",
                // total: totalAmount,
                status: 1

            };
            const createdOrder = await OrderServie.store(orderData);
            const orderdetailData = selectedProducts.map((item) => ({
                order_id: createdOrder.order.id,  // Thay bằng id của đơn hàng thực tế
                product_id: item.id,
                price: item.price,
                qty: item.quantity,
                discount: 15,
                amount: item.total,
            }));
            const createdOrderDetail = await OrderDetailService.store1(orderdetailData)
            console.log("ppppp", createdOrderDetail)
            toast.success("Đã lưu đơn đặt hàng");
            console.log(
                "Đã lưu đơn đặt hàng:",
                "cus", selectedCustomer,
                "saaa", createdOrder.order.id,
                "s", totalAmount
            );
            // Reset dữ liệu sau khi lưu đơn đặt hàng
            setSelectedCustomer(null);
            setSelectedProducts([]);
            setTotalAmount(0);
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error('Error creating 222order:', error);
        }

    };

    return (
        <div className="content">
            <ToastContainer />
            <section className="content-body my-2">
                {/* Button chọn khách hàng và sản phẩm */}

                <div className="row">
                    <div className="col-12 my-2">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => setShowCustomerModal(true)}
                        >
                            Chọn khách hàng
                        </button>
                    </div>
                </div>
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
                {/* Hiển thị thông tin khách hàng */}
                {selectedCustomer && (
                    <div className="row" id="rowshowcustome">
                        <div className="col-md">
                            <label>Họ tên (*)</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={selectedCustomer.name}
                                readOnly
                            />
                        </div>
                        <div className="col-md">
                            <label>Email (*)</label>
                            <input
                                type="text"
                                name="email"
                                className="form-control"
                                value={selectedCustomer.email}
                                readOnly
                            />
                        </div>
                        <div className="col-md">
                            <label>Điện thoại (*)</label>
                            <input
                                type="text"
                                name="phone"
                                className="form-control"
                                value={selectedCustomer.phone}
                                readOnly
                            />
                        </div>
                    </div>
                )}

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
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody id="bodyproduct">
                                {selectedProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td>
                                            {" "}
                                            <img
                                                className="img-fluid"
                                                src={urlImage + "product/" + product.image}
                                                alt={product.image}
                                            />
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{product.category_name}</td>
                                        <td>{product.brand_name}</td>
                                        <td>{product.price}</td>
                                        <td>
                                            {/* Input số lượng */}
                                            <input
                                                type="number"
                                                value={product.quantity}
                                                onChange={(e) =>
                                                    handleProductQuantityChange(
                                                        product.id,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </td>
                                        <td>{product.total}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-xs px-2"
                                                onClick={() => handleRemoveProduct(product.id)}
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Hiển thị tổng tiền hóa đơn */}
                <div className="row my-3">
                    <div className="col-12">
                        <strong>Tổng tiền hóa đơn: {totalAmount}</strong>
                    </div>
                </div>

                {/* Nút lưu đơn đặt hàng */}
                <div className="row my-3">
                    <div className="col-12">
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={handleSaveOrder}
                        >
                            Lưu đơn đặt hàng
                        </button>
                    </div>
                </div>
            </section>

            {/* Modal chọn khách hàng */}
            <Modal
                show={showCustomerModal}
                onHide={() => setShowCustomerModal(false)}
                dialogClassName="modal-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Chọn khách hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên khách hàng</th>
                                <th>Email</th>
                                <th>Điện thoại</th>
                                {/* <th>giới tính</th> */}

                            </tr>
                        </thead>
                        <tbody>
                            {user.map((customer) => (
                                <tr key={customer.id}>
                                    <td>{customer.id}</td>
                                    <td>{customer.name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.phone}</td>
                                    {/* <td>{customer.gender}</td> */}

                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => handleSelectCustomer(customer)}
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
                                <th>Giá bán</th>
                                <th>Gía sale</th>
                                <th>ngày bắt đầu sale</th>
                                <th>ngày kết thúc sale</th>
                                <th>Tồn kho</th>
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
                                    <td>{product.pricesale}</td>
                                    <td>{product.date_begin}</td>
                                    <td>{product.date_end}</td>
                                    <td>{product.total_qty}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => handleSelectProduct(product)}
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

export default OrderExport;
