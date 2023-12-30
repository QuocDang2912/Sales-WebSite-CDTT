import React from 'react'

export default function TopicEdit() {
    return (
        <div>
            <div className="content">
                <section className="content-header my-2">
                    <h1 className="d-inline">Cập nhật chủ đề</h1>
                    <div className="text-end">
                        <a className="btn btn-sm btn-primary" href="topic_index.html">Về danh sách</a>
                    </div>
                </section>
                <section className="content-body my-2">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="mb-3">
                                <label><strong>Tên chủ đề (*)</strong></label>
                                <input type="text" name="name" id="name" placeholder="Nhập tên chủ đề" className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label><strong>Slug</strong></label>
                                <input type="text" name="slug" id="slug" placeholder="Nhập slug" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label><strong>Mô tả</strong></label>
                                <textarea name="description" rows={6} className="form-control" placeholder="Nhập mô tả" defaultValue={""} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="box-container mt-4 bg-white">
                                <div className="box-header py-1 px-2 border-bottom">
                                    <strong>Đăng</strong>
                                </div>
                                <div className="box-body p-2 border-bottom">
                                    <p>Chọn trạng thái đăng</p>
                                    <select name="status" className="form-select">
                                        <option value={1}>Xuất bản</option>
                                        <option value={2}>Chưa xuất bản</option>
                                    </select>
                                </div>
                                <div className="box-footer text-end px-2 py-3">
                                    <button type="submit" className="btn btn-success btn-sm text-end">
                                        <i className="fa fa-save" aria-hidden="true" /> Đăng
                                    </button>
                                </div>
                            </div>
                            <div className="box-container mt-4 bg-white">
                                <div className="box-header py-1 px-2 border-bottom">
                                    <strong>Thứ tự</strong>
                                </div>
                                <div className="box-body p-2 border-bottom">
                                    <select name="sort_order" className="form-select">
                                        <option value>Sau</option>
                                        <option value={2}>sau</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    )
}
