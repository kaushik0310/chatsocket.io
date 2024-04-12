const express = require("express");
const router = express.Router();
const authToken=require("../middlewares/authMiddlewares")
const {registerUser,authUser,allUsers}=require("../controller/userControllers")

router.route('/').post(registerUser).get(authToken,allUsers);
router.post('/login',authUser);


module.exports = router;