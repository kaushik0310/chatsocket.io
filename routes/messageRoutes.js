const express = require("express");
const authToken = require("../middlewares/authMiddlewares");
const { sendMessage, allMessages } = require("../controller/messageControllers");

const router = express.Router();


router.route("/").post(authToken,sendMessage);
router.route("/:chatId").get(authToken,allMessages);

module.exports = router;