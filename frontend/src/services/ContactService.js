

import httpAxios from "../Api/httpAxios";

const ContactServie = {
    index: () => {
        return httpAxios.get(`contact/index`);
    },
    show: (id) => {
        return httpAxios.get(`contact/show/${id}`);
    },
    store: (data) => {
        return httpAxios.post(`contact/store`, data);
    },
    update: (data, id) => {
        return httpAxios.put(`contact/update/${id}`, data);
    },
    destroy: (id) => {
        return httpAxios.delete(`contact/destroy/${id}`);
    },

}
export default ContactServie;