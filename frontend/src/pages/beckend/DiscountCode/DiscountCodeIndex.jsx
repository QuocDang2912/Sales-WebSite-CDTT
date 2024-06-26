import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import {
    FaEdit,
    FaEye,
    FaToggleOff,
    FaToggleOn,
    FaTrash,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import DiscountcodeService from "../../../services/DiscountcodeService";
import Loading from "../../../components/Loading";

export default function DiscountCodeIndex() {
    const [brands, setBrands] = useState([]);
    const [load, setLoad] = useState(true);
    const [reload, setReLoad] = useState(0);

    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [expires_bd, setExpibd] = useState([]);
    console.log("🚀 ~ DiscountCodeIndex ~ expires_bd:", expires_bd)
    const [expires_kt, setExpikt] = useState([]);
    console.log("🚀 ~ DiscountCodeIndex ~ expires_kt:", expires_kt)
    const [status, setStatus] = useState(1);
    const [type, setType] = useState(0);
    useEffect(() => {
        (async () => {
            try {
                setLoad(false);
                const result = await DiscountcodeService.index();
                console.log("🚀 ~ result:", result)
                setBrands(result.Discountcode);
                setLoad(false);
            } catch (error) {
                console.log("🚀 ~ error:", error)

            }

        })();
    }, [reload]);

    //hàm thêm

    const handleSubmit = (e) => {
        e.preventDefault();
        const brand = new FormData();
        brand.append("percentage", name);
        brand.append("title", title);
        brand.append("type", type);
        brand.append("description", description);
        brand.append("expires_bd", expires_bd);
        brand.append("expires_kt", expires_kt);
        brand.append("status", status);

        (async () => {
            const result = await DiscountcodeService.store(brand);
            toast(result.message);
            console.log("ssss", result);
            setReLoad(result.Discountcode.id);
        })();
    };

    const handleDelete = async (id) => {
        try {
            const result = await DiscountcodeService.destroy(id);
            //   toast("Da xoa vao thung rac");
            setReLoad(reload + 1); // Reload brands
        } catch (error) {
            console.error("Error deleting brand: ", error);
        }
    };

    return (
        <div>
            <section className="hdl-content">
                <div className="container-fluid">
                    <div className="row">
                        <ToastContainer />
                        <div className="col-md-12">
                            {/*CONTENT  */}
                            <div className="content">
                                <section className="content-header my-2">
                                    <h1 className="d-inline">Thêm mã giảm giá</h1>
                                    <hr style={{ border: "none" }} />
                                </section>
                                <section className="content-body">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <form onSubmit={handleSubmit}>
                                                <div className="mb-3">
                                                    <label>
                                                        <strong>Tên mã giảm giá(*)</strong>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        onChange={(e) => setTitle(e.target.value)}
                                                        value={title}
                                                        placeholder="Tên mã giảm giá"
                                                        className="form-control"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label>
                                                        <strong>Loại mã giảm giá</strong>
                                                    </label>
                                                    <select
                                                        onChange={(e) => setType(e.target.value)}
                                                        value={type}
                                                        className="form-control"
                                                    >
                                                        <option value={0}>Chọn loại giảm giá</option>
                                                        <option value={1}>Giam giá theo %</option>
                                                        <option value={2}>Giam giá theo tiền</option>
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label>
                                                        <strong>Percentage(*)</strong>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        onChange={(e) => setName(e.target.value)}
                                                        value={name}
                                                        placeholder="Phần trăm giảm giá"
                                                        className="form-control"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label>
                                                        <strong>Mô tả</strong>
                                                    </label>
                                                    <textarea
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        value={description}
                                                        rows="4"
                                                        placeholder="Mô tả"
                                                        className="form-control"
                                                        required
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label>
                                                        <strong>Ngày bắt đầu</strong>
                                                    </label>
                                                    <input
                                                        type="datetime-local"
                                                        onChange={(e) => setExpibd(e.target.value)}
                                                        value={expires_bd}
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label>
                                                        <strong>Ngày kết thúc</strong>
                                                    </label>
                                                    <input
                                                        type="datetime-local"
                                                        onChange={(e) => setExpikt(e.target.value)}
                                                        value={expires_kt}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label>
                                                        <strong>Trạng thái</strong>
                                                    </label>
                                                    <select
                                                        onChange={(e) => setStatus(e.target.value)}
                                                        value={status}
                                                        className="form-control"
                                                    >
                                                        <option value={1}>Xuất bản</option>
                                                        <option value={2}>Chưa xuất bản</option>
                                                    </select>
                                                </div>
                                                <div className="mb-3 text-end">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-success"
                                                        name="THEM"
                                                    >
                                                        <i className="fa fa-save" /> Lưu[Thêm]
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="row mt-3 align-items-center">
                                                <div className="col-12">
                                                    <ul className="manager">
                                                        <li>
                                                            <a href="#">Tất cả (123)</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Xuất bản (12)</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Rác (12)</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            {load ? <Loading /> : ""}
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center" style={{ width: 30 }}>
                                                            <input type="checkbox" id="checkboxAll" />
                                                        </th>
                                                        <th className="text-center" style={{ width: 120 }}>
                                                            Mã
                                                        </th>
                                                        <th>percentage</th>
                                                        <th>description</th>
                                                        <th>ngày bắt đầu</th>
                                                        <th>ngày kết thúc</th>

                                                        <th className="text-center" style={{ width: 30 }}>
                                                            ID
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {brands &&
                                                        brands.map((brand, index) => {
                                                            return (
                                                                <tr className="datarow" key={index}>
                                                                    <td className="text-center">
                                                                        <input type="checkbox" />
                                                                    </td>

                                                                    <td>
                                                                        <div className="name">
                                                                            <a href="#">
                                                                                {brand.code}
                                                                            </a>
                                                                        </div>
                                                                        <div className="function_style">
                                                                            {/* <Link
                                                                                to={`/admin/discountcode/share/${brand.id}`}
                                                                                className={"border-0 px-1 text-success"}
                                                                            >
                                                                                <RiShareFill />
                                                                            </Link> */}
                                                                            <Link to={`/admin/discountcode/edit/${brand.id}`}>
                                                                                <FaEdit
                                                                                    style={{ color: "blue", fontSize: "16" }}
                                                                                />
                                                                            </Link>
                                                                            <Link
                                                                                to={`/admin/discountcode/show/${brand.id}`}
                                                                                className="px-1 text-info"
                                                                            >
                                                                                <FaEye />
                                                                            </Link>

                                                                            <button
                                                                                onClick={() => handleDelete(brand.id)}
                                                                                className="px-1 text-danger"
                                                                                style={{
                                                                                    border: "none",
                                                                                    backgroundColor: "transparent",
                                                                                }}
                                                                            >
                                                                                <FaTrash />
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                    <td>{brand.percentage}</td>
                                                                    <td>{brand.description}</td>
                                                                    <td>{brand.expires_bd}</td>
                                                                    <td>{brand.expires_kt}</td>
                                                                    <td className="text-center">{brand.id}</td>
                                                                </tr>
                                                            );
                                                        })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            {/*END CONTENT*/}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}