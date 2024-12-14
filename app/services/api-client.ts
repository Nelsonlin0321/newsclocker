import axios, { AxiosRequestConfig } from "axios";
const URL = "https://newsclocker-dev-apis-561576255562.asia-east2.run.app/";
// const URL = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: `${URL}/api/v1`,
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
