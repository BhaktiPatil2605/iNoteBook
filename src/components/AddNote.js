import React, {useContext,useState} from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context=useContext(noteContext);
    const {addNote}=context;

    const [note, setNote] = useState({title:"", description:"", tag:""});

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag); //so here notestate's addnote function is called
    }

    const onchange=(e)=>{
      setNote({...note,[e.target.name]: e.target.value}) //take the value by its name on the change of input tag
    }
  return (
    <div className="container my-3">
    <h3>Add Notes</h3>
    <form className='my-3'>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" name="title" onChange={onchange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input type="text" className="form-control" id="description" name="description" onChange={onchange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">Tag</label>
        <input type="text" className="form-control" id="tag" name="tag" onChange={onchange}/>
      </div>
    
      <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
    </form>
    </div>
  )
}

export default AddNote
