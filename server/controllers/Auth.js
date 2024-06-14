const authService = require("../services/Auth.js");
const { validationResult } = require("express-validator");
const dotenv = require("dotenv").config({ path: "../.env" });

class authController {
  // User registration controller
  async registration(req, res) {
    try {
      // Validation of the Registration Form
      const validationErrors = validationResult(req);
      if (validationErrors["errors"].length !== 0) {
        return res
          .status(422)
          .json({ message: validationErrors["errors"][0]["msg"] });
      }

      const { username, email, password } = req.body;
      const user = await authService.registration(username, email, password);

      // Saving refresh session in cookie
      res.cookie(
        "refreshToken",
        user.refreshToken,
        JSON.parse(process.env.REFRESH_TOKEN_COOKIE_OPTIONS)
      );
      return res.status(user.status).json(user.data);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Registration error" });
    }
  }

  // User login controller
  async login(req, res) {
    try {
      // Validation of the Login Form
      const validationErrors = validationResult(req);
      if (validationErrors["errors"].length !== 0) {
        return res
          .status(422)
          .json({ message: validationErrors["errors"][0]["msg"] });
      }

      const { username, password } = req.body;
      const user = await authService.login(username, password);

      // Saving refresh session in cookie
      res.cookie(
        "refreshToken",
        user.refreshToken,
        JSON.parse(process.env.REFRESH_TOKEN_COOKIE_OPTIONS)
      );

      return res.status(user.status).json(user.data);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Login error" });
    }
  }

  // User logout controller
  async logout(req, res) {
    try {
      const refreshToken = req.cookies["refreshToken"];
      const token = await authService.logout(refreshToken);

      res.clearCookie("refreshToken");
      res.status(200).json({ message: "User successfully logged out" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Logout error" });
    }
  }

  // Refresh access controller
  async refreshAccessToken(req, res) {
    try {
      const token = req.cookies["refreshToken"];
      const data = await authService.refreshAccessToken(token);

      res.status(data.status).json(data.data);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Refresh access token error" });
    }
  }

  // Get all users controller
  async getAllUsers(req, res) {
    try {
      const data = await authService.getAllUsers();
      res.json(data.data);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Getting all users error" });
    }
  }

  // Add phone controller
  async addPhone(req, res) {
    try {
      const { id } = req.user;
      const { phone } = req.body;
      // Validation of the phone add form
      const validationErrors = validationResult(req);
      if (validationErrors["errors"].length !== 0) {
        return res
          .status(422)
          .json({ message: validationErrors["errors"][0]["msg"] });
      }

      const result = await authService.addPhone(id, phone);

      res.send({
        message: "Phone has been added successfully",
        data: phone,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Phone adding error");
    }
  }

  // Getting user info controller
  async getUserInfo(req, res) {
    try {
      const { id } = req.user;
      const result = await authService.getUserInfo(id);

      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send("Getting user info error");
    }
  }
}

module.exports = new authController();
