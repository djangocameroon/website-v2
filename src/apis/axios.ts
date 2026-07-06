import axios, { AxiosError, AxiosResponse } from "axios";

const isServer = typeof window === "undefined";

// On the server we talk to the Django API directly — server-side fetches are
// public reads (blog/event/project prefetches, metadata). In the browser every
// call goes through the /api/proxy route handler, which injects the Bearer
// token from the httpOnly session cookie, so the access token never reaches
// client-side JavaScript.
const baseURL = isServer
  ? `${process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL}/api/v1/`
  : "/api/proxy/";

const axiosClient = axios.create({
  baseURL,
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
