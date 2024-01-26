import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";


import ContactService from "../../../services/ContactService";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import Loading from "../../../components/Loading";

export default function ContactIndex() {
    const [status1, setStatus1] = useState(0);

    const [Contacts, setcontacts] = useState([]);
    const [load, setLoad] = useState(true);
    const [reload, setReLoad] = useState(0);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [user_id, setUserId] = useState(1);
    const [status, setStatus] = useState(1);

    useEffect(() => {
        (async () => {
            setLoad(false);
            const result = await ContactService.index();
            console.log("🚀 ~ result:", result)
            setcontacts(result.contact);
            setLoad(false);
        })();
    }, [reload]);

    const handleDelete = async (id) => {
        try {
            const updatedContact = {
                status: status1
            };
            const result = await ContactService.delete(updatedContact, id);
            //   toast("Da xoa vao thung rac");
            setReLoad(reload + 1); // Reload brands
        } catch (error) {
            console.error("Error deleting brand: ", error);
        }
    };

    const handleStatus = (id) => {
        (async () => {
            const result = await ContactService.status(id);
            setReLoad(Date.now);
        })();
    };

    return (
        <div>
            <section className="hdl-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-10">
                            {/*CONTENT  */}
                            <div className="content">
                                <section className="content-header my-2">
                                    <h1 className="d-inline">Liên hệ</h1>
                                    <div className="row mt-3 align-items-center">
                                        <div className="col-6">
                                            <ul className="manager">
                                                <li>
                                                    <a href="contact_index.html">Tất cả (123)</a>
                                                </li>
                                                <li>
                                                    <a href="#">Xuất bản (12)</a>
                                                </li>
                                                <li>
                                                    <Link to="/admin/contact/trash">Rác (12)</Link>
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
                                {load ? <Loading /> : ""}
                                <section className="content-body my-2">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th className="text-center" style={{ width: 30 }}>
                                                    <input type="checkbox" id="checkboxAll" />
                                                </th>
                                                <th>Họ tên</th>
                                                <th>Điện thoại</th>
                                                <th>Email</th>
                                                <th>Tiêu đề</th>
                                                <th className="text-center" style={{ width: 30 }}>
                                                    ID
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Contacts &&
                                                Contacts.map((contact, index) => {
                                                    return (
                                                        <tr className="datarow" key={index}>
                                                            <td className="text-center">
                                                                <input type="checkbox" id="checkId" />
                                                            </td>
                                                            <td>
                                                                <div className="name">
                                                                    <a href="contact_reply.html">{contact.name}</a>
                                                                </div>
                                                                <div className="function_style">
                                                                    <button
                                                                        onClick={() => handleStatus(contact.id)}
                                                                        className={
                                                                            contact.status === 1 ? "border-0 px-1 text-success" : "border-0 px-1 text-danger"
                                                                        }
                                                                    >
                                                                        {contact.status === 1 ? <FaToggleOn /> : <FaToggleOn />}
                                                                    </button>
                                                                    <Link to={"/admin/contact/reply/" + contact.id} className="px-1 text-primary">
                                                                        <FaEdit />
                                                                    </Link>
                                                                    <Link to={"/admin/contact/show/" + contact.id} className="px-1 text-info">
                                                                        <FaEye />
                                                                    </Link>
                                                                    <button onClick={() => handleDelete(contact.id)} className="px-1 text-danger">
                                                                        <FaTrash />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                            <td>{contact.phone}</td>
                                                            <td>{contact.email}</td>
                                                            <td>{contact.title}</td>
                                                            <td className="text-center">{contact.id}</td>
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </table>
                                </section>
                            </div>

                            {/*END CONTENT*/}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
