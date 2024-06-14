import api from "../http";

export default class AuthServices {
  // Handling login
  static async login(username, password) {
    return api.post("/authentication/login", { username, password });
  }

  // Handling registration
  static async registration(username, email, password) {
    return api.post("/authentication/registration", {
      username,
      email,
      password,
    });
  }

  // Handling logout
  static async logout() {
    return api.get("/authentication/logout");
  }

  // Handling phone adding
  static async addPhone(phone) {
    return api.put("/authentication/add-phone", { phone });
  }

  // Handling getting user info
  static async getUserInfo(phone) {
    return api.get("/authentication/get-user-info");
  }
}
