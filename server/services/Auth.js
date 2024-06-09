const authRepository = require("../sql/Auth.js");
const tokensRepository = require("../sql/Tokens.js");
const tokensService = require("./Tokens.js");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config({ path: "../.env" });

// Service for working with users
class authService {
  // User registration service
  async registration(username, email, password) {
    try {
      // Verifying a user with this name
      const candidate = await authRepository.getUser(username);
      if (candidate[0].length !== 0) {
        return {
          status: 409,
          data: { message: "Пользователь с этим именем уже зарегистрирован" },
        };
      }

      // Hash the password
      const hashPassword = bcrypt.hashSync(password, 16);

      // Creating a user
      const user = await authRepository.createUser(
        username,
        email,
        hashPassword
      );

      // Generating refresh and access token
      const refreshToken = await tokensService.generateRefreshToken(
        user.insertId,
        username,
        email,
        ""
      );
      const accessToken = await tokensService.generateAccessToken(
        user.insertId,
        username,
        email,
        ""
      );

      // Saving refresh session in db
      const token = await tokensRepository.createRefreshSession(
        user.insertId,
        refreshToken
      );

      return {
        status: 200,
        refreshToken: refreshToken,
        data: {
          message: "User was successfully registered",
          data: {
            id: user.insertId,
            username: username,
            email: email,
            phone: "",
            access_token: accessToken,
          },
        },
      };
    } catch (error) {
      console.error(error);
    }
  }

  // User login service
  async login(username, password) {
    try {
      // Verifying a user with this name
      const user = await authRepository.getUser(username);

      if (user[0].length === 0) {
        return {
          status: 400,
          data: { message: "Неправильная пара логин/пароль" },
        };
      }

      // Verifying the password
      const validPassword = bcrypt.compareSync(
        password,
        user[0][0]["password"]
      );
      if (!validPassword) {
        return {
          status: 400,
          data: { message: "Неправильная пара логин/пароль" },
        };
      }

      // Updating users's refresh token
      const refreshToken = await tokensService.generateRefreshToken(
        user[0][0]["id"],
        user[0][0]["username"],
        user[0][0]["email"],
        user[0][0]["phone"]
      );
      const updateRefreshSession = await tokensRepository.updateRefreshSession(
        user[0][0]["id"],
        refreshToken
      );

      // Generating access token
      const accessToken = await tokensService.generateAccessToken(
        user[0][0]["id"],
        user[0][0]["username"],
        user[0][0]["email"],
        user[0][0]["phone"]
      );

      return {
        status: 200,
        refreshToken: refreshToken,
        data: {
          message: "User was successfully logged in",
          data: {
            id: user[0][0]["id"],
            username: user[0][0]["username"],
            email: user[0][0]["email"],
            phone: user[0][0]["phone"],
            access_token: accessToken,
          },
        },
      };
    } catch (error) {
      console.error(error);
    }
  }

  // User logout service
  async logout(refreshToken) {
    try {
      const token = await tokensRepository.deleteRefreshSession(refreshToken);
      return token;
    } catch (error) {
      console.error(error);
    }
  }

  // Refresh access service
  async refreshAccessToken(refreshToken) {
    try {
      // Validating refresh token
      if (!refreshToken) {
        return { status: 401, data: { message: "Refresh token is missing" } };
      }
      const userData = await tokensService.validateRefreshToken(refreshToken);
      if (!userData) {
        return { status: 401, data: { message: "Refresh token is incorrect" } };
      }

      // Generating access token
      const accessToken = await tokensService.generateAccessToken(
        userData["id"],
        userData["username"],
        userData["email"],
        userData["phone"]
      );

      return {
        status: 200,
        data: {
          id: userData["id"],
          username: userData["username"],
          email: userData["email"],
          phone: userData["phone"],
          accessToken: accessToken,
        },
      };
    } catch (error) {
      console.error(error);
    }
  }

  // Get all users service
  async getAllUsers() {
    try {
      const data = await authRepository.getAllUsers();
      return {
        status: 200,
        data: {
          data,
        },
      };
    } catch (error) {
      console.error(error);
    }
  }

  async addPhone(userID, phone, username, email) {
    try {
      const result = await authRepository.addPhone(userID, phone);
      const newAccessToken = await tokensService.generateAccessToken(
        userID,
        username,
        email,
        phone
      );
      const newRefreshToken = await tokensService.generateRefreshToken(
        userID,
        username,
        email,
        phone
      );
      const test = await tokensRepository.updateRefreshSession(
        userID,
        newRefreshToken
      );

      return [newAccessToken, newRefreshToken];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new authService();
