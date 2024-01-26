import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import BrandService from '../../../services/BrandService'
import Loading from '../../../components/Loading';
import { urlImage } from '../../../Api/config';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit, FaEye, FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
export default function BrandIndex() {
    const [status1, setStatus1] = useState(0);

    const [brands, setBrands] = useState([]);
    const [load, setLoad] = useState(true);
    const [reload, setReLoad] = useState(0);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [sort_order, setSortOrder] = useState(1);
    const [status, setStatus] = useState(1);

    useEffect(() => {
        (async () => {
            setLoad(false);
            const result = await BrandService.index();
            setBrands(result.brands);
            setLoad(false);
        })();
    }, [reload]);

    //hàm thêm

    const handleSubmit = (e) => {
        e.preventDefault();
        const image = document.getElementById("image");
        const brand = new FormData();
        brand.append("name", name);
        brand.append("description", description);
        brand.append("sort_order", sort_order);
        brand.append("status", status);
        brand.append("image", image);
        brand.append("image", image.isDefaultNamespace.length === 0 ? "" : image.files[0]);
        (async () => {
            const result = await BrandService.store(brand);
            alert(result.message);
            setReLoad(result.brand.id);
        })();
    };

    const handleDelete = async (id) => {
        try {
            const updatedBrand = {
                status: status1,
            };
            const result = await BrandService.delete(updatedBrand, id);
            //   toast("Da xoa vao thung rac");
            setReLoad(reload + 1); // Reload brands
        } catch (error) {
            console.error("Error deleting brand: ", error);
        }
    };

    const handleStatus = (id) => {
        (async () => {
            const result = await BrandService.status(id);
            setReLoad(Date.now);
        })();
    };

    return (
        <div>
            <section className="hdl-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-10">
                            {/*CONTENT  */}
                            <div className="content">
                                <section className="content-header my-2">
                                    <h1 className="d-inline">Thương hiệu</h1>
                                    <hr style={{ border: "none" }} />
                                </section>
                                <section className="content-body my-5">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <form onSubmit={handleSubmit}>
                                                <div className="mb-3">
                                                    <label>
                                                        <strong>Tên thương hiệu (*)</strong>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        onChange={(e) => setName(e.target.value)}
                                                        value={name}
                                                        placeholder="Nhập tên danh mục"
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
                                                        placeholder="mô tả"
                                                        className="form-control"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label>
                                                        <strong>Hình đại diện</strong>
                                                    </label>
                                                    <input type="file" id="image" className="form-control" />
                                                </div>
                                                <div className="mb-3">
                                                    <label>
                                                        <strong>sắp xếp</strong>
                                                    </label>
                                                    <select onChange={(e) => setSortOrder(e.target.value)} value={status} className="form-select">
                                                        <option value={1}>dđ</option>
                                                        <option value={2}>dđ</option>
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label>
                                                        <strong>Trạng thái</strong>
                                                    </label>
                                                    <select onChange={(e) => setStatus(e.target.value)} value={status} className="form-select">
                                                        <option value={1}>Xuất bản</option>
                                                        <option value={2}>Chưa xuất bản</option>
                                                    </select>
                                                </div>
                                                <div className="mb-3 text-end">
                                                    <button type="submit" className="btn btn-success" name="THEM">
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
                                                            <a href="brand_index.html">Tất cả (123)</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Xuất bản (12)</a>
                                                        </li>
                                                        <li>
                                                            <Link to="/admin/brand/trash">
                                                                {" "}
                                                                Thùng Rác <FaTrash />
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="row my-2 align-items-center">
                                                <div className="col-md-6">
                                                    <select name className="d-inline me-1">
                                                        <option value>Hành động</option>
                                                        <option value>Bỏ vào thùng rác</option>
                                                    </select>
                                                    <button className="btnapply">Áp dụng</button>
                                                </div>
                                                <div className="col-md-6 text-end">
                                                    <input type="text" className="search d-inline" />
                                                    <button className="btnsearch d-inline">Tìm kiếm</button>
                                                </div>
                                            </div>
                                            {load ? <Loading /> : ""}
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center" style={{ width: 30 }}>
                                                            <input type="checkbox" id="checkboxAll" />
                                                        </th>
                                                        <th className="text-center" style={{ width: 90 }}>
                                                            Hình ảnh
                                                        </th>
                                                        <th>Tên thương hiệu</th>
                                                        <th>Tên slug</th>
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
                                                                        <img
                                                                            className="img-fluid"
                                                                            src={urlImage + "brand/" + brand.image}
                                                                            alt={brand.image}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <div className="name">
                                                                            <a href="brand_index.html">{brand.name}</a>
                                                                        </div>
                                                                        <div className="function_style">
                                                                            <button
                                                                                onClick={() => handleStatus(brand.id)}
                                                                                className={
                                                                                    brand.status === 1
                                                                                        ? "border-0 px-1 text-success"
                                                                                        : "border-0 px-1 text-danger"
                                                                                }
                                                                            >
                                                                                {brand.status === 1 ? <FaToggleOn /> : <FaToggleOn />}
                                                                            </button>
                                                                            <Link to={"/admin/brand/edit/" + brand.id} className="px-1 text-primary">
                                                                                <FaEdit />
                                                                            </Link>
                                                                            <Link to={"/admin/brand/show/" + brand.id} className="px-1 text-info">
                                                                                <FaEye />
                                                                            </Link>
                                                                            <button onClick={() => handleDelete(brand.id)} className="px-1 text-danger">
                                                                                <FaTrash />
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                    <td>{brand.slug}</td>
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

    )
}
