import { createStore } from "solid-js/store"

type URI = string

interface User {
  name: string,
  isOwner: boolean
}

interface Media<T extends MediaTypes> {
  type: "music"
  data: T
}

interface Music {
  src: URI
  title: string
  artist?: string
  album?: string
  albumCover?: URI
}

type MediaTypes = Music

const [play, setPlay] = createStore<{
  user: {
    [peerId: string]: User
  },
  media: Media<Music>[]
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