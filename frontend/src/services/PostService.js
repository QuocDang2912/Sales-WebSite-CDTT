

import httpAxios from "../Api/httpAxios";

const PostServie = {
    index: () => {
        return httpAxios.get(`post/index`);
    },
    show: (id) => {
        return httpAxios.get(`post/show/${id}`);
    },
    store: (data) => {
        return httpAxios.post(`post/store`, data);
    },
    update: (data, id) => {
        return httpAxios.put(`post/update/${id}`, data);
    },
    destroy: (id) => {
        return httpAxios.delete(`post/destroy/${id}`);
    },

}
export default PostServie;