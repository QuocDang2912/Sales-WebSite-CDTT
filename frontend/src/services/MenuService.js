

import httpAxios from "../Api/httpAxios";

const MenuServie = {
    index: () => {
        return httpAxios.get(`menu/index`);
    },
    show: (id) => {
        return httpAxios.get(`menu/show/${id}`);
    },
    store: (data) => {
        return httpAxios.post(`menu/store`, data);
    },
    update: (data, id) => {
        return httpAxios.put(`menu/update/${id}`, data);
    },
    destroy: (id) => {
        return httpAxios.delete(`menu/destroy/${id}`);
    },

}
export default MenuServie;