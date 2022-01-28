import axios from "axios";

const baseApi = process.env.REACT_APP_BASE_API;

export default axios.create({
    baseURL: baseApi,
});
