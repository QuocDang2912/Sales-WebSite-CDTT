import httpAxios from "../Api/httpAxios";

const BennerService = {
    index: () => {
        return httpAxios.get(`banner/index`);
    },
    show: (id) => {
        return httpAxios.get(`banner/show/${id}`);
    },
    store: (data) => {
        return httpAxios.post(`banner/store`, data);
    },
    update: (id, data) => {
        return httpAxios.post(`banner/update/${id}`, data);
    },
    destroy: (id) => {
        return httpAxios.delete(`banner/destroy/${id}`);
    },
    status: (id) => {
        return httpAxios.get(`banner/status/${id}`);
    },
    delete: (data, id) => {
        return httpAxios.put(`banner/delete/${id}`, data);
    },
    thungrac: () => {
        return httpAxios.get("banner/thungrac");
    },

}
export default BennerService;