import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

import { refreshAuth } from "./refresh-auth";

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

createAuthRefreshInterceptor(client, refreshAuth, {
  statusCodes: [401], // default: [ 401 ]
  pauseInstanceWhileRefreshing: true,
});
