
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
function App() {
  return (
    <>
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>

          <Route exact path="/about" element={<About />}></Route>

        </Routes>
      </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
