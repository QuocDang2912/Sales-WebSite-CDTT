import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import ProductService from "../../../../services/ProductService";
import { urlImage } from "../../../../Api/config";
import Loading from "../../../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../state/CartSlice";
import ProductItem from "../../../../components/ProductItem";
import { toast } from "react-toastify";

export default function ProductDetail() {
    const { slug } = useParams();
    const [product, setProduct] = useState({});
    const [product_other, setProductOther] = useState([]);
    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const result = await ProductService.product_detail(slug);
                console.log("🚀 ~ fetchProduct ~ result:", result);
                setProduct(result.product);
                setProductOther(result.product_other);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product: ", error);
            }
        };
        fetchProduct();
    }, [slug]);

    // Redux
    const dispatch = useDispatch();

    // kiểm trả trên redux số lượng và trong kho ss 
    const cartItems = useSelector((state) => state.cart.items) ?? []; // Sử dụng toán tử ?? để cung cấp một giá trị mặc định là một mảng rỗng
    console.log("🚀 ~ CartPage ~ cartItem:", cartItems);

    const getCurrentCartQty = (productId) => {
        const item = cartItems.find(item => item.id === productId); // Đổi tên biến từ 'cartItem' thành 'item'
        return item ? item.count : 0;
    };

    const handleClickToCart = (e) => {
        e.preventDefault();
        const currentCartQty = getCurrentCartQty(product.id);
        const totalQtyRequested = currentCartQty + +qty;

        if (totalQtyRequested > product.total_sum) {
            // alert("Số lượng yêu cầu vượt quá số lượng hiện có trong kho.");
            toast.error("Số lượng yêu cầu vượt quá số lượng hiện có trong kho.");

        } else {
            dispatch(addToCart({ item: { ...product, count: +qty } }));
        }
    };
    // kiểm trả trên redux số lượng và trong kho ss 



    return (
        <>
            <section className="bg-light">
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb py-2 my-0">
                            <li className="breadcrumb-item">
                                <Link className="text-main" to="/">Trang chủ</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Chi tiết sản phẩm
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
                                <img
                                    style={{ height: "500px" }}
                                    id="productimage"
                                    className="img-fluid w-100"
                                    src={urlImage + "product/" + product.image}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <form onSubmit={handleClickToCart}>
                                <h1 style={{ color: "black" }} className="text-main">{product.name}</h1>
                                <h3 className="fs-5">{product.description}</h3>
                                <h2 className="py-4">
                                    <span style={{ textDecoration: "underline" }}>
                                        Giá:
                                    </span>
                                    <span style={{ color: "red" }}>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                    </span>
                                </h2>
                                <h2 className="py-4">
                                    Giảm Giá: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.pricesale)}
                                </h2>
                                <h2 className="py-4">
                                    Tồn Kho: {product.total_sum}
                                </h2>
                                {product.total_sum === '0' ? (
                                    <div className="mb-3">
                                        <button className="btn btn-secondary" disabled>Đã hết hàng</button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-3">
                                            <label htmlFor="qty">Số lượng</label>
                                            <input
                                                onChange={(e) => setQty(e.target.value)}
                                                value={qty}
                                                type="number"
                                                min={1}
                                                max={product.total_sum === '1' ? 1 : undefined}
                                                name="qty"
                                                className="form-control"
                                                style={{ width: 200 }}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <button
                                                style={{ backgroundColor: "#ff0099" }}
                                                className="btn btn-main"
                                            >
                                                Thêm vào giỏ hàng
                                            </button>
                                        </div>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                    <div className="row">
                        <h2 className="text-main fs-4 pt-4">Chi tiết sản phẩm</h2>
                        <p>{product.detail}</p>
                    </div>
                    <div className="row">
                        <h2 className="text-main fs-4 pt-4">Sản phẩm khác</h2>
                        <div className="product-category mt-3">
                            <div className="row product-list">
                                {product_other.map((product, index) => (
                                    <div className='col-6 col-md-3 mb-4' key={index}>
                                        <ProductItem product={product} totalSum={product.total_sum} />
                                    </div>
                                ))}
                                {loading && <Loading />}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
