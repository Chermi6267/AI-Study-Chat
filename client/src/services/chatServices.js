import api from "../http";

export default class ChatService {
  // Getting all chats
  static async chatList() {
    return api.get("/chat/chat-list");
  }

  // Getting chat's messages
  static async chatMessages(chatID, userID) {
    return api.get(`/chat/chat-messages?chatID=${chatID}&userID=${userID}`);
  }

  // Sending text request
  static async sendText(chatID, text) {
    return api.post("/chat/text-message", { chatID, text });
  }

  // Deleting chat
  static async deleteChat(chatID) {
    return api.delete(`/chat/delete-chat/${chatID}`);
  }

  // Sending image request
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
