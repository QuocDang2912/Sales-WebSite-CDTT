import React, { useEffect, useState } from "react";
import ProductServie from "../../../services/ProductService";
import ProductItem from "../../../components/ProductItem";
import Loading from "../../../components/Loading";
export default function ProductSale() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await ProductServie.productsale(8);
        console.log("🚀 Sản phẩm sale:", res)
        setProduct(res.product);
        setLoading(false);
      } catch (error) {
        console.log("🚀 ~ error:", error);
      }
    })();
  }, []);
  return (
    <>
      <div className="product-category mt-3 container">
        <h2 class="section-title heading-border ls-20 border-0">
          {" "}
          Sản phẩm khuyến mãi
        </h2>

        <div class="row product-list">
          {product.map((product, index) => {
            return (
              <div className="col-6 col-md-3 mb-4" key={index}>
                <ProductItem product={product} />
              </div>
            );
          })}
          {loading ? <Loading /> : ""}
        </div>
      </div>
    </>
  );
}
