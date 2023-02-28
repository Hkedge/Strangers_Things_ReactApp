import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function SignUp({username, setUsername, password, setPassword, setCurrentUsername, setToken, currentUsername}) {
    const [email, setEmail] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("");
    let navigate = useNavigate()


    const handleSubmit = (event) => {
        event.preventDefault()

        if (password === passwordConfirm) {
            fetch('https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-pt/users/register', {
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
                console.log(result)
                if (result.success === true){   
                    navigate("/profile")
                    setToken(result.data.token)
                    setCurrentUsername(username)
                } else {
                    alert("Username is already in use. Sign in or use another username") 
                    setCurrentUsername(username)
                    setEmail("")
                    setUsername("")
                    setPassword("")
                    setPasswordConfirm("")
                }
            })
            .catch(err=>console.error(err));
         
        } else {
            alert("Passwords do not match. Try Again");
            setPassword("")
            setPasswordConfirm("")
        }
    } 

  return (
    <div className="logIn_signUp_post_container">
        <h1 className="pageTitle">Sign Up </h1>
        <form onSubmit={handleSubmit} className="form">
            <label>Email Address</label><br/>
            <input className="logIn_signUp_post_entry" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required/><br/>
            <label>User Name</label><br/>
            <input className="logIn_signUp_post_entry" type="text" value={username} onChange={(event) => setUsername(event.target.value)} required/><br/>
            <label>Password</label><br/>
            <input className="logIn_signUp_post_entry" type="password" value={password} onChange={(event) => setPassword(event.target.value)}  required/><br/>
            <label>Re-enter Password</label><br/>
            <input className="logIn_signUp_post_entry" type="password" value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} required/><br/>
            <input className="submitButton" type="submit" value='Submit'></input>
        </form>
    </div>
  );
}

export default SignUp;