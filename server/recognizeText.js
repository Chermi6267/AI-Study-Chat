const Tesseract = require("tesseract.js");

async function recognizeText(imagePath) {
  try {
    const {
      data: { text },
    } = await Tesseract.recognize(imagePath, "rus+eng");

    return text;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { recognizeText };
