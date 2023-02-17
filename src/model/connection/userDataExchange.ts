import { ActionReceiver, ActionSender } from "trystero"
import { play, setPlay, User } from "../play"
import { getSession } from "../session"
import { getUserInfo } from "../userInfo"

export namespace UserDataExchange {
  export interface DataPack {
    sender: User
    timeStamp: number,
    knownUser: [string, User][]
  }

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

      this.receiver(this.get)
    }

    send() {
      this.sender({
        sender: {
          name: getUserInfo().name,
          isOwner: getSession().create.includes(getSession().sessionName)
        },
        timeStamp: Date.now(),
        knownUser: Object.entries(play.user)
      })
    }

    get(data: DataPack, peerId: string) {
      let usersBeforeExchange = new Map(Object.entries(play.user))
      let hasNew = false
      let hasDiff = false
  
      let receiveKnownUser = new Map(data.knownUser)
      
      receiveKnownUser.forEach((user, key) => {
        if (!usersBeforeExchange.has(key)) {
          hasNew = true
          setPlay("user", key, user)
        }
      })

      usersBeforeExchange.forEach((user, key) => {
        if (!receiveKnownUser.has(key)) {
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
        sender: play.user[this.selfId],
        timeStamp: Date.now(),
        knownUser: Object.entries(play.user)
      }
    }
  }
}