import { createSignal } from "solid-js";
import Connection from "../../model/connecion";
import { play, setPlay } from "../../model/play";
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

  constructor(roomId: string) {
    this.connection = new Connection(roomId);
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
