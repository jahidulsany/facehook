import axios from "axios";
import { useEffect } from "react";
import { api } from "../api";
import { useAuth } from "./useAuth";
const useAxios = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    // Add a response intercepters
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.authToken;
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add a response intercepters
    const responseIntercept = api.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          const refreshToken = auth?.refreshToken;
          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_BASE_URL}auth/refresh-token`,
            { refreshToken }
          );

          const { token } = response.data;
          setAuth({ ...auth, authToken: token });
          originalRequest.headers.Authorization = "Bearer " + token;

          return axios(originalRequest);
        }
        return Promise.reject(error);
      }
    );

    // cleanup
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth.authToken]);

  return { api };
};
export default useAxios;
