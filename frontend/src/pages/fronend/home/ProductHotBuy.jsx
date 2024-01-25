import { useEffect, useState } from "react";
import ProductService from "../../../services/ProductService";
import ProductItem from "../../../components/ProductItem";
import Loading from "../../../components/Loading";

const ProductHotBuy = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const result = await ProductService.producthotbuy(8);
                setProducts(result.products);
                setLoading(false)
            } catch (error) {
                console.log("🚀 ~ error:", error)

            }

        })();
    }, []);
    return (
        <>
            <div className="container">
                <div className="category-title bg-main">
                    <h3 className="fs-5 py-3 text-center">SẢN PHẨM BÁN CHẠY</h3>
                </div>
                <div className="row product-list">
                    {products && products.map((product, index) => {
                        return (
                            <div className="col-6 col-md-3 mb-4" key={index}>
                                <ProductItem product={product} />
                            </div>
                        );
                    })}
                    {loading ? <Loading /> : ""}

                </div>
            </div>

        </>
    );
}
export default ProductHotBuy;