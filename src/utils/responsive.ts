import { useMediaQuery } from "@suid/material"
import { createEffect, createSignal } from "solid-js"

const [isMobile, setMobile] = createSignal<boolean>(false)

createEffect<boolean>((prev) => {
  let status = useMediaQuery("(max-width: 600px)")()
  if (prev !== status) {
    setMobile(status)
  }
  return status
})

export {
  isMobile
}