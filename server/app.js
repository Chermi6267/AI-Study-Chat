const express = require('express');
const { getAccessToken } = require('./getAccessToken');
const app = express();
const dotenv = require('dotenv').config({ path: '../.env' });

const authToken = process.env.AUTH_TOKEN
const port = process.env.PORT

app.get('/', async (req, res) => {
    res.send(await getAccessToken(authToken));
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});