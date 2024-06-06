import { useEffect, useState } from "react";
import OrderService from "../../../services/OrderService";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaEye, FaTrashAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import { urlImage } from "../../../Api/config";


export default function OrderShow() {
    const { id } = useParams();
    const [order, setOrder] = useState([]);
    const [orderdetail, setOrderdetail] = useState([]);
    const [total, setTotal] = useState([]);

    const [user, setUser] = useState([]);

    useEffect(() => {
        (async function () {
            const result = await OrderService.show(id);
            console.log("🚀 ~ result:", result)
            setOrder(result.order)
            setOrderdetail(result.orderdetail)
            setUser(result.user)
            setTotal(result.total)
            // console.log(result.order);
        })();
    }, [id])

    /// check trạng thái
    let statusText;
    switch (order.status) {
        case 0:
            statusText = "Đã hủy";
            break;

        case 1:
            // statusText = "Đang giao hàng";
            // break;
            statusText = "Chờ xác nhận";
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
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Chi tiết đơn hàng</h1>
                <div className="mt-1 text-end">
                    <Link to="/admin/order/index" className="btn btn-sm btn-success mx-1">
                        <FaArrowLeft />Về danh sách
                    </Link>
                    <Link to={`/admin/order/edit/${id}`} className="px-1 text-primary">
                        <FaEye />
                    </Link>
                </div>
            </section>
            <section className="content-body my-2">
                <h3>Thông tin khách hàng</h3>
                <div className="row">
                    <div className="col-md">
                        <label><strong>Họ tên (*)</strong></label>
                        <input type="text" name="name" value={user.name} className="form-control" readOnly />
                    </div>
                    <div className="col-md">
                        <label><strong>Email (*)</strong></label>
                        <input type="text" name="email" value={user.email} className="form-control" readOnly />
                    </div>
                    <div className="col-md">
                        <label><strong>Điện thoại (*)</strong></label>
                        <input type="text" name="phone" value={user.phone} className="form-control" readOnly />
                    </div>
                    <div className="col-md-5">
                        <label><strong>Địa chỉ (*)</strong></label>
                        <input type="text" name="address" value={order.delivery_address} className="form-control" readOnly />
                    </div>
                </div>
                <h3>Chi tiết giỏ hàng</h3>
                <div className="row my-2">
                    <div className="col-3">
                        Tổng tiền: <strong>{order.total}</strong>
                    </div>
                    <div className="col-3">
                        Ngày đặt: <strong>{order.created_at}</strong>
                    </div>
                    <div className="col-3">
                        Trạng thái thanh toán: <strong>{order.note}</strong>
                    </div>
                    <div className="col-3">
                        Trạng thái vận chuyển: <strong>{statusText}</strong>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-12">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Tên sản phẩm</th>
                                    <th>Hình ảnh</th>
                                    <th style={{ width: "90px" }} className="text-center">Giá</th>
                                    <th style={{ width: "90px" }} className="text-center">Gía giảm</th>
                                    <th style={{ width: "90px" }} className="text-center">Số lượng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderdetail && orderdetail.map(function (orderdetail, index) {
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
                                            <td>{orderdetail.discount
                                            }</td>
                                            <td>{orderdetail.qty}</td>
                                        </tr>);
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>

    )
}
