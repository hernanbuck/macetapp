import { useRouter } from "next/router";
import { userService } from "../services/user";
import { Logger } from '../helpers/helpers'

export default function Index() {
  const router = useRouter();

  const Login = () => {
    Logger('log', "📥 comienza el Logger", false)
    userService.Login()
      .then(() => {
        Logger('log', "✅ termina todo ok, quiero pushear a /user", false)
        router.push("/user")
      }).catch((error) => {
        if (error && error.code?.includes("by-user")) {
          router.push("/");
        } else {
          router.push("/error");
        }
      })
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main className="flex h-screen w-full">
        <section className="w-full xs:hidden">
          <img
            className="bg-login bg-no-repeat bg-center h-full"
            src=""
            alt=""
          />
        </section>

        <section className="flex flex-col justify-center p-5 items-center w-full">
          <div className="flex flex-col">
            <span className="text-bold text-6xl text-green-500">MacetApp.</span>
            <span className="mt-12 text-gray-400 sm:text-lg">
              {" "}
              ____________Smart people, smart trees.-
            </span>
          </div>

          <div className="flex border-2 justify-center border-none border-white-300 w-1/8 h-8 mt-10">
            <img
              className="bg-no-repeat border-none bg-google-icon w-8 "
              alt=""
              src=""
            />
            <button onClick={Login}>Iniciar sesión</button>
          </div>
        </section>
      </main>
    </div>
  );
}
