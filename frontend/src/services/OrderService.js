import httpAxios from "../Api/httpAxios";
const OrderServie = {
    getList: (status) => {
        return httpAxios.get(`order/index/${status}`);
    },
    getById: (id) => {
        return httpAxios.get(`order/show/${id}`);
    },
    store: (data) => {
        return httpAxios.post(`order/store`, data);
    },
    update: (data, id) => {
        return httpAxios.post(`order/update/${id}`, data);
    },
    status: (id) => {
        return httpAxios.get(`order/status/${id}`);
    },
    delete: (id) => {
        return httpAxios.get(`order/delete/${id}`);
    },
    restore: (id) => {
        return httpAxios.get(`order/restore/${id}`);
    },
    destroy: (id) => {
        return httpAxios.delete(`order/destroy/${id}`);
    },




}
export default OrderServie;