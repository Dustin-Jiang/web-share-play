import { NowPlay, setPlaying } from "../../viewmodel/play"
import { MediaAction } from "../connection"
import { play } from "../play"
import _ from "lodash-es"
import { selfId } from "trystero"

export interface MusicActions {
  readonly type: "musicAction",
  action: MusicControls,
  data?: unknown
}

type MusicControls = "play" | "pause" | "next" | "previous" | "jump"

namespace MusicAction {
  export function handler(
    this: MediaAction.Action,
    event: MediaAction.MediaAction<MusicActions>,
    senderPeerId: string
  ) {
    let haveChange = false

    switch (event.action.action) {
      case "play":
        haveChange = setPlaying(true)
        break
      case "pause":
        haveChange = setPlaying(false)
        break
    }

    if (haveChange) {
      // Broadcast the event
      let notifyTargets: string[] = []

      Object.entries(play.user).map(([peerId, user]) => {
        if (senderPeerId !== peerId && senderPeerId !== selfId) {
          notifyTargets.push(peerId)
        }
      })

      if (notifyTargets.length > 0) this.send(event, notifyTargets)
    }
  }

  export function createAction(
    nowPlay: NowPlay, prev: NowPlay | undefined
    ): MediaAction.MediaAction<MusicActions>[] {
    let actions: MusicControls[] = []
    let mediaActions: MediaAction.MediaAction<MusicActions>[] = []

    const compare = (diff: [string, any]) => {
      switch (diff[0]) {
        case "isPlaying":
          diff[1] as boolean
          actions.push(diff[1] ? "play" : "pause")
          break
        case "percentage":
          break
        case "media":
          //TODO: WIP
          break
      }
    }
    if (prev !== undefined) {
      _.differenceBy<[string, any], [string, any]>(
        _.toPairs(nowPlay), 
        _.toPairs(prev), 
        (pairs: [string, any]) => pairs[1]
      ).forEach(compare)
    } else {
      _.toPairs(nowPlay).forEach(compare)
    }
    actions.forEach((action) => {
      mediaActions.push({
        media: "music",
        action: {
          type: "musicAction",
          action
        }
      })
    })
    return mediaActions
  }
}

export {
  MusicAction
}