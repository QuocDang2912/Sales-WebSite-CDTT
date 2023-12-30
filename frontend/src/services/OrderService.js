

import httpAxios from "../Api/httpAxios";

const OrderServie = {
    index: () => {
        return httpAxios.get(`order/index`);
    },
    show: (id) => {
        return httpAxios.get(`order/show/${id}`);
    },
    store: (data) => {
        return httpAxios.post(`order/store`, data);
    },
    update: (data, id) => {
        return httpAxios.put(`order/update/${id}`, data);
    },
    destroy: (id) => {
        return httpAxios.delete(`order/destroy/${id}`);
    },

}
export default OrderServie;