import httpAxios from "../Api/httpAxios";
const CustomerService = {
    getList: (status) => {
        return httpAxios.get(`customer/index/${status}`);
    },
    getById: (id) => {
        return httpAxios.get(`customer/show/${id}`);
    },
    store: (data) => {
        return httpAxios.post(`customer/store`, data);
    },
    update: (data, id) => {
        return httpAxios.post(`customer/update/${id}`, data);
    },
    status: (id) => {
        return httpAxios.get(`customer/status/${id}`);
    },
    delete: (id) => {
        return httpAxios.get(`customer/delete/${id}`);
    },
    restore: (id) => {
        return httpAxios.get(`customer/restore/${id}`);
    },
    destroy: (id) => {
        return httpAxios.delete(`customer/destroy/${id}`);
    },
}
export default CustomerService;