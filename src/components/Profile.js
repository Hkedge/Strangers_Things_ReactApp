import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";

function Profile({token, currentUsername, setPOST_ID}) {
    const [posts, setPosts] = useState([]);
    const [myMessages, setMyMessages] = useState("")
    let navigate = useNavigate();

    useEffect(() => {  
        fetch('https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-pt/users/me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${ token }`
            },
        })
        .then(response => response.json())
        .then(result => {
            console.log(result)
            setPosts(result.data.posts)
            console.log(posts)
            setMyMessages(result.data.messages)
        })
        .catch(err=>console.error(err));
    },[])
    
    const handleDelete = async (postIdToDelete) => {
        console.log(postIdToDelete)

        fetch(`https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-pt/posts/${ postIdToDelete }`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ token }`
            }
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            if (result.success === (true)){
                alert("Post was successfully deleted")
                navigate("/posts")
            }else{
                alert("Error deleting message. Please try again")
            }
        })
        .catch(console.error);  
    }

  return (
    <div className="mainBodyContainer">
        <h1>Your active Posts</h1>
        {token !== ("") && <Link to="/newpost">Create a new post</Link>}
        {token === ("") && <Link to="/login">Sign in to view your profile</Link>}
        {
            posts && posts.map(post => (
                <div>
                    {post.active === (true) &&
                    <div className="postsContainer" key={posts._id}>
                        <div>
                            <h3 className="pageTitle">{post.title}</h3>
                            <div className="description">{post.description}</div> 
                            <div>Price {post.price}</div> 
                            <div>Item Location: {post.location}</div>
                            {post.willDeliver === (true) && <div>User is willing to deliver? Yes</div>}
                            {post.willDeliver !== (true) && <div>User is willing to deliver? No</div>}
                        </div>
                        {myMessages && myMessages.map(message =>(
                            post.title === message.post.title &&
                            <div className="messageContainer">
                                <div className="messageTitle">Message from {message.fromUser.username}:</div>
                                <div className="messageBody">{message.content}</div>
                                {message.fromUser.username !== currentUsername && <button className="replyButton" onClick={(event) => {
                                    event.preventDefault();
                                    console.log(post._id);
                                    setPOST_ID(post._id);
                                    navigate("/messageuser")}
                                }>Reply to message</button>}
                            </div>
                        ))}
                        <div className="postControlsContainer">
                            <button className="postControls" onClick={() => handleDelete(post._id)} >Delete Post</button>        
                            <Link className="postControls" to="/editPost" onClick={(event) => {
                                    event.preventDefault();
                                    console.log(post._id);
                                    setPOST_ID(post._id);
                                    navigate("/editpost")}}>Edit Post</Link>
                        </div>
                    </div>}
                </div>  
            ))
        }
        {currentUsername !== ("Please Log In") && <h1>Your Deleted Posts</h1>}
        {
            posts && posts.map(post => (
                <div>
                    {post.active !== (true) &&
                    <div className="postsContainer" key={posts._id}>
                        <div>
                            <h3 className="pageTitle">{post.title}</h3>
                            <div className="description">{post.description}</div> 
                            <div>Price {post.price}</div> 
                            <div>Item Location: {post.location}</div>
                            {post.willDeliver === (true) && <div>User is willing to deliver? Yes</div>}
                            {post.willDeliver !== (true) && <div>User is willing to deliver? No</div>}
                        </div>
                        {myMessages && myMessages.map(message =>(
                            post.title === message.post.title &&
                            <div className="messageContainer">
                                <div className="messageTitle">Message from {message.fromUser.username}:</div>
                                <div className="messageBody">{message.content}</div>
                                {message.fromUser.username !== currentUsername && <button className="replyButton" onClick={(event) => {
                                    event.preventDefault();
                                    console.log(post._id);
                                    setPOST_ID(post._id);
                                    navigate("/messageuser")}
                                }>Reply to message</button>}
                            </div>
                        ))}
                    </div>}

                </div>  

            ))
        }
       {currentUsername !== "Please Log In" && <h1>Your sent messages</h1>}
        {currentUsername !== "Please Log In" && 
        <div>
            
            <div className="postsContainer">
                {myMessages && myMessages.map(message =>(
                message.fromUser.username === currentUsername &&
                    <div className="postContainer">
                        <div className="messageTitle">Message on post: {message.post.title}</div>
                        <div className="messageBody">{message.content}</div>
                    </div>
                ))}  
            </div>    
        </div>}
    </div>         
  );
}

export default Profile;