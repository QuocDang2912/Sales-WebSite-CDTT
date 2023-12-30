import axios from "axios";
import { UrlApi } from "./config";

const httpAxios = axios.create({
    baseURL: UrlApi,
    headers: { "X-Custom-Header": "foobar" },
    // headers: {
    //     'Content-Type': 'application/json',
    //   },
});
httpAxios.interceptors.response.use((response) => {
    return response.data;
});

export default httpAxios;
