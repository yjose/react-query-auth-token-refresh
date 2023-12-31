import { client, setHeaderToken } from "./client";

export const fetchNewToken = async () => {
  try {
    const token: string = await client
      .get("https://test-api.example.com/refresh-token")
      .then((res) => res.data.token);
    return token;
  } catch (error) {
    return null;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const refreshAuth = async (failedRequest: any) => {
  const newToken = await fetchNewToken();

  if (newToken) {
    failedRequest.response.config.headers.Authorization = "Bearer " + newToken;
    setHeaderToken(newToken);
    // you can set your token in storage too
    // setToken({ token: newToken });
    return Promise.resolve(newToken);
  }
  return Promise.reject("error refreshing token");
};
