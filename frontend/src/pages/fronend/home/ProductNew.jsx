import React, { useEffect, useState } from "react";
import ProductService from "../../../services/ProductService";
import Loading from "../../../components/Loading";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../state/CartSlice";
import { urlImage } from "../../../Api/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function ProductNew() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await ProductService.productnew(8);
        // console.log("🚀 Sản phẩm mới:", res);
        setProducts(res.product);
        setLoading(false);
      } catch (error) {
        console.error("🚀 ~ error:", error);
      }
    })();
  }, []);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items) ?? [];

  const getCurrentCartQty = (productId) => {
    const item = cartItems.find((item) => item.id === productId);
    return item ? item.count : 0;
  };

  const handleClickToCart = (product, e) => {
    e.preventDefault();
    const currentCartQty = getCurrentCartQty(product.id);
    if (currentCartQty < product.total_qty) {
      dispatch(
        addToCart({
          item: { ...product, count: 1 },
        })
      );
      toast.success("Đã thêm sản phẩm vào giỏ hàng!");
    } else {
      toast.error("Số lượng yêu cầu vượt quá số lượng hiện có trong kho.");
    }
  };

  return (
    <div className="product-category mt-3 container">
      <h2 className="section-title heading-border ls-20 border-0">Sản phẩm mới</h2>
      {loading ? (
        <Loading />
      ) : (
        <OwlCarousel
          className="owl-theme"
          margin={10}
          nav
          items={4}
          autoplay
          responsive={{
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 4 },
          }}
        >
          {products.map((product, index) => (
            <div className="item" key={index}>
              <div className="product-item border">
                <Link to={`/product_detail/${product.slug}`}>
                  <div className="product-item-image">
                    <img
                      style={{ width: "400px", height: "300px" }}
                      className="img-fluid"
                      src={`${urlImage}product/${product.image}`}
                      alt={product.name}
                    />
                    <div className="label-group">
                      <div className="product-label label-new">New</div>
                      {product.total_qty === "0" && (
                        <div
                          className="product-label label-hot"
                          style={{
                            position: "absolute",
                            top: "10px",
                            left: "10px",
                            color: "white",
                            padding: "4px",
                          }}
                        >
                          Hết hàng
                        </div>
                      )}
                    </div>
                    <div className="product-action">
                      <a
                        onClick={(e) => handleClickToCart(product, e)}
                        href="#st"
                        className="btn-icon btn-add-cart"
                        style={
                          product.total_qty === "0"
                            ? { pointerEvents: "none", opacity: 0.5 }
                            : {}
                        }
                      >
                        <BsCartPlus
                          style={{
                            marginBottom: "6px",
                            marginRight: "3px",
                            fontSize: "1.5rem",
                          }}
                        />
                        <span style={{ fontSize: "16px", fontWeight: "500" }}>Thêm vào giỏ hàng</span>
                      </a>
                    </div>
                  </div>
                </Link>
                <div className="product-details">
                  <h3 className="product-title" style={{ fontSize: "22px", marginTop: "-5px", fontWeight: "500" }}>
                    <Link to={`/product_detail/${product.slug}`}>{product.name}</Link>
                  </h3>
                  <div className="price-box">
                    {product.pricesale > 0 ? (
                      <>
                        <del className="old-price">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(product.price)}
                        </del>
                        <p className="separator">|</p>
                        <span className="product-price">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(product.price - product.pricesale)}
                        </span>
                      </>
                    ) : (
                      <span className="product-price">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(product.price)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </OwlCarousel>
      )}
    </div>
  );
}
