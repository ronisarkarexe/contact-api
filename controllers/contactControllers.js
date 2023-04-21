const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel')
//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
   const contacts = await Contact.find({user_id: req.user.id});
   res.json(contacts)
});

//@desc Create new contacts
//@route POST /api/contacts
//@access private
const createContacts = asyncHandler(async (req, res) => {
   //console.log('The req body',req.body);
   const {name, email, phone} = req.body;
   if(!name || !email || !phone) {
      res.status(400);
      throw new Error('All fields are required');
   }
   const contact = await Contact.create({
      name, 
      email, 
      phone,
      user_id: req.user.id
   })

   res.status(201).json(contact)
});

//@desc Get contacts
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
   const contact = await Contact.findById(req.params.id)
   if(!contact){
      res.status(404);
      throw new Error("Contact not found");
   }
   res.status(200).json(contact)
});

//@desc Update contacts
//@route PUT /api/contacts
//@access private
const updateContacts = asyncHandler(async (req, res) => {
   const contact = await Contact.findById(req.params.id)
   if(!contact){
      res.status(404);
      throw new Error("Contact not found");
   }

   if(contact.user_id.toString() === req.user.id){
      res.status(403);
      throw new Error("User do not have permission to update another contact");
   }

   const updateContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
   )
   res.status(200).json(updateContact)
});

//@desc Delete contacts
//@route DELETE /api/contacts
//@access private
const deleteContacts = asyncHandler(async (req, res) => {
   const contact = await Contact.findById(req.params.id)
   if(!contact){
      res.status(404);
      throw new Error("Contact not found");
   }

   if(contact.user_id.toString() === req.user.id){
      res.status(403);
      throw new Error("User do not have permission to delete another contact");
   }

   const deleteContact = await Contact.findOneAndRemove(
      req.body.id,
      req.body
   )
   res.status(200).json(deleteContact)
});


module.exports = { getContacts, createContacts, getContact, updateContacts, deleteContacts };