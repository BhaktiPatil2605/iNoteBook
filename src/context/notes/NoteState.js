
import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState=(props)=>{
    const s1={
        "name":"Bhakti",
        "class":"5b"
    }
    const [state, setState] = useState(s1);
    const update=()=>{
        setTimeout(() => {
            setState({
                "name":"Shakti",
                "class":"10b"
            })
        }, 1000);
    }
return(
    <NoteContext.Provider value={{state, update}}>
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