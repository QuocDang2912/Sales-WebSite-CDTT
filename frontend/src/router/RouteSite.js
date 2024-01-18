import PostDetail from "../pages/fronend/PostDetail/PostDetail"
import ProductAll from "../pages/fronend/Product/ProductAll/ProductAll"
import ProductBrand from "../pages/fronend/Product/ProductBrand/ProductBrand"
import ProductCategory from "../pages/fronend/Product/ProductCategory/ProductCategory"
import ProductDetail from "../pages/fronend/Product/ProductDetail/ProductDetail"

import Home from "../pages/fronend/home/index"

const RouteSite = [
    {
        path: '/', component: Home,
    },
    {
        path: '/product_detail/:slug', component: ProductDetail,
    },
    {
        path: '/post_detail/:slug', component: PostDetail,
    },
    {
        path: '/productall', component: ProductAll,
    },
    {
        path: '/productcategory/:slug', component: ProductCategory,
    },
    {
        path: '/productbrand/:slug', component: ProductBrand,
    },
]

export default RouteSite

