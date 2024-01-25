import React, { useEffect, useState } from 'react'
import ProductServie from '../../../services/ProductService'
import ProductItem from '../../../components/ProductItem'
import Loading from '../../../components/Loading'
export default function ProductSale() {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (
            async () => {
                try {
                    const res = await ProductServie.productsale(8)
                    setProduct(res.product)
                    setLoading(false)
                } catch (error) {
                    console.log("🚀 ~ error:", error)
                }

            }
        )()
    }, [])
    return (
        <>
            <div className="product-category mt-3">
                <div className='row'>
                    <div class="col-md-3">
                        <div class="category-title bg-main">
                            <h1 class="fs-5 py-3 text-center text-uppercase">Chó Sale</h1>
                            <img className='img-fluid d-none d-md-block' src={require("../../../assets/images/nhung-chu-cun-dep-nhat-the-gioi-40-.3764.jpg")} alt="category.jpg" />
                        </div>
                    </div>
                    <div class="col-md-9">
                        <div class="row product-list">
                            {
                                product.map((product, index) => {
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
        </>
    )
}
