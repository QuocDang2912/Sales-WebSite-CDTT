import httpAxios from "../Api/httpAxios";
const ProductStoreService = {
    getList: (status) => {
        return httpAxios.get(`store/index/${status}`);
    },
    getById: (id) => {
        return httpAxios.get(`store/show/${id}`);
    },
    store: (data) => {
        return httpAxios.post(`store/store`, data);
    },
    update: (data, id) => {
        return httpAxios.post(`store/update/${id}`, data);
    },
    status: (id) => {
        return httpAxios.get(`store/status/${id}`);
    },
    delete: (id) => {
        return httpAxios.get(`store/delete/${id}`);
    },
    restore: (id) => {
        return httpAxios.get(`store/restore/${id}`);
    },
    destroy: (id) => {
        return httpAxios.delete(`store/destroy/${id}`);
    },




}
export default ProductStoreService;