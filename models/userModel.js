const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   userName: {
      type: String,
      required: [true, "Please add the user name"]
   },
   email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "Email address already taken"]
   },
   password: {
      type: String,
      required: [true, "Please add the user password"]
   }
}, {
   timestamps: true
})

const User = mongoose.model("User", userSchema)
module.exports = User;