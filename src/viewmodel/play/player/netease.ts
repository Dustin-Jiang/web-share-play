import { ChangeEvent, ChangeEventHandler } from "@suid/types"
import { chunk, concat, map } from "lodash-es"
import { createSignal } from "solid-js"
import { setPlay } from "../../../model"
import { getPlaylistInfo, getSongsDetail, getSongsUrl, setSearchResult } from "../../../model/media/netease"
import { Netease } from "../../../model/media/netease.definition"

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
    let [SongUrl] = await getSongsUrl([songDetail.id])

    setPlay("media", media => [...media, {
      type: "music",
      data: {
        src: SongUrl.url,
        title: songDetail.name,
        artist: songDetail.ar[0].name,
        album: songDetail.al.name,
        albumCover: songDetail.al.picUrl
      }
    }])
  } catch(e) {
    throw e
  }
}

export {
  inputLinkChange,
  submitSearch,
  isSearchError,
  isSearching,
  addToPlaylist
}