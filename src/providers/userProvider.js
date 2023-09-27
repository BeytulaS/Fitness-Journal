import { useContext, createContext } from "react";
import { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signUp(creditentials) {
    return createUserWithEmailAndPassword(
      auth,
      creditentials.email,
      creditentials.password
    );
  }

  function signIn(creditentials) {
    return signInWithEmailAndPassword(
      auth,
      creditentials.email,
      creditentials.password
    );
  }

  function signOut() {
    return auth.signOut();
  }

  function getUser() {
    return auth.currentUser;
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    getUser,
    signUp,
    signIn,
    signOut,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
}
