import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, fetchNote, editNote } = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" });

  useEffect(() => {
    fetchNote();
    // eslint-disable-next-line
  }, [])
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tags});
  }

  const handleClick = (e) => {
    // console.log("upfate a note",note)
    e.preventDefault();
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    // addNote(note.title, note.description, note.tag); //so here notestate's addnote function is called
    props.showAlert("Updated Successfully","success");

  }

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }) //take the value by its name on the change of input tag
  }
  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" role="dialog" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" value={note.etitle} id="etitle" name="etitle" onChange={onchange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" value={note.edescription} id="edescription" name="edescription" onChange={onchange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" value={note.etag} id="etag" name="etag" onChange={onchange} />
                </div>

                {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button> */}
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h3>Your Notes</h3>
        <div className="container">
          {notes.length===0 && 'No Notes to Display..!'}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes
