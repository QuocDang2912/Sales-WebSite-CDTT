import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import ProductServie from '../../../services/ProductService';
export default function ProductEdit() {

    const { id } = useParams()
    const navigate = useNavigate();


    const [description, setDescription] = useState("");
    const [detail, setDetail] = useState("");
    const [name, setname] = useState("");
    const [category_id, setcategory_id] = useState(1);
    const [price, setprice] = useState(10);
    const [brand_id, setbrand_id] = useState(1);
    const [status, setStatus] = useState(1);

    useEffect(() => {

        const fetch = async () => {
            const response = await ProductServie.show(id)
            console.log("🚀 ~ file: BrandEdit.jsx:16 ~ fetch ~ response:", response)
            const product = response.product;
            setprice(product.price)
            setbrand_id(product.brand_id);
            setname(product.name);
            setDetail(product.detail);
            setDescription(product.description);
            setcategory_id(product.category_id);
            setStatus(product.status);
        }
        fetch()

    }, [id])


    const handleSubmitEdit = (e) => {
        e.preventDefault();
        const image = document.getElementById("image");
        const product = new FormData();
        product.append("price", price);
        product.append("brand_id", brand_id);
        product.append("description", description);
        product.append("detail", detail);
        product.append("name", name);
        product.append("category_id", category_id);
        product.append("status", status);
        product.append("image", image.files.length === 0 ? "" : image.files[0]);
        (async () => {
            const result = await ProductServie.update(product, id);
            console.log("🚀 ~ file: BrandEdit.jsx:43 ~ result:", result)
            alert(result.message);
            // toast.success(result.message);
            navigate("/admin/product/index", { replace: true });
        })();
    }




    return (
        <div>
            <div class="content">
                <section class="content-header my-2">
                    <h1 class="d-inline">Cập nhập sản phẩm</h1>
                    <div class="mt-1 text-end">
                        <Link className="btn btn-sm btn-primary" style={{ color: "white" }} to='/admin/product/index'>quay về</Link>

                    </div>
                </section>
                <form onSubmit={handleSubmitEdit}>
                    <section class="content-body my-2">

                        <div class="row">
                            <div class="col-md-9">
                                <div class="mb-3">
                                    <label><strong>Tên sản phẩm (*)</strong></label>
                                    <input onChange={(e) => setname(e.target.value)} value={name} type="text" placeholder="Nhập tên sản phẩm" name="name" class="form-control" />
                                </div>
                                {/* <div class="mb-3">
            <label><strong>Slug (*)</strong></label>
            <input type="text" placeholder="Slug" name="slug" class="form-control" />
        </div> */}
                                <div class="mb-3">
                                    <label><strong>Chi tiết (*)</strong></label>
                                    <textarea onChange={(e) => setDetail(e.target.value)} value={detail} name="detail" placeholder="Nhập chi tiết sản phẩm" rows={7} className="form-control" defaultValue={""} />

                                </div>
                                <div class="mb-3">
                                    <label><strong>Mô tả (*)</strong></label>
                                    <textarea onChange={(e) => setDescription(e.target.value)} value={description} name="description" rows={3} className="form-control" placeholder="Nhập mô tả" defaultValue={""} />
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="box-container mt-4 bg-white">
                                    <div class="box-header py-1 px-2 border-bottom">
                                        <strong>Đăng</strong>
                                    </div>
                                    <div class="box-body p-2 border-bottom">
                                        <select name="status" className="form-select" onChange={(e) => setStatus(e.target.value)}>
                                            <option value="1">Xuất bản</option>
                                            <option value="2">Chưa xuất bản</option>
                                        </select>
                                    </div>
                                    <div class="box-footer text-end px-2 py-2">
                                        <button type="submit" class="btn btn-success btn-sm text-end">
                                            <i class="fa fa-save" aria-hidden="true"></i> Cập nhật
                                        </button>
                                    </div>
                                </div>
                                <div class="box-container mt-2 bg-white">
                                    <div class="box-header py-1 px-2 border-bottom">
                                        <strong>Danh mục(*)</strong>
                                    </div>
                                    <div class="box-body p-2 border-bottom">
                                        <select name="category_id" className="form-select" onChange={(e) => setcategory_id(e.target.value)}>
                                            <option value="">Chọn danh mục</option>
                                            <option value="1">Tên danh mục</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="box-container mt-2 bg-white">
                                    <div class="box-header py-1 px-2 border-bottom">
                                        <strong>Thương hiệu(*)</strong>
                                    </div>
                                    <div class="box-body p-2 border-bottom">
                                        <select name="brand_id" className="form-select" onChange={(e) => setbrand_id(e.target.value)}>
                                            <option value="">Chọn thương hiêu</option>
                                            <option value="1">Tên danh mục</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="box-container mt-2 bg-white">
                                    <div class="box-header py-1 px-2 border-bottom">
                                        <strong>Giá và số lượng</strong>
                                    </div>
                                    <div class="box-body p-2 border-bottom">
                                        <div class="mb-3">
                                            <label><strong>Giá bán (*)</strong></label>
                                            <input onChange={(e) => setprice(e.target.value)} type="number" value={price} name="price" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div class="box-container mt-2 bg-white">
                                    <div class="box-header py-1 px-2 border-bottom">
                                        <strong>Hình đại diện(*)</strong>
                                    </div>
                                    <div class="box-body p-2 border-bottom">
                                        <input type="file" id="image" class="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                </form>

            </div>
        </div>
    )
}
