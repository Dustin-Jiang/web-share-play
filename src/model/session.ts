interface Session {
  sessionName: string
}

function getSession(): Session {
  return JSON.parse(sessionStorage.getItem("session") || "{}")
}

function setSesion(session: Session) {
  sessionStorage.setItem("session", JSON.stringify(session))
}

export {
  getSession,
  setSesion
}