import httpAxios from "../Api/httpAxios";
const CustomerService = {
    index: () => {
        return httpAxios.get(`customer/index`);
    },
    show: (id) => {
        return httpAxios.get(`customer/show/${id}`);
    },
    store: (data) => {
        return httpAxios.post(`customer/store`, data);
    },
    update: (data, id) => {
        return httpAxios.post(`customer/update/${id}`, data);
    },
    destroy: (id) => {
        return httpAxios.delete(`customer/destroy/${id}`);
    },
    status: (id) => {
        return httpAxios.get(`customer/status/${id}`);
    },
    delete: (data, id) => {
        return httpAxios.put(`customer/delete/${id}`, data);
    },
    thungrac: () => {
        return httpAxios.get("customer/thungrac");
    },
}
export default CustomerService;