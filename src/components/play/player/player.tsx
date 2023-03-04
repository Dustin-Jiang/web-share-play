import { MusicNote, Pause, SkipNext, SkipPrevious } from "@suid/icons-material";
import { Box, Card, CardContent, IconButton, Typography } from "@suid/material";
import { Component, Show } from "solid-js";
import { isMobile } from "../../../utils/responsive";
import { mediaSrc, nowPlay } from "../../../viewmodel";
import PlayControl from "./playControl";
import styles from "./player.module.css";
import Playlist from "./playList";

const Cover: Component<{ src?: string }> = (props) => {
  return (
    <Box class={styles.cover}>
      <Show
        when={props.src}
        fallback={
          <>
            <Box class={styles.coverPlaceholder}>
              <MusicNote />
            </Box>
          </>
        }
      >
        <img src={props.src} />
      </Show>
    </Box>
  );
};

const SongInfo: Component<{
  name?: string;
  artist?: string;
  album?: string;
}> = (props) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4">{props.name || "未知歌曲"}</Typography>
        <Typography
          variant="caption"
          sx={{ display: "block" }}
        >
          {props.artist || "未知艺术家"}
        </Typography>
        <Typography
          variant="caption"
          sx={{ display: "block" }}
        >
          {props.album || "未知专辑"}
        </Typography>
      </Box>
    </>
  );
};

let audioElement!: HTMLAudioElement

const Player: Component = () => {
  return (
    <>
      <Card class={isMobile() ? styles.playerMobile : styles.player}>
        <CardContent>
          <Typography variant="overline">Now Playing</Typography>
          <Box class={styles.content}>
            <SongInfo
              name={nowPlay().media.name}
              artist={nowPlay().media.artist}
              album={nowPlay().media.album}
            />
            <Cover src={nowPlay().media.albumCover} />
          </Box>
        </CardContent>
        <PlayControl/ >
        <audio preload="auto" src={mediaSrc()} ref={audioElement}/>
      </Card>
      <Playlist />
    </>
  );
};

export default Player;
export {
  audioElement
}