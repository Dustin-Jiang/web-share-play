import { createSignal } from "solid-js";
import { UserDataExchange } from "../../model/connection";
import Connection from "../../model/connection/connecion";
import { setPlay, User } from "../../model/play";
import { getSession } from "../../model/session";
import { getUserInfo } from "../../model/userInfo";

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href).then(
    () => {},
    () => {}
  );
};

const [drawer, setDrawer] = createSignal<boolean>(true);

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
    setPlay("user", user => ({
      ...user, "self": currentUser
    }))

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
      getUserDataExchange
    )

    setInterval(() => userDataExchange.send(), 10000)

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

export { copyLink, drawer, toggleDrawer, Play };
