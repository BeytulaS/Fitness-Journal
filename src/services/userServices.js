import { auth, db } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore/lite";

// This function is used to create a new user in Firebase
const handleSignUp = async (creditentials) => {
  createUserWithEmailAndPassword(
    auth,
    creditentials.email,
    creditentials.password
  )
    .then((userCredential) => {
      const user = userCredential.user;
      setDoc(doc(db, "users", `${user.uid}`), {
        email: user.email,
        uid: user.uid,
      });
      console.log("success");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
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

      console.log(errorCode, errorMessage);
    });
};

export { handleSignUp, handleSignIn };
