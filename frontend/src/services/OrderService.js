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
    restore: (data, id) => {
        return httpAxios.put(`order/restore/${id}`, data);
    },
    destroy: (id) => {
        return httpAxios.delete(`order/destroy/${id}`);
    },

    // get lấy các order từ user id
    getOrdersByUserId: (userId) => {
        return httpAxios.get(`order/getOrdersByUserId/${userId}`);
    },


    // momo
    momo_pay: (data) => {
        return httpAxios.post(`order/momo_pay`, data);
    }

}
export default OrderServie;