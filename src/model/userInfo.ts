interface UserInfo {
  name: string,
  create: string[]
}

function getUserInfo(): UserInfo {
  return JSON.parse(localStorage.getItem("userInfo") || `{ "name": "", "create": [] }`)
}

function setUserInfo(value: UserInfo) {
  localStorage.setItem("userInfo", JSON.stringify(value))
}

export type {
  UserInfo
}

export {
  getUserInfo,
  setUserInfo
}