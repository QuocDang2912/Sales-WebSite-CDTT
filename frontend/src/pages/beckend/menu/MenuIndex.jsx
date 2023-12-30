import React, { useEffect, useState } from 'react'
import MenuServie from '../../../services/MenuService';
import Loading from '../../../components/Loading';

export default function MenuIndex() {
    const [menus, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        (async () => {

            const result = await MenuServie.index();
            console.log("🚀 ~ file: BrandIndex.jsx:26 ~ result:", result)
            setMenu(result.menu);
            setLoading(false);
        })();
    }, []);



    return (
        <div>
            <div className="content">
                <section className="content-header my-2">
                    <h1 className="d-inline">Quản lý menu</h1>
                    <div className="row mt-3 align-items-center">
                        <div className="col-6">
                            <ul className="manager">
                                <li><a href="menu_index.html">Tất cả (123)</a></li>
                                <li><a href="#">Xuất bản (12)</a></li>
                                <li><a href="menu_trash.html">Rác (12)</a></li>
                            </ul>
                        </div>
                        <div className="col-6 text-end">
                            <input type="text" className="search d-inline" />
                            <button className="d-inline btnsearch">Tìm kiếm</button>
                        </div>
                    </div>
                </section>
                <section className="content-body my-2">
                    <div className="row">
                        <div className="col-md-3">
                            <ul className="list-group">
                                <li className="list-group-item mb-2">
                                    <select name="postion" className="form-control">
                                        <option value="mainmenu">Main Menu</option>
                                        <option value="footermenu">Footer Menu</option>
                                    </select>
                                </li>
                                <li className="list-group-item mb-2 border">
                                    <a className="d-block" href="#multiCollapseCategory" data-bs-toggle="collapse">
                                        Danh mục sản phẩm
                                    </a>
                                    <div className="collapse multi-collapse border-top mt-2" id="multiCollapseCategory">
                                        <div className="form-check">
                                            <input name="categoryid[]" className="form-check-input" type="checkbox" defaultValue id="categoryid" />
                                            <label className="form-check-label" htmlFor="categoryid">
                                                Default checkbox
                                            </label>
                                        </div>
                                        <div className="my-3">
                                            <button name="ADDCATEGORY" type="submit" className="btn btn-sm btn-success form-control">Thêm</button>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item mb-2 border">
                                    <a className="d-block" href="#multiCollapseBrand" data-bs-toggle="collapse">
                                        Thương hiệu
                                    </a>
                                    <div className="collapse multi-collapse border-top mt-2" id="multiCollapseBrand">
                                        <div className="form-check">
                                            <input name="brandid[]" className="form-check-input" type="checkbox" defaultValue id="brandid" />
                                            <label className="form-check-label" htmlFor="brandid">
                                                Default checkbox
                                            </label>
                                        </div>
                                        <div className="my-3">
                                            <button name="ADDBRAND" type="submit" className="btn btn-sm btn-success form-control">Thêm</button>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item mb-2 border">
                                    <a className="d-block" href="#multiCollapseTopic" data-bs-toggle="collapse">
                                        Chủ đề bài viết
                                    </a>
                                    <div className="collapse multi-collapse border-top mt-2" id="multiCollapseTopic">
                                        <div className="form-check">
                                            <input name="topicid[]" className="form-check-input" type="checkbox" defaultValue id="topicid" />
                                            <label className="form-check-label" htmlFor="topicid">
                                                Default checkbox
                                            </label>
                                        </div>
                                        <div className="my-3">
                                            <button name="ADDTOPIC" type="submit" className="btn btn-sm btn-success form-control">Thêm</button>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item mb-2 border">
                                    <a className="d-block" href="#multiCollapsePage" data-bs-toggle="collapse">
                                        Trang đơn
                                    </a>
                                    <div className="collapse multi-collapse border-top mt-2" id="multiCollapsePage">
                                        <div className="form-check">
                                            <input name="pageid[]" className="form-check-input" type="checkbox" defaultValue id="pageid" />
                                            <label className="form-check-label" htmlFor="pageid">
                                                Default checkbox
                                            </label>
                                        </div>
                                        <div className="my-3">
                                            <button name="ADDPAGE" type="submit" className="btn btn-sm btn-success form-control">Thêm</button>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item mb-2 border">
                                    <a className="d-block" href="#multiCollapseCustom" data-bs-toggle="collapse">
                                        Tùy biến liên kết
                                    </a>
                                    <div className="collapse multi-collapse border-top mt-2" id="multiCollapseCustom">
                                        <div className="mb-3">
                                            <label>Tên menu</label>
                                            <input type="text" name="name" className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label>Liên kết</label>
                                            <input type="text" name="link" className="form-control" />
                                        </div>
                                        <div className="my-3">
                                            <button name="ADDCUSTOM" type="submit" className="btn btn-sm btn-success form-control">Thêm</button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-9">
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
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th className="text-center" style={{ width: 30 }}>
                                            <input type="checkbox" id="checkboxAll" />
                                        </th>
                                        <th>Tên menu</th>
                                        <th>link</th>
                                        <th>type</th>
                                        <th className="text-center" style={{ width: 30 }}>ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {menus &&
                                        menus.map((menu, index) => {
                                            return (
                                                <tr className="datarow" key={index}>
                                                    <td className="text-center">
                                                        <input type="checkbox" id="checkId" />
                                                    </td>
                                                    <td>
                                                        <div className="name">
                                                            {menu.name}
                                                        </div>
                                                        <div className="function_style">
                                                            <a href="#" className="text-success mx-1">
                                                                <i className="fa fa-toggle-on" />
                                                            </a>
                                                            <a href="menu_edit.html" className="text-primary mx-1">
                                                                <i className="fa fa-edit" />
                                                            </a>
                                                            <a href="menu_show.html" className="text-info mx-1">
                                                                <i className="fa fa-eye" />
                                                            </a>
                                                            <a href="#" className="text-danger mx-1">
                                                                <i className="fa fa-trash" />
                                                            </a>
                                                        </div>
                                                    </td>
                                                    <td>{menu.link}</td>
                                                    <td>{menu.type}</td>
                                                    <td className="text-center">{menu.id}</td>
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

        </div>
    )
}
