import React, { useEffect, useState } from "react";
import ProductService from "../../../services/ProductService";
import Loading from "../../../components/Loading";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../state/CartSlice";
import { urlImage } from "../../../Api/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductNew() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await ProductService.productnew(8);
        setProducts(res.product);
        setLoading(false);
      } catch (error) {
        console.error("🚀 ~ error:", error);
      }
    })();
  }, []);

  const dispatch = useDispatch();

  const handleClickToCart = (product, e) => {
    e.preventDefault();
    dispatch(addToCart({ item: { ...product, count: 1 } }));
    toast.success("Đã thêm sản phẩm vào giỏ hàng!");
  };

  return (
    <>
      <div className="product-category mt-3 container">
        <h2 className="section-title heading-border ls-20 border-0">
          Sản phẩm mới
        </h2>
        <div className="row product-list">
          {products.map((product, index) => (
            <div className="col-6 col-md-3 mb-4" key={index}>
              <div className="product-item border">
                <Link to={`/product_detail/${product.slug}`}>
                  <div className="product-item-image">
                    <img
                      style={{ width: "400px", height: "300px" }}
                      className="img-fluid"
                      src={urlImage + "product/" + product.image}
                      alt=""
                    />
                    <div className="label-group">
                      <div className="product-label label-new">new</div>
                    </div>
                    <div className="product-action">
                      <a
                        onClick={(e) => handleClickToCart(product, e)}
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
                <div className="product-details">
                  <h3
                    className="product-title"
                    style={{
                      fontSize: "22px",
                      marginTop: "-5px",
                      fontWeight: "500",
                    }}
                  >
                    <a href="#st">{product.name}</a>
                  </h3>
                  <div className="price-box">
                    <del className="old-price">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.pricesale || 0)}
                    </del>
                    <span className="separator">|</span>
                    <span className="product-price">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {loading && <Loading />}
        </div>
      </div>
    </>
  );
}
