import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'


import CategoryService from '../../../services/CategoryService';
import { Link } from "react-router-dom";
import {
    FaEdit,
    FaEye,
    FaToggleOff,
    FaToggleOn,
    FaTrash,
} from "react-icons/fa";
import Loading from '../../../components/Loading';
import { urlImage } from '../../../Api/config';
export default function CategoryIndex() {


    const [status1, setStatus1] = useState(0);

    const [categories, setCategories] = useState([]);
    const [load, setLoad] = useState(true);
    const [reload, setReLoad] = useState(0);

    const [name, setName] = useState("");
    const [parent_id, setParent_id] = useState("");

    const [description, setDescription] = useState("");
    const [slug, setSlug] = useState("");
    const [sort_order, setSortOrder] = useState(1);
    const [status, setStatus] = useState(1);

    useEffect(() => {
        (async () => {
            setLoad(false);
            const result = await CategoryService.index();
            console.log("🚀 ~ result:", result)
            setCategories(result.category);
            setLoad(false);
        })();
    }, [reload]);

    //hàm thêm


    const handleSubmit = (e) => {
        e.preventDefault();
        const image = document.getElementById("image");
        const category = new FormData();
        category.append("name", name);
        category.append("slug", slug);
        category.append("description", description);
        category.append("sort_order", sort_order);
        category.append("status", status);
        category.append("parent_id", parent_id);

        category.append("image", image);
        category.append("image", image.isDefaultNamespace.length === 0 ? "" : image.files[0]);
        (async () => {
            const result = await CategoryService.store(category);
            alert(result.message);
            setReLoad(result.category.id);
        })();
    };

    const handleDelete = async (id) => {
        try {
            const updatedCategory = {
                status: status1
            };
            const result = await CategoryService.delete(updatedCategory, id);
            //   toast("Da xoa vao thung rac");
            setReLoad(reload + 1); // Reload brands
        } catch (error) {
            console.error("Error deleting brand: ", error);
        }
    };

    const handleStatus = (id) => {
        (async () => {
            const result = await CategoryService.status(id);
            setReLoad(Date.now);
        })();
    };



    return (
        <div>
            <section className="hdl-content">
                <div className="container-fluid">
                    <div className="row">
                        {/* bảng điều khiển */}

                        {/*end bảng điều khiển */}
                        <div className="col-md-10">
                            {/*CONTENT  */}
                            <div className="content">
                                <section className="content-header my-2">
                                    <h1 className="d-inline">Danh mục</h1>
                                    <hr style={{ border: "none" }} />
                                </section>
                                <section className="content-body my-2">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <form onSubmit={handleSubmit}>
                                                <div className="mb-3">
                                                    <label>
                                                        <strong>Tên Danh Mục (*)</strong>
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
                                                        <strong>Slug</strong>
                                                    </label>
                                                    <textarea
                                                        onChange={(e) => setSlug(e.target.value)}
                                                        value={slug}
                                                        rows="4"
                                                        placeholder="mô tả"
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
                                                        <strong>Danh mục cha</strong>
                                                    </label>
                                                    <select
                                                        onChange={(e) => setParent_id(e.target.value)}
                                                        value={parent_id}
                                                        className="form-select"
                                                    >
                                                        <option value={1}>None</option>
                                                        <option value={2}>Tên danh mục</option>
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label>
                                                        <strong>Hình đại diện</strong>
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id="image"
                                                        className="form-control"
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label>
                                                        <strong>Trạng thái</strong>
                                                    </label>
                                                    <select
                                                        onChange={(e) => setStatus(e.target.value)}
                                                        value={status}
                                                        className="form-select"
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
                                                            <a href="category_index.html">Tất cả (123)</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Xuất bản (12)</a>
                                                        </li>
                                                        <li>
                                                            <Link to="/admin/category/trash"> Thùng Rác <FaTrash /></Link>
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
                                                    <button className="d-inline btnsearch">
                                                        Tìm kiếm
                                                    </button>
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
                                                        <th>Tên danh mục</th>

                                                        <th>Slug</th>
                                                        <th>Mô tả</th>
                                                        <th className="text-center" style={{ width: 30 }}>
                                                            ID
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {categories &&
                                                        categories.map((category, index) => {
                                                            return (
                                                                <tr className="datarow" key={index}>
                                                                    <td className="text-center">
                                                                        <input type="checkbox" id="checkId" />
                                                                    </td>
                                                                    <td>
                                                                        <img
                                                                            className="img-fluid"
                                                                            src={
                                                                                urlImage +
                                                                                "category/" +
                                                                                category.image
                                                                            }
                                                                            alt={category.image}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <div className="name">
                                                                            <a href="category_index.html">
                                                                                {category.name}
                                                                            </a>
                                                                        </div>
                                                                        <div className="function_style">
                                                                            <button
                                                                                onClick={() =>
                                                                                    handleStatus(category.id)
                                                                                }
                                                                                className={
                                                                                    category.status === 1
                                                                                        ? "border-0 px-1 text-success"
                                                                                        : "border-0 px-1 text-danger"
                                                                                }
                                                                            >
                                                                                {category.status === 1 ? (
                                                                                    <FaToggleOn />
                                                                                ) : (
                                                                                    <FaToggleOn />
                                                                                )}
                                                                            </button>
                                                                            <Link
                                                                                to={
                                                                                    "/admin/category/edit/" +
                                                                                    category.id
                                                                                }
                                                                                className="px-1 text-primary"
                                                                            >
                                                                                <FaEdit />
                                                                            </Link>
                                                                            <Link
                                                                                to={
                                                                                    "/admin/category/show/" +
                                                                                    category.id
                                                                                }
                                                                                className="px-1 text-info"
                                                                            >
                                                                                <FaEye />
                                                                            </Link>
                                                                            <button
                                                                                onClick={() =>
                                                                                    handleDelete(category.id)
                                                                                }
                                                                                className="px-1 text-danger"
                                                                            >
                                                                                <FaTrash />
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                    <td>{category.slug}</td>
                                                                    <td>{category.description}</td>
                                                                    <td className="text-center">
                                                                        {category.id}
                                                                    </td>
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
