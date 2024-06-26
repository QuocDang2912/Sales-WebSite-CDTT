import React, { useEffect, useState } from "react";
import ProductService from "../../../services/ProductService";
import ProductItem from "../../../components/ProductItem";
import Loading from "../../../components/Loading";
import { useSelector } from "react-redux";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function ProductSale() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await ProductService.productsale(8);
        setProduct(res.product);
        setLoading(false);
      } catch (error) {
        console.log("🚀 ~ error:", error);
      }
    })();
  }, []);

  const cartItems = useSelector((state) => state.cart.items) ?? [];

  const getCurrentCartQty = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.count : 0;
  };

  return (
    <div className="product-category mt-3 container">
      <h2 className="section-title heading-border ls-20 border-0">
        Sản phẩm khuyến mãi
      </h2>
      {loading ? (
        <Loading />
      ) : (
        <OwlCarousel 
          className="owl-theme"
          margin={10}
          nav
          dots={true}
          items={4}
          autoplay
          responsive={{
            0: {
              items: 1
            },
            600: {
              items: 2
            },
            1000: {
              items: 4
            }
          }}
        >
          {product.map((product, index) => (
            <div className="item" key={index}>
              <ProductItem
                product={product}
                totalSum={product.total_qty}
                getCurrentCartQty={getCurrentCartQty}
                cartItems={cartItems}
              />
            </div>
          ))}
        </OwlCarousel>
      )}
    </div>
  );
}
