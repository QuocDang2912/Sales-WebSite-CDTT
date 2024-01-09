import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import CategoryServie from '../../../services/CategoryService'


export default function CategoryEdit() {


    const { id } = useParams()
    const navigate = useNavigate();


    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [sort_order, setSortOrder] = useState(1);
    const [parent_id, setParent_id] = useState(1);
    const [slug, setSlug] = useState("");
    const [status, setStatus] = useState(1);
    console.log("🚀 ~ file: CategoryEdit.jsx:7 ~ CategoryEdit ~ id:", id)

    useEffect(() => {

        const fetch = async () => {
            const response = await CategoryServie.show(id)
            console.log("🚀 ~ file: CategoryEdit.jsx:16 ~ fetch ~ response:", response)
            const category = response.category;
            setName(category.name);
            setDescription(category.description);
            setSortOrder(category.sort_order);
            setParent_id(category.parent_id);
            setStatus(category.status);
            setSlug(category.slug);
        }
        fetch()

    }, [id])


    const handleSubmitEdit = (e) => {
        e.preventDefault();
        const image = document.getElementById("image");
        const category = new FormData();
        category.append("name", name);
        category.append("slug", slug);
        category.append("description", description);
        category.append("parent_id", parent_id);
        category.append("sort_order", sort_order);
        category.append("status", status);
        category.append("image", image.files.length === 0 ? "" : image.files[0]);
        (async () => {
            const result = await CategoryServie.update(id, category);
            console.log("🚀 ~ file: CategoryEdit.jsx:43 ~ result:", result)
            alert(result.message);
            // toast.success(result.message);
            navigate("/admin/category/index", { replace: true });
        })();
    }



    return (
        <div>
            <form onSubmit={handleSubmitEdit}>

                <section className="hdl-content">
                    <div className="container-fluid">
                        <div className="row">

                            <div className="col-md-10">
                                {/*CONTENT  */}
                                <div className="content">
                                    <section className="content-header my-2">
                                        <h1 className="d-inline">Cập nhật danh mục</h1>
                                        <div className="text-end">
                                            <Link className="btn btn-primary btn-sm" to={'/admin/category/index'} style={{ color: "white" }}>về trang chính</Link>
                                        </div>
                                    </section>
                                    <section className="content-body my-2">
                                        <div className="row">
                                            <div className="col-md-9">
                                                <div className="mb-3">
                                                    <label><strong>Tên danh mục (*)</strong></label>
                                                    <input onChange={(e) => setName(e.target.value)} value={name} type="text" name="name" id="name" placeholder="Nhập tên danh mục" className="form-control" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label><strong>Slug</strong></label>
                                                    <input onChange={(e) => setSlug(e.target.value)} value={slug} type="text" name="slug" id="slug" placeholder="Nhập slug" className="form-control" />
                                                </div>
                                                <div className="mb-3">
                                                    <label><strong>Mô tả</strong></label>
                                                    <textarea onChange={(e) => setDescription(e.target.value)} value={description} name="description" rows={7} className="form-control" placeholder="Nhập mô tả" defaultValue={""} />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="box-container mt-4 bg-white">
                                                    <div className="box-header py-1 px-2 border-bottom">
                                                        <strong>Đăng</strong>
                                                    </div>
                                                    <div className="box-body p-2 border-bottom">
                                                        <p>Chọn trạng thái đăng</p>
                                                        <select onChange={(e) => setStatus(e.target.value)} value={status} name="status" className="form-control">
                                                            <option value={1}>Xuất bản</option>
                                                            <option value={2}>Chưa xuất bản</option>
                                                        </select>
                                                    </div>

                                                </div>
                                                <div className="box-container mt-4 bg-white">
                                                    <div className="box-header py-1 px-2 border-bottom">
                                                        <strong>Danh mục cha (*)</strong>
                                                    </div>
                                                    <div className="box-body p-2">
                                                        <select onChange={(e) => setParent_id(e.target.value)} value={parent_id} name="parent_id" className="form-control">
                                                            <option value={0}>None</option>
                                                            <option value={1}>Tên danh mục</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="box-container mt-4 bg-white">
                                                    <div className="box-header py-1 px-2 border-bottom">
                                                        <strong>Thứ tự</strong>
                                                    </div>
                                                    <div className="box-body p-2">
                                                        <select onChange={(e) => setSortOrder(e.target.value)} value={sort_order} name="sort_order" className="form-control">
                                                            <option value={1}>1</option>
                                                            <option value={2}>2</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="box-container mt-4 bg-white">
                                                    <div className="box-header py-1 px-2 border-bottom">
                                                        <strong>Hình (*)</strong>
                                                    </div>
                                                    <div className="box-body p-2 border-bottom">
                                                        <input type="file" id="image" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="box-footer text-end px-2 py-3">
                                                    <button type="submit" className="btn btn-success btn-sm text-end">
                                                        <i className="fa fa-save" aria-hidden="true" /> Câp nhật
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                {/*END CONTENT*/}
                            </div>
                        </div>
                    </div>
                </section>
            </form>
        </div>

    )
}
