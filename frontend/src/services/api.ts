import axios from "axios";
import type { AxiosRequestConfig, Method } from "axios";

const api = axios.create({
  baseURL: "https://coder-or-talker.onrender.com",
});

export async function httpRequest(
  endpoint: string,
  method: Method,
  additionalConfig?: AxiosRequestConfig<any>
): Promise<any> {
  const url = `${endpoint}`;
  const config = { method, ...additionalConfig };

  const response = await api(url, config);

  return "data" in response ? response.data : response;
}

export default api;
