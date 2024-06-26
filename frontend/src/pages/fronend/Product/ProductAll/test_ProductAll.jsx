import React, { useEffect, useState } from "react";
import ProductServie from "../../../../services/ProductService";
import { Link } from "react-router-dom";
import "react-owl-carousel2/lib/styles.css";
import Loading from "../../../../components/Loading";
import CategoryServie from "../../../../services/CategoryService";
import BrandService from "../../../../services/BrandService";
import ProductItem from "../../../../components/ProductItem";
import { useSelector } from "react-redux";
import SliderFilter from "../productFilter/SliderFilter";

export default function ProductAll() {
    // state all product and page
    const [ProductAll, setProductALL] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(true);

    // state lấy min max filter
    const [minPrice, setminPrice] = useState(0);
    const [maxPrice, setmaxPrice] = useState(1000);

    // sắp sếp tăng
    const [sort_order, setsort_order] = useState("asc");

    // Định nghĩa state cho chế độ hiển thị
    const [displayMode, setDisplayMode] = useState("grid");

    // filter chung
    const [filter, setFilter] = useState({ minPrice: 0, maxPrice: 1000 });

    // state left brand and category
    const [category, setCategory] = useState([]);
    const [brand, setbrand] = useState([]);

    useEffect(() => {
        (async () => {
            setLoading(true);

            try {
                const res = await ProductServie.productAll_filter_price(
                    currentPage,
                    minPrice,
                    maxPrice,
                    sort_order
                );
                setProductALL(res.products.data);
                setCurrentPage(res.products.current_page);
                setLastPage(res.products.last_page);

                // call brand and category left giao diện
                const fetCate = await CategoryServie.index();
                const fetchbrand1 = await BrandService.index();
                setCategory(fetCate.category);
                setbrand(fetchbrand1.brands);
            } catch (error) {
                console.log("🚀 ~ error:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, [currentPage, minPrice, maxPrice, sort_order]);

    const handleSliderChange = (values) => {
        setFilter({ minPrice: values[0], maxPrice: values[1] });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setminPrice(filter.minPrice || 0);
        setmaxPrice(filter.maxPrice || 0);
        setCurrentPage(1); // Reset to first page after filter
    };

    const toggleDisplayMode = () => {
        setDisplayMode(displayMode === "grid" ? "list" : "grid");
    };

    document.title = "Tất cả sản phẩm";
    const cartItems = useSelector((state) => state.cart.items) ?? [];

    const getCurrentCartQty = (productId) => {
        const item = cartItems.find((item) => item.id === productId);
        return item ? item.count : 0;
    };

    return (
        <div>
            <section className="bg-light">
                <div style={{ backgroundColor: "white" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-3">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb py-2 my-0">
                                        <li className="breadcrumb-item">
                                            <a className="text-main" href="index.html">
                                                Trang chủ
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Tất cả Sản phẩm
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div
                                className="col-9"
                                style={{ display: "flex", marginTop: "7px" }}
                            >
                                <div className="filter_price">
                                    <form onSubmit={handleSubmit}>
                                        {/* Custom Slider Component */}
                                        <SliderFilter
                                            min={100000}
                                            max={10000000}
                                            step={10}
                                            values={[filter.minPrice, filter.maxPrice]}
                                            onChange={handleSliderChange}
                                        />
                                        <input
                                            type="submit"
                                            value="Lọc"
                                            style={{
                                                backgroundColor: "#006ba1",
                                                color: "white",
                                                border: "none",
                                                marginRight: "10px",
                                                borderRadius: "5px",
                                                cursor: "pointer",
                                                padding: "7px 10px",
                                            }}
                                        />
                                    </form>
                                </div>
                                <div className="filter-sort">
                                    <label>Sắp xếp theo:</label>
                                    <select
                                        value={sort_order}
                                        onChange={(e) => setsort_order(e.target.value)}
                                        style={{
                                            marginLeft: "10px",
                                            padding: "5px",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        <option value="asc">Tăng dần</option>
                                        <option value="desc">Gỉam dần</option>
                                    </select>
                                </div>
                                <div className="filter-sort">
                                    <label style={{ marginLeft: "10px" }}>Hiển thị theo:</label>
                                    <select
                                        value={displayMode}
                                        onChange={toggleDisplayMode}
                                        style={{
                                            marginLeft: "10px",
                                            padding: "5px",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        <option value="grid">Lưới</option>
                                        <option value="list">Danh sách</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="hdl-maincontent py-2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 order-2 order-md-1">
                            <ul className="list-group mb-3 list-category">
                                <li
                                    style={{ backgroundColor: "#a9d0e8", color: "white" }}
                                    className="list-group-item bg-main py-3"
                                >
                                    Danh mục sản phẩm
                                </li>

                                {category &&
                                    category.length > 0 &&
                                    category.map((cate) => {
                                        return (
                                            <li key={cate.id} className="list-group-item">
                                                <Link to={`/productcategory/${cate.slug}`}>
                                                    {cate.name}
                                                </Link>
                                            </li>
                                        );
                                    })}
                            </ul>
                            <ul className="list-group mb-3 list-brand">
                                <li
                                    style={{ backgroundColor: "#a9d0e8", color: "white" }}
                                    className="list-group-item bg-main py-3"
                                >
                                    Thương hiệu
                                </li>

                                {brand &&
                                    brand.length > 0 &&
                                    brand.map((brand) => {
                                        return (
                                            <li key={brand.id} className="list-group-item">
                                                <Link to={`/productbrand/${brand.slug}`}>
                                                    {brand.name}
                                                </Link>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>
                        <div className="col-md-9 order-1 order-md-2">
                            <h2 className="section-title heading-border ls-20 border-0">
                                Tất cả sản phẩm
                            </h2>
                            <div className="product-category mt-3">
                                <div
                                    className={`row product-list ${displayMode === "grid" ? "grid-view" : "list-view"
                                        }`}
                                >
                                    {ProductAll.map((product, index) => (
                                        <div
                                            className={`col-${displayMode === "grid" ? "6 col-md-3" : "12 text-center"
                                                }`}
                                            key={index}
                                        >
                                            <ProductItem
                                                product={product}
                                                totalSum={product.total_qty}
                                                getCurrentCartQty={getCurrentCartQty} // Đã sửa: truyền thêm hàm getCurrentCartQty
                                                cartItems={cartItems} // Đã sửa: truyền thêm cartItems
                                                displayMode={displayMode}
                                            />
                                        </div>
                                    ))}
                                    {loading ? <Loading /> : ""}
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <nav aria-label="Page navigation">
                                    <ul className="pagination">
                                        <li
                                            className={`page-item ${currentPage === 1 ? "disabled" : ""
                                                }`}
                                        >
                                            <a
                                                className="page-link"
                                                onClick={() => setCurrentPage(currentPage - 1)}
                                            >
                                                &lt;{" "}
                                            </a>
                                        </li>
                                        {Array.from({ length: lastPage }, (_, i) => (
                                            <li
                                                className={`page-item ${i + 1 === currentPage ? "active" : ""
                                                    }`}
                                                key={i}
                                            >
                                                <a
                                                    className="page-link"
                                                    onClick={() => setCurrentPage(i + 1)}
                                                >
                                                    {i + 1}
                                                </a>
                                            </li>
                                        ))}
                                        <li
                                            className={`page-item ${currentPage === lastPage ? "disabled" : ""
                                                }`}
                                        >
                                            <a
                                                className="page-link"
                                                onClick={() => setCurrentPage(currentPage + 1)}
                                            >
                                                {" "}
                                                &gt;
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
