import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector } from 'react-redux'
import OrderServie from '../../../services/OrderService'
import { useNavigate } from 'react-router-dom'
import { urlImage } from '../../../Api/config'
export default function QuanLy_Order() {
    const [order, setOrder] = useState([]);
    const [orderdetail, setOrderdetail] = useState([]);
    const [total, setTotal] = useState([]);
    const [users, setUser] = useState([]);

    const [reload, setReLoad] = useState(0);

    const navi = useNavigate()


    // redux
    let user = useSelector((state) => state.user.current)
    console.log("🚀 ~ QuanLy_Order ~ user:", user)

    useEffect(() => {

        (
            async () => {
                try {
                    const getOrder_From_User = await OrderServie.getOrdersByUserId(user.id) // lấy id_order  từ user_id
                    console.log("🚀 ~ getOrder_From_User:", getOrder_From_User.orders[0].id)

                    const Show_Order = await OrderServie.show(getOrder_From_User.orders[0].id)
                    console.log("🚀 ~ Show_Order:", Show_Order)
                    setUser(Show_Order.user)
                    setOrder(Show_Order.order)
                    setOrderdetail(Show_Order.orderdetail)
                    setTotal(Show_Order.total)

                    // show order từ id_order

                } catch (error) {
                    console.log(error)
                }
            }
        )()

    }, [reload, user.id])

    // hủy đơn hàng bằng vs xóa bên order
    const handleDelete = (id) => {
        (async function () {
            try {
                const result = await OrderServie.destroy(id);
                console.log("🚀 ~ result:", result)
                toast.success("hủy đơn thành công")
                setReLoad(Date.now());
                // navi('/quanly_order')
                window.location.href = '/quanly_order' // tạm vì biến realod chưa ăn nghiên cứu lại sau
            } catch (error) {
                console.log("🚀 ~ error:", error)
                toast.error("error")
            }
        })();
    }
    return (
        <div className='container'>
            <section className="content-body my-2">
                <h3>chi tiết đơn hàng</h3>
                <div className="row">
                    <div className="col-md">
                        <label><strong>Họ tên (*)</strong></label>
                        <input type="text" name="name" value={users.name} className="form-control" readOnly />
                    </div>
                    <div className="col-md">
                        <label><strong>Email (*)</strong></label>
                        <input type="text" name="email" value={users.email} className="form-control" readOnly />
                    </div>
                    <div className="col-md">
                        <label><strong>Điện thoại (*)</strong></label>
                        <input type="text" name="phone" value={users.phone} className="form-control" readOnly />
                    </div>
                    <div className="col-md-5">
                        <label><strong>Địa chỉ (*)</strong></label>
                        <input type="text" name="address" value={order.delivery_address} className="form-control" readOnly />
                    </div>
                </div>
                <h3>Chi tiết giỏ hàng</h3>
                <div className="row my-2">
                    <div className="col-3">
                        Tổng tiền: <strong>{total}</strong>
                    </div>
                    <div className="col-3">
                        Ngày đặt: <strong>{order.created_at}</strong>
                    </div>
                    <div className="col-3">
                        trạng thái <strong>Đang giao hàng</strong>
                    </div>
                    <div className="col-3">
                        <button className='btn btn-danger' onClick={() => { handleDelete(order.id) }}>hủy đơn hàng</button>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-12">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Tên sản phẩm</th>
                                    <th style={{ width: "200px" }} className="text-center">hình ảnh</th>
                                    <th style={{ width: "200px" }} className="text-center">Giá</th>
                                    <th style={{ width: "200px" }} className="text-center">Số lượng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderdetail && orderdetail.length > 0 && orderdetail.map(function (orderdetail, index) {
                                    return (
                                        <tr className="datarow" key={index}>
                                            <td>{orderdetail.name}</td>
                                            <img style={{ height: 100, width: 100 }} classname="img-fluid " src={urlImage + "product/" + orderdetail.image} alt="" />
                                            <td>{orderdetail.price}</td>
                                            <td>{orderdetail.qty}</td>
                                        </tr>);
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
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
    )
}
