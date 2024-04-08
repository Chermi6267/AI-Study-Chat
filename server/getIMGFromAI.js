const axios = require('axios');
const fs = require('fs');


// A function that saves an image from the Sber Giga Chat API
async function getIMGFromAI(imgUuid, accessToken) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Disable SSL Certificate verification

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://gigachat.devices.sberbank.ru/api/v1/files/${imgUuid}/content`, // Image has already been generated and it has its own uuid
        headers: {
            'Accept': 'image/jpeg',
            'Authorization': `Bearer ${accessToken}` // Access token
        },
        responseType: 'arraybuffer' // Indicate that we expect a binary outcome
    };

    axios(config)
        .then((response) => {
            // Write the received data to a file
            fs.writeFileSync(`${imgUuid}.jpg`, response.data);
            return `${imgUuid}.jpg`
        })
        .catch((error) => {
            console.log(error);
            return null
        });
}

module.exports = { getIMGFromAI }