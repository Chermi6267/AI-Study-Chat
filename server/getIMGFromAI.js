const axios = require("axios");
const path = require("path");
const fs = require("fs");

// A function that saves an image from the Sber Giga Chat API
async function getIMGFromAI(imgUuid, accessToken) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Disable SSL Certificate verification

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://gigachat.devices.sberbank.ru/api/v1/files/${imgUuid}/content`, // Image has already been generated and it has its own uuid
    headers: {
      Accept: "image/jpeg",
      Authorization: `Bearer ${accessToken}`, // Access token
    },
    responseType: "arraybuffer", // Indicate that we expect a binary outcome
  };

  const imgFolderPath = path.join(__dirname, "public", "img");

  // Проверяем, существует ли папка img, если нет, то создаем ее
  if (!fs.existsSync(imgFolderPath)) {
    fs.mkdirSync(imgFolderPath, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    axios(config)
      .then((response) => {
        const imagePath = path.join(imgFolderPath, `${imgUuid}.jpg`);
        fs.writeFileSync(imagePath, response.data);
        resolve(`${imgUuid}.jpg`);
      })
      .catch((error) => {
        console.log(error);
        // В случае ошибки отклоняем обещание
        reject(error);
      });
  });
}

module.exports = { getIMGFromAI };
