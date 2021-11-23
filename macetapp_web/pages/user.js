import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "./header";
import Button from "./button";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "../config/firebase";
import { getRandomPlant } from '../helpers/helpers'

export default function User() {
  const router = useRouter();
  const [user, setUser] = useState({});

  useEffect(() => {
    const auth = getAuth(firebaseApp);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/");
      }
    });


  }, []);

  const logout = () => {
    const auth = getAuth(firebaseApp);
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        router.push("/error");
      });
  };

  let randomPlant = getRandomPlant()


  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Header />

      <main className="flex h-screen w-full">
        <section className="w-2/5 flex flex-col justify-around p-5">
          <div className="flex">
            <img className="h-24 w-24" src={user.photoURL} />
            <div className="flex flex-col pl-5">
              <span>{user.displayName}</span>
              <span>{user.email} </span>
            </div>
          </div>
          <div>
            <h1 className="text-2xl text-green-500 border-b-2 border-gray-200">Daily tips.</h1>
            <div className="flex pt-5">
              <p className="text-gray-400">{randomPlant.tip}
              </p>
              <img className="bg-contain pl-1 h-28 w-28" src={randomPlant.img} />
            </div>
          </div>

          <div className="flex w-3/5">
            <Button icon="user" url="/user" />
            <Button icon="plant" url="/plant" />
            <Button icon="logout" url="#" onClick={logout} />
          </div>
        </section>

        <section className="w-3/5 flex flex-col justify-center items-center h-screen bg-opacity-80 bg-gray-700 p-5">
          <div className="flex items-center h-3/5">
            <div className="w-full h-full" >
              <img className="bg-no-repeat bg-cover bg-center h-full" src="/img/random/hortensia.jpg" />
            </div>
            <div className="flex flex-col justify-between w-full h-full text-white p-5">
              <span className="pt-5 border-b-2 border-gray-300 text-2xl">Centaura Real</span>
              <div className="flex flex-col text-center">
                <div className="flex mt-5 w-full border-2 border-green-600">
                  <span className="w-4/5">Humedad </span>
                  <span className="w-1/5">50%</span>
                </div>
                <div className="flex justify-center mt-5 w-full border-2 border-green-600">
                  <span className="w-4/5">Status </span>
                  <span className="w-1/5 border-2 bg-green-600">OK</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
