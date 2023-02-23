import { createEffect, createSignal } from "solid-js";

let timer: NodeJS.Timer;

export interface NowPlay {
  isPlaying: boolean;
  media: {
    type: "music";
    src: string;
    name?: string;
    artist?: string;
    album?: string;
    length?: number;
  };
  percentage: number;
}

const [nowPlay, setNowPlay] = createSignal<NowPlay>({
  isPlaying: false,
  media: {
    type: "music",
    src: "",
    name: "Choeur: Jésus demeure ma joie, Consolation et sève de mon coeur",
    artist: "Various",
    album: "Neon Genesis Evangelion",
    length: 300
  },
  percentage: 0,
});

const togglePlaying = () => {
  let status = nowPlay();
  setNowPlay({
    ...status,
    isPlaying: !status.isPlaying,
  });

  console.log(nowPlay())
};

createEffect<boolean>((prev) => {
  if (nowPlay().isPlaying === prev) return prev
  if (nowPlay().isPlaying) {
    timer = setInterval(() => {
      setNowPlay({
        ...nowPlay(),
        percentage: nowPlay().percentage += 1
      })
    }, 1000)
  } else {
    clearInterval(timer)
  }

  return nowPlay().isPlaying
})

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
    })

    return true
  }
}

const [isPlaylistOpen, setPlaylistOpen] = createSignal<boolean>(false)

const togglePlaylistOpen = () => {
  setPlaylistOpen(!isPlaylistOpen())
}

export {
  nowPlay,
  setNowPlay,
  togglePlaying,
  setPlaying,
  togglePlaylistOpen,
  isPlaylistOpen
};
