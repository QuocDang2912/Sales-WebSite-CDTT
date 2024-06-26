import React from "react";
import { urlImage } from "../Api/config";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToCart } from "../state/CartSlice";
import { toast } from "react-toastify";

export default function ProductItem({
  product,
  displayMode,
  totalSum,
  getCurrentCartQty,
}) {
  const dispatch = useDispatch();
  const currentCartQty = getCurrentCartQty(product.id); // Đã sửa: lấy số lượng hiện tại trong giỏ hàng

  const handleClickToCart = (e) => {
    e.preventDefault();
    if (currentCartQty < totalSum) {
      // Đã sửa: kiểm tra số lượng hiện tại với tổng số lượng còn lại
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
            {totalSum === "0" && (
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
                hết hàng
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
                onClick={
                  totalSum !== "0"
                    ? handleClickToCart
                    : (e) => e.preventDefault()
                }
                href="#st"
                className="btn-icon btn-add-cart"
                style={
                  totalSum === "0"
                    ? { pointerEvents: "none", opacity: 0.5 }
                    : {}
                }
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
          style={{ fontSize: "22px", fontWeight: "500", marginTop: "10px" }}
        >
          <Link to={`/product_detail/${product.slug}`}>{product.name}</Link>
        </h3>
        <div className="price-box">
          {priceSale > 0 ? (
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
                }).format(priceSale)}
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
  );
}
