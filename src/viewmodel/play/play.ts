import { createEffect, createSignal } from "solid-js";
import { MediaAction, PlaylistExchange, UserDataExchange } from "../../model/connection";
import Connection from "../../model/connection/connecion";
import { setPlay, User } from "../../model/play";
import { getSession } from "../../model/session";
import { getUserInfo } from "../../model/userInfo";
import { is900px } from "../../utils/responsive";
import { displayCopyLinkToaster, displayCopyLinkFailToaster } from "./notification";
import { NowPlay, nowPlay } from "./player";

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href).then(
    () => {
      displayCopyLinkToaster()
    },
    () => {
      displayCopyLinkFailToaster()
    }
  );
};

const quitPlay = () => {
  window.location.href = import.meta.env.BASE_URL
}

const [drawer, setDrawer] = createSignal<boolean>(!is900px());

const toggleDrawer = () => {
  setDrawer(!drawer());
};

class Play {
  private connection: Connection;

  // FIXME: the async function `getTrackers` shouldn't be run at top layer
  //        but it seems that there is no better solution at present. 
  constructor(roomId: string, trackerUrls: string[]) {
    this.connection = new Connection(roomId, trackerUrls);
    this.leave = this.connection.leave;

    const currentUser = {
      name: getUserInfo().name,
      isOwner: getSession().create.includes(getSession().sessionName)
    }

    console.log(this.connection.getPeers())
    console.log(this.connection.selfId)
    setPlay("user", this.connection.selfId, currentUser)

    const [
      sendIntroduce,
      getIntroduce
    ] = this.connection.makeAction<User>("introduce")

    const [
      sendUserDataExchange,
      getUserDataExchange
    ] = this.connection.makeAction<UserDataExchange.DataPack>("userExchange")

    const userDataExchange = new UserDataExchange.Exchange(
      sendUserDataExchange,
      getUserDataExchange,
      this.connection.selfId
    )

    const [
      sendPlaylistExchange,
      getPlaylistExchange
    ] = this.connection.makeAction<PlaylistExchange.DataPack>("playlstExchg")

    const playlistExchange = new PlaylistExchange.Exchange(
      sendPlaylistExchange,
      getPlaylistExchange,
      this.connection.selfId
    )

    const [
      sendMediaAction,
      getMediaAction
    ] = this.connection.makeAction<
      MediaAction.MediaAction<MediaAction.Actions>
    >("mediaAction")

    const mediaAction = new MediaAction.Action(
      sendMediaAction,
      getMediaAction
    )
    
    // track media playing and broadcast
    createEffect<NowPlay>((prev) => {
      let actionType = nowPlay().media.type
      mediaAction.createAction<typeof actionType>(nowPlay(), prev).forEach((action) => {
        mediaAction.send(action)
      })
      return nowPlay()
    })

    setInterval(() => {
      userDataExchange.send(),
      playlistExchange.send()
    }, 10000)

    sendIntroduce(currentUser)
    getIntroduce((data, peerId) => {
      setPlay("user", peerId, data)
    })

    this.connection.onPeerJoin((peerId) => {
      console.log(`${peerId} joined`)
      sendIntroduce(currentUser, peerId)
    });

    this.connection.onPeerLeave((peerId) => {
      console.log(`${peerId} left`)
      //@ts-ignore
      // Solid requires setting value of `undefined` to delete a key
      setPlay("user", peerId, undefined)
    })
  }

  leave;
}

export { copyLink, drawer, toggleDrawer, Play, quitPlay };
