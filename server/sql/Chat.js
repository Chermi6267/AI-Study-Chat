const db = require("../db.js").connection.promise();

class ChatRepository {
  async getChats(userID) {
    try {
      const result = await db.query(
        `SELECT * FROM chats WHERE user_id = ? ORDER BY created_at DESC`,
        [userID]
      );
      return result[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteChat(chatID) {
    try {
      const result = await db.query(`DELETE FROM chats WHERE id = ?`, [chatID]);

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getMessages(chatID, userID) {
    try {
      const result = await db.query(
        `SELECT * FROM messages WHERE chat_id = ? AND user_id = ?`,
        [chatID, userID]
      );
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getChat(chatID, userID) {
    try {
      const chat = await db.query(
        `SELECT * FROM chats WHERE id = ? AND user_id = ?`,
        [chatID, userID]
      );
      return chat[0];
    } catch (error) {
      console.log(error);
    }
  }

  async getTimestamp() {
    var now = new Date();
    var newYakutskTime = new Date(
      now.getTime() + now.getTimezoneOffset() * 60000 + 32400000
    );
    const createdAt = new Date(newYakutskTime.getTime());
    return createdAt;
  }

  async createChat(userID, title) {
    try {
      if (title.trim() !== "") {
        const [chat] = await db.query(
          "INSERT INTO chats SET user_id = ?, title = ?, created_at = ?",
          [userID, title, await this.getTimestamp()]
        );

        return chat;
      } else {
        title = "Новый чат";
        const [chat] = await db.query(
          "INSERT INTO chats SET user_id = ?, title = ?, created_at = ?",
          [userID, title, await this.getTimestamp()]
        );

        return chat;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async saveMessage(chatID, userID, textForUser, textForAI, imgPath, type) {
    try {
      const [result] = await db.query(
        `INSERT INTO messages SET chat_id = ?, user_id = ?, text_for_user = ?, text_for_ai = ?, img_path = ?, type = ?, created_at = ?`,
        [
          chatID,
          userID,
          textForUser,
          textForAI,
          imgPath,
          type,
          await this.getTimestamp(),
        ]
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ChatRepository();
