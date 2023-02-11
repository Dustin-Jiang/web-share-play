import { MusicNote, Pause, SkipNext, SkipPrevious } from "@suid/icons-material";
import { Box, Card, CardContent, IconButton, Typography } from "@suid/material";
import { Component, Show } from "solid-js";
import { mergeProps } from "solid-js";
import PlayControl from "./playControl";
import styles from "./player.module.css";

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
  const mergedProps: {
    name: string;
    artist: string;
    album: string;
  } = mergeProps(
    { name: "未知歌曲", artist: "未知艺术家", album: "未知专辑" },
    props
  ) as {
    name: string;
    artist: string;
    album: string;
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4">{mergedProps.name}</Typography>
        <Typography
          variant="caption"
          sx={{ display: "block" }}
        >
          {mergedProps.artist}
        </Typography>
        <Typography
          variant="caption"
          sx={{ display: "block" }}
        >
          {mergedProps.album}
        </Typography>
      </Box>
    </>
  );
};

const Player: Component<{
  songInfo?: { name?: string; artist?: string; album?: string };
}> = (props) => {
  return (
    <>
      <Card class={styles.player}>
        <CardContent>
          <Typography variant="overline">Now Playing</Typography>
          <Box class={styles.content}>
            <SongInfo
              name={props.songInfo?.name}
              artist={props.songInfo?.artist}
              album={props.songInfo?.album}
            />
            <Cover src="https://p2.music.126.net/S4Kcgr9CmA_1yM6wbjL3Rg==/109951165354140879.jpg?param=2000y2000" />
          </Box>
        </CardContent>
        <PlayControl/ >
      </Card>
    </>
  );
};

export default Player;
