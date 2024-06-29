import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
//   let location = useLocation();

//  useEffect(() => {
//    console.log(location.pathname)
//   }, [location]);
let navigate=useNavigate();
const handleLogout=()=>{
  localStorage.removeItem('token');
  navigate('/login');
}
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">iNoteBook</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {/* <li className="nav-item">
            <NavLink className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</NavLink>
          </li> */
          // Had done this using useLocation Hook logic
          } 
          <li className="nav-item">
            <NavLink className={({ isActive}) => isActive ? "nav-link active" : "nav-link"}aria-current="page" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive}) => isActive ? "nav-link active" : "nav-link"} to="/about">About</NavLink>
          </li>
          
          
        </ul>
        {!localStorage.getItem('token')?<form className="d-flex">
          <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
          <Link className="btn btn-primary mx-1" to="/signup" role="button">SignUp</Link>
        </form>:<button onClick={handleLogout} className='btn btn-primary'>Logout</button>}
      </div>
    </div>
  </nav>
  )
}

export default Navbar
