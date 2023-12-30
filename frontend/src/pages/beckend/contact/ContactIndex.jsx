import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import ContactServie from '../../../services/ContactService';
import Loading from '../../../components/Loading';
export default function ContactIndex() {
    const [contacts, setcontacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {

            const result = await ContactServie.index();
            console.log("🚀 ~ file: BrandIndex.jsx:26 ~ result:", result)
            setcontacts(result.contact);
            setLoading(false);
        })();
    }, []);


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
                                                <a href="#" className="text-success mx-1">
                                                    <i className="fa fa-toggle-on" />
                                                </a>
                                                <a href="contact_replay.html" className="text-primary mx-1">
                                                    <i className="fa fa-edit" /> Trả lời
                                                </a>
                                                <a href="contact_show.html" className="text-info mx-1">
                                                    <i className="fa fa-eye" />
                                                </a>
                                                <a href="#" className="text-danger mx-1">
                                                    <i className="fa fa-trash" />
                                                </a>
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

        </div>
    )
}
