import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyA8LmjQNKly_tFMj7ur5DdmVjjMenr-vvA",
  authDomain: "react-auth-punch-it.firebaseapp.com",
  projectId: "react-auth-punch-it",
  storageBucket: "react-auth-punch-it.appspot.com",
  messagingSenderId: "843260116172",
  appId: "1:843260116172:web:a5763e03a858c0fa8ad669"

});
const storage = firebase.storage();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

export default app;

export { storage, firebase, googleAuthProvider,facebookAuthProvider };
