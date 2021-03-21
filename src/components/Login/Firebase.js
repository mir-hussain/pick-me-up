import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

//// to initialize app

export const initFirebase = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
};

//// for email sign up

export const emailSignUp = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      userName(name);
      const currentUser = res.user;
      currentUser.successful = true;
      currentUser.loggedIn = true;
      currentUser.name = name;
      currentUser.error = "";
      return currentUser;
    })
    .catch((error) => {
      const errorMessage = error.message;
      const currentUser = error.user;
      currentUser.successful = false;
      currentUser.error = errorMessage;
      return currentUser;
    });
};

//// for email sign in

export const emailSignIn = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      const currentUser = res.user;
      currentUser.name = currentUser.displayName;
      currentUser.loggedIn = true;
      currentUser.error = "";
      return currentUser;
    })
    .catch((error) => {
      const errorMessage = error.message;
      const currentUser = error.user;
      currentUser.successful = false;
      currentUser.error = errorMessage;
      return currentUser;
    });
};

//// to set the name of user

const userName = (name) => {
  const user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: name,
    })
    .then(function () {})
    .catch(function (error) {
      console.log(error);
    });
};

//// for google sign in

export const handleSignInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      const user = result.user;
      const currentUser = { ...user };
      currentUser.name = user.displayName;
      currentUser.loggedIn = true;
      return currentUser;
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log("error", errorMessage);
    });
};
