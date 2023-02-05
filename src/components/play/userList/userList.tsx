import { Person } from "@suid/icons-material";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@suid/material";
import { Component, For } from "solid-js";
import { play } from "../../../model/play";

const UserList: Component = (props) => {
  return (
    <>
      <List>
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
      </List>
    </>
  );
};

export default UserList;
