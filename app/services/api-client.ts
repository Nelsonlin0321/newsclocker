import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.BACKEND_API_URL!}/api/v1`,
});

class APIClient<T> {
  endpoint: string;
  headers?: Record<string, string>;

  constructor(endpoint: string, headers?: Record<string, string>) {
    this.endpoint = endpoint;
    this.headers = headers;
  }

  get = async (config?: AxiosRequestConfig<any>) => {
    const res = await axiosInstance.get<T>(this.endpoint, {
      ...config,
      headers: {
        ...this.headers, // Use headers from the class
        ...config?.headers, // Preserve existing headers if any
      },
    });
    return res.data;
  };
}

export default APIClient;
