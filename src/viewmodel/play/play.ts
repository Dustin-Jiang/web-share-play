import { createSignal } from "solid-js";
import Connection from "../../model/connecion";
import { setPlay } from "../../model/play";
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

    console.log(this.connection.getPeers())
    setPlay("user", user => ({...user, "self": {
      name: getUserInfo().name,
      isOwner: true
    }}))

    this.connection.onPeerJoin((peerId) => console.log(peerId));
  }

  leave;
}

export { copyLink, drawer, toggleDrawer, Play };
