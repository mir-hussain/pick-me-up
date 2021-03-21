import React, { useContext, useState } from "react";

//css
import "./Login.css";

//icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

//UserContext
import { UserContext } from "../../App";

// react router
import { useHistory, useLocation } from "react-router";

//firebase imports
import { emailSignIn, emailSignUp, handleSignInWithGoogle, initFirebase } from "./Firebase";

const Login = () => {
  const [user, setUser] = useContext(UserContext);
  const [newUser, setNewUser] = useState(false);

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const handleToggle = () => {
    setNewUser(!newUser);
  };

  initFirebase();

  ////to get user info

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

  ////for response handling

  const handleResponse = (res, redirect) => {
    setUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  ////google sign in

  const googleSignIn = () => {
    handleSignInWithGoogle().then((res) => {
      handleResponse(res, true);
    });
  };

  ////email sing up

  const handleSubmit = (event) => {
    if (newUser && user.email && user.password) {
      emailSignUp(user.name, user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }
    if (!newUser) {
      emailSignIn(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }
    event.preventDefault();
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
        <button onClick={googleSignIn} className='google-btn'>
          <FontAwesomeIcon icon={faGoogle} /> Sign in using google
        </button>
        <p style={{ color: "red", marginTop: "20px" }}>{user.error}</p>
        {user.successful && <p style={{ color: "green", marginTop: "20px" }}>User created successfully</p>}
      </div>
    </section>
  );
};

export default Login;
