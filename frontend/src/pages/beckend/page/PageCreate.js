import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import PageService from '../../../services/PageService';

export default function PageCreate() {

    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [type, setType] = useState("");
    const [topic_id, setTopic_id] = useState(1);
    const [status, setStatus] = useState(1);

    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault();

        const page = new FormData();
        page.append("description", description);
        page.append("title", title);
        page.append("detail", detail);
        page.append("type", type || "page");
        page.append("topic_id", topic_id);
        page.append("status", status);

        const image = document.getElementById("image");
        // Check if a file is selected before appending
        if (image.files.length > 0) {
            page.append("image", image.files[0], image.files[0].name);
        }
        (async () => {
            const result = await PageService.store(page);
            console.log(result);
            navigate("/admin/page/index", { replace: true });
        })();
    };
    return (
        <div class="content">
            <form onSubmit={handleSubmit} id='idreset' encType="multipart/form-data">
                <section class="content-header my-2">
                    <h1 class="d-inline">Thêm trang đơn</h1>
                    <div class="text-end">
                        <a href="/admin/page/index" class="btn btn-sm btn-success">
                            <i class="fa fa-arrow-left"></i> Về danh sách
                        </a>
                    </div>
                </section>
                <section class="content-body my-2">
                    <div class="row">
                        <div class="col-md-9">
                            <div class="mb-3">
                                <label><strong>Tiêu đề bài viết (*)</strong></label>
                                <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" name="title" className="form-control" placeholder="Nhập tiêu đề" />
                            </div>
                            <div class="mb-3">
                                <label><strong>Chi tiết (*)</strong></label>
                                <textarea onChange={(e) => setDetail(e.target.value)} value={detail} name="detail" rows={7} className="form-control" placeholder="Nhập chi tiết" defaultValue={""} />
                            </div>
                            <div class="mb-3">
                                <label><strong>Mô tả (*)</strong></label>
                                <textarea onChange={(e) => setDescription(e.target.value)} value={description} name="description" rows={4} className="form-control" placeholder="Mô tả" defaultValue={""} />
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="box-container mt-4 bg-white">
                                <div class="box-header py-1 px-2 border-bottom">
                                    <strong>Đăng</strong>
                                </div>
                                <div class="box-body p-2 border-bottom">
                                    <p>Chọn trạng thái đăng</p>
                                    <select onChange={(e) => setStatus(e.target.value)} value={status} name="status" className="form-select">
                                        <option value="1">Xuất bản</option>
                                        <option value="2">Chưa xuất bản</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label><strong>Type (*)</strong></label>
                                    <select onChange={(e) => setType(e.target.value)} value={type} name="type" className="form-select">
                                        <option value="page">page</option>
                                    </select>
                                </div>

                                <div class="box-footer text-end px-2 py-3">
                                    <button type="submit" class="btn btn-success btn-sm text-end">
                                        <i class="fa fa-save" aria-hidden="true"></i> Đăng
                                    </button>
                                </div>
                            </div>
                            <div className="box-container mt-2 bg-white">
                                <div className="box-header py-1 px-2 border-bottom">
                                    <strong>Chủ đề (*)</strong>
                                </div>
                                <div className="box-body p-2 border-bottom">
                                    <select name="topic_id" className="form-select" onChange={(e) => setTopic_id(e.target.value)} value={topic_id}>
                                        <option value>None</option>
                                        <option value={1}>Tên chủ đề</option>
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
                        </div>
                    </div>

                </section>
            </form>
        </div>
    )
}