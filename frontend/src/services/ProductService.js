

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



    //code mới

    // getList: (status) => {
    //     return httpAxios.get(`product/index/${status}`);
    // },
    // getById: (id) => {
    //     return httpAxios.get(`product/show/${id}`);
    // },
    // store: (data) => {
    //     return httpAxios.post(`product/store`, data);
    // },
    // update: (data, id) => {
    //     return httpAxios.post(`product/update/${id}`, data);
    // },
    // status: (id) => {
    //     return httpAxios.get(`product/status/${id}`);
    // },
    // delete: (id) => {
    //     return httpAxios.get(`product/delete/${id}`);
    // },
    // restore: (id) => {
    //     return httpAxios.get(`product/restore/${id}`);
    // },
    // destroy: (id) => {
    //     return httpAxios.delete(`product/destroy/${id}`);
    // },
    getStore: () => {
        return httpAxios.get(`product/import`);
    },
    storeProductStore: (productstore) => {
        return httpAxios.post(`product/storeimport`, productstore);
    },


    // productAll: () => {
    //     return httpAxios.get(`product/product_all`);
    // },
    productAll: (page) => {
        return httpAxios.get(`product/product_all?page=${page}`);
    },
    productCategory: (slug) => {
        return httpAxios.get(`product/product_category/${slug}`);
    },
    productBrand: (slug) => {
        return httpAxios.get(`product/product_brand/${slug}`);
    },
    product_detail: (slug) => {
        return httpAxios.get(`product/product_detail/${slug}`);
    },


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





}
export default ProductServie;