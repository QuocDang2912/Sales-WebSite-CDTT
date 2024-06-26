import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductService from "../../../../services/ProductService";
import { urlImage } from "../../../../Api/config";
import Loading from "../../../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../state/CartSlice";
import ProductItem from "../../../../components/ProductItem";
import { toast } from "react-toastify";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [productOther, setProductOther] = useState([]);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await ProductService.product_detail(slug);
        console.log("🚀 ~ fetchProduct ~ result:", result)
        setProduct(result.product);
        setProductOther(result.product_other);
        if (result.product) {
          document.title = result.product.name;
        }
      } catch (error) {
        console.error("Error fetching product: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items) ?? [];

  const getCurrentCartQty = (productId) => {
    const item = cartItems.find((item) => item.id === productId);
    return item ? item.count : 0;
  };

  const handleClickToCart = (e) => {
    e.preventDefault();
    const currentCartQty = getCurrentCartQty(product.id);
    const totalQtyRequested = currentCartQty + +qty;

    if (totalQtyRequested > product.total_qty) {
      toast.error("Số lượng yêu cầu vượt quá số lượng hiện có trong kho.");
    } else {
      dispatch(addToCart({ item: { ...product, count: +qty } }));
      toast.success("Thêm vào giỏ hàng thành công");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <section className="bg-light">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb py-2 my-0">
              <li className="breadcrumb-item">
                <Link className="text-main" to="/">
                  Trang chủ
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Chi tiết sản phẩm
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>
        </div>
      </section>
      <section className="hdl-maincontent py-2">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="image">
                {product && (
                  <img
                    style={{ height: "450px" }}
                    id="productimage"
                    className="img-fluid w-100"
                    src={urlImage + "product/" + product.image}
                    alt={product.name}
                  />
                )}
              </div>
            </div>
            <div className="col-md-6">
              <form onSubmit={handleClickToCart}>
                {product && (
                  <>
                    <h1
                      style={{
                        color: "black",
                        fontSize: "35px",
                        fontWeight: "bold",
                      }}
                      className="text-main"
                    >
                      {product.name}
                    </h1>
                    <hr class="short-divider"></hr>
                    {/* <h3 className="fs-5">{product.description}</h3> */}
                    <div className="row" style={{ marginTop: "-10px" }}>
                      {
                        product.pricesale != null ? (
                          <>
                            <div className="col-md-1">
                              <h3
                                className=" py-0"
                                style={{
                                  fontSize: "18px",
                                  color: "#777",
                                  marginTop: "6px",
                                  textDecoration: "line-through",
                                }}
                              >
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(product.price)}
                              </h3>
                            </div>
                            <div className="col-md-6">
                              <h3 className="py-0">
                                <span style={{ color: "red", marginLeft: "50px" }}>
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(product.pricesale)}
                                </span>
                              </h3>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="col-md-12">
                              <h3 className="py-0">
                                <span style={{ color: "red" }}>
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(product.price)}
                                </span>
                              </h3>
                            </div>
                          </>

                        )
                      }

                      <div style={{ marginTop: "10px" }}>
                        <span>{product.description}</span>
                      </div>
                    </div>
                    <h2 className="py-4" style={{ fontSize: "18px" }}>
                      Tồn Kho: {product.total_qty}
                    </h2>
                    {product.total_qty === 0 ? (
                      <div className="mb-3">
                        <button className="btn btn-secondary" disabled>
                          Đã hết hàng
                        </button>
                      </div>
                    ) : (
                      <div
                        className="row"
                        style={{
                          borderTop: "1px solid #e7e7e7",
                          borderBottom: "1px solid #e7e7e7",
                          marginTop: "20px",
                          padding: "25px",
                        }}
                      >
                        <div className="col-md-6">
                          <input
                            onChange={(e) => setQty(e.target.value)}
                            value={qty}
                            type="number"
                            min={1}
                            defaultValue={1}
                            name="qty"
                            max={product.total_qty}
                            className="form-control"
                            style={{ width: "65px", marginLeft: "-25px" }}
                          />
                        </div>
                        <div className="col-md-6">
                          <button
                            style={{
                              backgroundColor: "#006ba1",
                              color: "white",
                              height: "40px",
                              marginLeft: "-250px",
                            }}
                            className="btn btn-main"
                          >
                            Thêm vào giỏ hàng
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </form>
            </div>
          </div>
          <div className="row">
            <h2 className="text-main fs-4 pt-4">Chi tiết sản phẩm</h2>
            <p>{product?.detail}</p>
          </div>
          <div className="row">
            <h2 className="text-main fs-4 pt-4">Sản phẩm khác</h2>
            <OwlCarousel
              className="owl-theme"
              margin={10}
              items={4}
              nav={false}
            >
              {productOther.map((product, index) => (
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
          </div>
        </div>
      </section>
    </>
  );
}
