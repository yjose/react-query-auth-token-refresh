import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

import { refreshAuthLogic } from "./refresh-auth-logic";

export const client = axios.create({
  baseURL: "https://test-api.example.com",
});

export const setHeaderToken = (token: string) => {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeHeaderToken = () => {
  //client.defaults.headers.common.Authorization = null;
  delete client.defaults.headers.common.Authorization;
};

createAuthRefreshInterceptor(client, refreshAuthLogic, {
  statusCodes: [401], // default: [ 401 ]
  pauseInstanceWhileRefreshing: true,
});
