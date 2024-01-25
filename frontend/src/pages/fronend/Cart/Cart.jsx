import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { urlImage } from '../../../Api/config'
import { decreaseCount, increaseCount, removeFromCart } from '../../../state/CartSlice'

export default function Cart() {
    const dispatch = useDispatch()

    let cartItem = useSelector((state) => state.cart.items)
    console.log("🚀 ~ CartPage ~ cartItem:", cartItem)

    const total = cartItem.reduce((totalPrice, item) => { // toongr tien
        return totalPrice + item.count * (item.pricesale ? (item.price - item.pricesale) : item.price)
    }, 0)
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
                                Giỏ hàng của bạn
                            </li>
                        </ol>
                    </nav>
                </div>
            </section >
            <section className="hdl-maincontent py-2">
                <div className="container">
                    <table className="table table-bordered">
                        <thead>
                            <tr className="bg-dark">
                                <th style={{ width: 30 }} className="text-center">STT</th>
                                <th style={{ width: 100 }}>Hình</th>
                                <th>Tên sản phẩm</th>
                                <th style={{ width: 130 }} className="text-center">Số lượng</th>
                                <th className="text-center">Giá</th>
                                <th className="text-center">Giá giảm</th>
                                <th className="text-center">Thành tiền</th>
                                <th />
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
                                                <img style={{ height: 100, width: 200 }} classname="img-fluid " src={urlImage + "product/" + item.image} alt="" />                                            </td>
                                            <td className="align-middle">{item.name}</td>

                                            <td className="text-center align-middle">
                                                <div className="input-group mb-3">
                                                    <button className="btn btn-mini" type="button" onClick={() => dispatch(decreaseCount({ id: item.id }))}>-</button>
                                                    <input type="text" value={item.count} id="qty" className="form-control text-center" />
                                                    <button className="btn btn-mini" type="button" onClick={() => dispatch(increaseCount({ id: item.id }))}> + </button>
                                                </div>
                                            </td>
                                            <td className="text-center align-middle">
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}


                                            </td>
                                            <td className="text-center align-middle">

                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.pricesale ? item.pricesale : parseInt(0))}



                                            </td>
                                            <td className="text-center align-middle">

                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.pricesale ? (item.price - item.pricesale) * item.count : item.price * item.count)}




                                            </td>

                                            <td className="text-center align-middle">
                                                <button className="btn  btn-danger" type="button" onClick={() => dispatch(removeFromCart({ id: item.id }))}>
                                                    <i className="fa-solid fa-xmark" />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={5}>

                                    <Link to={"/checkout"} className="btn btn-main" style={{ backgroundColor: "red" }}>
                                        Thanh toán
                                    </Link>
                                </td>
                                <td colSpan={2} className="text-end">
                                    <strong>Tổng tiền:
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}

                                    </strong>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </section >
        </div >
    )
}
