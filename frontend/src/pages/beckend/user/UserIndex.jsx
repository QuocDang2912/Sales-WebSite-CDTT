import React, { useEffect, useState } from 'react'
import UserServie from '../../../services/UserService';
import { ToastContainer, toast } from 'react-toastify'
import { MdDeleteForever } from "react-icons/md";
import { FaEdit, FaEye, FaToggleOff, FaToggleOn } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading';
export default function UserIndex() {
    const [users, setusers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reload, setReLoad] = useState(0);
    useEffect(() => {
        (async () => {

            const result = await UserServie.index();
            console.log("🚀 ~ file: BrandIndex.jsx:26 ~ result:", result)
            setusers(result.user);
            setLoading(false);
        })();
    }, [reload]);
    const handleDelete = (id) => {
        console.log("🚀 ~ file: BrandIndex.jsx:52 ~ handleDelete ~ id:", id);

        const deleteBrand = async () => {
            try {
                const deleteB = await UserServie.destroy(id);
                console.log("🚀 ~ file: BrandIndex.jsx:56 ~ deleteBrand ~ deleteB:", deleteB);
                toast.success(deleteB.message);
                setReLoad(deleteB.user.id);
            } catch (error) {
                alert('Không thể xóa');
            }
        };

        deleteBrand();
    }

    const handleStatus = (id) => {
        (async () => {
            const result = await UserServie.status(id);
            setReLoad(Date.now);
        })();
    };

    return (
        <div>
            <div className="content">
                <section className="content-header my-2">
                    <h1 className="d-inline">Thành viên</h1>
                    <Link className='btn btn-success' to='/admin/user/create'>thêm mới </Link>
                    <div className="row mt-3 align-items-center">
                        <div className="col-6">
                            <ul className="manager">
                                <li><a href="user_index.html">Tất cả (123)</a></li>
                                <li><a href="#">Xuất bản (12)</a></li>
                                <li><a href="user_trash.html">Rác (12)</a></li>
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
                                    <input type="checkbox" id="checkAll" />
                                </th>
                                <th>Họ tên</th>
                                <th>Điện thoại</th>
                                <th>Email</th>
                                <th className="text-center" style={{ width: 30 }}>ID</th>
                                <th className="text-center" style={{ width: 30 }}>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users &&
                                users.map((user, index) => {
                                    return (
                                        <tr className="datarow" key={index}>
                                            <td className="text-center">
                                                <input type="checkbox" id="checkId" />
                                            </td>
                                            <td>
                                                <div className="name">
                                                    <a href="menu_index.html">
                                                        {user.name}
                                                    </a>
                                                </div>
                                                <div className="function_style">
                                                    <a href="#" className="text-success mx-1">
                                                        <i className="fa fa-toggle-on" />
                                                    </a>
                                                    <a href="user_edit.html" className="text-primary mx-1">
                                                        <i className="fa fa-edit" />
                                                    </a>
                                                    <a href="user_show.html" className="text-info mx-1">
                                                        <i className="fa fa-eye" />
                                                    </a>
                                                    <a href="#" className="text-danger mx-1">
                                                        <i className="fa fa-trash" />
                                                    </a>
                                                </div>
                                            </td>
                                            <td>{user.phone}</td>
                                            <td>{user.email}</td>
                                            <td className="text-center">{user.id}</td>
                                            <td className="text-center">
                                                <MdDeleteForever onClick={() => handleDelete(user.id)} style={{ color: 'red', fontSize: '20' }} />

                                                <Link to={`/admin/user/edit/${user.id}`}>
                                                    <FaEdit style={{ color: 'blue', fontSize: '20' }} />
                                                </Link>
                                                <Link to={`/admin/user/show/${user.id}`} className="px-1 text-info">
                                                    <FaEye />
                                                </Link>
                                                <button onClick={() => handleStatus(user.id)}
                                                    className={
                                                        user.status === 1
                                                            ? "border-0 px-1 text-success"
                                                            : "border-0 px-1 text-danger"
                                                    }
                                                >
                                                    {user.status === 1 ? <FaToggleOn /> : <FaToggleOn />}
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
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
            <ToastContainer />

        </div>
    )
}
