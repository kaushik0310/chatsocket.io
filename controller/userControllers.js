const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const registerUser = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
      throw new Error("all fields are required");
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      throw new Error("user already registered");
    }
      const user = new User({name,email,password,pic});
        await user.save();
    //1.  const user = await User.create({ name, email, password, pic });
    //2.  const user = await new User({name,email,password,pic}).save();
    //2.  const user = await User({name,email,password,pic}).save();
    //4.  const user =await new User(req.body).save();
    //5.   const user =await User(req.body).save()
    res.send({
      success: true,
      message: "user and token created successfully",
      user,
      //token: generateToken(user._id),
      // _id:user._id,
      // name: user.name,
      // email:user.email,
      // pic:user.pic,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const authUser=async(req,res)=>{
  try {
        const { email, password } = req.body;
        if ((!email, !password)) {
        throw new Error("please provide email and password")};

    const user = await User.findOne({email});
    //console.log("user is:",user);
    if(!user){
      throw new Error("user not found")
    }
  const passwordMatched = (await user.matchPassword(password))
  //console.log("matchedPassword",passwordMatched)
  if(user && passwordMatched){
    res.send({
      success:true,
      message: "user logged in successfully",
      user,
      token:generateToken(user._id)
    })
  }
  } catch (error) {
    console.log(error);
    res.send({
      success:false,
      message:error.message
    })
  }
 
}

const allUsers = async(req,res)=>{
  const keyword = req.query.search
   ? {
    $or: [
      {name: {$regex: req.query.search, $options: "i"}},
      {email: {$regex: req.query.search, $options: "i"},}
    ],
   }
   :{};

   const users = await User.find(keyword).find({_id:{$ne: req.user._id}});
   res.send(users);
}


module.exports = {registerUser,authUser,allUsers};
