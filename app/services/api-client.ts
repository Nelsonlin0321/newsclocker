import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.BACKEND_API_URL!}/api/v1`,
});

class APIClient<T> {
  endpoint: string;
  headers: Record<string, string>;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.headers = {
      "X-API-Key": process.env.API_KEY!,
      "Content-Type": "application/json",
      accept: "application/json",
    };
  }

  get = async (config?: AxiosRequestConfig<any>) => {
    const res = await axiosInstance.get<T>(this.endpoint, {
      ...config,
      method: "GET",
      headers: this.headers,
    });
    return res.data;
  };

  post = async (data: any, config?: AxiosRequestConfig<any>) => {
    const res = await axiosInstance.post<T>(this.endpoint, data, {
      ...config,
      headers: this.headers,
    });
    return res.data;
  };
}

export default APIClient;
