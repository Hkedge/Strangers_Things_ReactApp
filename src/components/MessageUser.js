import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function MessageUser({token, POST_ID}) {
    const [messageContent, setMessageContent]= useState("")
    console.log(token)
    let navigate = useNavigate();
    

    const handleSubmit = (event) => {
        event.preventDefault()

        fetch(`https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-pt/posts/${ POST_ID }/messages`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${ token }`
            },
            body: JSON.stringify({
                message: {
                  content: messageContent,
                }
            })
        })
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.success === true) { 
                alert("Message sucessfully submitted")
                setMessageContent("");
                navigate("/posts");
            }
        })
        .catch(err=>console.error(err));

    }

  return (
    <div className="logIn_signUp_post_container">
        <h1 className="pageTitle">Send a Message </h1>
        <form onSubmit={handleSubmit} className="form">
            <label>Message</label><br/>
            <input className="logIn_signUp_post_entry" type="text" onChange={(event) => setMessageContent(event.target.value)} required/><br/>
            <input className="submitButton" type="submit" value='Submit'></input>
        </form>
    </div>
  );
}

export default MessageUser;