import { firebseApp } from "../config/firebase";
import { signOut, getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { Logger } from '../helpers/helpers'

export const auth = getAuth(firebseApp);

const Login = async () => {

  const provider = new GoogleAuthProvider();
  Logger('log', "🍿 signInWithPopup")
  await signInWithPopup(auth, provider)
    .then(async () => {
      Logger('log', "🔓 logueado correctamente")
      Logger('log', '👩🏻‍💻 /api/users/' + auth.currentUser.uid)

      await axios.get('/api/users/' + auth.currentUser.uid)
        .then(async (resp) => {
          Logger('log', " usuario encontrado en la base?: ", resp)

          if (resp.data) {
            Logger('log', "🥳 se encontró el usuario en la base, resp:", resp)
          } else {
            Logger('log', "😅 el usuario logueado no existe en la base, lo intenta dar de alta")

            await axios.post('/api/users', {
              GoogleID: auth.currentUser.uid
            }).then(() => {
              Logger('log', "🏳️‍🌈 usuario dado de alta correctamente")
            })
          }
        })
    }).catch((error) => {
      Logger('log', "🚩 Logger error", error)
      throw new Error(error)
    });
}

const logout = () => {
  return signOut(auth)
};

const authState = (cb) => {
  onAuthStateChanged(auth, (user) => {
    cb(user)
  });
};

export const userService = {
  Login,
  logout,
  authState
}