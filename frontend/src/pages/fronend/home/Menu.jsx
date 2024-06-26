import React, { useEffect, useState } from 'react'
import CategoryServie from '../../../services/CategoryService'
import { Link } from 'react-router-dom'
import BrandService from '../../../services/BrandService'

import TopicServie from '../../../services/TopicService'

export default function Menu() {
    const [category, setCategory] = useState([])
    const [brand, setbrand] = useState([])

    const [topic, setTopic] = useState([])

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await CategoryServie.index()
                const fetchbrand1 = await BrandService.index()
                const fetchTopic = await TopicServie.index()
                setTopic(fetchTopic.topics)
                setCategory(res.category)
                setbrand(fetchbrand1.brands)
            } catch (error) {
                console.log("🚀 ~ fetch ~ error:", error)

            }

        }
        fetch()
    }, [])
    return (
        <>
            <section className="hdl-mainmenu bg-main">
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-none d-md-block col-md-2 d-none d-md-block">
                            <div className="dropdown list-category">
                                <strong className="dropdown-toggle w-100" data-bs-toggle="dropdown" aria-expanded="false">
                                    Danh mục sản phẩm
                                </strong>
                                <ul className="dropdown-menu w-100">
                                    {category && category.length > 0 && category.map((cate) => {
                                        return (
                                            <li key={cate.id}>
                                                <Link className="dropdown-item" to={`/productcategory/${cate.slug}`}>{cate.name}</Link>
                                            </li>
                                        )
                                    })}
                                    <Link to={"/productall"}>
                                        <li>
                                            <a className="dropdown-item" >Tất cả sản phẩm</a>
                                        </li>
                                    </Link>
                                </ul>
                            </div>

                        </div>
                        <div className="col-12 col-md-9">
                            <nav className="navbar navbar-expand-lg bg-main">
                                <div className="container-fluid">
                                    <a className="navbar-brand d-block d-sm-none text-white" href="index.html">DIENLOISHOP</a>
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon" />
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                            <li className="nav-item">
                                                <Link to={"/"}>
                                                    <a className="nav-link text-white" aria-current="page" >Trang chủ</a>
                                                </Link>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Thương hiệu sản phẩm
                                                </a>
                                                <ul className="dropdown-menu">
                                                    {brand && brand.length > 0 && brand.map((brand) => {
                                                        return (
                                                            <li key={brand.id}>
                                                                <Link className="dropdown-item text-main" to={`/productbrand/${brand.slug}`}>{brand.name}</Link>
                                                            </li>
                                                        )
                                                    })}
                                                    <Link to={"/productall"}>
                                                        <li>
                                                            <a className="dropdown-item text-main" >Tất cả sản phẩm</a>
                                                        </li>
                                                    </Link>
                                                </ul>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Bài viết
                                                </a>
                                                <ul className="dropdown-menu">
                                                    {topic && topic.length > 0 && topic.map((topic) => {
                                                        return (
                                                            <li key={topic.id}>
                                                                <Link className="dropdown-item text-main" to={`/posttopic/${topic.slug}`}>{topic.name}</Link>
                                                            </li>
                                                        )
                                                    })}
                                                    <Link to={"/postall"}>
                                                        <li>
                                                            <a className="dropdown-item text-main" >Tất cả bài viết </a>
                                                        </li>
                                                    </Link>
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={"/contact"}>
                                                    <a className="nav-link text-white" aria-current="page" >Liên hệ</a>
                                                </Link>                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
