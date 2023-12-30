import React from 'react'

export default function MenuEdit() {
    return (
        <div>
            <div className="content">
                <section className="content-header my-2">
                    <h1 className="d-inline">Cập nhật menu</h1>
                    <div className="text-end">
                        <a href="menu_index.html" className="btn btn-sm btn-success">
                            <i className="fa fa-arrow-left" /> Về danh sách
                        </a>
                    </div>
                </section>
                <section className="content-body my-2">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="mb-3">
                                <label htmlFor="name"><strong>Tên menu</strong></label>
                                <input defaultValue type="text" name="name" id="name" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="link"><strong>Liên kết</strong></label>
                                <input defaultValue type="text" name="link" id="link" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="position"><strong>Vị trí</strong></label>
                                <select name="position" id="position" className="form-control">
                                    <option value="mainmenu">Main
                                        Menu</option>
                                    <option value="footermenu">Footer Menu</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="box-container mt-4 bg-white">
                                <div className="box-header py-1 px-2 border-bottom">
                                    <strong>Đăng</strong>
                                </div>
                                <div className="box-body p-2 border-bottom">
                                    <p>Chọn trạng thái đăng</p>
                                    <select name="status" className="form-control">
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
                            <div className="box-container mt-2 bg-white">
                                <div className="box-header py-1 px-2 border-bottom">
                                    <strong>Cấp cha</strong>
                                </div>
                                <select name="parent_id" id="parent_id" className="form-control">
                                    <option value={0}>None</option>
                                </select>
                            </div>
                            <div className="box-container mt-2 bg-white">
                                <div className="box-header py-1 px-2 border-bottom">
                                    <strong>Thứ tự</strong>
                                </div>
                                <div className="box-body p-2 border-bottom">
                                    <select name="sort_order" className="form-control">
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
