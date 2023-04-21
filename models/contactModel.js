const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
   user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
   },
   name: {
      type: String,
      required: [true, "Please add the contact name"]
   },
   email: {
      type: String,
      required: [true, "Please add the contact email address"]
   },
   phone: {
      type: Number,
      required: [true, "Please add the contact phone number"]
   },
},{
   timestamps: true,
})

const Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;