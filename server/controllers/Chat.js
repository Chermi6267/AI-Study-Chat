const dotenv = require("dotenv").config({ path: "../.env" });
const ChatService = require("../services/Chat.js");

class ChatController {
  // Controller for receiving all chat
  async chatList(req, res) {
    try {
      const userID = req.user["id"];
      const chats = await ChatService.chatList(userID);

      res.json(chats);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  // Controller for deleting chat
  async deleteChat(req, res) {
    try {
      const { chatID } = req.params;
      const result = await ChatService.deleteChat(chatID);

      res.send("Chat successfully have been deleted");
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Failed to delete chat" });
    }
  }

  // Controller for receiving all messages in  chat
  async chatMessages(req, res) {
    try {
      const { chatID, userID } = req.query;

      const messages = await ChatService.chatMessages(chatID, userID);
      res.json(messages);
    } catch (error) {
      console.log(error);
      res.status(500).send("Messages list error");
    }
  }

  // Controller for handling text message
  async textMessage(req, res) {
    try {
      const userID = req.user["id"];
      const { chatID, text } = req.body;

      const response = await ChatService.textMessage(
        chatID,
        userID,
        text,
        text,
        ""
      );

      res.send(response);
    } catch (error) {
      console.error(error);
      res.status(400).send("Что-то пошло не так!");
    }
  }

  // Controller for handling image message
  async imgMessage(req, res) {
    try {
      if (!req.files) {
        res.status(400).send("NO FILE");
      }

      const file = req.files["image"];
      const userID = req.user["id"];
      const { text, chatID } = req.body;

      const result = await ChatService.imgMessage(file, text, chatID, userID);

      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
  }

  // Controller for getting image from server
  async getImage(req, res) {
    try {
      const imageName = req.params.imageName;
      const data = await ChatService.getIMG(imageName);

      // Setting the headers for sending the image
      res.setHeader("Content-Type", "image/jpeg");
      res.send(data);
    } catch (error) {
      console.error(error);
      res.status(404).send(error.message);
    }
  }
}

module.exports = new ChatController();
