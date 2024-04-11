import httpAxios from "../Api/httpAxios";

const CommentService = {
    index: (postId) => {
        console.log("🚀 ~ postId:", postId)
        return httpAxios.get(`comment/index/${postId}`);
    },
    show: (id) => {
        return httpAxios.get(`comment/show/${id}`);
    },
    store: (data) => {
        return httpAxios.post(`comment/store`, data);
    },
    update: (id, data) => {
        return httpAxios.post(`comment/update/${id}`, data);
    },
    destroy: (id) => {
        return httpAxios.delete(`comment/destroy/${id}`);
    },
    status: (id) => {
        return httpAxios.get(`comment/status/${id}`);
    },
    delete: (data, id) => {
        return httpAxios.put(`comment/delete/${id}`, data);
    },
    thungrac: () => {
        return httpAxios.get("comment/thungrac");
    },

}
export default CommentService;