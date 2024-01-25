

import httpAxios from "../Api/httpAxios";

const MenuServie = {
    //lấy ra danh sách
    index: () => {
        return httpAxios.get("menu/index");
    },
    getAllMenus: () => {
        return httpAxios.get("menu/getAllMenus");
    },
    thungrac: () => {
        return httpAxios.get("menu/thungrac");
    },
    show: (id) => {
        return httpAxios.get(`menu/show/${id}`);
    },
    store: (data) => {
        return httpAxios.post(`menu/store`, data);
    },
    update: (data, id) => {
        return httpAxios.post(`menu/update/${id}`, data);
    },
    delete: (data, id) => {
        return httpAxios.put(`menu/delete/${id}`, data);
    },
    destroy: (id) => {
        return httpAxios.delete(`menu/destroy/${id}`);
    },
    status: (id) => {
        return httpAxios.get(`menu/status/${id}`);
    },
}
export default MenuServie;