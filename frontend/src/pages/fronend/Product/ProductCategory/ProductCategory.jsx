import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductServie from "../../../../services/ProductService";
import { urlImage } from "../../../../Api/config";
import Loading from "../../../../components/Loading";
import CategoryServie from "../../../../services/CategoryService";
import BrandService from "../../../../services/BrandService";
import ProductItem from "../../../../components/ProductItem";
import { useSelector } from "react-redux";
import SliderFilter from "../productFilter/SliderFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faList } from "@fortawesome/free-solid-svg-icons";

export default function ProductCategory() {
  const { slug } = useParams();

  const [productCategory, setProductCategory] = useState([]);
  const [nameCategory, setNameCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // state lấy min max filter
  const [minPrice, setminPrice] = useState(0);
  const [maxPrice, setmaxPrice] = useState(0);

  // sắp sếp tăng

  const [sort_order, setsort_order] = useState("asc");

  // Định nghĩa state cho chế độ hiển thị
  const [displayMode, setDisplayMode] = useState("grid");

  // Hàm để chuyển đổi chế độ hiển thị
  const toggleDisplayMode = () => {
    setDisplayMode(displayMode === "grid" ? "list" : "grid");
  };

  // filter chung
  const [filter, setFilter] = useState({});

  // state left brand and category
  const [category, setCategory] = useState([]);
  const [brand, setbrand] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const res = await ProductServie.productCategory_price(
          slug,
          currentPage,
          minPrice,
          maxPrice,
          sort_order
        );
        console.log("🚀 Sản phẩm category:", res);
        setProductCategory(res.products.data);
        setCurrentPage(res.products.current_page);
        setLastPage(res.products.last_page);
        setNameCategory(res.category_name);

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
  }, [slug, currentPage, minPrice, maxPrice, sort_order]);

  useEffect(() => {
    document.title = nameCategory;
  }, [nameCategory]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFilter((values) => ({ ...values, [name]: value }));
  };

  const handleChangePrice = (values) => {
    console.log("🚀 ~ handleChangePrice ~ values:", values);
    const minPrice = values[0];
    const maxPrice = values[1];
    setFilter({ ...filter, minPrice, maxPrice });
  };
  const handleSubmit = async (event) => {
    console.log("cc");
    event.preventDefault();
    setminPrice(filter.minPrice || 0);
    setmaxPrice(filter.maxPrice || 0);
    setCurrentPage(1); // Reset to first page after filter
  };

  const cartItems = useSelector((state) => state.cart.items) ?? [];

  const getCurrentCartQty = (productId) => {
    // lấy ra được số lượng của product trong redux
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
                      Sản phẩm theo danh mục
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="hdl-maincontent py-2">
        <div className="container">
          <div className="row">
            <div className="col-md-3 order-2 order-md-1">
              <ul className="list-group mb-3">
                <div className="filter_price">
                  <form onSubmit={handleSubmit}>
                    <div style={{ display: "flex" }}>
                      <label style={{ marginBottom: "10px" }}>
                        {/* Từ: */}
                        <input
                          type="number"
                          name="minPrice"
                          value={filter.minPrice}
                          onChange={handleChange}
                          style={{
                            border: "1px solid #ced4da",
                            outline: "none",
                            padding: "5px",
                            marginRight: "10px",
                            marginLeft: "5px",
                            width: "130px",
                          }}
                        />
                      </label>
                      <p>--</p>
                      <label>
                        {/* Đến: */}
                        <input
                          type="number"
                          name="maxPrice"
                          value={filter.maxPrice}
                          onChange={handleChange}
                          style={{
                            border: "1px solid #ced4da",
                            outline: "none",
                            padding: "5px",
                            marginRight: "10px",
                            marginLeft: "5px",
                            width: "130px",
                          }}
                        />
                      </label>
                    </div>

                    <SliderFilter
                      min={0} // Chỗ đã sửa: Đặt giá trị min cho SliderFilter
                      max={10000000} // Chỗ đã sửa: Đặt giá trị max cho SliderFilter
                      step={100000} // Chỗ đã sửa: Đặt bước nhảy cho SliderFilter
                      values={[minPrice, maxPrice]} // Chỗ đã sửa: Truyền giá trị minPrice và maxPrice vào SliderFilter
                      onChange={handleChangePrice} // Chỗ đã sửa: Truyền callback handleChangePrice vào SliderFilter
                    />
                    <input
                      type="submit"
                      value="Lọc Giá"
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
              </ul>
              <ul className="list-group mb-3 list-category">
                <li
                  style={{ backgroundColor: "#a9d0e8" }}
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
                  style={{ backgroundColor: "#a9d0e8" }}
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
              <div
                className="row align-items-center"
                style={{
                  marginTop: "-22px",
                  marginRight: "-82px",
                  marginLeft: "1px",
                }}
              >
                <div className="category-title col-md-8">
                  <h2 class="section-title heading-border ls-20 border-0">
                    {" "}
                    {nameCategory}
                  </h2>
                </div>
                <div
                  className="col-md-4 d-flex justify-content-end"
                  style={{ marginTop: "-30px" }}
                >
                  <div
                    className="filter-sort"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <label style={{ marginRight: "5px" }}>Sắp xếp: </label>
                    <select
                      value={sort_order}
                      onChange={(e) => setsort_order(e.target.value)}
                      style={{
                        padding: "3px",
                        borderRadius: "5px",
                        marginRight: "15px", // Thêm margin để tạo khoảng cách giữa các phần tử
                      }}
                    >
                      <option value="asc">Tăng dần</option>
                      <option value="desc">Giảm dần</option>
                    </select>

                    <label style={{ marginRight: "5px" }}>Hiển thị: </label>
                    <span>
                      <button
                        className={`icon-button ${
                          displayMode === "grid" ? "active" : ""
                        }`}
                        onClick={() => setDisplayMode("grid")}
                        style={{ marginRight: "5px" }}
                      >
                        <FontAwesomeIcon icon={faTh} />
                      </button>
                      <button
                        className={`icon-button ${
                          displayMode === "list" ? "active" : ""
                        }`}
                        onClick={() => setDisplayMode("list")}
                      >
                        <FontAwesomeIcon icon={faList} />
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div className="product-category mt-3">
                <div
                  className={`row product-list ${
                    displayMode === "grid" ? "grid-view" : "list-view"
                  }`}
                >
                  {productCategory.map((product, index) => {
                    return (
                      <div
                        className={`col-${
                          displayMode === "grid"
                            ? "6 col-md-3"
                            : "12 text-center"
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
                    );
                  })}
                  {loading ? <Loading /> : ""}
                </div>
              </div>

              <div className="d-flex justify-content-center" style={{ marginTop: "230px" }}>
                {productCategory.length > 0 ? (
                  <nav aria-label="Page navigation">
                    <ul className="pagination">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
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
                          className={`page-item ${
                            i + 1 === currentPage ? "active" : ""
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
                        className={`page-item ${
                          currentPage === lastPage ? "disabled" : ""
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
                ) : (
                  <h4>Đang cập nhập sản phẩm ...</h4>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
