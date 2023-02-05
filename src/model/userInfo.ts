interface UserInfo {
  name: string
}

function getUserInfo() : UserInfo {
  return JSON.parse(localStorage.getItem("userInfo") || "{}")
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