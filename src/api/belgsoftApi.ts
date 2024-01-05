import axios from "axios";

export const belgsoftApi = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
    params: {},
});