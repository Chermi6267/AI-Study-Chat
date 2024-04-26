const ChatRepository = require("../sql/Chat.js");
const AIService = require("../services/AI.js");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

class ChatService {
  async chatList(userID) {
    try {
      const chats = await ChatRepository.getChats(userID);
      return chats;
    } catch (error) {
      console.error(error);
    }
  }

  async chatMessages(chatID, userID) {
    try {
      const messages = await ChatRepository.getMessages(chatID, userID);
      return messages[0];
    } catch (error) {
      console.log(error);
    }
  }

  async textMessage(chatID, userID, textForUser, textForAI, imgPath) {
    try {
      // Checking if there is a chat with certain chatID
      if (!JSON.parse(chatID)) {
        const title =
          textForUser.slice(0, 50) + (textForUser.length > 50 ? "... " : "");
        const chat = await ChatRepository.createChat(userID, title);
        chatID = chat.insertId;
      }

      // Saving user request
      const messageUser = await ChatRepository.saveMessage(
        chatID,
        userID,
        textForUser,
        textForAI,
        imgPath,
        "user"
      );

      // Getting all messages of certain chat
      const messages = await ChatRepository.getMessages(chatID, userID).then(
        (list) => {
          return list[0].map((item) => {
            return {
              role: item["type"],
              content: item["text_for_ai"],
            };
          });
        }
      );

      // Making request to Sber GigaChat with the last 7 messages
      const aiResponse = await AIService.askAI(messages.slice(-7), null);

      // Checking if the response contains an image
      var imgRegex = /<img src=".*?" fuse="(true|false)"\/>/;
      if (imgRegex.test(aiResponse["content"])) {
        var srcIndex = aiResponse["content"].indexOf('src="'); // Finding the initial src index
        var endIndex = aiResponse["content"].indexOf('"', srcIndex + 5); // Finding the final src index
        var srcValue = aiResponse["content"].slice(srcIndex + 5, endIndex); // Getting the uuid of the image
        var restOfString = aiResponse["content"].substring(0, srcIndex - 5); // Getting  the remaining text of the AI response
        const result = await AIService.getIMG(srcValue, null); // Getting and saving image

        // Saving AI response
        const messageAI = await ChatRepository.saveMessage(
          chatID,
          userID,
          restOfString,
          restOfString,
          result,
          "assistant"
        );

        return {
          id: messageAI.insertId,
          chat_id: chatID,
          user_id: userID,
          img_path: result,
          text_for_user: restOfString,
          type: "assistant",
        };
      } else {
        // Saving AI response
        const messageAI = await ChatRepository.saveMessage(
          chatID,
          userID,
          aiResponse["content"],
          aiResponse["content"],
          "",
          "assistant"
        );

        return {
          id: messageAI.insertId,
          chat_id: chatID,
          user_id: userID,
          text_for_user: aiResponse["content"],
          type: "assistant",
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async imgMessage(file, text, chatID, userID) {
    const allowedFileExt = [
      "image/jpeg",
      "image/png",
      "image/bmp",
      "image/webp",
    ];

    if (!allowedFileExt.includes(file.mimetype)) {
      throw new Error("INCORRECT FILE EXTENSION");
    }
    try {
      const imgUuid = uuidv4();

      const imgFolderPath = path.join(__dirname, "..", "public", "img");
      if (!fs.existsSync(imgFolderPath)) {
        fs.mkdirSync(imgFolderPath, { recursive: true });
      }
      const imagePath = path.join(imgFolderPath, `${imgUuid}.jpg`);

      fs.writeFileSync(imagePath, file.data);

      const textForAI =
        (await AIService.recognizeText(imagePath)) + "\n" + text;

      const result = await this.textMessage(
        chatID,
        userID,
        text,
        textForAI,
        `${imgUuid}.jpg`
      );

      return result;
    } catch (error) {
      console.error(error);
    }
  }

  async getIMG(imageName) {
    // The path to the folder with images
    const imagePath = path.join("public", "img", imageName);

    try {
      // Checking if the file exists
      await fs.promises.access(imagePath, fs.constants.F_OK);

      // Reading the file
      const data = await fs.promises.readFile(imagePath);

      return data;
    } catch (err) {
      console.error(err);
      throw new Error("FILE NOT FOUND");
    }
  }
}

module.exports = new ChatService();
