import React, { useEffect, useState } from "react";
import ProductServie from "../../../../services/ProductService";
import ProductItem from "../../../../components/ProductItem";
// import "../../../../layouts/LayoutSite/LayoutStyle.css";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";
export default function ProductSearch() {
    const { search } = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await ProductServie.search(search);
                console.log("🚀 ~ search:", res);
                setProduct(res.product);
            } catch (error) {
                console.log("🚀 ~ error:", error)

            }

        })();
    }, [search]);
    const cartItems = useSelector((state) => state.cart.items) ?? [];

    const getCurrentCartQty = (productId) => { // lấy ra được số lượng của product trong redux
        const item = cartItems.find(item => item.id === productId);
        return item ? item.count : 0;
    };
    return (
        <>
            <div className="container" >
                <div className="row">

                    <div class="col-md-12">
                        <div class="category-title">
                            <h1 class="fs-5 py-3 my-3 text-center text-uppercase">Kết quả tìm kiếm</h1>

                        </div>
                        <div class="col-md-12">
                            <div class="row product-list">
                                {product.map((product, index) => {
                                    return (
                                        <div className="col-6 col-md-3 mb-4" key={index}>
                                            <ProductItem product={product}
                                                totalSum={product.total_qty}
                                                getCurrentCartQty={getCurrentCartQty} // Đã sửa: truyền thêm hàm getCurrentCartQty
                                                cartItems={cartItems} // Đã sửa: truyền thêm cartItems
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
