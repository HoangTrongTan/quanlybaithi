import axios from "axios";

const api = axios.create( {
    baseURL:"https://localhost:7029/api/"
} );

export const get = async (path) => {
    const res = await api.get(path);
    return res.data;
}

export default api;