import { Person } from "@suid/icons-material";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton
} from "@suid/material";
import { Component, For, Show } from "solid-js";
import { play } from "../../../model/play";

const UserList: Component<{
  show: boolean
}> = (props) => {
  return (
    <>
      <List>
        <Show when={props.show} fallback={<UserListSkeleton />}>
          <For each={Object.keys(play.user)}>
            {(peerId) => {
              return (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Person />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={play.user[peerId].name}
                    secondary={play.user[peerId].isOwner ? "创建者" : ""}
                  />
                </ListItem>
              );
            }}
          </For>
        </Show>
      </List>
    </>
  );
};

const UserListSkeleton: Component = () => {
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Skeleton variant="circular" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton variant="text"/>}
          secondary={<Skeleton variant="text"/>}
        />
      </ListItem>
    </>
  )
}

export default UserList;
