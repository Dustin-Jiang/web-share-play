import { createSignal } from "solid-js";

let timer: NodeJS.Timer;

interface NowPlay {
  isPlaying: boolean;
  song: {
    name?: string;
    artist?: string;
    album?: string;
    length?: number;
  };
  percentage: number;
}

const [nowPlay, setNowPlay] = createSignal<NowPlay>({
  isPlaying: false,
  song: {
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
};

export {
  nowPlay,
  setNowPlay,
  togglePlaying
};
