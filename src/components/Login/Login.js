import React, { useContext, useState } from "react";

//css
import "./Login.css";

//firebase
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

//UserContext
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const [user, setUser] = useContext(UserContext);
  const [newUser, setNewUser] = useState(false);

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const handleToggle = () => {
    setNewUser(!newUser);
  };

  const handleBlur = (event) => {
    let isFormValid = true;
    if (event.target.name === "email") {
      const userEmail = event.target.value;
      const re = /\S+@\S+\.\S+/;
      const validEmail = re.test(userEmail);
      isFormValid = validEmail;
    }

    if (event.target.name === "password") {
      const userPassword = event.target.value;
      const isLengthValid = userPassword.length >= 6;
      if (newUser && userPassword.length < 6) {
        alert("Your password must contain at least 6 characters ");
      }
      const re = /\d{1}/;
      const isContainsDigit = re.test(userPassword);
      if (newUser && !isContainsDigit) {
        alert("Your password must contain at least 1 number ");
      }
      isFormValid = isLengthValid && isContainsDigit;
    }
    if (isFormValid) {
      const newUser = { ...user };
      newUser[event.target.name] = event.target.value;
      setUser(newUser);
    }
  };

  const handleSubmit = (event) => {
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          console.log(res);
          userName(user.name);
          const currentUser = { ...user };
          currentUser.successful = true;
          currentUser.error = "";
          setUser(currentUser);
        })
        .catch((error) => {
          const errorMessage = error.message;
          const currentUser = { ...user };
          currentUser.successful = false;
          currentUser.error = errorMessage;
          setUser(currentUser);
        });
    }
    if (!newUser) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("user signed in");
          const currentUser = { ...user };
          currentUser.name = user.displayName;
          currentUser.loggedIn = true;
          currentUser.error = "";
          setUser(currentUser);
          history.replace(from);
        })
        .catch((error) => {
          const errorMessage = error.message;
          const currentUser = { ...user };
          currentUser.successful = false;
          currentUser.error = errorMessage;
          setUser(currentUser);
        });
    }
    event.preventDefault();
  };

  const userName = (name) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(function () {
        console.log("name update successfully");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        const user = result.user;
        console.log("user logged in", user);
        const currentUser = { ...user };
        currentUser.name = user.displayName;
        currentUser.loggedIn = true;
        setUser(currentUser);
        history.replace(from);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("error", errorMessage);
      });
  };
  return (
    <section className='login-section'>
      <div className='form-container'>
        <form id='login' onSubmit={handleSubmit}>
          <div className='input-field'>
            {newUser && <label htmlFor='name'>Name</label>}
            {newUser && <input type='text' name='name' onBlur={handleBlur} placeholder='Enter your name' id='name' required />}
          </div>
          <div className='input-field'>
            <label htmlFor='email' id='email-label'>
              Email
            </label>
            <input onBlur={handleBlur} type='email' name='email' id='email' placeholder='Enter your Email' required />
          </div>
          <div className='input-field'>
            <label htmlFor='password' id='phone-label'>
              Password
            </label>
            <input onBlur={handleBlur} type='password' name='password' id='password' placeholder='Enter your Password' required />
          </div>
          <input className='sign-btn' type='submit' value={newUser ? "Sign up" : "Sign in"} />
          <div>
            <label htmlFor='newUser'>New user?? </label>
            <input onChange={handleToggle} type='checkbox' name='newUser' id='newUser' />
          </div>
        </form>
        <button onClick={handleSignInWithGoogle} className='google-btn'>
          Sign in using google
        </button>
        <p style={{ color: "red", marginTop: "20px" }}>{user.error}</p>
        {user.successful && <p style={{ color: "green", marginTop: "20px" }}>User created successfully</p>}
      </div>
    </section>
  );
};

export default Login;
