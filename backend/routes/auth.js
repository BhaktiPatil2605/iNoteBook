const express = require('express');
const router = express.Router();
const User = require('../models/User') //to use this model and enter the data accoridng to schema
const { body, validationResult } = require('express-validator'); // for validation of data

// Create a usser using POST '/api/auth/createUser' Doessnt require the auth, Login not required
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
    user = await User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    })
    // .then(user=>res.json(user))
    // .catch(err=>{console.log(err)
    //   res.json({error:'Please enter a unique valu for email',message:err.message})
    // });
    res.json(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Something went wrong!');
  }
})

module.exports = router