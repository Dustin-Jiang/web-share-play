import { VirtualContainer } from "@minht11/solid-virtual-container"
import { MusicNote } from "@suid/icons-material"
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grow,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField
} from "@suid/material"
import { Component, Show } from "solid-js"
import { searchResult } from "../../../model/media/netease"
import { addToPlaylist, inputLinkChange, isSearchError, isSearching, submitSearch } from "../../../viewmodel/play/player/netease"
import { isAddTrackPopupOpen, toggleAddTrackPopup } from "../../../viewmodel/play/player/playlist"

const AddTrackPopup : Component = () => {
  let listRef!: HTMLDivElement
  return (
    <>
      <Dialog open={isAddTrackPopupOpen()} onClose={toggleAddTrackPopup}>
        <DialogTitle sx={{
            minWidth: "480px"
          }}
        >
          从网易云音乐添加音频
        </DialogTitle>
        <DialogContent sx={{ flexShrink: "0", display:"flex", alignItems: "flex-end" }}>
          <TextField
            variant="standard"
            label="粘贴歌单链接"
            onChange={inputLinkChange}
            fullWidth
            error={isSearchError()}
            sx={{ flexShrink: 1 }}
          />
          <Button
            sx={{ flexShrink: 0, height: "36.5px", marginLeft: "8px" }}
            onClick={submitSearch}
            disabled={isSearching()}
          >
            <Show when={isSearching()} fallback="搜索">
              <CircularProgress size={24} sx={{
                height: "24px",
                width: "24px",
                color: "rgba(0, 0, 0, 0.38)"
              }}/>
            </Show>
          </Button>
        </DialogContent>
        <Grow in={!isSearching()} style={{ transformOrigin: "top center" }}>
          <div style={{ overflow: "auto" }} ref={listRef}>
            <VirtualContainer
              items={searchResult}
              scrollTarget={listRef}
              itemSize={{ height: 60 }}
              overscan={20}
            >
              {
                (props) => <SearchItem
                  tabIndex={props.tabIndex}
                  style={props.style}
                  title={props.item.name}
                  artist={props.item.ar[0].name}
                  album={props.item.al.name}
                  cover={props.item.al.picUrl}
                  onClick={() => {addToPlaylist(props.item)}}
                />
              }
            </VirtualContainer>
          </div>
        </Grow>
        
      </Dialog>
    </>
  )
}

const SearchItem: Component<{
  tabIndex: number,
  style: Record<string, string | number | undefined>, 
  title: string,
  artist: string,
  album: string,
  cover?: string
  onClick?: () => void
}> = (props) => {
  return (
    <ListItemButton
      style={props.style}
      sx={{
        width: "100%",
        height: "60px"
      }}
      onClick={props.onClick}
    >
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
          <Avatar src={`${props.cover}?param=500y500`} sx={{ marginRight: "12px" }} />
        </Show>
      </ListItemAvatar>
      <ListItemText
        primary={props.title}
        secondary={<><Box>{props.artist} ‧ {props.album}</Box></>}
        sx={{
          "& > *": {
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis"
          }
        }}
      />
    </ListItemButton>
  )
}
export default AddTrackPopup