const axios = require('axios');
const { v4: uuidv4 } = require('uuid');


// Function for obtaining an access token from the Giga Chat API
async function getAccessToken(authToken) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0' // Disable SSL Certificate verification

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'RqUID': `${uuidv4()}`, // Creating a UUID (36 characters)
            'Authorization': `Basic ${authToken}` // credentials (98 symbols + ==)
        },
        data: 'scope=GIGACHAT_API_PERS'
    };

    try {
        const response = await axios(config);
        return JSON.parse(JSON.stringify(response.data));

    } catch (error) {
        return error;
    }
}

module.exports = { getAccessToken };