

import httpAxios from "../Api/httpAxios";

const BrandService = {
    index: () => {
        return httpAxios.get(`brand/index`);
    },
    show: (id) => {
        return httpAxios.get(`brand/show/${id}`);
    },
    store: (data) => {
        return httpAxios.post(`brand/store`, data);
    },
    update: (id, data) => {
        return httpAxios.post(`brand/update/${id}`, data); // Use put method explicitly
    },
    destroy: (id) => {
        return httpAxios.delete(`brand/destroy/${id}`);
    },
    status: (id) => {
        return httpAxios.get(`brand/status/${id}`);
    },

    delete: (data, id) => {
        return httpAxios.put(`brand/delete/${id}`, data);
    },
    thungrac: () => {
        return httpAxios.get("brand/thungrac");
    },

}
export default BrandService;







