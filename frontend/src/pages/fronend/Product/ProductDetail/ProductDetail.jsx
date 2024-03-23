import React, { useEffect, useState } from "react";

import { Link, useParams } from 'react-router-dom'
import ProductServie from "../../../../services/ProductService";
import { urlImage } from "../../../../Api/config";
import Loading from "../../../../components/Loading";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../state/CartSlice";
import ProductItem from "../../../../components/ProductItem";

export default function ProductDetail() {
    const { slug } = useParams()
    console.log("🚀 ~ ProductDetail ~ slug:", slug)
    const [product, setProduct] = useState([]);
    const [product_other, setProductOther] = useState([]);

    const [qty, setQty] = useState(1)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const result = await ProductServie.product_detail(slug);
                console.log("🚀 ~ fetchBrand ~ result:", result)

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

    const handleClickToCart = (e) => {
        console.log("🚀 qty:", qty)
        e.preventDefault();

        dispatch(
            addToCart(
                {
                    item: { ...product, count: +qty }
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
                                <img style={{ height: "500px" }}
                                    id="productimage" className="img-fluid w-100" src={urlImage + "product/" + product.image} alt="" />
                            </div>

                        </div>
                        <div className="col-md-6">
                            <form onSubmit={handleClickToCart}>
                                <h1 style={{ color: "black" }} className="text-main">{product.name}</h1>
                                <h3 class="fs-5"> {product.description}</h3>
                                <h2 className=" py-4">
                                    <span style={{ textDecoration: "underline", }}>
                                        Giá  :
                                    </span>

                                    <span style={{ color: "red" }}>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                    </span>
                                </h2>
                                <h2 className=" py-4">
                                    Giảm Giá :  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.pricesale)}
                                </h2>
                                <div className="mb-3">
                                    <label htmlFor>Số lượng</label>
                                    <input onChange={(e) => setQty(e.target.value)} value={qty} type="number" min={1} defaultValue={1} name="qty" className="form-control" style={{ width: 200 }} />
                                </div>
                                <div className="mb-3">
                                    <button style={{ backgroundColor: "#ff0099" }} className="btn btn-main">Thêm vào giỏ hàng</button>
                                </div>
                            </form>

                        </div>
                    </div>
                    <div class="row">
                        <h2 class="text-main fs-4 pt-4">Chi tiết sản phẩm</h2>
                        <p>
                            {product.detail
                            }
                        </p>
                    </div>
                    <div className="row">
                        <h2 className="text-main fs-4 pt-4">Sản phẩm khác</h2>
                        <div className="product-category mt-3">
                            <div className="row product-list">
                                {
                                    product_other.map((product, index) => {
                                        return (
                                            <div className='col-6 col-md-3 mb-4' key={index}>
                                                <ProductItem product={product} />
                                            </div>
                                        )
                                    })
                                }
                                {loading ? <Loading /> : ""}

                            </div>
                        </div>
                    </div>

                </div>
            </section >


        </>

    )
}
