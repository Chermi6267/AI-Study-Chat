const axios = require('axios');


// A function for get a response from Sber GigaChat
async function askAI(accessToken, messages, maxTokens) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0' // Disable SSL Certificate verification

    let data = JSON.stringify({
        "model": "GigaChat:latest",
        "messages": messages, // Message list(roles: system, user, assistant)
        "temperature": 1,
        "top_p": 0.1,
        "n": 1,
        "stream": false,
        "max_tokens": maxTokens, // Maximum of tokens in one message
        "repetition_penalty": 1,
        "update_interval": 0
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}` // Access token
        },
        data: data
    };
    const response = await axios(config);
    return response.data;
}

module.exports = { askAI };