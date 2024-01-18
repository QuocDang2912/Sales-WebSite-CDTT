

import httpAxios from "../Api/httpAxios";

const MenuServie = {
    getList: (status) => {
        return httpAxios.get(`menu/index/${status}`);
    },
    getById: (id) => {
        return httpAxios.get(`menu/show/${id}`);
    },
    store: (data) => {
        return httpAxios.post(`menu/store`, data);
    },
    update: (data, id) => {
        return httpAxios.post(`menu/update/${id}`, data);
    },
    destroy: (id) => {
        return httpAxios.delete(`menu/destroy/${id}`);
    },
    delete: (id) => {
        return httpAxios.get(`menu/delete/${id}`);
    },
    restore: (id) => {
        return httpAxios.get(`menu/restore/${id}`);
    },
    status: (id) => {
        return httpAxios.get(`menu/status/${id}`);
    },
    menuParenId: (id) => {
        return httpAxios.get(`menu_parentid/${id}`);
    }

}
export default MenuServie;