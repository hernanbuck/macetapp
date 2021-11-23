import { firebseApp } from "../config/firebase";
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";

export const auth = getAuth(firebseApp);

export const logout = () => {
  signOut(auth)
    .then(() => {
      return;
    })
    .catch((error) => {
      return;
    });
};

export const authStateChanged = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      return user;
    } else {
      router.push("/");
    }
  });
};
