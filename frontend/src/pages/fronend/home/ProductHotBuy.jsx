import { useEffect, useState } from "react";
import ProductService from "../../../services/ProductService";
import ProductItem from "../../../components/ProductItem";
import Loading from "../../../components/Loading";
import { useSelector } from "react-redux";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const ProductHotBuy = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const result = await ProductService.producthotbuy(8);
                setProducts(result.products);
                setLoading(false);
            } catch (error) {
                console.log("🚀 ~ error:", error);
            }
        })();
    }, []);

    const cartItems = useSelector((state) => state.cart.items) ?? [];

    const getCurrentCartQty = (productId) => {
        const item = cartItems.find(item => item.id === productId);
        return item ? item.count : 0;
    };

    return (
        <div className="container">
            <h2 className="section-title heading-border ls-20 border-0">Sản phẩm bán chạy</h2>
            {loading ? (
                <Loading />
            ) : (
                <OwlCarousel
                    className="owl-theme"
                    margin={10}
                    nav
                    dots={true}
                    items={4}
                    autoplay
                    responsive={{
                        0: {
                            items: 1
                        },
                        600: {
                            items: 2
                        },
                        1000: {
                            items: 4
                        }
                    }}
                >
                    {products.map((product, index) => (
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
            )}
        </div>
    );
};

export default ProductHotBuy;
