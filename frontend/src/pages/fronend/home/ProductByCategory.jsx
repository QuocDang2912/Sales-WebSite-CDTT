import React, { useEffect, useState } from "react";
import CategoryServie from "../../../services/CategoryService";
import ProductServie from "../../../services/ProductService";
import { urlImage } from "../../../Api/config";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";


export default function ProductByCategory() {

    const [categories, setCategories] = useState([]);
    const [productsByCategory, setProductsByCategory] = useState({});
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch danh sách danh mục
                const categoriesResult = await CategoryServie.index();
                setCategories(categoriesResult.category);

                // Lấy sản phẩm từ mỗi danh mục và cập nhật productsByCategory
                const productsByCategoryData = {};
                for (const category of categoriesResult.category) {
                    const productsResult = await ProductServie.product_category_home(
                        category.id
                    );
                    productsByCategoryData[category.id] = productsResult.products;
                }
                setProductsByCategory(productsByCategoryData);
                setLoading(false)

            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);





    return (
        <div className="container">
            <div className="category-title bg-main">
                <h3 className="fs-5 py-3 text-center">SẢN PHẨM theo danh mục</h3>
            </div>
            {categories.map((category) => (
                <div key={category.id} className="product-category mt-3">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="category-title bg-main">
                                <h3 className="fs-5 py-3 text-center text-uppercase">
                                    {category.name}
                                </h3>
                                <img
                                    className="img-fluid d-none d-md-block"
                                    src={urlImage + "category/" + category.image}
                                    style={{ height: 628, width: 340 }}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="row product-list">
                                {productsByCategory[category.id]?.map((product) => {
                                    let priceSale = product.pricesale ? product.pricesale : 0
                                    return (
                                        (
                                            <div key={product.id} className="col-6 col-md-3 mb-4">
                                                <div className="product-item border">
                                                    <div className="product-item-image">
                                                        <Link to={`/product_detail/${product.slug}`}>
                                                            <img
                                                                src={urlImage + "product/" + product.image}
                                                                className="img-fluid"
                                                                style={{ height: 291, width: 254 }}
                                                                alt=""
                                                                id="img1"
                                                            />
                                                            <img
                                                                style={{ height: 291, width: 254 }}
                                                                className="img-fluid"
                                                                src={urlImage + "product/" + product.image}
                                                                alt=""
                                                                id="img2"
                                                            />
                                                        </Link>
                                                    </div>
                                                    <h2 className="product-item-name text-main text-center fs-5 py-1">
                                                        <Link to={`/product_detail/${product.slug}`}>{product.name}</Link>
                                                    </h2>
                                                    <h3 className="product-item-price fs-6 p-2 d-flex">
                                                        <div className="flex-fill">
                                                            <del>
                                                                {
                                                                    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceSale)
                                                                }
                                                            </del>
                                                        </div>
                                                        <div className="flex-fill text-end text-main">
                                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                                        </div>
                                                    </h3>
                                                </div>
                                            </div>
                                        ))
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {loading ? <Loading /> : ""}
        </div>
    )
}
