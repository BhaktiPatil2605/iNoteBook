import React ,{useContext}from 'react'
import noteContext from '../context/notes/noteContext';


const NoteItem = (props) => {
  const context=useContext(noteContext);
  const { deleteNote }=context;
  const { note } = props;
  return (
    <div className='col-md-3'>
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <div style={{"display":"flex","justifyContent":"right"}}>
            <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i> 
            {/* we are passing this in arrow function as we need to pass an argumentt with this */}
            <i className="fa-solid fa-pen-to-square mx-2"></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteItem
