import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";




const Posts = ({token, POST_ID, setPOST_ID, currentUsername, posts, setPosts}) => {
    let navigate = useNavigate();

console.log(POST_ID)    
console.log(token)

    useEffect(() => {  
        fetch('https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-pt/posts', {
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
        })
        .catch(err=>console.error(err));

    },[]);

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
                navigate("/profile")
            }else{
                alert("Error deleting message. Please try again")
            }
        })
        .catch(console.error);
}    

  return (
    <div className="mainBodyContainer">
        <h1>Active Posts</h1>
        {currentUsername === ("Please Log In") && <Link to="/login">Sign in to make a post</Link>}
        {currentUsername !== ("Please Log In") && <Link to="/newpost">Create a new post</Link>}
        {
            posts && posts.map(post => (
                <div className="postsContainer" key={posts._id}>
                    <h3 className="pageTitle">{post.title}</h3>
                    <div className="description">{post.description}</div>
                    <div>Price {post.price}</div> 
                    <div>Posted by user: {post.author.username}</div>
                    <div>Item location: {post.location}</div>
                    {post.willDeliver === (true) && <div>User is willing to deliver? Yes</div>}
                    {post.willDeliver !== (true) && <div>User is willing to deliver? No</div>}
                    <div>Messages: {post.message}</div>
                    <div className="postControlsContainer">
                        {currentUsername !== ("Please Log In") && post.isAuthor !== (true) && <button className="postControls" to="/messageUser" onClick={(event) => {
                            event.preventDefault();
                            console.log(post._id);
                            setPOST_ID(post._id);
                            navigate("/messageuser")
                        }}>Send Message</button>}   
                        {post.isAuthor === (true) && <button className="postControls" onClick={() => handleDelete(post._id)} >Delete Post</button>}
                        {post.isAuthor === (true) && <Link className="postControls" to="/editPost">Edit Post</Link>}
                    </div>
                </div>
            ))
        }
    </div>
  );
}

export default Posts;