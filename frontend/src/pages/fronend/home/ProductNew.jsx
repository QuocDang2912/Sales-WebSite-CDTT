import React, { useEffect, useState } from 'react'
import ProductServie from '../../../services/ProductService'
import ProductItem from '../../../components/ProductItem'
import Loading from '../../../components/Loading'
import { Link } from 'react-router-dom'
import { BsCartPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToCart } from '../../../state/CartSlice'
import { urlImage } from '../../../Api/config'

export default function ProductNew() {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)



    useEffect(() => {
        (
            async () => {
                try {
                    const res = await ProductServie.productnew(8)
                    console.log("🚀 ~ res:", res)
                    setProduct(res.product)
                    setLoading(false)
                } catch (error) {
                    console.log("🚀 ~ error:", error)

                }

            }
        )()
    }, [])

    // redux
    const dispatch = useDispatch()

    const handleClickToCart = (e) => {

        e.preventDefault();

        dispatch(
            addToCart(
                {
                    item: { ...product, count: 1 }
                }
            )
        )
    }
    let priceSale = product.pricesale ? product.pricesale : 0

    return (
        <>
            <div className="product-category mt-3 container">
                <h2 class="section-title heading-border ls-20 border-0">New Products</h2>
                <div class="row product-list">
                    {
                        product.map((product, index) => {
                            return (
                                <div className='col-6 col-md-3 mb-4' key={index}>
                                    {/* <ProductItem product={product}  /> */}
                                    <div className="product-item border">
                                        <Link to={`/product_detail/${product.slug}`}>
                                            <div className="product-item-image">
                                                <p>
                                                    <img style={{ width: "350px", height: "350px" }} className="img-fluid" src={urlImage + "product/" + product.image} alt='' />
                                                </p>
                                                <div className="label-group">


                                                    {/* <div className="product-label label-hot">HOT</div>
                                                    <div className="product-label label-sale">Sale</div> */}
                                                    <div className="product-label label-new">new</div>
                                                </div>
                                            </div>
                                            <div className="product-details">
                                                <h3 className="product-title" style={{ fontSize: "20px" }}>
                                                    <a href="#st">{product.name}</a>
                                                </h3>
                                                <div className="price-box">
                                                    <del className="old-price">
                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceSale)}
                                                    </del>
                                                    <span className="product-price">
                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                                    </span>
                                                </div>
                                                <div   className="product-action" style={{
                                                    border: "1px solid #ddd",
                                                }}>
                                                    <a onClick={handleClickToCart} href="#st" className="btn-icon btn-add-cart">
                                                        <span style={{ textAlign: "center" }}>
                                                            <BsCartPlus style={{ marginBottom: "6px", marginRight: "3px", fontSize: "1.7rem" }} />
                                                        </span>
                                                        <span>ADD TO CART
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {loading ? <Loading /> : ""}

                </div>
            </div>








        </>
    )
}
