import { createStore } from "solid-js/store"

interface User {
  name: string,
  isOwner: boolean
}

const [play, setPlay] = createStore<{
  user: {
    [peerId: string]: User
  },
  media: any[]
}>({
  user: {}, 
  media: []
})

export {
  play,
  setPlay
}

export type {
  User
}