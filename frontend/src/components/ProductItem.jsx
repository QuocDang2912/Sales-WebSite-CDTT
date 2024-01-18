import React from 'react'
import { urlImage } from '../Api/config'
import { Link } from 'react-router-dom';

export default function ProductItem({ product }) {
    let priceSale = product.pricesale ? product.pricesale : 0
    return (
        <div className="product-item border">
            <Link to={`/product_detail/${product.slug}`}>
                <div className="product-item-image">
                    <p>
                        <img style={{ width: "350px", height: "350px" }} src={require("../assets/images.jpg")} className="img-fluid" alt='' id="img2" />
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
    )
}
