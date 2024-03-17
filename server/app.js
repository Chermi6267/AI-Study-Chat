const express = require('express');
const http = require('http');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser')
const cors = require('cors')
const db = require('./db.js').connection.promise()
const Fingerprint = require('express-fingerprint')
const authRouter = require('./routers/Auth.js')


const app = express();
app.use(cookieParser())
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }))
app.use(express.json())
app.use('/authentication', authRouter)

const server = http.createServer(app);

app.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users');
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


const PORT = process.env.PORT || 5500
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});