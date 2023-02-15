import { createEffect, createSignal } from "solid-js"
import type { ChangeEventHandler, ChangeEvent } from "@suid/types"
import { getUserInfo, setUserInfo } from "../../model/userInfo"
import { hasUserName, setHasUserName } from "../../components/play/userNameDialog"

const [userName, setUserName] = createSignal<string>(getUserInfo().name)
const [valueError, setValueError] = createSignal<boolean>(false)

const handleValueChange : ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement, string>
= (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value: string) => {
  setUserName(event.target.value)
}

const handleSubmit = (event: MouseEvent) => {
  if(userName() === "") setValueError(true)
  else {
    setUserInfo({...getUserInfo(), name: userName()})

    setHasUserName(true)
  }
}

const onUserNameSet: () => Promise<string> = () => {
  return new Promise((resolve, reject) => {
    createEffect(() => {
      if (hasUserName()) {
        resolve(userName())
      }
    })
  })
}

export {
  handleValueChange,
  handleSubmit,
  valueError,
  onUserNameSet
}