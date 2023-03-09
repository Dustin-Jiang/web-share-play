import { ChangeEvent, ChangeEventHandler } from "@suid/types"
import { chunk, concat, map } from "lodash-es"
import { createSignal } from "solid-js"
import { setPlay, Music } from "../../../model"
import { getPlaylistInfo, getSongsDetail, getSongsUrl, setSearchResult } from "../../../model/media/netease"
import { Netease } from "../../../model/media/netease.definition"
import { displaySuccessMessage } from "../notification"

const [value, setValue] = createSignal<string>("")
const [isSearching, setSearching] = createSignal<boolean>(false)
const [isSearchError, setSearchError] = createSignal<boolean>(false)

const inputLinkChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement, string> =(
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  value: string
) => {
  setValue(event.target.value)
}

const submitSearch = () => {
  let playListId: string
  setSearchError(false)

  // parse playlist id
  let compared = [...value().matchAll(/.*music\.163\.com\/.*playlist\?id=(\d*)/gi)]
  console.log(compared)
  if (compared.length > 0) {
    playListId = compared[0][1]
  }
  else if (parseInt(value()).toString() === value() && value() !== "") {
    // string is pure number, treat it as playlist id
    playListId = value()
  } else {
    setSearchError(true)
    return ;
  }

  // start searching
  setSearching(true)
  // setSearchResult([])

  getPlaylistInfo(parseInt(playListId)).then(async (result) => {
    // search successful

    console.log(result.trackIds)

    let tracksIds = map(result.trackIds, "id")
    let songs: Netease.SongDetail[] = [];
    let response = (await Promise.all(map(chunk(tracksIds, 80), getSongsDetail)))
    response.forEach((part) => {
      songs = concat(songs, part)
    })

    console.log(songs)

    setSearchResult(songs)
    setSearching(false)
  }, () => {
    // search failed

    setSearching(false)
    setSearchError(true)
  })
}

const addToPlaylist = async (songDetail: Netease.SongDetail) => {
  try {
    let [songUrl] = await getSongsUrl([songDetail.id])

    let src = new URL(songUrl.url)
    src.protocol = "https:"

    setPlay("media", media => [...media, {
      type: "music",
      data: {
        src: src.toString(),
        title: songDetail.name,
        artist: songDetail.ar[0].name,
        album: songDetail.al.name,
        albumCover: songDetail.al.picUrl,
        length: songUrl.time
      }
    }])
  } catch(e) {
    throw e
  }
}

const addAllToPlaylist = async (searchResult: Netease.SongDetail[]) => {
  let songDetails: Map<number, Netease.SongDetail> = new Map()
  let songIds: number[] = []
  
  searchResult.forEach((song) => {
    songDetails.set(song.id, song)
    songIds.push(song.id)
  })
  
  let songUrls = await getSongsUrl(songIds)
  let songs: {
    type: "music",
    data: Music
  }[] = []

  songUrls.forEach((song) => {
    let src = new URL(song.url)
    src.protocol = "https:"

    let detail = songDetails.get(song.id) as Netease.SongDetail

    songs.push({
      type: "music",
      data: {
        src: src.toString(),
        title: detail.name,
        artist: detail.ar[0].name,
        album: detail.al.name,
        albumCover: detail.al.picUrl,
        length: song.time
      }
    })
  })

  setPlay("media", media => [
    ...media, 
    ...songs
  ])

  displaySuccessMessage(`已添加 ${searchResult.length} 首歌曲至播放列表`)
}

export {
  inputLinkChange,
  submitSearch,
  isSearchError,
  isSearching,
  addToPlaylist,
  addAllToPlaylist
}