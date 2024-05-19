const express = require('express');
const router = express.Router();
var fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator'); // for validation of data
const Notes = require('../models/Notes');

//ROUTE 1: Get all Notes Data using GET '/api/auth/fetchallNotes' Login required
router.get('/fetchallNotes', fetchUser, async (req, res) => {
    try {
        
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        // If any internal error occurs, log it and return 500 status
        console.log(error);
        res.status(500).send("Internal Server Error!");
      }
})

//ROUTE 2: Add Notes Data using POST '/api/auth/addNotes' Login required
router.post('/addNote', fetchUser, [
    body('title', 'Enter a valid Title!').isLength({ min: 3 }), // validation
    body('description', 'Description must be atleast 5 characters!').isLength({ min: 5 }), // validation
], async (req, res) => {
    try {
        const {title,description, tag}=req.body
    // If there are error return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const note=new Notes({
        title,description,tag,user: req.user.id
    })
    const savenote= await note.save(); //to save the notes 
    res.json(savenote)
        
    } catch (error) {
        // If any internal error occurs, log it and return 500 status
        console.log(error);
        res.status(500).send("Internal Server Error!");
      }
    
})

module.exports = router