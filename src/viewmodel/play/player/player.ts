import { createEffect, createSignal } from "solid-js";
import { audioElement } from "../../../components";
import { Music, play } from "../../../model";

let timer: NodeJS.Timer;

export interface NowPlay {
  isPlaying: boolean;
  media: {
    type: "music";
    src: string;
    name?: string;
    artist?: string;
    album?: string;
    albumCover?: string;
    length: number; // in milliseconds
  };
}

const [nowPlay, setNowPlay] = createSignal<NowPlay>({
  isPlaying: false,
  media: {
    type: "music",
    src: "",
    name: "",
    artist: "",
    album: "",
    albumCover: "",
    length: 0
  }
});

const [playingPercentage, setPlayingPercentage] = createSignal<number>(0)

const togglePlaying = () => {
  setPlaying(!nowPlay().isPlaying)
};

// listen to currentTime change
createEffect<boolean>((prev) => {
  if (nowPlay().isPlaying === prev) return prev
  if (nowPlay().isPlaying) {
    timer = setInterval(
      () => setPlayingPercentage(
        audioElement.currentTime / audioElement.duration * 100
      ),
      50)
  } else {
    clearInterval(timer)
  }
  return nowPlay().isPlaying
})

// on the end of media
createEffect(() => {
  if (playingPercentage() === 100) setNextSong(true);
})

const setNextSong = (isPlaying?: boolean) => {
  let foundNowPlaying = false
  for (let media of play.media) {
    if (foundNowPlaying) {
      // last song is previous Media<> object
      // this is the next
      setSong(media.data, isPlaying)
      break
    }
    if (nowPlay().media.src === media.data.src) foundNowPlaying = true
  }
}

/**
 * 
 * @param playing target playing status
 * @returns if status changed
 */
const setPlaying = (playing: boolean) : boolean => {
  if (playing === nowPlay().isPlaying) return false
  else {
    setNowPlay({
      ...nowPlay(),
      isPlaying: playing
    });

    (playing) ? audioElement.play() : audioElement.pause()

    return true
  }
}

const setSong = (song: Music, isPlaying?: boolean) => {
  if (isPlaying === undefined) isPlaying = nowPlay().isPlaying

  // stop the media first
  setPlaying(false)
  setPlayingPercentage(0)

  setNowPlay({
    ...nowPlay(),
    media: {
      type: "music",
      src: song.src,
      name: song.title,
      artist: song.artist,
      album: song.album,
      albumCover: song.albumCover,
      length: song.length
    }
  })


  // everything is done, now start playing
  // if there is no media next, the code won't reach here
  // so play the audioElement wildly
  if (isPlaying) setTimeout(() => setPlaying(true), 50)

  navigator.mediaSession.metadata = new MediaMetadata({
    album: song.album || "????????????",
    artist: song.artist || "???????????????",
    artwork: [{ src: song.albumCover || "" }],
    title: song.title
  })

  navigator.mediaSession.setActionHandler("play", () => setPlaying(true))
  navigator.mediaSession.setActionHandler("pause", () => setPlaying(false))
  navigator.mediaSession.setActionHandler("nexttrack", () => setNextSong(nowPlay().isPlaying))
}

const [isPlaylistOpen, setPlaylistOpen] = createSignal<boolean>(false)

const togglePlaylistOpen = () => {
  setPlaylistOpen(!isPlaylistOpen())
}

const [mediaSrc, setMediaSrc] = createSignal<string>("")
createEffect<string>((prev) => {
  if (nowPlay().media.src === prev) return prev
  else {
    setMediaSrc(nowPlay().media.src)
    return nowPlay().media.src
  }
})

export {
  nowPlay,
  setNowPlay,
  togglePlaying,
  setPlaying,
  togglePlaylistOpen,
  isPlaylistOpen,
  playingPercentage,
  mediaSrc,
  setSong,
  setNextSong as nextSong
};
