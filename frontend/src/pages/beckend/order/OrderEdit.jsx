import { useEffect, useState } from "react";
import OrderService from "../../../services/OrderService";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { urlImage } from "../../../Api/config";


export default function OrderEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    console.log("🚀 ~ OrderEdit ~ inputs:", inputs)

    useEffect(() => {
        (async function () {
            try {
                const result = await OrderService.show(id);
                setInputs(result.order); // Initialize inputs with the order data
            } catch (error) {
                console.error("Error fetching order:", error);
                toast.error("Failed to load order data");
            }
        })();
    }, [id]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        try {
            const result = await OrderService.update(inputs, id);
            console.log("Order cập nhật thành công:", result);
            toast.success("Cập nhập Đơn hàng thành công");
            navigate("/admin/order/index", { replace: true });

        } catch (error) {
            console.error("Error updating order:", error);
            toast.error("Cập nhật thất bại");
        }
    };

    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Cập nhật đơn hàng</h1>
                <div className="mt-1 text-end">
                    <Link className="btn btn-sm btn-primary" style={{ color: "white" }} to="/admin/order/index">
                    <i class="fa fa-arrow-left"></i>Quay lại
                    </Link>
                </div>
            </section>
            <form onSubmit={handleSubmitEdit}>
                <section className="content-body my-2">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="mb-3">
                                <label><strong>Tên người nhận (*)</strong></label>
                                <input
                                    value={inputs.delivery_name || ""}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Nhập tên người nhận"
                                    name="delivery_name"
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label><strong>Email người nhận (*)</strong></label>
                                <input
                                    value={inputs.delivery_email || ""}
                                    onChange={handleChange}
                                    type="email"
                                    placeholder="Nhập email người nhận"
                                    name="delivery_email"
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label><strong>Nhập số điện thoại (*)</strong></label>
                                <input
                                    value={inputs.delivery_phone || ""}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Nhập số điện thoại"
                                    name="delivery_phone"
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label><strong>Địa chỉ (*)</strong></label>
                                <input
                                    value={inputs.delivery_address || ""}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Nhập địa chỉ người nhận"
                                    name="delivery_address"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="box-container mt-2 bg-white">
                                <div className="box-header py-1 px-2 border-bottom">
                                    <strong>Trạng thái thanh toán (*)</strong>
                                </div>
                                <div className="box-body p-2 border-bottom">
                                    <select
                                        name="note"
                                        className="form-select"
                                        value={inputs.note || ""}
                                        onChange={handleChange}
                                    >
                                        <option value="">Chọn trạng thái thanh toán</option>
                                        <option value="Đã thanh toán">Đã thanh toán</option>
                                        <option value="Chưa thanh toán">Chưa thanh toán</option>
                                    </select>
                                </div>
                            </div>
                            <div className="box-container mt-2 bg-white">
                                <div className="box-header py-1 px-2 border-bottom">
                                    <strong>Trạng thái vận chuyển (*)</strong>
                                </div>
                                <div className="box-body p-2 border-bottom">
                                    <select
                                        name="status"
                                        className="form-select"
                                        value={inputs.status || ""}
                                        onChange={handleChange}
                                    >
                                        <option value="">Chọn trạng thái vận chuyển</option>
                                        <option value="0">Đã hủy</option>
                                        <option value="1">Chờ xác nhận</option>
                                        <option value="2">Đang giao</option>
                                        <option value="3">Đã giao</option>
                                    </select>
                                </div>
                            </div>
                            <div className="box-footer text-end px-2 py-2">
                                <button type="submit" className="btn btn-success btn-sm text-end">
                                    <i className="fa fa-save" aria-hidden="true"></i> Cập nhật
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
        </div>
    );
}
