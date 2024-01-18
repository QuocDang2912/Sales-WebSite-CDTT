import React, { useEffect, useState } from 'react'
import PostServie from '../../../services/PostService'
import { Link, useParams } from 'react-router-dom'
import { urlImage } from '../../../Api/config'

export default function PostDetail() {
    const [post, setPost] = useState([])
    const [related_posts, setrelated_posts] = useState([])
    const { slug } = useParams()
    useEffect(() => {

        const fetch = async () => {
            const res = await PostServie.PostDetail(slug)
            setPost(res.post)
            setrelated_posts(res.related_posts)
            console.log("🚀 ~ fetch ~ res:", res)
        }
        fetch()

    }, [slug])

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
                                Chi tiết bài viết
                            </li>
                        </ol>
                    </nav>
                </div>
            </section >
            <section className="hdl-maincontent py-2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 order-2 order-md-1">
                            <ul className="list-group mb-3 list-category">
                                <li className="list-group-item bg-main py-3">Danh mục sản phẩm</li>
                                <li className="list-group-item">
                                    <a href="product_category.html">Thời trang nam</a>
                                </li>
                                <li className="list-group-item">
                                    <a href="product_category.html">Thời trang nữ</a>
                                </li>
                                <li className="list-group-item">
                                    <a href="product_category.html">Thời trang trẻ em</a>
                                </li>
                                <li className="list-group-item">
                                    <a href="product_category.html">Thời trang thể thao</a>
                                </li>
                            </ul>
                            <ul className="list-group mb-3 list-brand">
                                <li className="list-group-item bg-main py-3">Thương hiệu</li>
                                <li className="list-group-item">
                                    <a href="product_brand.html">Việt Nam</a>
                                </li>
                                <li className="list-group-item">
                                    <a href="product_brand.html">Hàn Quốc</a>
                                </li>
                                <li className="list-group-item">
                                    <a href="product_brand.html">Thái Lan</a>
                                </li>
                                <li className="list-group-item">
                                    <a href="product_brand.html">Quản Châu</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-9 order-1 order-md-2">
                            <h1 className="fs-2 text-main">{post.title}</h1>
                            <p>
                                {post.detail}
                            </p>
                            <h3 className="fs-4 text-main">
                                <strong>Bài viết khác</strong>
                            </h3>
                            <ul className="post-list-other">
                                {
                                    related_posts && related_posts.length > 0 &&
                                    related_posts.map((post, index) => {
                                        return (
                                            <li key={index}>
                                                <Link to={`/post_detail/${post.slug}`}>

                                                    <span>{post.title}</span>
                                                    <img style={{ width: "150px", height: "150px", margin: 10 }} className="img-fluid" src={urlImage + "post/" + post.image} alt='' />
                                                    <br />
                                                </Link>
                                            </li>

                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div >


    )
}
