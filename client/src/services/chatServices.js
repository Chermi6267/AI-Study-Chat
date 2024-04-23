import api from "../http";

export default class ChatService {
  static async chatList() {
    return api.get("/chat/chat-list");
  }

  static async chatMessages(chatID, userID) {
    return api.get(`/chat/chat-messages?chatID=${chatID}&userID=${userID}`);
  }

  static async sendText(chatID, text) {
    return api.post("/chat/text-message", { chatID, text });
  }

  static async sendIMG(image, text, chatID) {
    return api.post(
      "/chat/img-message",
      { image, text, chatID },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }
}
