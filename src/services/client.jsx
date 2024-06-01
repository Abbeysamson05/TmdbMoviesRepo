import axios from "axios";
const API_BASE_URL = "https://api.themoviedb.org/3";
const headers = (token) => {
  if (token === "") {
    return {
      "Content-Type": "application/json",
      Authorization: "Notoken",
    };
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

const api = {
  get: ({ url, token }) => {
    return axiosInstance
      .get(`${API_BASE_URL}/${url}`, {
        headers: headers(token || ""),
      })
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        throw error;
      });
  },
};

export default api;
