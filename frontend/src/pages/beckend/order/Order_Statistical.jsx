import { useEffect, useState } from "react";
import OrderService from "../../../services/OrderService";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaToggleOff, FaToggleOn, FaTrashAlt } from 'react-icons/fa';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Loading from "../../../components/Loading";
import OrderServie from "../../../services/OrderService";
import Papa from "papaparse"; // Import PapaParse for CSV parsing
import { CSVLink } from "react-csv";

export default function Order_Statistical() {
    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [expires_bd, setExpibd] = useState([]);
    const [expires_kt, setExpikt] = useState([]);
    const [type, setType] = useState("");

    const [totalOrder, setTotalOrder] = useState(0);
    const [totalMoney, setTotalMoney] = useState(0);

    const [csvData, setCsvData] = useState([]); // State to hold CSV data

    const handleSelectOption = async () => {
        const SelectOption = {
            value: type
        }
        try {
            const callApifilterByValue = await OrderServie.filterByValue(SelectOption)
            console.log("🚀 ~ handleSelectOption ~ callApifilterByValue:", callApifilterByValue)
            setOrders(callApifilterByValue.orders)
            setTotalOrder(callApifilterByValue.count)
            setTotalMoney(callApifilterByValue.total_amount)

        } catch (error) {
            console.log("🚀 ~ handleSelectOption ~ error:", error)

        }
    }
    const handleDayOption = async () => {
        const dayOption = {
            start_date: expires_bd,
            end_date: expires_kt
        }
        try {
            const callfilterByDateRange = await OrderServie.filterByDateRange(dayOption)
            console.log("🚀 ~ handleDayOption ~ callfilterByDateRange:", callfilterByDateRange)
            setOrders(callfilterByDateRange.orders)
            setTotalOrder(callfilterByDateRange.count)
            setTotalMoney(callfilterByDateRange.total_amount)

        } catch (error) {
            console.log("🚀 ~ handleDayOption ~ error:", error)

        }
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    };
    const prepareCsvData = () => {
        const headers = [
            { label: "ID", key: "id" },
            { label: "Họ tên khách hàng", key: "delivery_name" },
            { label: "Điện thoại", key: "delivery_phone" },
            { label: "Địa chỉ", key: "delivery_address" },
            { label: "Ngày đặt hàng", key: "created_at" },
            { label: "Tổng tiền", key: "total" }
        ];

        const data = orders.map(order => ({
            id: order.id,
            delivery_name: order.delivery_name,
            delivery_phone: order.delivery_phone,
            delivery_address: order.delivery_address,
            created_at: formatDate(order.created_at),
            total: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)
        }));

        return { headers, data };
    };
    return (
        <div className="content">
            <ToastContainer />
            <section className="content-header my-2">
                <h1 className="d-inline">Báo cáo - Thống kê</h1>
                <div className="row mt-1 align-items-center">
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label>
                                <strong> Từ Ngày</strong>
                            </label>
                            <input
                                type="datetime-local"
                                onChange={(e) => setExpibd(e.target.value)}
                                value={expires_bd}
                            />
                            <label>
                                <strong>Đến Ngày</strong>
                            </label>
                            <input
                                type="datetime-local"
                                onChange={(e) => setExpikt(e.target.value)}
                                value={expires_kt}
                            />
                            <button onClick={handleDayOption} style={{ marginLeft: "10px" }} className="btnapply">Áp dụng</button>
                        </div>
                        <select
                            onChange={(e) => setType(e.target.value)}
                            value={type}
                            className="d-inline me-1"
                        >
                            <option value="">lọc theo</option>
                            <option value="7ngay">7 ngày qua</option>
                            <option value="thangnay">Tháng này</option>
                            <option value="namnay">Năm nay</option>
                        </select>
                        <button onClick={handleSelectOption} className="btnfilter">Lọc</button>
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
                <h4 className="d-inline" style={{ marginRight: "50px", display: "block" }}>Tổng doanh số :
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalMoney)}
                </h4>
                <h4 className="d-inline">Số lượng hóa đơn :

                    {totalOrder}

                </h4>

            </section>
            <section className="content-body my-2">
                {isLoading ? <Loading /> : ""}
                <div className="mb-3">
                    <CSVLink
                        data={prepareCsvData().data}
                        headers={prepareCsvData().headers}
                        filename={"orders.csv"}
                        className="btn btn-primary mb-3"
                    >
                        <i className="fa-solid fa-download"></i> Export Excel
                    </CSVLink>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="text-center" style={{ width: "30px" }}>
                                <input type="checkbox" />
                            </th>
                            <th className="text-center" style={{ width: "30px" }}>ID</th>
                            <th>Họ tên khách hàng</th>
                            <th>Điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Ngày đặt hàng</th>
                            <th>Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.map(function (order, index) {
                            return (
                                <tr className="datarow" key={index}>
                                    
                                    <td>
                                        <input type="checkbox" />
                                    </td>
                                    <td className="text-center">{order.id}</td>
                                    <td>
                                        {order.delivery_name}
                                    </td>
                                    <td>{order.delivery_phone}</td>
                                    <td>{order.delivery_address}</td>
                                    <td>{formatDate(order.created_at)}</td>
                                    <td>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}

                                    </td>

                                </tr>);
                        })}
                    </tbody>
                </table>
            </section>
        </div>
    )
}
