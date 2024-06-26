import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import ContactServie from '../../../services/ContactService'
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

export default function ContactReply() {
    const { id } = useParams()

    const [contacts, setcontacts] = useState([])
    const [contentRep, setContentRep] = useState("")

    useEffect(() => {

        const fetch = async () => {
            const response = await ContactServie.show(id)
            console.log("🚀 ~ file: repsss.jsx:16 ~ fetch ~ response:", response)
            setcontacts(response.contact)
        }
        fetch()

    }, [id])
    const handleSubmit = async () => {
        console.log("kịt lõ")
        try {
            const updatedCategory = {
                status: 2
            };
            const result = await ContactServie.delete(updatedCategory, id);
            console.log("🚀 ~ handleSubmit ~ result:", result)
            emailjs
                .send(
                    "service_2r7tmf4",
                    "template_55qz2do",
                    {
                        user_email: contacts.email,
                        user_name: contacts.name,
                        content: contacts.content,
                        rep: contentRep
                    },
                    {
                        publicKey: "iXZfEVDWkI_F9ygEm",
                    }
                )
                .then(
                    () => {
                        console.log("gửi email thành công!");
                    },
                    (error) => {
                        console.log("gửi email...", error.text);
                    }
                );
            toast.success("Đã gửi câu trả lời cho khách hàng")
        } catch (error) {
            console.error("Error deleting brand: ", error);
        }
    }

    return (
        <div>
            <div className="content">
                <section className="content-header my-2">
                    <h1 className="d-inline">Trả lời liên hệ</h1>
                    <div className="text-end">
                        <Link className="btn btn-primary btn-sm" to={'/admin/contact/index'} style={{ color: "white" }}>Quay lại</Link>

                        <button onClick={handleSubmit} className="btn btn-success btn-sm text-end">
                            Trả lời liên hệ
                        </button>
                    </div>
                </section>
                <section className="content-body my-2">
                    <div className="row">
                        <div className="col-4">
                            <div className="mb-3">
                                <label htmlFor="name" className="text">Họ tên</label>
                                <input value={contacts.name} type="text" name="name" id="name" className="form-control" placeholder="Nhập họ tên" readOnly />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="mb-3">
                                <label htmlFor="phone" className="text">Điện thoại</label>
                                <input value={contacts.phone} type="text" name="phone" id="phone" className="form-control" placeholder="Nhập điện thoại" readOnly />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="mb-3">
                                <label htmlFor="email" className="text">Email</label>
                                <input value={contacts.email} type="text" name="email" id="email" className="form-control" placeholder="Nhập email" readOnly />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="mb-3">
                                <label htmlFor="title" className="text">Tiêu đề</label>
                                <input value={contacts.title} type="text" name="title" id="title" className="form-control" placeholder="Nhập tiêu đề" readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="content_old" className="text">Nội dung</label>
                                <textarea value={contacts.content} name="content_old" id="content_old" className="form-control" placeholder="Nhập nội dung liên hệ" readOnly defaultValue={""} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="content" className="text">Nội dung trả lời</label>
                                <textarea onChange={(e) => setContentRep(e.target.value)} name="content" id="content" className="form-control" placeholder="Nhập nội dung liên hệ" rows={5} defaultValue={""} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>


    )
}
