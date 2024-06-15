
import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState=(props)=>{
    // const s1={
    //     "name":"Bhakti",
    //     "class":"5b"
    // }
    // const [state, setState] = useState(s1);
    // const update=()=>{
    //     setTimeout(() => {
    //         setState({
    //             "name":"Shakti",
    //             "class":"10b"
    //         })
    //     }, 1000);
    // }

    const host="http://localhost:5000";
       const notesInitial= []
     
    const [notes, setNotes]= useState(notesInitial)

    // Fetch all Note
    const fetchNote=async ()=>{
      // API call
      const response = await fetch(`${host}/api/notes/fetchallNotes`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYzYzZlMDFhNjEyOWViNmI4ZDY2MmIyIn0sImlhdCI6MTcxNTMyNTQ2NX0.u9Ms1RppRy_3RXOQj2ucKdY0ysU34Y8XQDoKRZoX-x8"
        },
      });
      // const json= response.json(); // parses JSON response into native JavaScript objects
      const json=await response.json();
      console.log(json);
      setNotes(json);
    }


    // Add a Note
    const addNote=async (title,description,tag)=>{
      // TODO: API call
      const response = await fetch(`${host}/api/notes/addNote`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYzYzZlMDFhNjEyOWViNmI4ZDY2MmIyIn0sImlhdCI6MTcxNTMyNTQ2NX0.u9Ms1RppRy_3RXOQj2ucKdY0ysU34Y8XQDoKRZoX-x8"
        },
        
        body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
      });
      const json= await response.json(); // parses JSON response into native JavaScript objects
      console.log(json);
      // Client side logic
        const note= {
          "_id": "665d9137c96daab596a5289d5",
          "user": "663c6e01a6129eb6b8d662b2",
          "title": title,
          "description": description,
          "tags": tag,
          "Date": "2024-06-03T09:47:35.935Z",
          "__v": 0
        };
        setNotes(notes.concat(note)); //concat returns an array whereas push updates an array
    }

    // Delete a Note
    const deleteNote=async(id)=>{
      // TODO: API call
      const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYzYzZlMDFhNjEyOWViNmI4ZDY2MmIyIn0sImlhdCI6MTcxNTMyNTQ2NX0.u9Ms1RppRy_3RXOQj2ucKdY0ysU34Y8XQDoKRZoX-x8"
        },
      });
      const json= await response.json(); // parses JSON response into native JavaScript objects
      console.log(json);
      // console.log("deleting the note with an id"+id);
      const newNotes=notes.filter((note)=>{return note._id!==id}) // only ruturn that notes whose id is not equal to the notes id matlab jo id parameters mai hai.. wo id wala note chod ke sab id dikhao  
      setNotes(newNotes);
    }
    // Edit a Note
    const editNote=async (id, title, description, tag)=>{
      // API Call
      const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYzYzZlMDFhNjEyOWViNmI4ZDY2MmIyIn0sImlhdCI6MTcxNTMyNTQ2NX0.u9Ms1RppRy_3RXOQj2ucKdY0ysU34Y8XQDoKRZoX-x8"
        },
        
        body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
      });
      const json= await response.json(); // parses JSON response into native JavaScript objects
      console.log(json);

      let newNotes=JSON.parse(JSON.stringify(notes));
      // Logic of client side edit
      for (let i = 0; i < newNotes.length; i++) {
        const element = newNotes[i];
        if(element._id=== id){
          newNotes[i].title=title;
          newNotes[i].description=description;
          newNotes[i].tag=tag;
          break;
        }
        
      }
      setNotes(newNotes);
    }

return(
    <NoteContext.Provider value={{notes,addNote, deleteNote,editNote,fetchNote}}>
        {props.children}
    </NoteContext.Provider>
)
}

export default NoteState;

// This component returns a NoteContext.Provider component. The Provider is a special component provided by React's Context API.
// The value prop of the Provider is set to the state object we defined earlier.
// {props.children} means that any child components of NoteState will be wrapped inside this Provider. These child components will have access to the state via the NoteContext.

// NoteState is a React component that provides a context with some state (name and class) to its children.
// Any component inside NoteState can access this state using NoteContext.