

import httpAxios from "../Api/httpAxios";

const ProductServie = {
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

}
export default ProductServie;