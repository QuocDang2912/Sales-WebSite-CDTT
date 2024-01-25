import React, { useEffect, useState } from "react";

import { Link, useParams } from 'react-router-dom'
import ProductServie from "../../../../services/ProductService";
import { urlImage } from "../../../../Api/config";
import Loading from "../../../../components/Loading";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../state/CartSlice";

export default function ProductDetail() {
    const { slug } = useParams()
    console.log("🚀 ~ ProductDetail ~ slug:", slug)
    const [product, setProduct] = useState([]);
    const [product_other, setProductOther] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const result = await ProductServie.product_detail(slug);

                setProduct(result.product);
                setProductOther(result.product_other)

                setLoading(false)
            } catch (error) {
                console.error("Error fetching brand: ", error);
            }
        };
        fetchBrand();
    }, [slug]);


    // redux
    const dispatch = useDispatch()

    const handleClickToCart = () => {
        dispatch(
            addToCart(
                {
                    item: { ...product, count: 1 }
                }
            )
        )
    }

    return (
        <>
            <section className="bg-light">
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb py-2 my-0">
                            <li className="breadcrumb-item">
                                <a className="text-main" href="index.html">Trang chủ</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Chi tiết sản phẩm
                            </li>
                        </ol>
                    </nav>
                </div>
            </section >
            <section className="hdl-maincontent py-2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="image">
                                <img style={{ height: 500, width: 550 }}
                                    id="productimage" classname="img-fluid w-100" src={urlImage + "product/" + product.image} alt="" />
                            </div>
                            <div className="list-image mt-3">
                                <div className="row">
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h1 className="text-main">{product.name}</h1>
                            <h2 className="text-main py-4">
                                Gía :  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                            </h2>
                            <h2 className=" py-4">
                                giảm giá :  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.pricesale)}
                            </h2>
                            <h2 className="text-main py-4">{product.detail}</h2>
                            <div className="mb-3">
                                <label htmlFor>Số lượng</label>
                                <input type="number" defaultValue={1} name="qty" className="form-control" style={{ width: 200 }} />
                            </div>

                            <div className="mb-3">
                                <button onClick={handleClickToCart} style={{ backgroundColor: "#ff0099" }} className="btn btn-main">Thêm vào giỏ hàng</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <h2 className="text-main fs-4 pt-4">Sản phẩm khác</h2>
                        <div className="product-category mt-3">
                            <div className="row product-list">
                                {product_other &&
                                    product_other.map((product, index) => {
                                        let priceSale = product.pricesale ? product.pricesale : 0

                                        return (
                                            <div className="col-6 col-md-3 mb-4">
                                                <div className="product-item border">
                                                    <div className="product-item-image">
                                                        <Link to={`/product_detail/${product.slug}`}>
                                                            <img

                                                                src={urlImage + "product/" + product.image}
                                                                className="img-fluid"
                                                                style={{ height: 400, width: 310 }}
                                                                alt=""
                                                                id="img1"
                                                            />
                                                            <img
                                                                src={urlImage + "product/" + product.image}
                                                                className="img-fluid"
                                                                style={{ height: 400, width: 310 }}
                                                                alt=""
                                                                id="img2"

                                                            />
                                                        </Link>
                                                    </div>
                                                    <h2 className="product-item-name text-main text-center fs-5 py-1">
                                                        <Link to={`/product_detail/${product.slug}`}>{product.name}</Link>
                                                    </h2>
                                                    <h3 className="product-item-price fs-6 p-2 d-flex">
                                                        <div className="flex-fill">
                                                            <del>
                                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceSale)}
                                                            </del>
                                                        </div>
                                                        <div className="flex-fill text-end text-main">
                                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                                        </div>
                                                    </h3>
                                                </div>
                                            </div>

                                        );
                                    })
                                }

                                {loading ? <Loading /> : ""}

                            </div>
                        </div>
                    </div>

                </div>
            </section>


        </>

    )
}
