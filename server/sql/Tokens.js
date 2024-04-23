const db = require("../db.js").connection.promise();

// Repository for managing tokens
class tokensRepository {
  // Service for creating refresh session
  async createRefreshSession(userID, refreshToken) {
    try {
      const refreshTokenDB = await db.query(
        `INSERT INTO tokens SET user_id = ?, refresh_token = ?`,
        [userID, refreshToken]
      );
      return refreshTokenDB;
    } catch (error) {
      return console.error("Error creating refresh session:", error);
    }
  }

  // Service for updating refresh session
  async updateRefreshSession(userID, refreshToken) {
    try {
      // Check for refresh session
      const refreshSession = await db.query(
        `SELECT * FROM tokens WHERE user_id = ?`,
        userID
      );
      if (refreshSession[0].length === 0) {
        const refreshTokenDB = await db.query(
          `INSERT INTO tokens SET user_id = ?, refresh_token = ?`,
          [userID, refreshToken]
        );
        return refreshTokenDB;
      }
      const updateRefreshToken = await db.query(
        `UPDATE tokens SET refresh_token = ? WHERE user_id = ?`,
        [refreshToken, userID]
      );
      return updateRefreshToken;
    } catch (error) {
      return console.error("Error updating refresh session:", error);
    }
  }

  // Service for deleting refresh session
  async deleteRefreshSession(refreshToken) {
    try {
      const token = await db.query(
        `DELETE FROM tokens WHERE refresh_token = ?`,
        [refreshToken]
      );
      return token;
    } catch (error) {
      return console.error("Error updating refresh session:", error);
    }
  }
}

module.exports = new tokensRepository();
