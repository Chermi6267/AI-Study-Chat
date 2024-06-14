const dotenv = require("dotenv").config({ path: "../.env" });
const getAccessToken = require("../getAccessToken.js").getAccessToken;
const askAI = require("../askAI.js").askAI;
const getIMGFromAI = require("../getIMGFromAI.js").getIMGFromAI;
const { ocrSpace } = require("ocr-space-api-wrapper");

class AIService {
  // Service for getting GigaChat's response
  async askAI(messages) {
    try {
      const accessToken = await getAccessToken(process.env.SBER_API_KEY);
      const result = await askAI(accessToken["access_token"], messages, 1000);

      return result["choices"][0]["message"];
    } catch (error) {
      throw error;
    }
  }

  // Service for getting image by uuid from GigaChat
  async getIMG(imgUuid) {
    try {
      const accessToken = await getAccessToken(process.env.SBER_API_KEY);
      const result = await getIMGFromAI(imgUuid, accessToken["access_token"]);

      return result;
    } catch (error) {
      throw error;
    }
  }

  // Service for getting text from image by OCR Space
  async recognizeText(imagePath) {
    try {
      const res2 = await ocrSpace(imagePath, {
        apiKey: `<${process.env.OCR_SPACE_API_KEY}>`,
        language: "rus",
      });

      return res2["ParsedResults"][0]["ParsedText"];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AIService();
