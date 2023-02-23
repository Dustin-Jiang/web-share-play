import { createStore } from "solid-js/store"
import { Netease } from "./netease.definition"

const API_ADDRESS = "https://api.w2aa.ml"

const Api = (path: string, body: Object) => {
  return fetch(`${API_ADDRESS}${path}?timestamp=${Date.now()}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

const getPlaylistInfo = async (playlistId: number): Promise<Netease.PlaylistInfo> => {
  let response = await ( await Api("/playlist/detail", {
    id: playlistId
  })).json()

  if (response.code === 200) {
    return response.playlist as Netease.PlaylistInfo
  }
  else {
    throw new Error(response.code);
  }
}

const getSongsUrl = async (songsIds: number[]) => {
  let response = await( await fetch(`${API_ADDRESS}/song/url?timestamp=${Date.now()}`, {
    method: "POST", 
    body: JSON.stringify({
      id: songsIds.join(",")
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })).json() as Netease.SongUrlResponse

  if (response.code === 200) {
    return response.data
  }
  else {
    throw new Error(response.code.toString())
  }
}

const getSongsDetail = async (songsIds: number[]) => {
  let response = await( await fetch(`${API_ADDRESS}/song/detail?timestamp=${Date.now()}`, {
    method: "POST",
    body: JSON.stringify({
      ids: songsIds.join(",")
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })).json() as Netease.SongDetailResponse

  if (response.code === 200) return response.songs
  else throw new Error(response.code.toString())
}

const [searchResult, setSearchResult] = createStore<Netease.SongDetail[]>([])

export {
  searchResult,
  setSearchResult,
  getPlaylistInfo,
  getSongsUrl,
  getSongsDetail
}