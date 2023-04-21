const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//@desc Register a user
//@route POST /api/user/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
   const { userName, email, password } = req.body;
   if(!userName || !email || !password){
      res.status(400);
      throw new Error('All fields are required')
   }
   const userAvailability = await User.findOne({email});
   if(userAvailability){
      res.status(400);
      throw new Error('User already register.!')
   }

   // Hashing
   const hashedPassword = await bcrypt.hash(password, 10)
   //console.log("Pass ",hashedPassword)
   const newUser = await User.create({
      userName,
      email,
      password: hashedPassword
   })
   // console.log("New user ",newUser)
   if(newUser){
      res.status(201).json({_id: newUser._id, email: newUser.email})
   } else {
      res.status(404)
      throw new Error('User data is not valid')
   }
   res.status(200).json({message: 'Register user'})
})

//@desc Register a user
//@route POST /api/user/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;
   if(!email || !password){
      res.status(400);
      throw new Error("All fields are required")
   }
   const user = await User.findOne({email});
   if(user && (await bcrypt.compare(password, user.password))){
      const accessToken = jwt.sign({
         user: {
            userName: user.userName,
            email: user.email,
            id: user.id
         }
      }, 
      process.env.ACCESS_TOKEN,
      { expiresIn: '7d' }
      )
      res.status(200).json({ accessToken })
   } else {
      res.status(401);
      throw new Error("Email or Password int not valid.!")
   }
})

//@desc Current a user
//@route GET /api/user/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
   res.json(req.user);
})

module.exports = { registerUser, loginUser, currentUser }