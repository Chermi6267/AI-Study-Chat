const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config({ path: "../.env" });

// Service for managing tokens
class tokensService {
  // Generating access token service
  async generateAccessToken(id, username, email) {
    const payload = {
      id,
      username,
      email,
    };
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "20m",
    });
  }

  // Generating refresh token service
  async generateRefreshToken(id, username, email) {
    const payload = {
      id,
      username,
      email,
    };
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });
  }

  // Validating refresh token service
  async validateRefreshToken(refreshToken) {
    try {
      const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  // Validating access token service
  async validateAccessToken(accessToken) {
    try {
      const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }
}

module.exports = new tokensService();
