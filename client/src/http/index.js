import axios from "axios";

// API
const api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});

// Installing access token in headers for each request
api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

// Handling access token updates
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      console.log("401");
      try {
        // Processing one request once
        originalRequest._isRetry = true;

        // Request for new access token
        const response = await axios.post(
          process.env.REACT_APP_API_URL + "/authentication/refreshToken",
          {},
          { withCredentials: true }
        );

        // Storing new access token
        localStorage.setItem("token", response.data["accessToken"]);
        console.log("ACCESS_TOKEN ОБНОВЛЁН");

        return api.request(originalRequest);
      } catch (error) {
        console.log("НЕ АВТОРИЗОВАН");
      }
    }
    throw error;
  }
);

export default api;
