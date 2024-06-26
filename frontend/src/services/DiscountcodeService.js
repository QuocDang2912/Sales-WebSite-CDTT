import httpAxios from "../Api/httpAxios";

const DiscountcodeService = {
    //lấy ra danh sách 
    index: () => {
        return httpAxios.get("discount_codes/index");
    },
    store: (data) => {
        return httpAxios.post(`discount_codes/store`, data);
    },
    show: (id) => {
        return httpAxios.get(`discount_codes/show/${id}`);
    },
    check: (data) => {
        return httpAxios.post(`discount_codes/check`, data);
    },
    update: (data, id) => {
        return httpAxios.post(`discount_codes/update/${id}`, data);
    },
    destroy: (id) => {
        return httpAxios.delete(`discount_codes/destroy/${id}`);
    },
};
export default DiscountcodeService;