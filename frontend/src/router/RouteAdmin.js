
import BrandIndex from '../pages/beckend/brand/BrandIndex'
import BrandEdit from '../pages/beckend/brand/BrandEdit'
import BannerIndex from '../pages/beckend/banner/BannerIndex'
import BannerEdit from '../pages/beckend/banner/BannerEdit'
import CategoryIndex from '../pages/beckend/category/CategoryIndex'
import CategoryEdit from '../pages/beckend/category/CategoryEdit'
import ContactIndex from '../pages/beckend/contact/ContactIndex'

import OrderIndex from '../pages/beckend/order/OrderIndex'
import OrderExport from '../pages/beckend/order/OrderExport'
import PostIndex from '../pages/beckend/post/PostIndex'
import PostCreate from '../pages/beckend/post/PostCreate'
import PostEdit from '../pages/beckend/post/PostEdit'
import ProductIndex from '../pages/beckend/product/ProductIndex'
import ProductCreate from '../pages/beckend/product/ProductCreate'
import ProductEdit from '../pages/beckend/product/ProductEdit'
import ProductShow from '../pages/beckend/product/ProductShow'
import TopicIndex from '../pages/beckend/topic/TopicIndex'
import TopicEdit from '../pages/beckend/topic/TopicEdit'
import UserIndex from '../pages/beckend/user/UserIndex'
import UserCreate from '../pages/beckend/user/UserCreate'
import UserEdit from '../pages/beckend/user/UserEdit'
import BrandShow from '../pages/beckend/brand/BrandShow'
import BannerShow from '../pages/beckend/banner/BannerShow'
import CategoryShow from '../pages/beckend/category/CategoryShow'
import ContactReply from '../pages/beckend/contact/ContactReply'
import ContactShow from '../pages/beckend/contact/ContactShow'
import OrderShow from '../pages/beckend/order/OrderShow'
import PostShow from '../pages/beckend/post/PostShow'
import TopicShow from '../pages/beckend/topic/TopicShow'
import UserShow from '../pages/beckend/user/UserShow'
import PageIndex from '../pages/beckend/page/PageIndex'
import PageCreate from '../pages/beckend/page/PageCreate'
import PageEdit from '../pages/beckend/page/PageEdit'
import PageShow from '../pages/beckend/page/PageShow'
import ProductSale from '../pages/beckend/product/ProductSale'
import ProductImport from '../pages/beckend/product/ProductImport'
import MenuIndex from '../pages/beckend/menu/MenuIndex'
import MenuEdit from '../pages/beckend/menu/MenuEdit'
import MenuShow from '../pages/beckend/menu/MenuShow'
import MenuTrash from '../pages/beckend/menu/MenuTrash'
import BrandTrash from '../pages/beckend/brand/BrandTrash'
import CategoryTrash from '../pages/beckend/category/CategoryTrash'
import ContactTrash from '../pages/beckend/contact/ContactTrash'
import OrderTrash from '../pages/beckend/order/OrderTrash'
import PageTrash from '../pages/beckend/page/PageTrash'
import PostTrash from '../pages/beckend/post/PostTrash'
import ProductTrash from '../pages/beckend/product/ProductTrash'
import TopicTrash from '../pages/beckend/topic/TopicTrash'
import UserTrash from '../pages/beckend/user/UserTrash'
import CustomerIndex from '../pages/beckend/customer/CustomerIndex'
import CustomerCreate from '../pages/beckend/customer/CustomerCreate'
import CustomerEdit from '../pages/beckend/customer/CustomerEdit'
import CustomerShow from '../pages/beckend/customer/CustomerShow'
import CustomerTrash from '../pages/beckend/customer/CustomerTrash'
import BannerTrash from '../pages/beckend/banner/BannerTrash'


const RouteAdmin = [
    { path: '/admin/brand/index', component: BrandIndex },
    { path: '/admin/brand/trash', component: BrandTrash },
    { path: '/admin/brand/show/:id', component: BrandShow },
    { path: '/admin/brand/edit/:id', component: BrandEdit },

    { path: '/admin/banner/index', component: BannerIndex },
    { path: '/admin/banner/edit/:id', component: BannerEdit },
    { path: '/admin/banner/show/:id', component: BannerShow },
    { path: '/admin/banner/trash', component: BannerTrash },


    { path: '/admin/category/index', component: CategoryIndex },
    { path: '/admin/category/edit/:id', component: CategoryEdit },
    { path: '/admin/category/show/:id', component: CategoryShow },
    { path: '/admin/category/trash', component: CategoryTrash },
    // contact
    { path: '/admin/contact/index', component: ContactIndex },
    { path: '/admin/contact/reply/:id', component: ContactReply },
    { path: '/admin/contact/show/:id', component: ContactShow },
    { path: '/admin/contact/trash', component: ContactTrash },

    // menu
    { path: "/admin/menu/index", component: MenuIndex },
    { path: "/admin/menu/edit/:id", component: MenuEdit },
    { path: "/admin/menu/show/:id", component: MenuShow },
    { path: "/admin/menu/trash", component: MenuTrash },
    // order
    { path: '/admin/order/index', component: OrderIndex },
    { path: '/admin/orderExport/index', component: OrderExport },
    { path: '/admin/order/show/:id', component: OrderShow },
    { path: "/admin/order/trash", component: OrderTrash },

    // post 
    { path: '/admin/post/index', component: PostIndex },
    { path: '/admin/post/create', component: PostCreate },
    { path: '/admin/post/edit/:id', component: PostEdit },
    { path: '/admin/post/show/:id', component: PostShow },
    { path: "/admin/post/trash", component: PostTrash },

    //page
    { path: '/admin/page/index', component: PageIndex },
    { path: '/admin/page/create', component: PageCreate },
    { path: '/admin/page/edit/:id', component: PageEdit },
    { path: '/admin/page/show/:id', component: PageShow },
    { path: "/admin/page/trash", component: PageTrash },


    //  product
    { path: '/admin/product/index', component: ProductIndex },
    { path: '/admin/product/create', component: ProductCreate },
    { path: '/admin/product/edit/:id', component: ProductEdit },
    { path: '/admin/product/show/:id', component: ProductShow },
    { path: "/admin/product/trash", component: ProductTrash },


    { path: '/admin/product/productsale', component: ProductSale },
    { path: '/admin/product/productImport', component: ProductImport },

    // topic
    { path: '/admin/topic/index', component: TopicIndex },
    { path: '/admin/topic/edit/:id', component: TopicEdit },
    { path: '/admin/topic/show/:id', component: TopicShow },
    { path: "/admin/topic/trash", component: TopicTrash },

    // user
    { path: '/admin/user/index', component: UserIndex },
    { path: '/admin/user/create', component: UserCreate },
    { path: '/admin/user/edit/:id', component: UserEdit },
    { path: '/admin/user/show/:id', component: UserShow },
    { path: "/admin/user/trash", component: UserTrash },
    // customer
    { path: '/admin/customer/index', component: CustomerIndex },
    { path: '/admin/customer/create', component: CustomerCreate },
    { path: '/admin/customer/edit/:id', component: CustomerEdit },
    { path: '/admin/customer/show/:id', component: CustomerShow },
    { path: "/admin/customer/trash", component: CustomerTrash },


]
export default RouteAdmin
