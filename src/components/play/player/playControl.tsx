import { Pause, PlayArrow, QueueMusic, SkipNext, SkipPrevious } from "@suid/icons-material";
import { Box, IconButton, LinearProgress } from "@suid/material";
import { Component, Show } from "solid-js";
import { nowPlay, togglePlaying, togglePlaylistOpen, playingPercentage } from "../../../viewmodel/play";
import FlexBlank from "../../flexBlank/flexBlank";
import styles from "./player.module.css";

const PlayControl: Component = () => {
  return (
    <>
      <Box class={styles.controls}>
        <Box sx={{ marginBottom: "4px" }}>
          <LinearProgress
            variant="determinate"
            value={playingPercentage()}
          />
        </Box>
        <Box sx={{ display: "flex" }}>
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

          <FlexBlank />

          <IconButton class={styles.playControl} 
            onClick={togglePlaylistOpen}
          >
            <QueueMusic />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default PlayControl;
