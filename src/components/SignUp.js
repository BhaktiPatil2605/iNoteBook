import React , { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const host="http://localhost:5000";

const SignUp = (props) => {
  const [credentials, setcredentials] = useState({name:"",email:"",password:"",cpassword:""});
  let navigate=useNavigate(); //use navigate is to redirect the page on click of button

  const handlesubmit=async (e)=>{
    e.preventDefault() //not to reload the page automatic
    const {name,email,password}=credentials;
    const response = await fetch(`${host}/api/auth/createUser`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name,email,password}), 
      });
      const json=await response.json();
      console.log(json);
      if(json.success){
        // save the auth token and redirect
        localStorage.setItem('token',json.authtoken);
        props.showAlert("Account created Succesfully", "success");
        navigate("/login");

      }else{
        props.showAlert("Invalid Details", "danger");
      }
}
const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value }) //take the value by its name on the change of input tag
  }
  return (
    <div className='container mt-2'>
    <h2>Sign Up to use iNoteBook</h2>
      <form onSubmit={handlesubmit}>
      <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="name" class="form-control" id="name" name="name" onChange={onchange}/>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" class="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={onchange}/>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" name="password" onChange={onchange} minLength={5} required/>
        </div>
        <div class="mb-3">
          <label for="cpassword" class="form-label">Confirm Password</label>
          <input type="cpassword" class="form-control" id="cpassword" name="cpassword" onChange={onchange} minLength={5} required/>
        </div>
        
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default SignUp
