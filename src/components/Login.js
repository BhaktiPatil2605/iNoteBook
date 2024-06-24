import React , { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const host="http://localhost:5000";
const Login = (props) => {
    const [credentials, setcredentials] = useState({email:"",password:""});
    let navigate=useNavigate(); //use navigate is to redirect the page on click of button
    const handlesubmit=async (e)=>{
        e.preventDefault() //not to reload the page automatic
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}), 
          });
          const json=await response.json();
          console.log(json);
          if(json.success){
            // save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            navigate("/");
            props.showAlert("Logged In Succesfully", "success");

          }else{
            props.showAlert("Invalid Credentials", "danger");

          }
    }
    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value }) //take the value by its name on the change of input tag
      }
    return (
        <div>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email}  id="email" name="email" aria-describedby="emailHelp" onChange={onchange} />
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="password" name="password" onChange={onchange}  />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
