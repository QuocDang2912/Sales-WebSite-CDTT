import React from "react";
import { urlImage } from "../Api/config";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToCart } from "../state/CartSlice";
import { toast } from "react-toastify";

export default function ProductItem({ product, displayMode }) {
  const dispatch = useDispatch();

  const handleClickToCart = (e) => {
    e.preventDefault();
    dispatch(
      addToCart({
        item: { ...product, count: 1 },
      })
    );
    toast.success("Đã thêm sản phẩm vào giỏ hàng!");
  };

  let priceSale = product.pricesale ? product.pricesale : 0;

  return (
    <div
      className={`product-item border ${
        displayMode === "list" ? "list-view" : ""
      }`}
    >
      <div className="product-item-image">
        <Link to={`/product_detail/${product.slug}`}>
          <div
            className="image-wrapper"
            style={{ position: "relative", overflow: "hidden" }}
          >
            {priceSale > 0 && (
              <div
                className="product-label label-sale"
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  backgroundColor: "red",
                  color: "white",
                  padding: "4px",
                }}
              >
                Sale
              </div>
            )}
            <img
              style={{ width: "400px", height: "300px" }}
              className="product-image img-fluid"
              src={urlImage + "product/" + product.image}
              alt=""
            />
            <div className="product-action">
              <a
                onClick={handleClickToCart}
                href="#st"
                className="btn-icon btn-add-cart"
              >
                <span style={{ textAlign: "center" }}>
                  <BsCartPlus
                    style={{
                      marginBottom: "6px",
                      marginRight: "3px",
                      fontSize: "1.5rem",
                    }}
                  />
                </span>
                <span style={{ fontSize: "16px", fontWeight: "500" }}>
                  Thêm vào giỏ hàng
                </span>
              </a>
            </div>
          </div>
        </Link>
      </div>
      <div className="product-details">
        <h3
          className="product-title"
          style={{ fontSize: "22px", fontWeight: "500" }}
        >
          <Link to={`/product_detail/${product.slug}`}>{product.name}</Link>
        </h3>
        <div className="price-box">
          <del className="old-price">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(priceSale)}
          </del>
          <p className="separator">|</p>
          <span className="product-price">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
}
