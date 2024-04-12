const express = require("express");
const router = express.Router();
const authToken = require("../middlewares/authMiddlewares");
const {accessChat, fetchChats,createGroupChat, renameGroup, addToGroup, removeFromGroup} = require("../controller/chatControllers");

 router.route("/").post(authToken, accessChat);
 router.route("/").get(authToken, fetchChats);
 router.route("/group").post(authToken, createGroupChat);
 router.route("/rename").put(authToken, renameGroup);
 router.route("/groupRemove").put(authToken, removeFromGroup);
 router.route("/groupAdd").put(authToken, addToGroup);

module.exports = router;
