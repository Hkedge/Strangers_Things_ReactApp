import React from "react";
import { useState } from "react";
import { Routes, Route} from 'react-router-dom';
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import Posts from "./components/Posts";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import NewPost from "./components/NewPost";
import MessageUser from "./components/MessageUser";
import EditPost from "./components/EditPost";


function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("")
  const [POST_ID, setPOST_ID] = useState("")
  const [currentUsername, setCurrentUsername] = useState("Please Log In")
  const [posts, setPosts] = useState([]);

  return (
    <div>
      <Header currentUsername={currentUsername} setCurrentUsername={setCurrentUsername} token={token} setToken={setToken}/>
      <Routes> 
          <Route exact path="/" element={<HomePage />}/>
          <Route path="/newpost" element={<NewPost token={token}/>}/>
          <Route path="/posts" element={<Posts posts={posts} setPosts={setPosts} token={token} POST_ID={POST_ID} setPOST_ID={setPOST_ID} currentUsername={currentUsername} />} />
          <Route path="/messageuser" element={<MessageUser token={token} POST_ID={POST_ID} />}/>
          <Route path="/editpost" element={<EditPost token={token} POST_ID={POST_ID} />}/>
          <Route path="/profile" element={<Profile token={token} currentUsername={currentUsername} setPOST_ID={setPOST_ID} POST_ID={POST_ID}/>}/>
          <Route path="/login" element={<Login setPOST_ID={setPOST_ID} POST_ID={POST_ID} username={username} setUsername={setUsername} password={password} setPassword={setPassword} token={token} setToken={setToken} currentUsername={currentUsername} setCurrentUsername={setCurrentUsername}/>}/>
          <Route path="/signup" element={<SignUp username={username} setUsername={setUsername} password={password} setPassword={setPassword} token={token} setToken={setToken} currentUsername={currentUsername} setCurrentUsername={setCurrentUsername}/>}/>
      </Routes>
    </div>
  ) 
}



export default App;
