// const readline = require("readline");
// const getAccessToken = require("./getAccessToken").getAccessToken;
// const askAI = require("./askAI").askAI;

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Disable SSL Certificate verification

// let accessToken = null;
// let messages = [];

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// async function processInput(input) {
//   try {
//     if (!accessToken) {
//       accessToken = await getAccessToken(
//         "NDMwOGVlYWUtMTA1NC00NTMzLTg0MjYtNWE5YzE1YjJlMTM4OmYzMjhhYTJhLTgwYTMtNDBmOC1hMjk0LWZjYWVmNjVmMzc3ZQ=="
//       );
//       console.log(accessToken);
//     }
//     messages.push({ role: "user", content: input });
//     const result = await askAI(accessToken["access_token"], messages, 1000);
//     messages.push(result["choices"][0]["message"]);
//     console.log(messages);
//     console.log(result["choices"][0]["message"]);
//   } catch (error) {
//     if (error.response && error.response.status === 401) {
//       accessToken = await getAccessToken(
//         "NDMwOGVlYWUtMTA1NC00NTMzLTg0MjYtNWE5YzE1YjJlMTM4OmYzMjhhYTJhLTgwYTMtNDBmOC1hMjk0LWZjYWVmNjVmMzc3ZQ=="
//       );
//       const updatedResult = await askAI(
//         accessToken["access_token"],
//         messages,
//         1000
//       );
//       messages.push(updatedResult["choices"][0]["message"]);
//       console.log(messages);
//       console.log(updatedResult["choices"][0]["message"]);
//     } else {
//       console.error("Error:", error);
//     }
//   }
// }

// function askQuestion() {
//   rl.question("Введите ваш вопрос: ", async (input) => {
//     await processInput(input);
//     askQuestion();
//   });
// }

// askQuestion();
const Tesseract = require("tesseract.js");
// Путь к вашему изображению
const imagePath =
  "public/img/18383660_75b31643e3d3c27f9a87f36587d85b53_800.jpg";

// Функция для распознавания текста
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

// // Вызов функции распознавания текста
// recognizeText(imagePath);
