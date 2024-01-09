import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify'


import 'bootstrap/dist/css/bootstrap.min.css'
import BennerService from '../../../services/BannerService'

export default function BannerEdit() {

    const { id } = useParams()
    const navigate = useNavigate();


    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [position, setPosition] = useState("");
    const [link, setLink] = useState("");
    const [status, setStatus] = useState(1);
    console.log("🚀 ~ file: BannerEdit.jsx:7 ~ BannerEdit ~ id:", id)

    useEffect(() => {

        const fetch = async () => {
            const response = await BennerService.show(id)
            console.log("🚀 ~ file: BannerEdit.jsx:16 ~ fetch ~ response:", response)
            const banner = response.banner;
            console.log("🚀 ~ file: BannerEdit.jsx:30 ~ fetch ~ banner:", banner.link)
            setName(banner.name);
            setDescription(banner.description);
            setPosition(banner.position);
            setStatus(banner.status);
            setLink(banner.link);
        }
        fetch()

    }, [id])


    const handleSubmitEdit = (e) => {
        e.preventDefault();
        const image = document.getElementById("image");
        const banner = new FormData();
        banner.append("name", name);
        banner.append("link", link);
        banner.append("description", description);
        banner.append("position", position);
        banner.append("status", status);
        banner.append("image", image.files.length === 0 ? "" : image.files[0]);
        (async () => {
            const result = await BennerService.update(id, banner);
            console.log("🚀 ~ file: BannerEdit.jsx:43 ~ result:", result)
            alert(result.message);
            // toast.success(result.message);
            navigate("/admin/banner/index", { replace: true });
        })();
    }



    return (
        <form onSubmit={handleSubmitEdit}>
            < div >
                <section className="hdl-content">
                    <div className="container-fluid">
                        <div className="row">

                            <div className="col-md-10">
                                {/*CONTENT  */}
                                <div className="content">
                                    <section className="content-header my-2">
                                        <h1 className="d-inline">Cập nhật banner</h1>
                                        <div className="text-end">
                                            <Link className="btn btn-primary btn-sm" to={'/admin/banner/index'} style={{ color: "white" }}>về trang chính</Link>

                                        </div>
                                    </section>
                                    <section className="content-body my-2">
                                        <div className="row">

                                            <div className="col-md-9">
                                                <div className="mb-3">
                                                    <label><strong>Tên banner (*)</strong></label>
                                                    <input onChange={(e) => setName(e.target.value)}
                                                        value={name} type="text" name="name" className="form-control" placeholder="Nhập tên banner" />
                                                </div>
                                                <div className="mb-3">
                                                    <label><strong>Liên kết</strong></label>
                                                    <input onChange={(e) => setLink(e.target.value)}
                                                        value={link} type="text" name="link" className="form-control" placeholder="Nhập liên kết" />
                                                </div>
                                                <div className="mb-3">
                                                    <label><strong>Mô tả (*)</strong></label>
                                                    <textarea onChange={(e) => setDescription(e.target.value)}
                                                        value={description} name="description" rows={5} className="form-control" placeholder="Nhập mô tả" defaultValue={""} />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="box-container mt-4 bg-white">

                                                    <div className="box-body p-2 border-bottom">
                                                        <p>Chọn trạng thái đăng</p>
                                                        <select onChange={(e) => setStatus(e.target.value)}
                                                            value={status} name="status" className="form-select">

                                                            <option value={1}>Xuất bản</option>
                                                            <option value={2}>Chưa xuất bản</option>
                                                        </select>
                                                    </div>

                                                </div>
                                                <div className="box-container mt-4 bg-white">
                                                    <div className="box-header py-1 px-2 border-bottom">
                                                        <strong>Vị trí (*)</strong>
                                                    </div>
                                                    <div className="box-body p-2 border-bottom">
                                                        <select onChange={(e) => setPosition(e.target.value)}
                                                            value={position} name="position" className="form-select">
                                                            <option>Chọn vị trí</option>
                                                            <option value="slideshow">Slide Show</option>
                                                            <option value="ads">Quảng cáo</option>
                                                        </select>
                                                        <p className="pt-2">Vị trí hiển thị banner</p>
                                                    </div>
                                                </div>
                                                <div className="box-container mt-4 bg-white">
                                                    <div className="box-header py-1 px-2 border-bottom">
                                                        <strong>Hình (*)</strong>
                                                    </div>
                                                    <div className="box-body p-2 border-bottom">
                                                        <input type="file" id="image" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="box-header py-1 px-2 border-bottom">
                                                    <strong>Đăng</strong>
                                                </div>
                                                <div className="box-footer text-end px-2 py-3">

                                                    <button type="submit" className="btn btn-success btn-sm text-end">
                                                        <i className="fa fa-save" aria-hidden="true" /> Đăng
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </section>
                                </div>
                                {/*END CONTENT*/}
                            </div>
                        </div>
                    </div>
                </section>
            </ div>
        </form>

    )
}
