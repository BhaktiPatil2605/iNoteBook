const express = require('express');
const router = express.Router();
var fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator'); // for validation of data
const Notes = require('../models/Notes');

//ROUTE 1: Get all Notes Data using GET '/api/notes/fetchallNotes' Login required
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

//ROUTE 2: Add Notes Data using POST '/api/notes/addNotes' Login required
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

//ROUTE 3: Update Notes Data using PUT '/api/notes//updateNote/:id' Login required
router.put('/updateNote/:id', fetchUser,async (req, res) => {

    const{title, description,tags}=req.body
    try {
    // create a newNote Object if there is any change in title,description or tag then only it will get add in that object
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tags){newNote.tags=tags};

    // Find a note to be update and then update it
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(400).send("Not Found")}

    if(note.user.toString() !== req.user.id){  // this will take the notes user and the user id of login user if it is not same then it will show error
        return res.status(401).send("Unautherized User")
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true}) //that new:true means if there is any new content it will create new note
    res.json({note});
}catch (error) {
    // If any internal error occurs, log it and return 500 status
    console.log(error);
    res.status(500).send("Internal Server Error!");
  }

})

//ROUTE 4: Delete Notes Data using DELETE '/api/notes/deleteNote/:id' Login required
router.delete('/deleteNote/:id', fetchUser,async (req, res) => {
try{
    // Find a note to be deleted and then delete it
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(400).send("Not Found")}

    // Allow deletion only if the user owns this note
    if(note.user.toString() !== req.user.id){  // this will take the notes user and the user id of login user if it is not same then it will show error
        return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndDelete(req.params.id) //delete the note finding by id
    res.json({"Succes": "The Note has been deleted" });
}catch (error) {
    // If any internal error occurs, log it and return 500 status
    console.log(error);
    res.status(500).send("Internal Server Error!");
  }
})



module.exports = router