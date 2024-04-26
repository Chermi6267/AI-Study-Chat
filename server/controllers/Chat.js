const dotenv = require("dotenv").config({ path: "../.env" });
const ChatService = require("../services/Chat.js");

class ChatController {
  async chatList(req, res) {
    const userID = req.user["id"];
    const chats = await ChatService.chatList(userID);

    res.json(chats);
  }

  async chatMessages(req, res) {
    const { chatID, userID } = req.query;

    const messages = await ChatService.chatMessages(chatID, userID);
    res.json(messages);
  }

  async textMessage(req, res) {
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
  }

  async imgMessage(req, res) {
    if (!req.files) {
      res.status(400).send("NO FILE");
    }
    const file = req.files["image"];
    const userID = req.user["id"];
    const { text, chatID } = req.body;

    try {
      const result = await ChatService.imgMessage(file, text, chatID, userID);

      res.send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async getImage(req, res) {
    const imageName = req.params.imageName;

    try {
      const data = await ChatService.getIMG(imageName);

      // Setting the headers for sending the image
      res.setHeader("Content-Type", "image/jpeg");
      res.send(data);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }
}

module.exports = new ChatController();