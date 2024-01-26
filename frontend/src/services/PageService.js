import httpAxios from "../Api/httpAxios";

const PageService = {
    index: () => {
        return httpAxios.get(`page/index`);
    },
    show: (id) => {
        return httpAxios.get(`page/show/${id}`);
    },
    store: (data) => {
        return httpAxios.post(`page/store`, data);
    },
    update: (data, id) => {
        return httpAxios.post(`page/update/${id}`, data);
    },
    destroy: (id) => {
        return httpAxios.delete(`page/destroy/${id}`);
    },
    status: (id) => {
        return httpAxios.get(`page/status/${id}`);
    },

    delete: (data, id) => {
        return httpAxios.put(`page/delete/${id}`, data);
    },
    thungrac: () => {
        return httpAxios.get("page/thungrac");
    },


    PostPage: (slug) => {
        return httpAxios.get(`page/post_page/${slug}`);
    },
}
export default PageService;