import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ContactService from "../../../services/ContactService";

import { Link } from "react-router-dom";
import {
    RiArrowGoBackFill,
    RiDeleteBin5Fill,
} from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Loading from "../../../components/Loading";
import { urlImage } from "../../../Api/config";

export default function ContactTrash() {
    const [Contacts, setcontacts] = useState([]);
    const [load, setLoad] = useState(true);
    const [reload, setReLoad] = useState(0);


    const [status1, setStatus1] = useState(2);
    useEffect(() => {
        (async () => {
            setLoad(false);
            const result = await ContactService.thungrac();
            console.log("🚀 ~ result:", result)
            setcontacts(result.contact);
            setLoad(false);
        })();
    }, [reload]);

    //hàm thêm

    //kp
    const handleKp = async (id) => {
        try {
            const updatedCategory = {
                status: status1
            };
            const result = await ContactService.delete(updatedCategory, id);
            setReLoad(reload + 1); // Reload brands
            toast("Khoi phuc thanh cong");
        } catch (error) {
            console.error("Error deleting brand: ", error);
        }
    };
    //
    const handleDelete = async (id) => {
        try {
            const result = await ContactService.destroy(id);
            setReLoad(reload + 1); // Reload brands
            toast("Xoa thanh cong");
        } catch (error) {
            console.error("Error deleting brand: ", error);
        }
    };
    return (
        <div>
            <section className="hdl-content">
                <div className="container-fluid">
                    <div className="row">
                        <ToastContainer />
                        <div className="col-md-8">
                            {/*CONTENT  */}
                            <div className="content">
                                <section className="content-header my-2">
                                    <h1 className="d-inline">Liên hệ</h1>
                                    <hr style={{ border: "none" }} />
                                </section>
                                <section className="content-body my-5">
                                    <div className="row">

                                        <div className="col-md-12">
                                            <div className="row mt-3 align-items-center">
                                                <div className="col-12">
                                                    <ul className="manager">
                                                        <li>
                                                            <a href="brand_index.html">Tất cả (123)</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Xuất bản (12)</a>
                                                        </li>
                                                        <li>
                                                            <a href="brand_trash.html">Rác (12)</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="row my-2 align-items-center">
                                                <div className="col-md-6">
                                                    <select name className="d-inline me-1">
                                                        <option value>Hành động</option>
                                                        <option value>Bỏ vào thùng rác</option>
                                                    </select>
                                                    <button className="btnapply">Áp dụng</button>
                                                </div>
                                                <div className="col-md-6 text-end">
                                                    <input type="text" className="search d-inline" />
                                                    <button className="btnsearch d-inline">
                                                        Tìm kiếm
                                                    </button>
                                                </div>
                                            </div>
                                            {load ? <Loading /> : ""}
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center" style={{ width: 30 }}>
                                                            <input type="checkbox" id="checkboxAll" />
                                                        </th>
                                                        <th>email</th>
                                                        <th>Họ Tên</th>
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
                                                                        <input type="checkbox" />
                                                                    </td>
                                                                    <td>
                                                                        {contact.email}
                                                                    </td>
                                                                    <td>
                                                                        <div className="name">
                                                                            <a href="brand_index.html">
                                                                                {contact.name}
                                                                            </a>
                                                                        </div>
                                                                        <div className="function_style">
                                                                            <Link href="#"
                                                                                onClick={() => handleKp(contact.id)}
                                                                                className="px-1 text-success">
                                                                                <RiArrowGoBackFill />
                                                                            </Link>
                                                                            <Link
                                                                                to={``}
                                                                                onClick={() => handleDelete(contact.id)}
                                                                                className="px-1 text-danger">
                                                                                <RiDeleteBin5Fill />
                                                                            </Link>
                                                                        </div>
                                                                    </td>                                                                    <td className="text-center">{contact.id}</td>
                                                                </tr>
                                                            );
                                                        })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
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
