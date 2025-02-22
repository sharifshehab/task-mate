import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://task-mate-puce.vercel.app",
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;