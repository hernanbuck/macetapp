import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "./header";
import Button from "./button";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { firebseApp } from "../config/firebase";

export default function User() {
  const router = useRouter();
  const [user, setUser] = useState({});

  useEffect(() => {
    const auth = getAuth(firebseApp);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/");
      }
    });
  }, []);

  const logout = () => {
    const auth = getAuth(firebseApp);
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        router.push("/error");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Header />

      <main className="flex h-screen w-full">
        <section className="w-1/2 flex flex-col">
          <h1>{user.email} </h1>
          <h1>{user.displayName} </h1>
          <img className="h-20 w-20" src={user.photoURL} />
          <div className="flex justify-around w-2/6">
            <Button icon="user" url="/user" />
            <Button icon="plant" url="/plant" />
          </div>
          <button onClick={logout}>Logout</button>
        </section>

        <section className="flex flex-col justify-start p-52 items-center w-1/2">
          <div className="flex flex-col"></div>
        </section>
      </main>
    </div>
  );
}
