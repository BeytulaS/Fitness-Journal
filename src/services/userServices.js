import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// This function is used to create a new user in Firebase
const handleSignUp = async (creditentials) => {
  createUserWithEmailAndPassword(
    auth,
    creditentials.email,
    creditentials.password
  )
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

// This function is used to sign in an existing user
const handleSignIn = async (creditentials) => {
  signInWithEmailAndPassword(auth, creditentials.email, creditentials.password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export { handleSignUp, handleSignIn };
