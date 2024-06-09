const db = require("../db.js").connection.promise();

// Repository for working with users
class authRepository {
  // Get user
  async getUser(username) {
    try {
      const user = await db.query("SELECT * FROM users WHERE username = ?", [
        username,
      ]);
      return user;
    } catch (error) {
      return console.error("Error receiving user:", error);
    }
  }

  // Create user
  async createUser(username, email, hashPassword) {
    try {
      const [result] = await db.query(
        "INSERT INTO users SET username = ?, email = ?, password = ?",
        [username, email, hashPassword]
      );
      return result;
    } catch (error) {
      return console.error("Error creating user", error);
    }
  }

  // Get all users
  async getAllUsers() {
    try {
      return await db.query(`SELECT * FROM users`);
    } catch (error) {
      return console.error("Error receiving users:", error);
    }
  }

  async addPhone(userID, phone) {
    try {
      const result = await db.query(`UPDATE users SET phone = ? WHERE id = ?`, [
        phone,
        userID,
      ]);

      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new authRepository();
