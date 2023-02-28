import { createSignal } from "solid-js"
import { Music } from "../../../model"
import { setSong } from "./player"

const [isAddTrackPopupOpen, setAddTrackPopupOpen] = createSignal<boolean>(false)

const toggleAddTrackPopup = () => {
  setAddTrackPopupOpen(!isAddTrackPopupOpen())
}

const changeNowPlayItem = (item: Music) => {
  setSong(item)
}

export {
  isAddTrackPopupOpen,
  setAddTrackPopupOpen,
  toggleAddTrackPopup,
  changeNowPlayItem
}