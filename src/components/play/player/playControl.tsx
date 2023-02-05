import { Pause, PlayArrow, SkipNext, SkipPrevious } from "@suid/icons-material";
import { Box, IconButton, LinearProgress } from "@suid/material";
import { Component, Show } from "solid-js";
import { nowPlay, togglePlaying } from "../../../viewmodel/play";
import styles from "./player.module.css";

const PlayControl: Component = () => {
  return (
    <>
      <Box class={styles.controls}>
        <Box sx={{ marginBottom: "4px" }}>
          <LinearProgress
            variant="determinate"
            value={nowPlay().percentage}
          />
        </Box>
        <IconButton class={styles.playControl}>
          <SkipPrevious />
        </IconButton>
        <IconButton class={styles.playControl}
          onClick={togglePlaying}
        >
          <Show
            when={nowPlay().isPlaying}
            fallback={<PlayArrow />}
          >
            <Pause />
          </Show>
        </IconButton>
        <IconButton class={styles.playControl}>
          <SkipNext />
        </IconButton>
      </Box>
    </>
  );
};

export default PlayControl;
