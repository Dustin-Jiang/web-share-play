import { mediaSrc, nowPlay, NowPlay, setPlaying, setSong } from "../../viewmodel/play"
import { MediaAction } from "../connection"
import { play } from "../play"
import _ from "lodash-es"
import { selfId } from "trystero"

export interface MusicActions {
  readonly type: "musicAction",
  action: MusicControls,
  data?: unknown
}

type MusicControls = "play" | "pause" | "jump" | "switch"

namespace MusicAction {
  export function handler(
    this: MediaAction.Action,
    event: MediaAction.MediaAction<MusicActions>,
    senderPeerId: string
  ) {
    let haveChange = false

    console.log(event.action)

    switch (event.action.action) {
      case "play":
        haveChange = setPlaying(true)
        break
      case "pause":
        haveChange = setPlaying(false)
        break
      case "switch":
        let src = event.action.data as string
        for (let song of play.media) {
          if (song.data.src === src && nowPlay().media.src !== src) {
            haveChange = true
            setSong(song.data)
            break
          }
        }
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
    let mediaActions: MediaAction.MediaAction<MusicActions>[] = []

    const addAction = (action: MusicControls, data?: unknown) => {
      mediaActions.push({
        media: "music",
        action: {
          type: "musicAction",
          action,
          data
        }
      })
    }
    const compare = (diff: [string, any]) => {
      switch (diff[0]) {
        case "isPlaying":
          diff[1] as boolean
          diff[1] ? addAction("play") : addAction("pause")
          break
        case "percentage":
          break
        case "media":
          console.log(diff)
          let media = diff[1] as NowPlay["media"]
          addAction("switch", media.src)
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
    return mediaActions
  }
}

export {
  MusicAction
}