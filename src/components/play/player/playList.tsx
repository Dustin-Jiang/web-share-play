import { MusicNote, PlaylistAdd, PlaylistRemove } from "@suid/icons-material";
import {
  Card,
  List,
  ListItemButton,
  ListItemText,
  Grow,
  ListItemAvatar,
  Box,
  Avatar,
  Typography,
  IconButton,
  CardContent
} from "@suid/material";
import { Component, For, Show } from "solid-js";
import { Music, play } from "../../../model";
import { isPlaylistOpen } from "../../../viewmodel";
import { changeNowPlayItem, toggleAddTrackPopup } from "../../../viewmodel/play/player/playlist";
import FlexBlank from "../../flexBlank/flexBlank";
import AddTrackPopup from "./addTrackPopup";
import { NoWrapText } from "../../noWrapText"

const Playlist: Component = () => {
  return (
    <>
      <AddTrackPopup />
      <Grow in={isPlaylistOpen()} style={{ transformOrigin: "top center" }}>
        <Card sx={{ marginTop: "8px", width: "600px" }}>
          <CardContent sx={{ paddingBottom: "0px" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="overline">Playlist</Typography>
              <FlexBlank />
              <IconButton><PlaylistAdd onClick={toggleAddTrackPopup} /></IconButton>
              <IconButton><PlaylistRemove /></IconButton>
            </Box>
          </CardContent>
          <List>
            <For each={play.media} fallback={
              <Box sx={{ padding: "16px", display: "flex", justifyContent: "center" }}>
                <Typography variant="caption">
                  播放列表为空
                </Typography>
              </Box>
            }>
              {
                (item) => {
                  return (
                    <PlaylistItem
                      title={item.data.title}
                      artist={item.data.artist}
                      album={item.data.album}
                      albumCover={item.data.albumCover}
                      src={item.data.src}
                      length={item.data.length}
                    / >
                  )
                }
              }
            </For>
          </List>
        </Card>
      </Grow>
    </>
  )
}

const PlaylistItem: Component<Music> = (props) => {
  return (
    <ListItemButton onClick={() => {changeNowPlayItem(props)}}>
      <ListItemAvatar>
        <Show
          when={props.albumCover}
          fallback={
            <>
              <Avatar>
                <MusicNote />
              </Avatar>
            </>
          }
        >
          <Avatar src={props.albumCover} sx={{ height: "60px", width: "60px", marginRight: "12px" }} />
        </Show>
      </ListItemAvatar>
      <ListItemText
        primary={
          <NoWrapText>{props.title}</NoWrapText>
        }
        secondary={
          <>
            <NoWrapText>{props.artist || "未知艺术家"}</NoWrapText>
            <NoWrapText>{props.album || "未知专辑"}</NoWrapText>
          </>
        }
      />
    </ListItemButton>
  )
}

export default Playlist