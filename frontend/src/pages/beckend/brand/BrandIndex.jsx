import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import BrandService from '../../../services/BrandService'
import Loading from '../../../components/Loading';
import { urlImage } from '../../../Api/config';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit, FaEye, FaToggleOff, FaToggleOn } from 'react-icons/fa';

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
export default function BrandIndex() {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reload, setReLoad] = useState(0);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [sort_order, setSortOrder] = useState(1);
    const [status, setStatus] = useState(1);



    useEffect(() => {
        (async () => {

            const result = await BrandService.index();
            // console.log("🚀 ~ file: BrandIndex.jsx:26 ~ result:", result)
            setBrands(result.brands);
            setLoading(false);
        })();
    }, [reload]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const image = document.getElementById("image");
        const brand = new FormData();
        brand.append("name", name);
        brand.append("description", description);
        brand.append("sort_order", sort_order);
        brand.append("status", status);

        brand.append("image", image.files.length === 0 ? "" : image.files[0]);

        (async () => {
            const result = await BrandService.store(brand);

            alert(result.message);
            // Reset form fields
            setName("");
            setDescription("");
            setSortOrder(1);
            setStatus(1);
            document.getElementById('idreset').reset();
            setReLoad(result.brand.id);
        })();
    };

    const handleDelete = (id) => {
        console.log("🚀 ~ file: BrandIndex.jsx:52 ~ handleDelete ~ id:", id);

        const deleteBrand = async () => {
            try {
                const deleteB = await BrandService.destroy(id);
                console.log("🚀 ~ file: BrandIndex.jsx:56 ~ deleteBrand ~ deleteB:", deleteB);
                toast.success(deleteB.message);
                setReLoad(deleteB.brand.id);
            } catch (error) {
                alert('Không thể xóa');
            }
        };

        deleteBrand();
    }


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
                                    <hr style={{ border: 'none' }} />
                                </section>
                                <section className="content-body my-5">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <form onSubmit={handleSubmit} id='idreset' >
                                                <div className="mb-3">
                                                    <label>
                                                        <strong>Tên thương hiệu (*)</strong>
                                                    </label>
                                                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Nhập tên danh mục" className="form-control" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label><strong>Mô tả</strong></label>
                                                    <textarea onChange={(e) => setDescription(e.target.value)} value={description} rows="4" placeholder="mô tả" className="form-control" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label><strong>Hình đại diện</strong></label>
                                                    <input type="file" id="image" className="form-control" />
                                                </div>
                                                <div className="mb-3">
                                                    <label><strong>sort_order</strong></label>
                                                    <select onChange={(e) => setSortOrder(e.target.value)} value={sort_order} className="form-select">
                                                        <option value={1}>1</option>
                                                        <option value={2}>2</option>
                                                    </select>
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
                                                        <li><a href="brand_index.html">Tất cả (123)</a></li>
                                                        <li><a href="#">Xuất bản (12)</a></li>
                                                        <li><a href="brand_trash.html">Rác (12)</a></li>
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

                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center" style={{ width: 30 }}>
                                                            <input type="checkbox" id="checkboxAll" />
                                                        </th>
                                                        <th className="text-center" style={{ width: 90 }}>Hình ảnh</th>
                                                        <th>Tên thương hiệu</th>
                                                        <th>Tên slug</th>
                                                        <th className="text-center" style={{ width: 30 }}>ID</th>
                                                        <th className="text-center" style={{ width: 70 }}>action</th>
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
                                                                        <img className="img-fluid" src={urlImage + "brand/" + brand.image} alt={brand.image} />
                                                                    </td>
                                                                    <td>
                                                                        <div className="name">
                                                                            <a href="brand_index.html">
                                                                                {brand.name}
                                                                            </a>
                                                                        </div>

                                                                    </td>
                                                                    <td>{brand.slug}</td>
                                                                    <td className="text-center">{brand.id}</td>
                                                                    <td className="text-center">
                                                                        <MdDeleteForever onClick={() => handleDelete(brand.id)} style={{ color: 'red', fontSize: '20' }} />

                                                                        <Link to={`/admin/brand/edit/${brand.id}`}>
                                                                            <FaEdit style={{ color: 'blue', fontSize: '20' }} />
                                                                        </Link>
                                                                        <Link to={`/admin/brand/show/${brand.id}`} className="px-1 text-info">
                                                                            <FaEye />
                                                                        </Link>
                                                                        <button onClick={() => handleStatus(brand.id)}
                                                                            className={
                                                                                brand.status === 1
                                                                                    ? "border-0 px-1 text-success"
                                                                                    : "border-0 px-1 text-danger"
                                                                            }
                                                                        >
                                                                            {brand.status === 1 ? <FaToggleOn /> : <FaToggleOn />}

                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    {loading ? <Loading /> : ""}
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
