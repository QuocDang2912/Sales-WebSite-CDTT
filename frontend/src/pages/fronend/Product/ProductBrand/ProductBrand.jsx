import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductServie from '../../../../services/ProductService'
import { urlImage } from '../../../../Api/config'

export default function ProductBrand() {
    const { slug } = useParams()

    const [productBrand, setProductBrand] = useState([])

    useEffect(() => {

        (
            async () => {
                const res = await ProductServie.productBrand(slug)
                console.log("🚀 ~ res:", res)
                setProductBrand(res.products)
            }
        )()

    }, [slug])
    return (
        <div>
            <div>
                <section className="bg-light">
                    <div className="container">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb py-2 my-0">
                                <li className="breadcrumb-item">
                                    <a className="text-main" href="index.html">Trang chủ</a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    Sản phẩm theo loại
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
                                <div className="category-title bg-main">
                                    <h3 className="fs-5 py-3 text-center">{slug}</h3>
                                </div>
                                <div className="product-category mt-3">
                                    <div className="row product-list">
                                        {
                                            productBrand && productBrand.length > 0 &&
                                            productBrand.map((product, index) => {
                                                let priceSale = product.pricesale ? product.pricesale : 0

                                                return (
                                                    <div className="col-6 col-md-3 mb-4" key={index}>
                                                        <div className="product-item border">
                                                            <Link to={`/product_detail/${product.slug}`}>

                                                                <div className="product-item-image">
                                                                    <p>
                                                                        <img style={{ width: "350px", height: "350px" }} src={require("../../../../assets/images.jpg")} className="img-fluid" alt='' id="img2" />
                                                                        <img style={{ width: "350px", height: "350px" }} className="img-fluid" src={urlImage + "product/" + product.image} alt='' id="img1" />
                                                                    </p>
                                                                </div>
                                                                <h2 className="product-item-name text-main text-center fs-5 py-1">
                                                                    <p>{product.name}</p>

                                                                </h2>
                                                                <h3 className="product-item-price fs-6 p-2 d-flex">
                                                                    <div className="flex-fill"><del>
                                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceSale)}
                                                                    </del></div>
                                                                    <div className='flex-fill text-end text-main' >
                                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                                                    </div>
                                                                </h3>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                                <nav aria-label="Phân trang">
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item">
                                            <a className="page-link text-main" href="product_category.html" aria-label="Previous">
                                                <span aria-hidden="true">«</span>
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link text-main" href="product_category.html">1</a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link text-main" href="product_category.html">2</a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link text-main" href="product_category.html">3</a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link text-main" href="product_category.html" aria-label="Next">
                                                <span aria-hidden="true">»</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        </div>
    )
}
