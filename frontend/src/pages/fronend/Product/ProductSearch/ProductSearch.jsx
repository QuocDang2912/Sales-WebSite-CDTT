import React, { useEffect, useState } from "react";
import ProductServie from "../../../../services/ProductService";
import ProductItem from "../../../../components/ProductItem";
// import "../../../../layouts/LayoutSite/LayoutStyle.css";
import { useParams } from "react-router-dom";
export default function ProductSearch() {
    const { search } = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await ProductServie.search(search);
            console.log("🚀 ~ res:", res);
            setProduct(res.product);
        })();
    }, []);
    return (
        <>
            <div className="row">
                <div class="col-md-12">
                    <div class="category-title">
                        <h1 class="fs-5 py-3 my-3 text-center text-uppercase">Kết quả tìm kiếm</h1>
                        {/* <img
              className="img-fluid d-none d-md-block"
              src={require("../../../../src/assets/images/4.jpg")}
              alt="category.jpg"
            /> */}
                    </div>
                    <div class="col-md-12">
                        <div class="row product-list">
                            {product.map((product, index) => {
                                return (
                                    <div className="col-6 col-md-3 mb-4" key={index}>
                                        <ProductItem product={product} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
