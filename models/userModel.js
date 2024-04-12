const mongoose = require("mongoose");
const bcrypt = require("bcrypt") 

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
    password: {
      type: String,
      required: true,
    },
  
  pic: {
    type: String,
    default:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fthenounproject.com%2Fbrowse%2Ficons%2Fterm%2Fdp%2F&psig=AOvVaw0tkXjktT2_bVIcP0tj2jdl&ust=1712661538409000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPCK-8e_soUDFQAAAAAdAAAAABAE",
  }
},
{timestamps:true}
);

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};



module.exports = mongoose.model("User",userSchema)