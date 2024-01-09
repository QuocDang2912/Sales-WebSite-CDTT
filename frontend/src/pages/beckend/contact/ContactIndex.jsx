import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import ContactServie from '../../../services/ContactService';
import Loading from '../../../components/Loading';
import { FaEdit, FaEye, FaToggleOff, FaToggleOn, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'

export default function ContactIndex() {
    const [contacts, setcontacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reload, setReLoad] = useState(0);

    useEffect(() => {
        (async () => {

            const result = await ContactServie.index();
            console.log("🚀 ~ file: BrandIndex.jsx:26 ~ result:", result)
            setcontacts(result.contact);
            setLoading(false);
        })();
    }, [reload]);


    const handDelete = (id) => {
        (async () => {
            // const data = await BrandService.destroy(id);
            const result = await ContactServie.destroy(id);
            setReLoad(result.contact.id);
            toast.success(result.message);

        })();
    };

    const handleStatus = (id) => {
        (async () => {
            const result = await ContactServie.status(id);
            setReLoad(Date.now);
        })();
    };


    return (
        <div>
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
                            <th className="text-center" style={{ width: 30 }}>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts &&
                            contacts.map((contact, index) => {
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
                                                <button onClick={() => handleStatus(contact.id)}
                                                    className={
                                                        contact.status === 1
                                                            ? "border-0 px-1 text-success"
                                                            : "border-0 px-1 text-danger"
                                                    }
                                                >
                                                    {contact.status === 1 ? <FaToggleOn /> : <FaToggleOn />}

                                                </button>
                                                <Link to={"/admin/contact/reply/" + contact.id} className="px-1 text-primary">
                                                    <FaEdit /> trả lời
                                                </Link>
                                                <Link to={`/admin/contact/show/${contact.id}`} className="px-1 text-info">
                                                    <FaEye />
                                                </Link>
                                                <button onClick={() => handDelete(contact.id)} className="px-1 text-danger"><FaTrash /></button>
                                            </div>
                                        </td>
                                        <td>{contact.phone}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.title}</td>
                                        <td className="text-center">{contact.id}</td>
                                    </tr>
                                )
                            })
                        }
                        {loading ? <Loading /> : ""}
                    </tbody>
                </table>
            </section>
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
