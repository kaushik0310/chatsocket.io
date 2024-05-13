const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
//const responseData = require("../helpers/response");
const response = require("../helpers/response");
const authToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    // if (authHeader == undefined || "undefined") {
    //   responseData.message = response;
    //   return response.error(res, responseData);
    // }
    const token = authHeader.split(" ")[1];
    //console.log("check");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log("decoded",decoded);
    req.user = await User.findById(decoded.id).select("-password");
    // console.log("req.user:",req.user);
    // next();
  } catch (error) {
    console.log(error);
      res.send({
        success:false,
        message:error.message
      })    
    //responseData.message = error.message;
    //return response.error(res, responseData);
  }
};

module.exports = authToken;
