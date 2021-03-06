import React, { useContext } from "react";

// react router
import { Link } from "react-router-dom";

// context
import { UserContext } from "../../App";

//css
import "./Header.css";

//firebase
import firebase from "firebase/app";

const Header = () => {
  const [user, setUser] = useContext(UserContext);

  let hide = {};
  if (user.loggedIn) {
    hide = { display: "none" };
  }

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
    let currentUser = { ...user };
    currentUser = {};
    setUser(currentUser);
  };

  return (
    <header>
      <nav>
        <ul>
          <li id='logo'>Pick me up</li>
          <li>
            <Link to='/home'>Home</Link>
          </li>
          <li>
            <Link to='/destination'>Destination</Link>
          </li>
          <li style={hide}>
            <Link to='/login'>Login</Link>
          </li>
          {user.loggedIn && <li id='user-name'>{user.displayName || user.name}</li>}
          {user.loggedIn && (
            <li>
              <button id='logout-btn' onClick={signOut}>
                Log out
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
