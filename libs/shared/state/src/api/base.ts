import axios, {
  AxiosInstance,
  AxiosResponse,
  CancelToken,
  CancelTokenSource
} from "axios";

type GetCancelTokenSource = () => CancelTokenSource;

const api: AxiosInstance = axios.create({ timeout: 10000 });

export const getCancelTokenSource: GetCancelTokenSource =
  axios.CancelToken.source;

export const apiGet = <T>(url: string, cancelToken?: CancelToken) =>
  api.get<unknown, AxiosResponse<T>>(url, { cancelToken });
