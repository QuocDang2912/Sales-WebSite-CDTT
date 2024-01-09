import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import PostServie from '../../../services/PostService';
export default function PostEdit() {

    const { id } = useParams()
    const navigate = useNavigate();


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [detail, setDetail] = useState("");
    const [slug, setSlug] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState(1);
    const [topic_id, setTopic_id] = useState(1);
    console.log("🚀 ~ file: BrandEdit.jsx:7 ~ BrandEdit ~ id:", id)

    useEffect(() => {

        const fetch = async () => {
            const response = await PostServie.show(id)
            console.log("🚀 ~ file: BrandEdit.jsx:16 ~ fetch ~ response:", response)
            const post = response.post;
            setTopic_id(post.topic_id)
            setTitle(post.title);
            setSlug(post.slug);
            setDetail(post.detail);
            setDescription(post.description);
            setType(post.type);
            setStatus(post.status);
        }
        fetch()

    }, [id])


    const handleSubmitEdit = (e) => {
        e.preventDefault();
        const image = document.getElementById("image");
        const brand = new FormData();
        brand.append("title", title);
        brand.append("slug", slug);
        brand.append("description", description);
        brand.append("detail", detail);
        brand.append("type", type);
        brand.append("topic_id", topic_id);
        brand.append("status", status);
        brand.append("image", image.files.length === 0 ? "" : image.files[0]);
        (async () => {
            const result = await PostServie.update(brand, id);
            console.log("🚀 ~ file: BrandEdit.jsx:43 ~ result:", result)
            alert(result.message);
            // toast.success(result.message);
            navigate("/admin/post/index", { replace: true });
        })();
    }



    return (
        <div>
            <div class="content">
                <section class="content-header my-2">
                    <h1 class="d-inline">Cập nhật bài viết</h1>
                    <div class="text-end">
                        <Link className="btn btn-primary btn-sm" to={'/admin/post/index'} style={{ color: "white" }}>về trang chính</Link>

                    </div>
                </section>
                <form onSubmit={handleSubmitEdit}>
                    <section class="content-body my-2">

                        <div class="row">
                            <div class="col-md-9">
                                <div class="mb-3">
                                    <label><strong>Tiêu đề bài viết (*)</strong></label>
                                    <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" name="title" class="form-control" placeholder="Nhập tiêu đề" />
                                </div>
                                <div class="mb-3">
                                    <label><strong>Slug (*)</strong></label>
                                    <input onChange={(e) => setSlug(e.target.value)} value={slug} type="text" name="slug" class="form-control" placeholder="Slug" />
                                </div>
                                <div class="mb-3">
                                    <label><strong>type (*)</strong></label>
                                    <input onChange={(e) => setType(e.target.value)} value={type} type="text" name="type" class="form-control" placeholder="Slug" />
                                </div>
                                <div class="mb-3">
                                    <label><strong>Chi tiết (*)</strong></label>
                                    <textarea onChange={(e) => setDetail(e.target.value)} value={detail} name="detail" rows="7" class="form-control"
                                        placeholder="Nhập chi tiết"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label><strong>Mô tả (*)</strong></label>
                                    <textarea onChange={(e) => setDescription(e.target.value)} value={description} name="description" rows="4" class="form-control" placeholder="Mô tả"></textarea>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="box-container mt-4 bg-white">
                                    <div class="box-header py-1 px-2 border-bottom">
                                        <strong>Đăng</strong>
                                    </div>
                                    <div class="box-body p-2 border-bottom">
                                        <p>Chọn trạng thái đăng</p>
                                        <select onChange={(e) => setStatus(e.target.value)} value={status} name="status" class="form-select">
                                            <option value="1">Xuất bản</option>
                                            <option value="2">Chưa xuất bản</option>
                                        </select>
                                    </div>

                                </div>
                                <div class="box-container mt-2 bg-white">
                                    <div class="box-header py-1 px-2 border-bottom">
                                        <strong>Chủ đề (*)</strong>
                                    </div>
                                    <div class="box-body p-2 border-bottom">
                                        <select onChange={(e) => setTopic_id(e.target.value)} value={topic_id} name="topic_id" class="form-select">
                                            <option value="">None</option>
                                            <option value="1">Tên chủ đề</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="box-container mt-2 bg-white">
                                    <div class="box-header py-1 px-2 border-bottom">
                                        <strong>Hình đại diện</strong>
                                    </div>
                                    <div class="box-body p-2 border-bottom">
                                        <input type="file" id="image" class="form-control" />
                                    </div>
                                </div>
                                <div class="box-header py-1 px-2 border-bottom">
                                    <strong>Đăng</strong>
                                </div>
                                <div class="box-footer text-end px-2 py-3">
                                    <button type="submit" class="btn btn-success btn-sm text-end">
                                        <i class="fa fa-save" aria-hidden="true"></i> Đăng
                                    </button>
                                </div>
                            </div>
                        </div>

                    </section>
                </form>

            </div>
        </div>
    )
}
