import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import OrderServie from "../../../services/OrderService";
import { urlImage } from "../../../Api/config";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function QuanLy_Order() {
    const [allOrder, setAllOrder] = useState([]);

    const [reload, setReLoad] = useState(0);

    const [show, setShow] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = (order) => {
        setCurrentOrder(order);
        setShow(true);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentOrder(prevOrder => ({
            ...prevOrder,
            [name]: value
        }));
    };
    // handele  modal up date
    const handleModalUpdate = async (id) => {
        console.log("🚀 ~ handleModalUpdate ~ id:", id)
        const dataUpdateModal = {
            created_at: currentOrder.created_at,
            created_by: currentOrder.created_by,
            delivery_address: currentOrder.delivery_address,
            delivery_email: currentOrder.delivery_email,
            delivery_gender: currentOrder.delivery_gender,
            delivery_name: currentOrder.delivery_name,
            delivery_phone: currentOrder.delivery_phone,
            id: currentOrder.id,
            note: currentOrder.note,
            status: currentOrder.status,
            updated_at: currentOrder.updated_at,
            updated_by: currentOrder.updated_by,
            user_id: currentOrder.user_id
        }
        console.log("🚀 ~ handleModalUpdate ~ dataUpdateModal:", dataUpdateModal)
        try {
            const resultApiUpdate = await OrderServie.update(dataUpdateModal, id);
            console.log("🚀 ~ handleModalUpdate ~ resultApiUpdate:", resultApiUpdate)
            toast.success("Cập nhập Đơn hàng thành công");
            setReLoad(Date.now())
            handleClose();
        } catch (error) {
            console.error("Error updating order:", error);
            toast.error("Cập nhật thất bại");
        }


    }
    // redux
    let user = useSelector((state) => state.user.current);

    useEffect(() => {
        (async () => {
            try {
                const getOrder_From_IdUser = await OrderServie.getOrdersByUserId(
                    user.id
                ); // lấy được các đơn hàng từ user đó
                setAllOrder(getOrder_From_IdUser.orders);
                console.log("🚀 ~ getOrder_From_User:", getOrder_From_IdUser.orders);
                setReLoad(1);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [reload, user.id]);

    // hủy đơn hàng 
    const handleDelete = (id) => {
        (async function () {
            try {
                const updatedBrand = {
                    status: 0,
                };
                const result = await OrderServie.delete(updatedBrand, id);
                toast.success("Đã hủy đơn hàng thành công");
                setReLoad(Date.now());

            } catch (error) {
                console.error("Error deleting brand: ", error);
            }
        })();
    };


    return (
        <div className="container">
            <section className="content-body my-2">
                <h3 style={{ marginBottom: "30px" }}>Quản lý Các đơn hàng</h3>

                {allOrder.length > 0 &&
                    allOrder.map((order, index) => {
                        // bắt trạng thái để show trạng thái đơn hàng giao hay chưa
                        let statusText;
                        let cancelButton;
                        let UpdateButton;

                        switch (order.status) {
                            case 0:
                                statusText = "Đã hủy";
                                break;

                            case 1:
                                // statusText = "Đang giao hàng";
                                // break;
                                statusText = "Chờ xác nhận";
                                cancelButton = (
                                    <div className="col-3">
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => {
                                                handleDelete(order.id);
                                            }}
                                        >
                                            Hủy đơn hàng
                                        </button>
                                    </div>
                                );
                                UpdateButton = (
                                    <div style={{ marginTop: 10 }}>
                                        {/* <button
                                            className="btn btn-success"
                                        // data-toggle="modal" data-target="#exampleModal"
                                        // type="button"
                                        // onClick={() => {
                                        //     handleModalUpdate();
                                        // }}
                                        >
                                            Cập nhập
                                        </button> */}
                                        <Button variant="primary" onClick={() => handleShow(order)}>
                                            Cập nhật
                                        </Button>
                                    </div>
                                );
                                break;
                            case 2:
                                // statusText = "Đã giao";
                                // break;
                                statusText = "Đang giao hàng";
                                break;
                            case 3:
                                statusText = "Đã giao";
                                break;
                            default:
                                statusText = "Trạng thái không xác định";
                        }
                        return (
                            <>
                                <h4> Chi tiết Đơn hàng ({index + 1}) :</h4>
                                <div className="row">
                                    <div className="col-md">
                                        <label>
                                            <strong>Họ tên người nhận (*)</strong>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={order.delivery_name}
                                            className="form-control"
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-md">
                                        <label>
                                            <strong>Email (*)</strong>
                                        </label>
                                        <input
                                            type="text"
                                            name="email"
                                            value={order.delivery_email}
                                            className="form-control"
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-md">
                                        <label>
                                            <strong>Điện thoại (*)</strong>
                                        </label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={order.delivery_phone}
                                            className="form-control"
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-md-5">
                                        <label>
                                            <strong>Địa chỉ (*)</strong>
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={order.delivery_address}
                                            className="form-control"
                                            readOnly
                                        />
                                    </div>
                                </div>
                                {UpdateButton}
                                <div className="row my-2">
                                    <div className="col-3">
                                        Tổng tiền đơn hàng:
                                        <strong>
                                            {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(order.total_amount)}
                                        </strong>
                                    </div>
                                    <div className="col-3">
                                        Ngày đặt: <strong>{order.created_at}</strong>
                                    </div>
                                    <div className="col-3">
                                        Trạng thái giao hàng: <strong>{statusText}</strong>
                                    </div>
                                    <div className="col-3">
                                        Trạng thái thanh toán: <strong>{order.note}</strong>
                                    </div>

                                </div>
                                {cancelButton}
                                <div className="row my-3">
                                    <div className="col-12">
                                        <table className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Tên sản phẩm</th>
                                                    <th
                                                        style={{ width: "500px" }}
                                                        className="text-center"
                                                    >
                                                        hình ảnh
                                                    </th>
                                                    <th
                                                        style={{ width: "200px" }}
                                                        className="text-center"
                                                    >
                                                        Giá
                                                    </th>
                                                    <th
                                                        style={{ width: "200px" }}
                                                        className="text-center"
                                                    >
                                                        Số lượng
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.order_details.length > 0 &&
                                                    order.order_details.map(function (
                                                        orderdetail,
                                                        index
                                                    ) {
                                                        return (
                                                            <tr className="datarow" key={index}>
                                                                <td>{orderdetail.name}</td>
                                                                <img
                                                                    style={{ height: 200, width: 300 }}
                                                                    classname="img-fluid "
                                                                    src={
                                                                        urlImage + "product/" + orderdetail.image
                                                                    }
                                                                    alt=""
                                                                />
                                                                <td>{orderdetail.price}</td>
                                                                <td>{orderdetail.qty}</td>
                                                            </tr>
                                                        );
                                                    })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* modal update */}


                                <Modal
                                    show={show}
                                    onHide={handleClose}
                                    backdrop="static"
                                    keyboard={false}
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Cập nhật đơn hàng</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <label>
                                            <strong>Họ tên người nhận (*)</strong>
                                        </label>
                                        <input
                                            type="text"
                                            name="delivery_name"
                                            defaultValue={currentOrder?.delivery_name}
                                            className="form-control"
                                            onChange={handleChange}

                                        />
                                        <label>
                                            <strong>Email (*)</strong>
                                        </label>
                                        <input
                                            type="text"
                                            name="delivery_email"
                                            defaultValue={currentOrder?.delivery_email}
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                        <label>
                                            <strong>Điện thoại (*)</strong>
                                        </label>
                                        <input
                                            type="phone"
                                            name="delivery_phone"
                                            defaultValue={currentOrder?.delivery_phone}
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                        <label>
                                            <strong>Địa chỉ (*)</strong>
                                        </label>
                                        <input
                                            type="text"
                                            name="delivery_address"
                                            defaultValue={currentOrder?.delivery_address}
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Đóng
                                        </Button>
                                        <Button onClick={() => { handleModalUpdate(currentOrder.id) }} variant="primary">Cập nhật</Button>
                                    </Modal.Footer>
                                </Modal>
                                {/* modal update */}
                            </>
                        );
                    })}
            </section>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}
