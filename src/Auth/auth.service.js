import api from "../Helpers/api";
class AuthService {
  login(email, password) {
    return api
      .post("auth/sign-in", {
        email,
        password,
      })
      .then((response) => {
        if (response?.body?.token) {
          localStorage.setItem("user", JSON.stringify(response.body));
          localStorage.setItem(
            "accessToken",
            JSON.stringify(response.body.token)
          );
          localStorage.setItem(
            "refreshToken",
            JSON.stringify(response.body.refreshToken)
          );
        }
        return response;
      });
  }

  logout() {
    api.post("auth/logout", {
      userId: this.getCurrentUser().id,
    });
    localStorage.removeItem("user");
    window.location.replace("/");
  }

  register(firstName, lastName, email, password) {
    return api.post("auth/sign-up", {
      firstName,
      lastName,
      email,
      password,
      role: ["user", "seller"],
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  getRefreshToken() {
    return JSON.parse(localStorage.getItem("refreshToken"));
  }

  getAccessToken() {
    return JSON.parse(localStorage.getItem("accessToken"));
  }
}

export default new AuthService();
