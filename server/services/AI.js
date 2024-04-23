const dotenv = require("dotenv").config({ path: "../.env" });
const getAccessToken = require("../getAccessToken.js").getAccessToken;
const askAI = require("../askAI.js").askAI;
const getIMGFromAI = require("../getIMGFromAI.js").getIMGFromAI;
const Tesseract = require("tesseract.js");

class AIService {
  async askAI(messages, accessToken) {
    try {
      if (!accessToken) {
        accessToken = await getAccessToken(process.env.SBER_API_KEY);
      }

      const result = await askAI(accessToken["access_token"], messages, 1000);

      return result["choices"][0]["message"];
    } catch (error) {
      if (error.response && error.response.status === 401) {
        accessToken = await getAccessToken(process.env.SBER_API_KEY);
        const updatedResult = await askAI(
          accessToken["access_token"],
          messages,
          10000
        );

        return updatedResult["choices"][0]["message"];
      } else {
        console.error("Error:", error);
      }
    }
  }

  async getIMG(imgUuid, accessToken) {
    try {
      if (!accessToken) {
        accessToken = await getAccessToken(process.env.SBER_API_KEY);
      }
      const result = await getIMGFromAI(imgUuid, accessToken["access_token"]);
      return result;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        accessToken = await getAccessToken(process.env.SBER_API_KEY);
        const updatedResult = await getIMGFromAI(
          imgUuid,
          accessToken["access_token"]
        );
        return updatedResult;
      } else {
        console.error(error);
      }
    }
  }

  async recognizeText(imagePath) {
    try {
      const {
        data: { text },
      } = await Tesseract.recognize(imagePath, "rus+eng");

      return text;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new AIService();
