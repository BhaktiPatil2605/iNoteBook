
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

   
       const notesInitial= [
        {
          "_id": "6649dd33463a08a713689ccd",
          "user": "663c6e01a6129eb6b8d662b2",
          "title": "My First Note update",
          "description": "Have faith in God's Work update",
          "tags": "Personal",
          "Date": "2024-05-19T11:06:27.103Z",
          "__v": 0
        },
        {
          "_id": "665d9137c96daab596a5289d",
          "user": "663c6e01a6129eb6b8d662b2",
          "title": "My Second Note",
          "description": "Positive Attitude",
          "tags": "General",
          "Date": "2024-06-03T09:47:35.935Z",
          "__v": 0
        },
        {
          "_id": "6649dd33463a08a713689ccd1",
          "user": "663c6e01a6129eb6b8d662b2",
          "title": "My First Note update",
          "description": "Have faith in God's Work update",
          "tags": "Personal",
          "Date": "2024-05-19T11:06:27.103Z",
          "__v": 0
        },
        {
          "_id": "665d9137c96daab596a5289d2",
          "user": "663c6e01a6129eb6b8d662b2",
          "title": "My Second Note",
          "description": "Positive Attitude",
          "tags": "General",
          "Date": "2024-06-03T09:47:35.935Z",
          "__v": 0
        },
        {
          "_id": "6649dd33463a08a713689ccd3",
          "user": "663c6e01a6129eb6b8d662b2",
          "title": "My First Note update",
          "description": "Have faith in God's Work update",
          "tags": "Personal",
          "Date": "2024-05-19T11:06:27.103Z",
          "__v": 0
        },
        {
          "_id": "665d9137c96daab596a5289d4",
          "user": "663c6e01a6129eb6b8d662b2",
          "title": "My Second Note",
          "description": "Positive Attitude",
          "tags": "General",
          "Date": "2024-06-03T09:47:35.935Z",
          "__v": 0
        }
      ]
     
    const [notes, setNotes]= useState(notesInitial)

    // Add a Note
    const addNote=(title,description,tag)=>{
      // TODO: API call
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
    const deleteNote=()=>{
      
    }
    // Edit a Note
    const editNote=()=>{
      
    }

return(
    <NoteContext.Provider value={{notes,addNote}}>
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