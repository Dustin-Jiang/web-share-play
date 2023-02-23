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
import { play } from "../../../model";
import { isPlaylistOpen } from "../../../viewmodel";
import { toggleAddTrackPopup } from "../../../viewmodel/play/player/playlist";
import FlexBlank from "../../flexBlank/flexBlank";
import AddTrackPopup from "./addTrackPopup";

const Playlist: Component = () => {
  return (
    <>
      <AddTrackPopup />
      <Grow in={isPlaylistOpen()} style={{ transformOrigin: "top center" }}>
        <Card sx={{ marginTop: "8px" }}>
          <CardContent sx={{ paddingBottom: "0px" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="overline">Playlist</Typography>
              <FlexBlank />
              <IconButton><PlaylistAdd onClick={toggleAddTrackPopup} /></IconButton>
              <IconButton><PlaylistRemove /></IconButton>
            </Box>
          </CardContent>
          <List>
            <PlaylistItem
              title="THANATOS"
              artist="Loren & MASH"
              album="EVANGELION FINALLY"
              cover="https://p2.music.126.net/0w2F-X52Ag-bSmIQGOzDlg==/109951165354042987.jpg"
              src=""
            />
            <For each={play.media}>
              {
                (item) => {
                  return (
                    <PlaylistItem
                      title={item.data.title}
                      artist={item.data.artist}
                      album={item.data.album}
                      cover={item.data.albumCover}
                      src={item.data.src}
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

const PlaylistItem: Component<{
  title: string,
  src: string,
  artist?: string,
  album?: string,
  cover?: string
}> = (props) => {
  return (
    <ListItemButton onClick={() => {console.log(props.src)}}>
      <ListItemAvatar>
        <Show
          when={props.cover}
          fallback={
            <>
              <Avatar>
                <MusicNote />
              </Avatar>
            </>
          }
        >
          <Avatar src={props.cover} sx={{ height: "60px", width: "60px", marginRight: "12px" }} />
        </Show>
      </ListItemAvatar>
      <ListItemText primary={props.title} secondary={
        <>
          <Box>{props.artist || "未知艺术家"}</Box>
          <Box>{props.album || "未知专辑"}</Box>
        </>
      } />
    </ListItemButton>
  )
}

export default Playlist