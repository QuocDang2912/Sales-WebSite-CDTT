import React, { useEffect, useState } from 'react'

import { FaEdit, FaEye, FaToggleOff, FaToggleOn, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import PageService from '../../../services/PageService';
import { urlImage } from '../../../Api/config';

export default function PageIndex() {
    const [status1, setStatus1] = useState(0);

    const [page, setPage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reload, setReLoad] = useState(0);

    useEffect(() => {
        (async () => {
            const result = await PageService.index();
            console.log(result)
            setPage(result.pages);
            setLoading(false);
        })();
    }, [reload]);

    const handleDelete = async (id) => {
        try {
            const updatedTopic = {
                status: status1,
            };
            const result = await PageService.delete(updatedTopic, id);
            //   toast("Da xoa vao thung rac");
            setReLoad(reload + 1); // Reload brands
        } catch (error) {
            console.error("Error deleting brand: ", error);
        }
    };

    const handleStatus = (id) => {
        (async () => {
            const result = await PageService.status(id);
            setReLoad(Date.now);
        })();
    };

    return (
        <div class="content">
            <section class="content-header my-2">
                <h1 class="d-inline">Quản lý trang đơn</h1>
                <Link className="btn btn-primary btn-sm ms-4" to={"/admin/page/store"} style={{ color: "white" }}>
                    {" "}
                    Thêm mới
                </Link>
                <div class="row mt-3 align-items-center">
                    <div class="col-6">
                        <ul class="manager">
                            <li>
                                <a href="page_index.html">Tất cả (123)</a>
                            </li>
                            <li>
                                <a href="#">Xuất bản (12)</a>
                            </li>
                            <li>
                                <Link to="/admin/page/trash">
                                    {" "}
                                    Thùng Rác <FaTrash />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div class="col-6 text-end">
                        <input type="text" class="search d-inline" />
                        <button class="d-inline btnsearch">Tìm kiếm</button>
                    </div>
                </div>
                <div class="row mt-1 align-items-center">
                    <div class="col-md-8">
                        <select name="" class="d-inline me-1">
                            <option value="">Hành động</option>
                            <option value="">Bỏ vào thùng rác</option>
                        </select>
                        <button class="btnapply">Áp dụng</button>
                    </div>
                    <div class="col-md-4 text-end">
                        <nav aria-label="Page navigation example">
                            <ul class="pagination pagination-sm justify-content-end">
                                <li class="page-item disabled">
                                    <a class="page-link">&laquo;</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">
                                        1
                                    </a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">
                                        2
                                    </a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">
                                        3
                                    </a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">
                                        &raquo;
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
            <section class="content-body my-2">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th class="text-center" style={{ width: 30 }}>
                                <input type="checkbox" id="checkboxAll" />
                            </th>
                            <th class="text-center" style={{ width: 90 }}>
                                Hình ảnh
                            </th>
                            <th>Tên trang đơn</th>
                            <th>Tên slug</th>
                            <th class="text-center" style={{ width: 30 }}>
                                ID
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {page &&
                            page.map((page, index) => {
                                return (
                                    <tr className="datarow" key={index}>
                                        <td>
                                            <input type="checkbox" id="checkId" />
                                        </td>
                                        <td>
                                            <img className="img-fluid" src={urlImage + "post/" + page.image} alt={page.image} />
                                        </td>
                                        <td>
                                            <div class="name">
                                                <a href="index">{page.title}</a>
                                            </div>
                                            <div className="function_style">
                                                <button
                                                    onClick={() => handleStatus(page.id)}
                                                    className={
                                                        page.status === 1
                                                            ? "border-0 bg-white px-1 text-success"
                                                            : "border-0 bg-white px-1 text-danger"
                                                    }
                                                >
                                                    {page.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                                                </button>
                                                <Link to={"/admin/page/update/" + page.id} className="px-1 text-primary">
                                                    <FaEdit />
                                                </Link>
                                                <Link to={"/admin/page/show/" + page.id} className="px-1 text-info">
                                                    <FaEye />
                                                </Link>
                                                <button onClick={() => handleDelete(page.id)} className="border-0 bg-white px-1 text-danger">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                        <td>{page.slug}</td>
                                        <td class="text-center">{page.id}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </section>
        </div>
    )
}