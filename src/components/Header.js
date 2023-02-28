import React from "react";
import { Link, useNavigate } from 'react-router-dom';


function Header({token, setToken, currentUsername, setCurrentUsername}) {

    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setToken("");
        setCurrentUsername("Please Log In");
        navigate("/");
    }

  return (
    <div className="header">
        <nav className="headerNavBarContainer">
            <Link className="navBarLink" to="/">Home</Link>
            <Link className="navBarLink" to="/posts">All Posts</Link>
            <Link className="navBarLink" to="/profile">Profile</Link>
        </nav>
        <div className="headerAboutContainer">
            <h1 className="aboutTitle">Stranger's Things</h1>
            <h5 className="aboutSlogan">The <b>only</b> place to get strange things from strangers</h5>
        </div>
        <nav className="headerUserControlsContainer">
            <p className="userControlsWelcome">Welcome <br/ >{currentUsername}!</p>
            {currentUsername === ("Please Log In") && <Link className="userControlsLoginLink" to="/login">Log In</Link>}
            {currentUsername !== ("Please Log In") && <button className="userControlsLoginLink" onClick={handleSubmit} >Log Out</button>}
        </nav>
    </div>
  );
}
export default Header;
