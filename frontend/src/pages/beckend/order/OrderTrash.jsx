import { useEffect, useState } from "react";
import OrderService from "../../../services/OrderService";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaUndo } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Loading from "../../../components/Loading";

export default function OrderTrash() {
    const [load, setLoad] = useState(0);
    const [orders, setOrders] = useState([]);
    const [reload, setReLoad] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [status1, setStatus1] = useState(2);
    useEffect(() => {
        (async () => {
            setLoad(false);
            const result = await OrderService.thungrac();
            setOrders(result.order);
            setIsLoading(false);
            setLoad(false);
        })();
    }, [load]);
    //restore
    const handleKp = async (id) => {
        try {
            const updatedBrand = {
                status: status1
            };
            const result = await OrderService.delete(updatedBrand, id);
            setLoad(Date.now());
            toast("Khoi phuc thanh cong");
        } catch (error) {
            console.error("Error deleting brand: ", error);
        }
    };
    //
    const handleDelete = async (id) => {
        try {
            const result = await OrderService.destroy(id);
            setLoad(Date.now());
            toast("Xoa thanh cong");
        } catch (error) {
            console.error("Error deleting brand: ", error);
        }
    };
    return (
        <div className="content">
            <ToastContainer />
            <section className="content-header my-2">
                <h1 className="d-inline">Quản lý đơn hàng</h1>
                <div className="row mt-3 align-items-center">
                    <div className="col-6">
                        <ul className="manager">
                            <li>
                                <Link to="/admin/order/index">Tất cả</Link>
                            </li>
                            <li>
                                <Link to="#">Xuất bản (12)</Link>
                            </li>
                            <li>
                                <Link to="/admin/order/trash">Rác </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-6 text-end">
                        <input type="text" className="search d-inline" />
                        <button className="d-inline btnsearch">Tìm kiếm</button>
                    </div>
                </div>
                <div className="row mt-1 align-items-center">
                    <div className="col-md-8">
                        <select name="" className="d-inline me-1">
                            <option value="">Hành động</option>
                            <option value="">Bỏ vào thùng rác</option>
                        </select>
                        <button className="btnapply">Áp dụng</button>
                        <select name="" className="d-inline me-1">
                            <option value="">Chọn tháng</option>
                            <option value="">Tháng 9</option>
                        </select>
                        <select name="" className="d-inline me-1">
                            <option value="">Chọn năm</option>
                        </select>
                        <button className="btnfilter">Lọc</button>
                    </div>
                    <div className="col-md-4 text-end">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination pagination-sm justify-content-end">
                                <li className="page-item disabled">
                                    <Link className="page-link">&laquo;</Link>
                                </li>
                                <li className="page-item">
                                    <Link className="page-link" to="#">1</Link>
                                </li>
                                <li className="page-item">
                                    <Link className="page-link" to="#">2</Link>
                                </li>
                                <li className="page-item">
                                    <Link className="page-link" to="#">3</Link>
                                </li>
                                <li className="page-item">
                                    <Link className="page-link" to="#">&raquo;</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
            <section className="content-body my-2">
                {isLoading ? <Loading /> : ""}
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="text-center" style={{ width: "30px" }}>
                                <input type="checkbox" />
                            </th>
                            <th>Họ tên khách hàng</th>
                            <th>Điện thoại</th>
                            <th>Email</th>
                            <th>Ngày đặt hàng</th>
                            <th className="text-center" style={{ width: "30px" }}>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.map(function (order, index) {
                            return (
                                <tr className="datarow" key={index}>
                                    <td>
                                        <input type="checkbox" />
                                    </td>
                                    <td>
                                        <div className="name">
                                            <Link to={'/admin/order/edit/' + order.id}>
                                                {order.name}
                                            </Link>
                                        </div>
                                        <div className="function_style">
                                            <button onClick={() => handleKp(order.id)} className="border-0 px-1 text-danger"><FaUndo /></button>
                                            <button onClick={() => handleDelete(order.id)} className="border-0 px-1 text-danger"><FaTrashAlt /></button>
                                        </div>
                                    </td>
                                    <td>{order.delivery_phone}</td>
                                    <td>{order.delivery_email}</td>
                                    <td>{order.created_at}</td>
                                    <td className="text-center">{order.id}</td>
                                </tr>);
                        })}
                    </tbody>
                </table>
            </section>
        </div>
    )
}
