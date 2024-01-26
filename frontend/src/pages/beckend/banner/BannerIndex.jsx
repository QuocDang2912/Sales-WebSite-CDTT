import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import BennerService from '../../../services/BannerService'
import { useEffect } from 'react'
import { urlImage } from '../../../Api/config'
import Loading from '../../../components/Loading'
import { FaEdit, FaEye, FaTrash, FaToggleOn } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { MdDeleteForever } from "react-icons/md";
export default function BannerIndex() {

    const [banners, setBanners] = useState([])

    // lấy giá trị
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState('');
    const [position, setposition] = useState('');
    const [status, setStatus] = useState(1);

    // biến reaload
    const [loading, setLoading] = useState(true)
    const [reload, setReLoad] = useState(0);

    useEffect(() => {
        (
            async () => {
                const response = await BennerService.index()
                console.log("🚀 ~ file: BannerIndex.jsx:13 ~ response:", response)
                setBanners(response.banners)
                setLoading(false)
            }
        )()

    }, [reload])
    const handleSubmit = (e) => {
        e.preventDefault();

        const image = document.getElementById("image");
        const banner = new FormData();
        banner.append("name", name);
        banner.append("description", description);
        banner.append("link", link);
        banner.append("status", status);
        banner.append("position", position);
        banner.append("image", image.files.length === 0 ? "" : image.files[0]);
        console.log("🚀 banner:", banner);
        (async () => {
            const result = await BennerService.store(banner);
            alert(result.message);
            setName("");
            setDescription("");
            setposition("");
            setLink("");
            setStatus(1);
            image.value = ""

            document.getElementById('idreset').reset();
            setReLoad(result.banner.id);
        })();
    };


    const handleDelete = async (id) => {
        try {
            const updatedBrand = {
                status: 0,
            };
            const result = await BennerService.delete(updatedBrand, id);
            //   toast("Da xoa vao thung rac");
            setReLoad(reload + 1); // Reload brands
        } catch (error) {
            console.error("Error deleting brand: ", error);
        }
    };


    const handleStatus = (id) => {
        (async () => {
            const result = await BennerService.status(id);
            setReLoad(Date.now);
        })();
    };




    return (
        <div>

            <section className="hdl-content">
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-md-10">

                            <div className="content">
                                <section className="content-header my-2">
                                    <h1 className="d-inline">Banner</h1>
                                    <hr style={{ border: 'none' }} />
                                </section>
                                <section className="content-body my-5">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <form onSubmit={handleSubmit} id='idreset'>
                                                <div className="mb-3">
                                                    <label>
                                                        <strong>Tên Banner (*)</strong>
                                                    </label>
                                                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Nhập tên Banner" className="form-control" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label><strong>Mô tả</strong></label>
                                                    <textarea onChange={(e) => setDescription(e.target.value)} value={description} rows="4" placeholder="mô tả" className="form-control" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label><strong>Hình đại diện</strong></label>
                                                    <input type="file" id="image" className="form-control" />
                                                </div>
                                                <div className="mb-3">
                                                    <label><strong>link</strong></label>
                                                    <input type="text" onChange={(e) => setLink(e.target.value)} value={link} placeholder="Nhập tên link" className="form-control" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label><strong>Vị trí</strong></label>
                                                    <input type="text" onChange={(e) => setposition(e.target.value)} value={position} placeholder="Nhập vị trí" className="form-control" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label><strong>Trạng thái</strong></label>
                                                    <select onChange={(e) => setStatus(e.target.value)} value={status} className="form-control">
                                                        <option value={1}>Xuất bản</option>
                                                        <option value={2}>Chưa xuất bản</option>
                                                    </select>
                                                </div>
                                                <div className="mb-3 text-end">
                                                    <button type="submit" className="btn btn-success" name="THEM">
                                                        <i className="fa fa-save" /> Lưu[Thêm]
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="row mt-3 align-items-center">
                                                <div className="col-12">
                                                    <ul className="manager">
                                                        <li><a href="brand_index.html">Tất cả (123)</a></li>
                                                        <Link to="/admin/banner/trash">
                                                            {" "}
                                                            Thùng Rác <FaTrash />
                                                        </Link>
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
                                                    <button className="btnsearch d-inline">Tìm kiếm</button>
                                                </div>
                                            </div>

                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center" style={{ width: 30 }}>
                                                            <input type="checkbox" id="checkboxAll" />
                                                        </th>
                                                        <th className="text-center" style={{ width: 30 }}>Hình ảnh</th>
                                                        <th>Tên banner</th>
                                                        <th>Vị trí</th>
                                                        <th>Link</th>
                                                        <th className="text-center" style={{ width: 30 }}>ID</th>
                                                        <th className="text-center" style={{ width: 70 }}>action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>


                                                    {banners &&
                                                        banners.map((banner, index) => {
                                                            return (
                                                                <tr tr className="datarow" key={index} >
                                                                    <td className="text-center">
                                                                        <input type="checkbox" />
                                                                    </td>
                                                                    <td>
                                                                        <img style={{ width: "100px", height: "100px" }} src={urlImage + 'banner/' + banner.image} alt={banner.image} />
                                                                    </td>
                                                                    <td>
                                                                        <div className="name">
                                                                            <a href="banner_edit.html">
                                                                                {banner.name}
                                                                            </a>
                                                                        </div>
                                                                        <div className="function_style">
                                                                            <a href="#" className="text-success mx-1">
                                                                                <i className="fa fa-toggle-on" />
                                                                            </a>
                                                                            <a href="banner_edit.html" className="text-primary mx-1">
                                                                                <i className="fa fa-edit" />
                                                                            </a>
                                                                            <a href="banner_show.html" className="text-info mx-1">
                                                                                <i className="fa fa-eye" />
                                                                            </a>
                                                                            <a href="#" className="text-danger mx-1">
                                                                                <i className="fa fa-trash" />
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                    <td>{banner.position}</td>
                                                                    <td>{banner.link}</td>

                                                                    <td className="text-center">{banner.id}</td>
                                                                    <td className="text-center">
                                                                        <MdDeleteForever onClick={() => handleDelete(banner.id)} style={{ color: 'red', fontSize: '20' }} />

                                                                        <Link to={`/admin/banner/edit/${banner.id}`}>
                                                                            <FaEdit style={{ color: 'blue', fontSize: '20' }} />
                                                                        </Link>
                                                                        <Link to={`/admin/banner/show/${banner.id}`} className="px-1 text-info">
                                                                            <FaEye />
                                                                        </Link>
                                                                        <button onClick={() => handleStatus(banner.id)}
                                                                            className={
                                                                                banner.status === 1
                                                                                    ? "border-0 px-1 text-success"
                                                                                    : "border-0 px-1 text-danger"
                                                                            }
                                                                        >
                                                                            {banner.status === 1 ? <FaToggleOn /> : <FaToggleOn />}
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    {loading ? <Loading /> : ""}
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
            </section >
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
        </div >

    )
}
