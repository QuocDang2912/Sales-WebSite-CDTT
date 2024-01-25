import { useState } from 'react';
import ContactServie from '../../../services/ContactService';
export default function Contact() {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value, user_id: 1, replay_id: 1, status: 1 }))
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        (
            async () => {
                const res = await ContactServie.store(inputs)
                console.log("🚀 ~ res:", res)
            }
        )();
        console.log(inputs);
    }

    return (
        <div>
            <section className="bg-light">
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb py-2 my-0">
                            <li className="breadcrumb-item">
                                <a className="text-main" href="index.html">Trang chủ</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Liên hệ
                            </li>
                        </ol>
                    </nav>
                </div>
            </section >
            <section className="hdl-maincontent py-2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.746776096385!2d106.77242407468411!3d10.830680489321376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317526ffdc466379%3A0x89b09531e82960d!2zMjAgVMSDbmcgTmjGoW4gUGjDuiwgUGjGsOG7m2MgTG9uZyBCLCBRdeG6rW4gOSwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oIDcwMDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1692683712719!5m2!1svi!2s" width={600} height={450} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                        </div>
                        <div className="col-md-6">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="text-main">Họ tên</label>
                                    <input type="text" name="name"
                                        value={inputs.name || ""}
                                        onChange={handleChange}
                                        id="name" className="form-control" placeholder="Nhập họ tên" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="text-main">Điện thoại</label>
                                    <input type="text" name="phone"
                                        value={inputs.phone || ""}
                                        onChange={handleChange}
                                        id="phone" className="form-control" placeholder="Nhập điện thoại" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="text-main">Email</label>
                                    <input type="text" name="email"
                                        value={inputs.email || ""}
                                        onChange={handleChange}
                                        id="email" className="form-control" placeholder="Nhập email" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="text-main">Tiêu đề</label>
                                    <input type="text" name="title"
                                        value={inputs.title || ""}
                                        onChange={handleChange}
                                        id="title" className="form-control" placeholder="Nhập tiêu đề" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="detail" className="text-main">Nội dung</label>
                                    <textarea name="content"
                                        value={inputs.content || ""}
                                        onChange={handleChange}
                                        id="detail" className="form-control" placeholder="Nhập nội dung liên hệ" defaultValue={""} required />
                                </div>
                                <div className="mb-3">
                                    <button style={{ backgroundColor: "#ff0099" }} className="btn btn-main">Gửi liên hệ</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
        </div >

    )
}
