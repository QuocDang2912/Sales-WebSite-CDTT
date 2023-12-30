import React, { useEffect, useState } from 'react'
import PostServie from '../../../services/PostService';
import { urlImage } from '../../../Api/config';
import Loading from '../../../components/Loading';

export default function PortIndex() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        (async () => {

            const result = await PostServie.index();
            console.log("🚀 ~ file: BrandIndex.jsx:26 ~ result:", result)
            setPosts(result.post);
            setLoading(false);
        })();
    }, []);


    return (
        <div>
            <div className="content">
                <section className="content-header my-2">
                    <h1 className="d-inline">Quản lý bài viết</h1>
                    <a href="post_create.html" className="btn-add">Thêm mới</a>
                    <div className="row mt-3 align-items-center">
                        <div className="col-6">
                            <ul className="manager">
                                <li><a href="post_index.html">Tất cả (123)</a></li>
                                <li><a href="#">Xuất bản (12)</a></li>
                                <li><a href="post_trash.html">Rác (12)</a></li>
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
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">»</a>
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
                                <th className="text-center" style={{ width: 130 }}>Hình ảnh</th>
                                <th>Tiêu đề bài viết</th>
                                <th>topic_id</th>
                                <th className="text-center" style={{ width: 30 }}>ID</th>

                            </tr>
                        </thead>
                        <tbody>
                            {posts &&
                                posts.map((post, index) => {
                                    return (
                                        <tr className="datarow" key={index}>
                                            <td>
                                                <input type="checkbox" id="checkId" />
                                            </td>
                                            <td>
                                                <img className="img-fluid" src={urlImage + "brand/" + post.image} alt={post.image} />
                                            </td>
                                            <td>
                                                <div className="name">
                                                    <a href="post_edit.html">
                                                        {post.title}
                                                    </a>
                                                </div>
                                                <div className="function_style">
                                                    <a href="#" className="text-success mx-1">
                                                        <i className="fa fa-toggle-on" />
                                                    </a>
                                                    <a href="post_edit.html" className="text-primary mx-1">
                                                        <i className="fa fa-edit" />
                                                    </a>
                                                    <a href="post_show.html" className="text-info mx-1">
                                                        <i className="fa fa-eye" />
                                                    </a>
                                                    <a href="#" className="text-danger mx-1">
                                                        <i className="fa fa-trash" />
                                                    </a>
                                                </div>
                                            </td>
                                            <td>{post.topic_id}</td>
                                            <td className="text-center">{post.id}</td>
                                        </tr>
                                    )
                                })
                            }
                            {loading ? <Loading /> : ""}
                        </tbody>
                    </table>
                </section>
            </div>

        </div>
    )
}
