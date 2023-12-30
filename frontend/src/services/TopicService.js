

import httpAxios from "../Api/httpAxios";

const TopicServie = {
    index: () => {
        return httpAxios.get(`topic/index`);
    },
    show: (id) => {
        return httpAxios.get(`topic/show/${id}`);
    },
    store: (data) => {
        return httpAxios.post(`topic/store`, data);
    },
    update: (data, id) => {
        return httpAxios.put(`topic/update/${id}`, data);
    },
    destroy: (id) => {
        return httpAxios.delete(`topic/destroy/${id}`);
    },

}
export default TopicServie;