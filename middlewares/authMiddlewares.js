const jwt = require("jsonwebtoken");
const User= require("../models/userModel")

const authToken=async(req,res,next)=>{
   try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const token = authHeader.split(" ")[1];
    //console.log("check");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //console.log("decoded",decoded);
      req.user=await User.findById(decoded.id).select("-password");
     // console.log("req.user:",req.user);
      next();
   } catch (error) {
    console.log(error);
    res.send({
      success: false, 
      message:error.message
    });
    
   }
}

module.exports=authToken;