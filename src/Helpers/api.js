import authService from "../Auth/auth.service";
import { BASE_URL } from "../Helpers/baseConfig";
import authHeader from "./auth-header";
import statusCodes from "../Helpers/status-codes";

const originalFetch = fetch;
fetch = function () {
  let self = this;
  let args = arguments;

  return originalFetch.apply(self, args).then(async function (data) {
    if (data.status === statusCodes.UNAUTHORIZED) {
      let response = await originalFetch(BASE_URL + "auth/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: authService.getRefreshToken(),
        }),
      });
      if (response.status === statusCodes.UNAUTHORIZED) {
        return response;
      }
      await response.text().then((text) => {
        let newCredentials = text?.length > 0 ? JSON.parse(text) : {};
        let user = authService.getCurrentUser();
        user.token = newCredentials?.accessToken;
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
  post: (route, data, url) => {
    return execute(
      route,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: data?.headers?.Authorization
            ? data.headers.Authorization
            : authHeader(),
        },
        body: JSON.stringify(data),
      },
      url
    );
  },
  get: (route, url) => {
    return execute(
      route,
      {
        method: "GET",
        headers: {
          Authorization: authHeader(),
        },
      },
      url
    );
  },
  put: (route, data, url) => {
    return execute(
      route,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: data?.headers?.Authorization
            ? data.headers.Authorization
            : authHeader(),
        },
        body: JSON.stringify(data),
      },
      url
    );
  },
};

const execute = async (route, config, url = BASE_URL) => {
  return new Promise((resolve, reject) => {
    fetch(url + route, config)
      .then(
        (response) => {
          response?.text()?.then(
            (text) => {
              const json = text?.length > 0 ? JSON.parse(text) : {};
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
      )
      .catch((error) => {
        reject(error);
      });
  });
};

export default api;
