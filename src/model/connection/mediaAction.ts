import { ActionReceiver, ActionSender } from "trystero"
import { NowPlay } from "../../viewmodel/play"
import { MusicAction, MusicActions } from "../mediaAction/musicAction"

namespace MediaAction {
  type ActionList = { "music": MusicActions }
  export interface MediaAction<T extends Actions> {
    media: keyof ActionList,
    action: T
  }

  export class Action {
    sender: ActionSender<MediaAction<Actions>>
    receiver: ActionReceiver<MediaAction<Actions>>

    constructor(
      sender: ActionSender<MediaAction<Actions>>, 
      receiver: ActionReceiver<MediaAction<Actions>>
    ) {
      this.sender = sender
      this.receiver = receiver
      this.receiver((this.get).bind(this))
    }

    get(data: MediaAction<Actions>, peerId: string) {
      switch (data.media) {
        case "music":
          this.musicActionhandler(data as MediaAction<MusicActions>, peerId)
          break;
      
        default:
          break;
      }
    }

    send(data: MediaAction<Actions>, target?: string | string[]) {
      this.sender(data, target)
    }

    createAction<mediaType extends keyof ActionList>(
      nowPlay: NowPlay,
      prev: NowPlay | undefined
    ): MediaAction<ActionList[mediaType]>[] {
      switch (nowPlay.media.type) {
        case "music":
          return MusicAction.createAction(nowPlay, prev)
      }
    }

    musicActionhandler = MusicAction.handler
  }

  export type Actions = MusicActions
}

export {
  MediaAction
}