import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://edu-manage-server-two.vercel.app/'
})

const useAxiosPublic = () => {
    return axiosPublic;
}

export default useAxiosPublic;