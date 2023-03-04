import _ from "lodash"
import type { ActionReceiver, ActionSender } from "trystero"
import { User, play, setPlay } from "../play"

export namespace PlaylistExchange {
  export interface DataPack {
    sender: User,
    timeStamp: number,
    playlist: typeof play.media
  }
  type Playlist = typeof play.media

  export class Exchange {
    sender: ActionSender<DataPack>
    receiver: ActionReceiver<DataPack>
    selfId: string

    constructor(
      sender: ActionSender<DataPack>,
      receiver: ActionReceiver<DataPack>,
      selfId: string
    ) {
      this.sender = sender
      this.receiver = receiver
      this.selfId = selfId
      
      this.receiver(this.get.bind(this))
    }

    get(data: DataPack, peerId: string) {
      let playlistBefore = play.media
      let hasNew = false
      let hasDiff = false

      this.diff(playlistBefore, data.playlist).forEach((item) => {
        hasNew = true
        setPlay("media", media => [
          ...media,
          item
        ])
      })

      this.diff(data.playlist, playlistBefore).forEach((item) => {
        hasDiff = true
      })

      if (hasNew) {
        let targets: string[] = []
        new Map(
          Object.entries(play.user)
        ).forEach((user, key) => {
          if (key !== peerId) {
            targets.push(key)
          }
        })

        this.sender(this.createDataPack(), targets)
      }
      if (hasDiff) {
        this.sender(this.createDataPack(), peerId)
      }
    }

    send() {
      this.sender(this.createDataPack())
    }

    createDataPack(): DataPack {
      return {
        sender: play.user[this.selfId],
        timeStamp: Date.now(),
        playlist: play.media
      }
    }

    private diff(baseList: Playlist, newList: Playlist) {
      return _.differenceBy(newList, baseList, (item) => item.data.src)
    }
  }
}