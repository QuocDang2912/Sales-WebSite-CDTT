import React from 'react'

export default function ProductEdit() {
    return (
        <div>
            <div class="content">
                <section class="content-header my-2">
                    <h1 class="d-inline">Cập nhập sản phẩm</h1>
                    <div class="mt-1 text-end">
                        <a class="btn btn-sm btn-primary" href="product_index.html">
                            <i class="fa fa-arrow-left"></i> Về danh sách
                        </a>
                    </div>
                </section>
                <section class="content-body my-2">

                    <div class="row">
                        <div class="col-md-9">
                            <div class="mb-3">
                                <label><strong>Tên sản phẩm (*)</strong></label>
                                <input type="text" placeholder="Nhập tên sản phẩm" name="name" class="form-control" />
                            </div>
                            <div class="mb-3">
                                <label><strong>Slug (*)</strong></label>
                                <input type="text" placeholder="Slug" name="slug" class="form-control" />
                            </div>
                            <div class="mb-3">
                                <label><strong>Chi tiết (*)</strong></label>
                                <textarea name="detail" placeholder="Nhập chi tiết sản phẩm" rows="7"
                                    class="form-control"></textarea>
                            </div>
                            <div class="mb-3">
                                <label><strong>Mô tả (*)</strong></label>
                                <textarea name="description" rows="3" class="form-control"
                                    placeholder="Nhập mô tả"></textarea>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="box-container mt-4 bg-white">
                                <div class="box-header py-1 px-2 border-bottom">
                                    <strong>Đăng</strong>
                                </div>
                                <div class="box-body p-2 border-bottom">
                                    <select name="status" class="form-select">
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
                                    <select name="category_id" class="form-select">
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
                                    <select name="brand_id" class="form-select">
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
                                        <input type="number" value="10000" min="10000" name="price" class="form-control" />
                                    </div>
                                    <div class="mb-3">
                                        <label><strong>Giá khuyến mãi (*)</strong></label>
                                        <input type="number" value="10000" min="10000" name="pricesale"
                                            class="form-control" />
                                    </div>
                                    <div class="mb-3">
                                        <label><strong>Số lượng (*)</strong></label>
                                        <input type="number" value="1" min="1" name="qty" class="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div class="box-container mt-2 bg-white">
                                <div class="box-header py-1 px-2 border-bottom">
                                    <strong>Hình đại diện(*)</strong>
                                </div>
                                <div class="box-body p-2 border-bottom">
                                    <input type="file" name="image" class="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        </div>
    )
}