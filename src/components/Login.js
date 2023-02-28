import React from "react";
import { Link, useNavigate } from "react-router-dom";


function Login({username, setUsername, password, setPassword, setToken, setCurrentUsername}) {

  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault()

    fetch('https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-pt/users/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password
        }
      })
    })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      if (result.success === true) {
        setToken(result.data.token);
        setUsername("");
        setPassword("");
        setCurrentUsername(username);
        navigate("/profile");
      } else {
        alert("User not found. Please create an account.");
        setUsername("");
        setPassword("");
        navigate("/signUp");
      } 
    })
    .catch(err=>console.error(err));
  }

  
  return (
    <div className="logIn_signUp_post_container">
        <h1 className="pageTitle">Log In </h1>
        <form onSubmit={handleSubmit} className="form">
            <label>User Name</label><br/>
            <input className="logIn_signUp_post_entry" type="text" value={username} onChange={(event) => setUsername(event.target.value)} required/><br/>
            <label>Password</label><br/>
            <input className="logIn_signUp_post_entry" type="password" value={password} onChange={(event) => setPassword(event.target.value)}  required/><br/>
            <input className="submitButton" type="submit" ></input>
        </form>
        <Link className="signUpLink" to="/signup">Don't have an account? Sign Up here!</Link>
    </div>
  );
}

export default Login;