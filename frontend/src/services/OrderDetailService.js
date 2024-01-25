import httpAxios from "../Api/httpAxios";
const OrderDetailService = {

    // của me
    store: (data) => {
        return httpAxios.post(`orderdetail/store`, data);
    },

    // của bò
    store1: (data) => {
        return httpAxios.post(`orderdetail/store1`, data);
    },
}
export default OrderDetailService;