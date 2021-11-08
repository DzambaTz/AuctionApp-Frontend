import api from "../Helpers/api";
class AuthService {
  login(email, password) {
    return api
      .post("auth/signin", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    api.post("auth/logout", {
      userId: this.getCurrentUser().id,
    });
    localStorage.removeItem("user");
  }

  register(firstName, lastName, email, password) {
    return api.post("auth/signup", {
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
}

export default new AuthService();
