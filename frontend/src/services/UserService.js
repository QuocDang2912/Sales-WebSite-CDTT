

import httpAxios from "../Api/httpAxios";

const UserServie = {
    index: () => {
        return httpAxios.get(`user/index`);
    },
    show: (id) => {
        return httpAxios.get(`user/show/${id}`);
    },
    store: (data) => {
        return httpAxios.post(`user/store`, data);
    },
    update: (data, id) => {
        return httpAxios.user(`user/update/${id}`, data);
    },
    destroy: (id) => {
        return httpAxios.delete(`user/destroy/${id}`);
    },

}
export default UserServie;