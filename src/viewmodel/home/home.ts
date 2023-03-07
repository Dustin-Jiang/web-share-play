import { ChangeEvent, ChangeEventHandler } from "@suid/types";
import { createSignal } from "solid-js";
import { getSession, setSesion } from "../../model/session";
import { setUserInfo, getUserInfo } from "../../model/userInfo";
import getRandomPhrase from "../../utils/randomPhrase";

let [userName, setUserName] = createSignal<string>(getUserInfo().name || "");
let [userNameError, setUserNameError] = createSignal<boolean>(false)
let [loading, setLoading] = createSignal<boolean>(false)

let userNameChange : ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement, string>
  = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value: string) => {
  setUserName(event.target.value)
}

let buttonSubmit = (event: MouseEvent) => {
  let name = userName()
  if (name === undefined) {
    setUserNameError(true)
  }
  else {
    setUserNameError(false)
    setLoading(true)

    let sessionName = getRandomPhrase()

    let oldSession = getSession()
    setSesion({...getSession(), sessionName,
      create: [
        ...oldSession.create,
        sessionName
      ]})

    setUserInfo({
      ...getUserInfo(),
      name
    })

    window.location.pathname = `${import.meta.env.BASE_URL}${sessionName}`
  }
}

export {
  userNameChange,
  userNameError,
  buttonSubmit,
  loading,
  userName
}
