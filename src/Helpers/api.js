import authService from "../Auth/auth.service";
import { BASE_URL } from "../Helpers/baseConfig";
import authHeader from "./auth-header";

const originalFetch = fetch;
fetch = function () {
  let self = this;
  let args = arguments;

  return originalFetch.apply(self, args).then(async function (data) {
    if (data.status === 401) {
      let response = await originalFetch(BASE_URL + "auth/refreshtoken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: authService.getRefreshToken(),
        }),
      });
      if (response.status === 401) {
        return {};
      }
      await response.text().then((text) => {
        let newCredentials = JSON.parse(text);
        let user = authService.getCurrentUser();
        user.token = newCredentials.accessToken;
        args[1].headers.Authorization = "Bearer " + newCredentials.accessToken;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", newCredentials.accessToken);
        return text;
      });
      return fetch(...args);
    } else {
      return data;
    }
  });
};

const api = {
  post: (route, data) => {
    return execute(route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader(),
      },
      body: JSON.stringify(data),
    });
  },
  get: (route) => {
    return execute(route, {
      method: "GET",
      headers: {
        Authorization: authHeader(),
      },
    });
  },
};

const execute = async (route, config) => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + route, config).then(
      (response) => {
        response.text().then(
          (text) => {
            const json = JSON.parse(text);
            resolve({
              headers: response.headers,
              status: response.status,
              body: json,
            });
          },
          (err) => reject(err)
        );
      },
      (err) => reject(err)
    );
  });
};

export default api;
