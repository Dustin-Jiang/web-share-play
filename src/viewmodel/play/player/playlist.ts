import { createSignal } from "solid-js"

const [isAddTrackPopupOpen, setAddTrackPopupOpen] = createSignal<boolean>(false)

const toggleAddTrackPopup = () => {
  setAddTrackPopupOpen(!isAddTrackPopupOpen())
}

export {
  isAddTrackPopupOpen,
  setAddTrackPopupOpen,
  toggleAddTrackPopup
}