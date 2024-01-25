import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { urlImage } from '../../../Api/config'
import { decreaseCount, increaseCount, removeFromCart, reset } from '../../../state/CartSlice'
import { useState } from 'react';
import OrderServie from '../../../services/OrderService'
import OrderDetailService from '../../../services/OrderDetailService'
import { ToastContainer, toast } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css'
export default function Checkout() {

    const [inputs, setInputs] = useState({});


    // redux

    const dispatch = useDispatch()

    let cartItem = useSelector((state) => state.cart.items) // lấy ra mảng item
    console.log("🚀 ~ CartPage ~ cartItem:", cartItem)

    const total = cartItem.reduce((totalPrice, item) => { // toongr tien
        return totalPrice + item.count * (item.pricesale ? (item.price - item.pricesale) : item.price)
    }, 0)

    // convert arr form orderdetail

    const convert_arr_form_ordedetail = []
    console.log("🚀 ~ Checkout ~ convert_arr_form_ordedetail:", convert_arr_form_ordedetail)

    cartItem.map((item) => {
        return convert_arr_form_ordedetail.push(
            {
                product_id: item.id,
                price: item.price,
                qty: item.count,
                discount: item.pricesale ? item.pricesale : 0,
                amount: item.count
            }
        )
    })

    // lấy thông tin user  trên redux
    let user = useSelector((state) => state.user.current)
    console.log("🚀 ~ Header ~ user:", user)


    // lấy dữ liệu
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({
            ...values, [name]: value || "", user_id: user.id, delivery_name: user.name
            ,
            delivery_gender: user.gender, delivery_email: user.email
            , delivery_phone: user.phone
            ,
            note: user.roles,
            status: 1
        }))
    }



    const handleSubmit = (event) => {
        event.preventDefault();
        (
            async () => {
                try {
                    // đẩy lên order
                    const res = await OrderServie.store(inputs)
                    console.log("🚀 ~ res:", res)
                    console.log("🚀 ~ res:", res.order.id)
                    // đẩy lên order detail
                    // tạo form đúng với backend
                    const form_orderDetail = {
                        order_id: res.order.id,
                        products: convert_arr_form_ordedetail
                    }
                    console.log("🚀 ~ form_orderDetail:", form_orderDetail)
                    const Call_Order_detail = await OrderDetailService.store(form_orderDetail)
                    console.log("🚀 ~ Call_Order_detail:", Call_Order_detail)


                    toast.success("thanh toán Thành công");

                    // reset 

                    localStorage.removeItem('cart');

                    dispatch(
                        reset()
                    )

                } catch (error) {
                    console.log("🚀 ~ ngu check out sai:", error)
                    toast.error("vui lòng đăng nhập trước khi thanh toán");


                }

            }
        )()
        console.log(inputs);
    }



    return (
        <div>
            <section className="bg-light">
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb py-2 my-0">
                            <li className="breadcrumb-item">
                                <a className="text-main" href="index.html">Trang chủ</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Thanh toán
                            </li>
                        </ol>
                    </nav>
                </div>
            </section >
            <section className="hdl-maincontent py-2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <form onSubmit={handleSubmit}>
                                <h2 className="fs-5 text-main">Thông tin giao hàng</h2>
                                <p>Bạn có tài khoản chưa? <a href="login.html">Đăng nhập</a></p>
                                {/* <div className="mb-3">
                                <label htmlFor="name">Họ tên</label>
                                <input type="text" name="name" id="name" className="form-control" placeholder="Nhập họ tên" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone">Điện thoại</label>
                                <input type="text" name="phone" id="phone" className="form-control" placeholder="Nhập điện thoại" />
                            </div> */}
                                <div className="card">
                                    <div className="card-header text-main">
                                        Địa chỉ nhận hàng
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <label htmlFor="address">Địa chỉ</label>
                                            <input type="text" name="delivery_address"

                                                value={inputs.delivery_address || ""}
                                                onChange={handleChange}

                                                id="address" className="form-control" placeholder="Nhập địa chỉ" />
                                        </div>
                                        <div className="row">
                                            <div className="col-4">
                                                <select name="tinhtp" id="tinhtp" className="form-control">
                                                    <option value>Chọn Tỉnh/TP</option>
                                                </select>
                                            </div>
                                            <div className="col-4">
                                                <select name="quanhuyen" id="quanhuyen" className="form-control">
                                                    <option value>Chọn Quận/Huyện</option>
                                                </select>
                                            </div>
                                            <div className="col-4">
                                                <select name="phuongxa" id="phuongxa" className="form-control">
                                                    <option value>Chọn Phường/Xã</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h4 className="fs-6 text-main mt-4">Phương thức thanh toán</h4>
                                <div className="thanhtoan mb-4">
                                    <div className="p-4 border">
                                        <input name="typecheckout" onchange="showbankinfo(this.value)" type="radio" defaultValue={1} id="check1" />
                                        <label htmlFor="check1">Thanh toán khi giao hàng</label>
                                    </div>
                                    <div className="p-4 border">
                                        <input name="typecheckout" onchange="showbankinfo(this.value)" type="radio" defaultValue={2} id="check2" />
                                        <label htmlFor="check2">Chuyển khoản qua ngân hàng</label>
                                    </div>
                                    <div className="p-4 border bankinfo">
                                        <p>Ngân Hàng Vietcombank </p>
                                        <p>STK: 99999999999999</p>
                                        <p>Chủ tài khoản: Hồ Diên Lợi</p>
                                    </div>
                                </div>
                                <div className="text-end">
                                    <button style={{ backgroundColor: "red" }} type="submit" className="btn btn-main px-4">XÁC NHẬN</button>
                                </div>
                            </form>
                        </div>

                        <div className="col-md-7">
                            <h2 className="fs-5 text-main">Thông tin đơn hàng</h2>
                            <table className="table table-borderless">
                                <thead>
                                    <tr className="bg-dark">
                                        <th style={{ width: 30 }} className="text-center">STT</th>
                                        <th style={{ width: 100 }}>Hình</th>
                                        <th>Tên sản phẩm</th>
                                        <th style={{ width: 130 }} className="text-center">Số lượng</th>
                                        <th className="text-center">Giá</th>
                                        <th className="text-center">Giá giảm</th>
                                        <th className="text-center">Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartItem && cartItem.length > 0 &&
                                        cartItem.map((item, index) => {

                                            return (
                                                <tr key={index}>
                                                    <td className="text-center align-middle">{index}</td>
                                                    <td>
                                                        <img style={{ height: 80, width: 100 }} classname="img-fluid " src={urlImage + "product/" + item.image} alt="" />
                                                    </td>
                                                    <td className="align-middle">{item.name}</td>
                                                    <input type="text" value={item.count} id="qty" className="form-control text-center" />

                                                    <td className="text-center align-middle">
                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}

                                                    </td>

                                                    <td className="text-center align-middle">
                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.pricesale ? item.pricesale : parseInt(0))}
                                                    </td>
                                                    <td className="text-center align-middle">
                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.pricesale ? (item.price - item.pricesale) * item.count : item.price * item.count)}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }


                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={6} className="text-end">
                                            <strong>Tổng:
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
                                            </strong>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                            <div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Mã giảm giá" aria-describedby="basic-addon2" />
                                    <span className="input-group-text" id="basic-addon2">Sử dụng</span>
                                </div>
                            </div>
                            <table className="table table-borderless">
                                <tbody><tr>
                                    <th>Tạm tính</th>
                                    <td className="text-end">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
                                    </td>
                                </tr>
                                    <tr>
                                        <th>Phí vận chuyển</th>
                                        <td className="text-end">0</td>
                                    </tr>
                                    <tr>
                                        <th>Giảm giá</th>
                                        <td className="text-end">0</td>
                                    </tr>
                                    <tr>
                                        <th>Tổng cộng</th>
                                        <td className="text-end" style={{ color: "red" }}>
                                            <span>

                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody></table>
                        </div>
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

        </div >

    )
}
