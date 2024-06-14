const express = require("express");
const http = require("http");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./db.js").connection.promise();
const Fingerprint = require("express-fingerprint");
const authRouter = require("./routers/Auth.js");
const chatRouter = require("./routers/Chat.js");
const expressFileUpload = require("express-fileupload");

const app = express();
app.use(expressFileUpload());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use("/authentication", authRouter);
app.use("/chat", chatRouter);

const server = http.createServer(app);

// Simple check for server start
app.get("/", async (req, res) => {
  try {
    const result = "THE SERVER HAS STARTED SUCCESSFULLY";
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = process.env.PORT || 5555;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
