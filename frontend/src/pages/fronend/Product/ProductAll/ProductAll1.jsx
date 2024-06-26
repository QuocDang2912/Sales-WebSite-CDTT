import React, { useEffect, useState } from "react";
import ProductService from "../../../../services/ProductService"; // Corrected service import
import { Link } from "react-router-dom";
import "react-owl-carousel2/lib/styles.css";
import Loading from "../../../../components/Loading";
import ProductItem from "../../../../components/ProductItem";
import { useSelector } from "react-redux";

export default function ProductAll1() {
  const [ProductAll, setProductALL] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await ProductService.productAll1();
        // console.log("API Response:", res);
        setProductALL(res.product);
      } catch (error) {
        console.log("🚀 ~ fetch ~ error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const cartItems = useSelector((state) => state.cart.items) ?? [];

  const getCurrentCartQty = (productId) => {
    const item = cartItems.find((item) => item.id === productId);
    return item ? item.count : 0;
  };

  return (
    <div>
      <section className="hdl-maincontent py-2">
        <div className="container">
          <h2 className="section-title heading-border ls-20 border-0">
            Tất cả sản phẩm
          </h2>
          <div className="product-category mt-3">
            <div className="row product-list grid-view">
              {loading ? (
                <Loading />
              ) : (
                ProductAll.map((product, index) => (
                  <div className="col-6 col-md-3" key={index}>
                    <ProductItem
                      product={product}
                      totalSum={product.total_qty}
                      getCurrentCartQty={getCurrentCartQty}
                      cartItems={cartItems}
                      displayMode="grid"
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
