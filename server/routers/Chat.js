const isAuthenticated = require("../middleware/isAuthenticated.js");
const Router = require("express");
const router = new Router();
const controller = require("../controllers/Chat.js");

router.get("/chat-list", isAuthenticated, controller.chatList);
router.get("/chat-messages", isAuthenticated, controller.chatMessages);
router.post("/text-message", isAuthenticated, controller.textMessage);
router.post("/img-message", isAuthenticated, controller.imgMessage);
router.get("/images/:imageName", controller.getImage);

module.exports = router;
