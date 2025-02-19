import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export const axiosSecure = axios.create({
    baseURL: 'https://edu-manage-server-two.vercel.app/'
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();
    // request interceptor  to added athorization header
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('request stop by interceptors', token);
        config.headers.athorization = `Bearer ${token}`
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });


    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        console.log("status error in the interceptor", status);
        // unAthorize user move in logIn page
        if (status === 401 || status === 403) {
            await logOut;
            navigate('/logIn')
        }
        return Promise.reject(error);
    })


    return axiosSecure;
}

export default useAxiosSecure;