interface Session {
  sessionName: string,
  create: string[]
}

function getSession(): Session {
  let session = sessionStorage.getItem("session")
  if (session)
    return JSON.parse(session)
  else return {sessionName: "", create: [] }
}

function setSesion(session: Session) {
  sessionStorage.setItem("session", JSON.stringify(session))
}

export {
  getSession,
  setSesion
}