import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import BrandService from '../../../services/BrandService'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function BrandEdit() {
    const { id } = useParams()
    const navigate = useNavigate();


    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [sort_order, setSortOrder] = useState(1);
    const [slug, setSlug] = useState("");
    const [status, setStatus] = useState(1);
    console.log("🚀 ~ file: BrandEdit.jsx:7 ~ BrandEdit ~ id:", id)

    useEffect(() => {

        const fetch = async () => {
            const response = await BrandService.show(id)
            console.log("🚀 ~ file: BrandEdit.jsx:16 ~ fetch ~ response:", response)
            const brand = response.brand;
            setName(brand.name);
            setDescription(brand.description);
            setSortOrder(brand.sort_order);
            setStatus(brand.status);
            setSlug(brand.slug);
        }
        fetch()

    }, [id])


    const handleSubmitEdit = (e) => {
        e.preventDefault();
        const image = document.getElementById("image");
        const brand = new FormData();
        brand.append("name", name);
        brand.append("slug", slug);
        brand.append("description", description);
        brand.append("sort_order", sort_order);
        brand.append("status", status);
        brand.append("image", image.files.length === 0 ? "" : image.files[0]);
        (async () => {
            const result = await BrandService.update(id, brand);
            console.log("🚀 ~ file: BrandEdit.jsx:43 ~ result:", result)
            alert(result.message);
            // toast.success(result.message);
            navigate("/admin/brand/index", { replace: true });
        })();
    }

    return (
        <div>

            <section className="hdl-content">
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-md-10">
                            {/*CONTENT  */}
                            <div className="content">
                                <section className="content-header my-2">
                                    <h1 className="d-inline">edit Banner</h1>
                                    <div className="text-end">
                                        {/* <a href="brand_index.html" className="btn btn-sm btn-success"> */}
                                        <Link className="btn btn-primary btn-sm" to={'/admin/brand/index'} style={{ color: "white" }}>về trang chính</Link>
                                        {/* </a> */}
                                    </div>
                                </section>
                                <section className="content-body my-2">
                                    <div className="row">
                                        <form onSubmit={handleSubmitEdit} id='idreset'>
                                            <div className="col-md-9">
                                                <div className="mb-3">
                                                    <label><strong>Tên thương hiệu (*)</strong></label>
                                                    <input onChange={(e) => setName(e.target.value)} value={name} type="text" name="name" className="form-control" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label><strong>Slug</strong></label>
                                                    <input type="text" onChange={(e) => setSlug(e.target.value)} value={slug} className="form-control" />
                                                </div>
                                                <div className="mb-3">
                                                    <label><strong>Mô tả</strong></label>
                                                    <textarea onChange={(e) => setDescription(e.target.value)} value={description} name="description" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="box-container mt-4 bg-white">

                                                    <div className="box-body p-2 border-bottom">
                                                        <div className="box-header py-1 px-2 border-bottom">
                                                            <strong>chọn trạng thái</strong>
                                                        </div>
                                                        <select onChange={(e) => setStatus(e.target.value)} value={status} name="status" className="form-control" >
                                                            <option value={1}>Xuất bản</option>
                                                            <option value={2}>Chưa xuất bản</option>
                                                        </select>
                                                    </div>

                                                </div>
                                                <div className="box-container mt-2 bg-white">
                                                    <div className="box-header py-1 px-2 border-bottom">
                                                        <strong>Hình đại diện</strong>
                                                    </div>
                                                    <div className="box-body p-2 border-bottom">
                                                        <input type="file" id="image" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="box-container mt-2 bg-white">
                                                    <div className="box-header py-1 px-2 border-bottom">
                                                        <strong>sort_order</strong>
                                                    </div>
                                                    <div className="box-body p-2 border-bottom">
                                                        <select onChange={(e) => setSortOrder(e.target.value)} value={sort_order} name="sort_order" className="form-control">
                                                            <option value={1}>1</option>
                                                            <option value={2}>2</option>
                                                        </select>
                                                    </div>
                                                    <div className="box-footer text-end px-2 py-3">

                                                        <button type="submit" className="btn btn-success btn-sm text-end">
                                                            <i className="fa fa-save" aria-hidden="true" /> Đăng
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
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
