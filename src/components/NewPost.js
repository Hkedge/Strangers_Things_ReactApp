import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function NewPost({token}) {
    const [title, setTitle]= useState("")
    const [description, setDescription]= useState("")
    const [price, setPrice]= useState("")
    const [location, setLocation]= useState("")
    const [willDeliver, setWillDeliver] = useState(false)
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()

        fetch('https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-pt/posts', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${ token }`
            },
            body: JSON.stringify({
                post: {
                  title: title,
                  description: description,
                  price: price,
                  location: location,
                  willDeliver: willDeliver
                }
            })
        })
        .then(response => response.json())
        .then(result => {
            if (result.success === true) { 
                setTitle("");
                setDescription("");
                setPrice("");
                setLocation("");
                navigate("/profile");
            }
        })
        .catch(err=>console.error(err));

    }

  return (
    <div className="logIn_signUp_post_container">
        <h1 className="pageTitle">Create a New Post </h1>
        <form onSubmit={handleSubmit} className="form">
            <label>Title</label><br/>
            <input className="logIn_signUp_post_entry" type="text" onChange={(event) => setTitle(event.target.value)} required/><br/>
            <label>Description</label><br/>
            <input className="logIn_signUp_post_entry" type="text" onChange={(event) => setDescription(event.target.value)} required/><br/>
            <label>Price</label><br/>
            <input className="logIn_signUp_post_entry" type="text" onChange={(event) => setPrice(event.target.value)}  required/><br/>
            <label>location</label><br/>
            <input className="logIn_signUp_post_entry" type="text" onChange={(event) => setLocation(event.target.value)} /><br/>
                <div className="willingToDeliver">
                    <input type="checkbox" onChange={(event) => setWillDeliver(true)}/><br/>
                    <label>Willing to deliver?</label>
                </div>
            <input className="submitButton" type="submit" value='Submit'></input>
        </form>
    </div>
  );
}

export default NewPost;