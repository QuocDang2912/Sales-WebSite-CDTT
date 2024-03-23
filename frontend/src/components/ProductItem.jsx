import React from 'react'
import { urlImage } from '../Api/config'
import { Link } from 'react-router-dom';
import { BsCartPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToCart } from '../state/CartSlice';

export default function ProductItem({ product }) {

    // console.log("🚀 ~ ProductItem ~ product:", product)


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
        <div className="product-item border">
            <Link to={`/product_detail/${product.slug}`}>
                <div className="product-item-image">
                    <p>
                        <img style={{ width: "350px", height: "350px" }} className="img-fluid" src={urlImage + "product/" + product.image} alt='' />
                    </p>
                    <div className="label-group">


                        {

                            priceSale ? <div className="product-label label-sale">Sale</div> : ""

                        }
                        {/* <div className="product-label label-hot">HOT</div>
                        <div className="product-label label-sale">Sale</div>
                        <div className="product-label label-new">new</div> */}
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
                    <div className="product-action" style={{
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

    )
}



