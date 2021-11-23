import Header from "./header";
import { useRouter } from "next/router";
import axios from "axios";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, logout } from "../helpers/auth";

export default function Index() {
  const router = useRouter();

  const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        axios.post('/api/users/exist', {
          uid: auth.currentUser.uid
        }).then((resp)=>{
          if (resp.data) {
            console.log("existe el usuario");

            router.push("/user");
          } else {
            console.log("lo deslogueo porque el usuario no existe en la base");
            //logout();
            axios.post('/api/users/register', {
              uid: auth.currentUser.uid
            }).then(()=>{
              router.push("/user");
              }).catch(error => {
              console.log(error)
              })
             router.push("/user");
          }
          }).catch(error => {
          console.log(error)
          })
      })
      .catch((error) => {
        console.log(error);
        router.push("/error");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Header />

      <main className="flex h-screen w-full">
        <section className="w-full">
          <img
            className="bg-login bg-no-repeat bg-center h-full"
            src=""
            alt=""
          />
        </section>

        <section className="flex flex-col justify-start p-52 items-center w-full">
          <div className="flex flex-col">
            <span className="text-bold text-6xl text-green-500">MacetApp.</span>
            <span className="mt-12 text-gray-400">
              {" "}
              ________________________Smart people, smart trees.-
            </span>
          </div>

          <div className="flex border-2 justify-center border-none border-white-300 w-1/8 h-8 mt-10">
            <img
              className="bg-no-repeat border-none bg-google-icon w-8"
              alt=""
              src=""
            />
            <button onClick={login}>Iniciar sesión</button>
          </div>
        </section>
      </main>
    </div>
  );
}
