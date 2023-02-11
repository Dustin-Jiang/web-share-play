import { joinRoom } from "trystero";
import type { Room } from "trystero";

export default class Connection {
  private room: Room;

  // TODO: this implement is silly
  constructor(roomId: string, trackerUrls: string[]) {
    this.room = joinRoom({
      appId: "https://github.com/Dustin-Jiang/web-share-play",
      trackerUrls
    }, roomId);
    this.leave = this.room.leave
    this.onPeerJoin = this.room.onPeerJoin;
    this.onPeerLeave = this.room.onPeerLeave;
    this.onPeerStream = this.room.onPeerStream;
    this.onPeerTrack = this.room.onPeerTrack;
    this.addTrack = this.room.addTrack;
    this.addStream = this.room.addStream;
    this.getPeers = this.room.getPeers;
    this.makeAction = this.room.makeAction;
    this.ping = this.room.ping;
    this.removeStream = this.room.removeStream;
    this.removeTrack = this.room.removeTrack;
    this.replaceTrack = this.room.replaceTrack;
  }

  leave;
  onPeerJoin;
  onPeerLeave;
  onPeerStream;
  onPeerTrack;
  addTrack;
  addStream;
  getPeers;
  makeAction;
  ping;
  removeStream;
  removeTrack;
  replaceTrack;
}