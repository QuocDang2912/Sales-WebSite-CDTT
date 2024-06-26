import Cart from "../pages/fronend/Cart/Cart"
import Checkout from "../pages/fronend/CheckOut/Checkout"
import Contact from "../pages/fronend/Contact/Contact"
import PostAll from "../pages/fronend/Post/PostAll"
import PostPage from "../pages/fronend/Post/PostPage"
import PostTopic from "../pages/fronend/Post/PostTopic"
import PostDetail from "../pages/fronend/PostDetail/PostDetail"
import ProductAll from "../pages/fronend/Product/ProductAll/ProductAll"
import ProductBrand from "../pages/fronend/Product/ProductBrand/ProductBrand"
import ProductCategory from "../pages/fronend/Product/ProductCategory/ProductCategory"
import ProductDetail from "../pages/fronend/Product/ProductDetail/ProductDetail"
import ProductSearch from "../pages/fronend/Product/ProductSearch/ProductSearch"
import ActivaUser from "../pages/fronend/home/ActivaUser"

import Home from "../pages/fronend/home/index"
import Login from "../pages/fronend/login/Login"
import ChangePass from "../pages/fronend/profile/ChangePass"
import Profile from "../pages/fronend/profile/Profile"
import QuanLy_Order from "../pages/fronend/profile/QuanLy_Order"
import Register from "../pages/fronend/register/Register"
import ResetPassword from "../pages/fronend/resetPass/ResetPassword.jsx"
import UserByEmail from "../pages/fronend/resetPass/UserByEmail.jsx"

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
    {
        path: '/contact', component: Contact,
    },
    {
        path: '/login', component: Login,
    },
    {
        path: '/register', component: Register,
    },
    {
        path: '/cart', component: Cart,
    },
    {
        path: '/checkout', component: Checkout,
    },
    // post_page
    {
        path: '/post_page/:slug', component: PostPage,
    },

    //
    {
        path: '/postall', component: PostAll,
    },
    {
        path: '/posttopic/:slug', component: PostTopic,
    },
    {
        path: '/profile', component: Profile,
    },
    {
        path: '/changePass', component: ChangePass,
    },
    // search
    { path: "/product_search/:search", component: ProductSearch },
    {
        path: '/quanly_order', component: QuanLy_Order,
    },
    // kích hoạt tài khoảng
    {
        path: '/activaUser/:user_id', component: ActivaUser,
    },
    //UserByEmail
    {
        path: '/userByEmail', component: UserByEmail,
    },
    // reset pass
    {
        path: '/resetPass/:user_id', component: ResetPassword,
    },
]

export default RouteSite

