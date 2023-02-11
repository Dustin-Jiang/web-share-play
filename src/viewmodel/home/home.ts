import { useNavigate } from "@solidjs/router";
import { ChangeEvent, ChangeEventHandler } from "@suid/types";
import { createSignal } from "solid-js";
import { getSession, setSesion } from "../../model/session";
import { setUserInfo, getUserInfo } from "../../model/userInfo";
import getRandomPhrase from "../../utils/randomPhrase";

let [userName, setUserName] = createSignal<string>(getUserInfo().name || "");
let [userNameError, setUserNameError] = createSignal<boolean>(false)
let [loading, setLoading] = createSignal<boolean>(false)
let navigate = useNavigate()

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
    setSesion({...getSession(), sessionName})

    setUserInfo({...getUserInfo(), name})

    navigate(sessionName)
  }
}

export {
  userNameChange,
  userNameError,
  buttonSubmit,
  loading
}
