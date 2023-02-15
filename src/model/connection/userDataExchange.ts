import { ActionReceiver, ActionSender } from "trystero"
import { play, setPlay, User } from "../play"
import { getSession } from "../session"
import { getUserInfo } from "../userInfo"

export namespace UserDataExchange {
  export interface DataPack {
    sender: User
    timeStamp: number,
    knownUser: Map<string, User>
  }

  export class Exchange {
    sender: ActionSender<DataPack>
    receiver: ActionReceiver<DataPack>

    constructor(sender: ActionSender<DataPack>, receiver: ActionReceiver<DataPack>) {
      this.sender = sender
      this.receiver = receiver

      this.receiver(this.get)
    }

    send() {
      this.sender({
        sender: {
          name: getUserInfo().name,
          isOwner: getSession().create.includes(getSession().sessionName)
        },
        timeStamp: Date.now(),
        knownUser: new Map(Object.entries(play.user))
      })
    }

    get(data: DataPack, peerId: string) {
      let usersBeforeExchange = new Map(Object.entries(play.user))
      let hasNew = false
      let hasDiff = false
  
      data.knownUser.forEach((user, key) => {
        if (!usersBeforeExchange.has(key)) {
          hasNew = true
          setPlay("user", key, user)
        }
      })

      usersBeforeExchange.forEach((user, key) => {
        if (!data.knownUser.has(key)) {
          hasDiff = true
        }
      });
  
      if (hasNew) {
        let targets: string[] = []
        usersBeforeExchange.forEach((user, key) => {
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

    private createDataPack(): DataPack {
      return {
        sender: play.user["self"],
        timeStamp: Date.now(),
        knownUser: new Map(Object.entries(play.user))
      }
    }
  }
}