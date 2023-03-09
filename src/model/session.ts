import { createSignal } from "solid-js"

interface Session {
  sessionName: string,
  create: string[]
}

const [getSession, updateSession] = createSignal<Session>((() => {
  let session = sessionStorage.getItem("session")
  if (session)
    return JSON.parse(session) as Session
  else return {sessionName: "", create: [] }
})())

function setSesion(session: Session) {
  updateSession(session)
  sessionStorage.setItem("session", JSON.stringify(session))
}

export {
  getSession,
  setSesion
}