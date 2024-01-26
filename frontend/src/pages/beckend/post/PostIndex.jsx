import React, { useEffect, useState } from "react";


import { FaEdit, FaEye, FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import PostServie from "../../../services/PostService";
import { urlImage } from "../../../Api/config";
import Loading from "../../../components/Loading";

export default function PortIndex() {
    const [status1, setStatus1] = useState(0);

    const [post, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reload, setReLoad] = useState(0);

    useEffect(() => {
        (async () => {
            const result = await PostServie.index();
            console.log("🚀 ~ file: BrandIndex.jsx:26 ~ result:", result);
            setPosts(result.posts);
            setLoading(false);
        })();
    }, [reload]);
    const handleDelete = async (id) => {
        try {
            const updatedTopic = {
                status: status1,
            };
            const result = await PostServie.delete(updatedTopic, id);
            //   toast("Da xoa vao thung rac");
            setReLoad(reload + 1); // Reload brands
        } catch (error) {
            console.error("Error deleting brand: ", error);
        }
    };

    const handleStatus = (id) => {
        (async () => {
            const result = await PostServie.status(id);
            setReLoad(Date.now);
        })();
    };

    return (
        <div>
            <div className="content">
                <section className="content-header my-2">
                    <h1 className="d-inline">Quản lý bài viết</h1>
                    <Link className="btn btn-primary btn-sm" to={"/admin/post/create"} style={{ color: "white" }}>
                        {" "}
                        them moi
                    </Link>
                    <div className="row mt-3 align-items-center">
                        <div className="col-6">
                            <ul className="manager">
                                <li>
                                    <a href="post_index.html">Tất cả (123)</a>
                                </li>
                                <li>
                                    <a href="#">Xuất bản (12)</a>
                                </li>
                                <li>
                                    <Link to="/admin/post/trash">
                                        {" "}
                                        Thùng Rác <FaTrash />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-6 text-end">
                            <input type="text" className="search d-inline" />
                            <button className="d-inline btnsearch">Tìm kiếm</button>
                        </div>
                    </div>
                    <div className="row mt-1 align-items-center">
                        <div className="col-md-8">
                            <select name className="d-inline me-1">
                                <option value>Hành động</option>
                                <option value>Bỏ vào thùng rác</option>
                            </select>
                            <button className="btnapply">Áp dụng</button>
                            <select name className="d-inline me-1">
                                <option value>Chủ đề</option>
                            </select>
                            <button className="btnfilter">Lọc</button>
                        </div>
                        <div className="col-md-4 text-end">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination pagination-sm justify-content-end">
                                    <li className="page-item disabled">
                                        <a className="page-link">«</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">
                                            1
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">
                                            2
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">
                                            3
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">
                                            »
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </section>
                <section className="content-body my-2">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="text-center" style={{ width: 30 }}>
                                    <input type="checkbox" id="checkboxAll" />
                                </th>
                                <th className="text-center" style={{ width: 130 }}>
                                    Hình ảnh
                                </th>
                                <th>Tiêu đề bài viết</th>
                                <th>detail</th>
                                <th className="text-center" style={{ width: 30 }}>
                                    ID
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {post &&
                                post.map((post, index) => {
                                    return (
                                        <tr className="datarow" key={index}>
                                            <td>
                                                <input type="checkbox" id="checkId" />
                                            </td>
                                            <td>
                                                <img className="img-fluid" src={urlImage + "post/" + post.image} alt={post.image} />
                                            </td>
                                            <td>
                                                <div className="name">
                                                    <a href="post_edit.html">{post.title}</a>
                                                </div>
                                                <div className="function_style">
                                                    <button
                                                        onClick={() => handleStatus(post.id)}
                                                        className={post.status === 1 ? "border-0 px-1 text-success" : "border-0 px-1 text-danger"}
                                                    >
                                                        {post.status === 1 ? <FaToggleOn /> : <FaToggleOn />}
                                                    </button>
                                                    <Link to={"/admin/post/edit/" + post.id} className="px-1 text-primary">
                                                        <FaEdit />
                                                    </Link>
                                                    <Link to={`/admin/post/show/${post.id}`} className="px-1 text-info">
                                                        <FaEye />
                                                    </Link>
                                                    <button onClick={() => handleDelete(post.id)} className="px-1 text-danger">
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                            <td>{post.detail}</td>
                                            <td className="text-center">{post.id}</td>
                                        </tr>
                                    );
                                })}
                            {loading ? <Loading /> : ""}
                        </tbody>
                    </table>
                </section>
            </div>
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
        </div>
    )
}
