const express = require('express');
const router = express.Router();
const User = require('../models/User') //to use this model and enter the data accoridng to schema
const { body, validationResult } = require('express-validator'); // for validation of data
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchUser=require('../middleware/fetchUser')

const JWT_SECRET="JaiShreeRam"

//ROUTE 1: Create a usser using POST '/api/auth/createUser' Doessnt require the auth, Login not required
router.post('/createUser', [
  body('name', 'Enter a valid Name!').isLength({ min: 3 }), // validation
  body('password', 'Password must be atleast 5 characters!').isLength({ min: 5 }), // validation
  body('email', 'Enter a valid Email!').isEmail() // validation

], async (req, res) => {
  //    console.log(req.body);
  //    const user=User(req.body);
  //    user.save();
  // res.send(req.body);

  // If there are error return bad request and errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // check whether user with this email exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).json({ error: "The user with this email already exists" });
    }
    // create a user
    const salt= await bcrypt.genSalt(10);
    const secPass= await bcrypt.hash(req.body.password,salt)
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email
    })
    // .then(user=>res.json(user))
    // .catch(err=>{console.log(err)
    //   res.json({error:'Please enter a unique valu for email',message:err.message})
    // });
    const data={
      user:{
        id:user.id
      }
    }
    const authToken=jwt.sign(data,JWT_SECRET);
    // console.log(jwtData);
    // res.json(user)
    res.json({authToken});

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
})

//ROUTE 2: Authenticate the user  using POST '/api/auth/login' Doessnt require the auth, Login not required
router.post('/login', [
  
  body('email', 'Enter a valid Email!').isEmail(), // validation
  body('password', 'Password cannot be Blank!').exists(), // validation

],async (req, res) => {
  let success=false;
  try {
    // Validation errors handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user by email
    let user = await User.findOne({ email });

    // If user not found, return error
    if (!user) {
      return res.status(400).json({ error: "Please enter correct Credentials!" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password doesn't match, return error
    if (!isPasswordValid) {
      success=false
      return res.status(400).json({success, error: "Please enter correct Credentials!" });
    }

    // If everything is correct, create JWT token
    const data = {
      user: {
        id: user.id
      }
    };
    const authToken = jwt.sign(data, JWT_SECRET);

    // Send token as response
    success=true
    res.json({ success,authToken });
  } catch (error) {
    // If any internal error occurs, log it and return 500 status
    console.log(error);
    res.status(500).send("Internal Server Error!");
  }
});

//ROUTE 3: Get the data of logged in user '/api/auth/getuser' Login required
router.post('/getUser',fetchUser,async (req, res) => {
  try {
    userId=req.user.id;
    const user= await User.findById(userId).select('-password') //When we get the user details we will fetch all the details except the password
    res.send(user);
  } catch (error) {
    // If any internal error occurs, log it and return 500 status
    console.log(error);
    res.status(500).send("Internal Server Error!");
  }
})

module.exports = router