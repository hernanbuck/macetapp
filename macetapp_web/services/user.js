import { firebseApp } from "../config/firebase";
import { signOut, getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { Logger } from '../helpers/helpers'

export const auth = getAuth(firebseApp);

const Login = async () => {

  const provider = new GoogleAuthProvider();
  Logger('log', "πΏ signInWithPopup")
  await signInWithPopup(auth, provider)
    .then(async () => {
      Logger('log', "π logueado correctamente")
      Logger('log', 'π©π»βπ» /api/users/' + auth.currentUser.uid)

      await axios.get('/api/users/' + auth.currentUser.uid)
        .then(async (resp) => {
          Logger('log', " usuario encontrado en la base?: ", resp)

          if (resp.data) {
            Logger('log', "π₯³ se encontrΓ³ el usuario en la base, resp:", resp)
          } else {
            Logger('log', "π el usuario logueado no existe en la base, lo intenta dar de alta")

            await axios.post('/api/users', {
              GoogleID: auth.currentUser.uid
            }).then(() => {
              Logger('log', "π³οΈβπ usuario dado de alta correctamente")
            })
          }
        })
    }).catch((error) => {
      Logger('log', "π© Logger error", error)
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