import httpAxios from "../Api/httpAxios";
const OrderServie = {



    //
    store: (data) => {
        return httpAxios.post(`order/store`, data);
    },

    //

    index: (status) => {
        return httpAxios.get(`order/index/${status}`);
    },
    thungrac: () => {
        return httpAxios.get("order/thungrac");
    },
    show: (id) => {
        return httpAxios.get(`order/show/${id}`);
    },

    update: (data, id) => {
        return httpAxios.post(`order/update/${id}`, data);
    },
    delete: (data, id) => {
        return httpAxios.put(`order/delete/${id}`, data);
    },
    destroy: (id) => {
        return httpAxios.delete(`order/destroy/${id}`);
    },
    status: (id) => {
        return httpAxios.get(`order/status/${id}`);
    },

    // get lấy id của order từ user id
    getOrdersByUserId: (userId) => {
        return httpAxios.get(`order/getOrdersByUserId/${userId}`);
    },

}
export default OrderServie;