

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
        return httpAxios.post(`user/update/${id}`, data);
    },
    destroy: (id) => {
        return httpAxios.delete(`user/destroy/${id}`);
    },
    status: (id) => {
        return httpAxios.get(`user/status/${id}`);
    },
    delete: (data, id) => {
        return httpAxios.put(`user/delete/${id}`, data);
    },
    thungrac: () => {
        return httpAxios.get("user/thungrac");
    },


    login: (data) => {
        return httpAxios.post(`user/login`, data);
    },

    changePass: (data, id) => {
        return httpAxios.post(`user/changePassword/${id}`, data);
    },

}
export default UserServie;