import axios from "axios";

export const fetchNewToken = async () => {
  return axios
    .get("https://test-api.example.com/refresh-token")
    .then((res) => res.data.token);
};
