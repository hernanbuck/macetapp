import React from "react"
import Button from './button'
import { userService } from "../services/user"
import {
  useRouter
} from "next/router";
import { Logger } from '../helpers/helpers'

export default function ButtonBox({ url }) {
  let router = useRouter()
  const logout = () => {

    userService.logout()
      .then(() => {
        Logger('log', "🌅 logout exitoso", false)
        router.push("/");
      })
      .catch((error) => {
        Logger('log', '🚩 error', error, false)
        router.push("/error");
      });
  };

  return (<div className="flex w-3/5 xs:w-screen xs:flex xs:justify-around xs:pt-5">
    {url === "/user" ?
      <Button icon="plant" url="/plant" />
      : <Button icon="user" url="/user" />
    }

    <Button icon="logout" onClick={logout} />
  </div>)
}