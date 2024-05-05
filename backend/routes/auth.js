const express=require('express');
const router = express.Router();
const User=require('../models/User')
const { body, validationResult } = require('express-validator');

// Create a usser using POST '/api/auth' Doessnt require the auth
router.post('/',[
    body('name','Enter a valid Name!').isLength({min:3}),
    body('password','Password must be atleast 5 characters!').isLength({min:5}),
    body('email','Enter a valid Email!').isEmail()

],(req,res)=>{
//    console.log(req.body);
//    const user=User(req.body);
//    user.save();
// res.send(req.body);
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  User.create({
    name:req.body.name,
    password:req.body.password,
    email:req.body.email
  }).then(user=>res.json(user))
  .catch(err=>{console.log(err)
    res.json({error:'Please enter a unique valu for email',message:err.message})
  });
    // res.json([])
})

module.exports=router