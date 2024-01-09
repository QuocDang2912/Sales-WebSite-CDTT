import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import CategoryServie from '../../../services/CategoryService';
import { urlImage } from '../../../Api/config';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit, FaEye, FaToggleOff, FaToggleOn } from 'react-icons/fa';

import { ToastContainer, toast } from 'react-toastify'
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading';
export default function CategoryIndex() {


    const [categories, setCategories] = useState([])

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [sort_order, setSortOrder] = useState(1);
    const [parent_id, setParent_id] = useState(1);
    const [status, setStatus] = useState(1);


    // biến reaload
    const [loading, setLoading] = useState(true)
    const [reload, setReLoad] = useState(0);



    useEffect(() => {

        (async () => {

            const result = await CategoryServie.index();
            console.log("🚀 ~ file: .jsx:26 ~ result:", result)
            setCategories(result.category);
            setLoading(false);
        })();

    }, [reload])


    const handleSubmit = (e) => {
        e.preventDefault();
        const image = document.getElementById('image')
        const category = new FormData();
        category.append("name", name);
        category.append("description", description);
        category.append("sort_order", sort_order);
        category.append("parent_id", parent_id);
        category.append("status", status);
        category.append("image", image);
        category.append("image", image.files.length === 0 ? "" : image.files[0]);

        console.log("🚀 ~ file: CategoryIndex.jsx:41 ~ handleSubmit ~ category:", category);
        (async () => {
            const result = await CategoryServie.store(category);
            alert(result.message);
            setName("");
            setDescription("");
            setSortOrder(1);
            setParent_id(1);
            setStatus(1);
            image.value = ""
            document.getElementById('idreset').reset();
            setReLoad(result.category.id);
        })();

    }

    const handleDelete = (id) => {
        console.log("🚀 ~ file: BrandIndex.jsx:52 ~ handleDelete ~ id:", id);

        const deleteBrand = async () => {
            try {
                const deleteB = await CategoryServie.destroy(id);
                console.log("🚀 ~ file: BrandIndex.jsx:56 ~ deleteBrand ~ deleteB:", deleteB);
                toast.success(deleteB.message);
                setReLoad(deleteB.category.id);
            } catch (error) {
                alert('Không thể xóa');
            }
        };

        deleteBrand();
    }
    const handleStatus = (id) => {
        (async () => {
            const result = await CategoryServie.status(id);
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
                                    <h1 className="d-inline">category</h1>
                                    <hr style={{ border: 'none' }} />
                                </section>
                                <section className="content-body my-2">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <form onSubmit={handleSubmit} id='idreset'>
                                                <div className="mb-3">
                                                    <label>
                                                        <strong>Tên category (*)</strong>
                                                    </label>
                                                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} name="name" id="name" placeholder="Nhập tên thương hiệu" className="form-control" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label><strong>Mô tả</strong></label>
                                                    <textarea onChange={(e) => setDescription(e.target.value)} value={description} name="description" placeholder="Mô tả" rows={4} className="form-control" defaultValue={""} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label><strong>sort_order</strong></label>
                                                    <select onChange={(e) => setSortOrder(e.target.value)} value={status} className="form-select">
                                                        <option value={1}>1</option>
                                                        <option value={2}>2</option>
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label><strong>Hình đại diện</strong></label>
                                                    <input type="file" id="image" className="form-control" />
                                                </div>

                                                <div className='mb-3'>
                                                    <label>
                                                        <strong> parent_id :</strong>
                                                    </label>
                                                    <input onChange={(e) => setParent_id(e.target.value)} value={parent_id} type="number" id="quantity" name="quantity" min="1" max="1000" />
                                                </div>
                                                <div className="mb-3">
                                                    <label><strong>Trạng thái</strong></label>
                                                    <select onChange={(e) => setStatus(e.target.value)} value={status} className="form-control">
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
                                                        <li><a href="category_index.html">Tất cả (123)</a></li>
                                                        <li><a href="#">Xuất bản (12)</a></li>
                                                        <li><a href="category_trash.html">Rác (12)</a></li>
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
                                                    <button className="d-inline btnsearch">Tìm kiếm</button>
                                                </div>
                                            </div>
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center" style={{ width: 30 }}>
                                                            <input type="checkbox" id="checkboxAll" />
                                                        </th>
                                                        <th className="text-center" style={{ width: 90 }}>Hình ảnh</th>
                                                        <th>Tên danh mục</th>
                                                        <th>Tên slug</th>
                                                        <th>parent_id</th>
                                                        <th>sort_order</th>
                                                        <th className="text-center" style={{ width: 30 }}>ID</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        categories && categories.length > 0 &&
                                                        categories.map((category, index) => {
                                                            return (
                                                                <tr className="datarow" key={index}>
                                                                    <td className="text-center" >
                                                                        <input type="checkbox" id="checkId" />
                                                                    </td>
                                                                    <td>
                                                                        <img className="img-fluid" src={urlImage + 'category/' + category.image} alt="category.jpg" />
                                                                    </td>
                                                                    <td>
                                                                        <div className="name">
                                                                            <a href="category_index.html">
                                                                                {category.name}
                                                                            </a>
                                                                        </div>
                                                                        <div className="function_style">
                                                                            <a href="#" className="px-1 text-success">
                                                                                <i className="fa fa-toggle-on" />
                                                                            </a>
                                                                            <a href="category_edit.html" className="px-1 text-primary">
                                                                                <i className="fa fa-edit" />
                                                                            </a>
                                                                            <a href="category_show.html" className="px-1 text-info">
                                                                                <i className="fa fa-eye" />
                                                                            </a>
                                                                            <a href="#" className="px-1 text-danger">
                                                                                <i className="fa fa-trash" />
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                    <td>{category.slug}</td>
                                                                    <td>{category.parent_id}</td>
                                                                    <td>{category.sort_order}</td>
                                                                    <td className="text-center">{category.id}</td>
                                                                    <td className="text-center">
                                                                        <MdDeleteForever onClick={() => handleDelete(category.id)} style={{ color: 'red', fontSize: '20' }} />

                                                                        <Link to={`/admin/category/edit/${category.id}`}>
                                                                            <FaEdit style={{ color: 'blue', fontSize: '20' }} />
                                                                        </Link>
                                                                        <Link to={`/admin/category/show/${category.id}`} className="px-1 text-info">
                                                                            <FaEye />
                                                                        </Link>
                                                                        <button onClick={() => handleStatus(category.id)}
                                                                            className={
                                                                                category.status === 1
                                                                                    ? "border-0 px-1 text-success"
                                                                                    : "border-0 px-1 text-danger"
                                                                            }
                                                                        >
                                                                            {category.status === 1 ? <FaToggleOn /> : <FaToggleOn />}

                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                                {loading ? <Loading /> : ""}
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
            {/* Same as */}
            <ToastContainer />
        </div>

    )
}
