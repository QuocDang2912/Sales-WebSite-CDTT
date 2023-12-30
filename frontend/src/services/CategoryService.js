

import httpAxios from "../Api/httpAxios";

const CategoryServie = {
    index: () => {
        return httpAxios.get(`category/index`);
    },
    show: (id) => {
        return httpAxios.get(`category/show/${id}`);
    },
    store: (data) => {
        return httpAxios.post(`category/store`, data);
    },
    update: (id, data) => {
        return httpAxios.post(`category/update/${id}`, data);
    },
    destroy: (id) => {
        return httpAxios.delete(`category/destroy/${id}`);
    },
    status: (id) => {
        return httpAxios.get(`category/status/${id}`);
    },

}
export default CategoryServie;