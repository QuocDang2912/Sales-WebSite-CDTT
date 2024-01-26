

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
    productAll: (page) => {
        return httpAxios.get(`product/product_all?page=${page}`);
    },

    productAll1: () => {
        return httpAxios.get(`product/product_all1`);
    },



    // productCategory: (slug) => {
    //     return httpAxios.get(`product/product_category/${slug}`);
    // },
    productCategory: (slug, page) => {
        return httpAxios.get(`product/product_category/${slug}?page=${page}`);
    },
    // productBrand: (slug) => {
    //     return httpAxios.get(`product/product_brand/${slug}`);
    // },
    productBrand: (slug, page) => {
        return httpAxios.get(`product/product_brand/${slug}?page=${page}`);
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


    // thêm product sale
    sale: () => {
        return httpAxios.get(`product/sale`);
    },
    storesale: (data) => {
        return httpAxios.post(`product/storesale`, data);
    },

    // product store

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