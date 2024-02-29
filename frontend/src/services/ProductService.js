

import httpAxios from "../Api/httpAxios";

const ProductServie = {
    // code cũ
    index: () => {
        return httpAxios.get(`product/index`);
    },
    show: (id) => {
        return httpAxios.get(`product/show/${id}`);
    },

    store: (data) => {
        return httpAxios.post(`product/store`, data);
    },
    update: (data, id) => {
        return httpAxios.post(`product/update/${id}`, data);
    },
    destroy: (id) => {
        return httpAxios.delete(`product/destroy/${id}`);
    },
    status: (id) => {
        return httpAxios.get(`product/status/${id}`);
    },

    delete: (data, id) => {
        return httpAxios.put(`product/delete/${id}`, data);
    },
    thungrac: () => {
        return httpAxios.get("product/thungrac");
    },






    // productAll: () => {
    //     return httpAxios.get(`product/product_all`);
    // },
    productAll: (page) => { // all có page chưa có filter , sort
        return httpAxios.get(`product/product_all?page=${page}`);
    },

    productAll_filter_price: (page, min, max, sort_order) => {  // hoàn thiện
        console.log("🚀 ~ min:", min, "max:", max, "sort_order:", sort_order)
        if (min === 0 && max === 0) { // nếu trường hợp người dùng ko truyền thì gọi all product
            return httpAxios.get(`product/product_all_filter?page=${page}&sort_order=${sort_order}`);

        }
        else {
            return httpAxios.get(`product/product_all_filter?page=${page}&min_price=${min}&max_price=${max}&sort_order=${sort_order}`);
        }
    },

    productAll1: () => {
        return httpAxios.get(`product/product_all1`);
    },



    // productCategory: (slug) => {
    //     return httpAxios.get(`product/product_category/${slug}`);
    // },
    productCategory: (slug, page) => { // chưa có filter và sort
        return httpAxios.get(`product/product_category/${slug}?page=${page}`);
    },
    productCategory_price: (slug, page, min, max, sort_order) => {  // hoàn thiện
        console.log("🚀 ~ min:", min, "max:", max, "sort_order:", sort_order)
        if (min === 0 && max === 0) { // nếu trường hợp người dùng ko truyền thì gọi all product
            return httpAxios.get(`product/product_category_filter/${slug}?page=${page}&sort_order=${sort_order}`);

        }
        else {
            return httpAxios.get(`product/product_category_filter/${slug}?page=${page}&min_price=${min}&max_price=${max}&sort_order=${sort_order}`);
        }
    },



    // productBrand: (slug) => {
    //     return httpAxios.get(`product/product_brand/${slug}`);
    // },
    productBrand: (slug, page) => { // chưa có filter và sort
        return httpAxios.get(`product/product_brand/${slug}?page=${page}`);
    },
    productBrand_price: (slug, page, min, max, sort_order) => {  // hoàn thiện
        console.log("🚀 ~ min:", min, "max:", max, "sort_order:", sort_order)
        if (min === 0 && max === 0) { // nếu trường hợp người dùng ko truyền thì gọi all product
            return httpAxios.get(`product/product_brand_filter/${slug}?page=${page}&sort_order=${sort_order}`);

        }
        else {
            return httpAxios.get(`product/product_brand_filter/${slug}?page=${page}&min_price=${min}&max_price=${max}&sort_order=${sort_order}`);
        }
    },


    // detail
    product_detail: (slug) => {
        return httpAxios.get(`product/product_detail/${slug}`);
    },


    // trang chủ
    productnew: (limit) => {
        return httpAxios.get(`product/productnew/${limit}`);
    },
    productsale: (limit) => {
        return httpAxios.get(`product/productsale/${limit}`);
    },
    producthotbuy: (limit) => {
        return httpAxios.get(`product/producthotbuy/${limit}`);
    },
    product_category_home: (id) => {
        return httpAxios.get(`product/product_category_home/${id}`);
    },


    // thêm product sale
    sale: () => {
        return httpAxios.get(`product/sale`);
    },
    storesale: (data) => {
        return httpAxios.post(`product/storesale`, data);
    },

    // product store import

    getStore: () => {
        return httpAxios.get(`product/import`);
    },
    storeProductStore: (productstore) => {
        return httpAxios.post(`product/storeimport`, productstore);
    },


    // search
    search: (sreach) => {
        return httpAxios.get(`product/search/${sreach}`);
    },

}
export default ProductServie;