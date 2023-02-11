interface TrackersCache {
  time: number,
  trackers: string[]
}

export default async function getTrackers() {
  const DEFAULT_TRACKERS = [
    'wss://tracker.openwebtorrent.com',
    'wss://tracker.btorrent.xyz',
    'wss://tracker.files.fm:7073/announce',
    'wss://qot.abiir.top:443/announce',
    'wss://spacetradersapi-chatbox.herokuapp.com:443/announce'
  ]

  let trackers = await checkTrackers()

  return DEFAULT_TRACKERS.concat(trackers)
}

async function checkTrackers(): Promise<string[]> {

  let cache = localStorage.getItem("trackers")
  let trackers: string[]
  let needUpdate = false
  if (cache === null) {
    localStorage.setItem("trackers", "{}")
    cache = "{}"
    trackers = []
    needUpdate = true
  }
  else {
    let data = JSON.parse(cache) as TrackersCache
    trackers = data.trackers
    const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000
    if (Date.now() - data.time > MILLISECONDS_IN_A_DAY) {
      needUpdate = true
    }
  }

  if (needUpdate) {
    trackers = await updateTrackers()
    let newCache: TrackersCache = {
      time: Date.now(),
      trackers
    }
    localStorage.setItem("trackers", JSON.stringify(newCache))
  }

  return trackers
}

async function updateTrackers() {
  let response = await (await fetch("https://trackerslist.com/best.txt")).text()
  return response.split("\n\n")
}