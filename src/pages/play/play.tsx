import { useParams } from "@solidjs/router";
import { Link } from "@suid/icons-material";
import { Button, IconButton } from "@suid/material";
import { Component, createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { BackgroundTop as Background } from "../../components/background/background";
import MainAppBar from "../../components/mainAppBar/mainAppBar";
import MainDrawer from "../../components/mainDrawer/mainDrawer";
import Player from "../../components/play/player/player";
import UserList from "../../components/play/userList/userList";
import UserNameDialog from "../../components/play/userNameDialog";
import { onUserNameSet } from "../../viewmodel/play/userNameDialog"
import { getSession, setSesion } from "../../model/session";
import getTrackers from "../../utils/trackers";
import { copyLink, Play as PlayViewModel, quitPlay } from "../../viewmodel/play";
import { Toaster } from "solid-toast";
import { is600px } from "../../utils/responsive";

const Play: Component = () => {
  const [userNameSet, setUserNameSet] = createSignal<boolean>(false)
  let play: PlayViewModel
  let [sessionName, setSessionName] = createSignal<string>(useParams().sessionName)
  window.onhashchange = () => {
    setSessionName(window.location.hash.slice(1)); // No leading #
    console.log(sessionName())
    if (sessionName() !== getSession().sessionName) {
      setSesion({...getSession(), sessionName: sessionName()})
    }
  }

  onMount(async () => {
    setSessionName(window.location.hash.slice(1)); // No leading #
    if (sessionName() !== getSession().sessionName) {
      setSesion({...getSession(), sessionName: sessionName()})
    }

    let usernameObserve = onUserNameSet()
    usernameObserve.then(async () => {
      setUserNameSet(true)
      // play = new PlayViewModel(sessionName, await getTrackers());
      play = new PlayViewModel(sessionName(), [
        'wss://tracker.openwebtorrent.com',
        'wss://tracker.btorrent.xyz',
        'wss://tracker.files.fm:7073/announce',
        'wss://qot.abiir.top:443/announce',
        'wss://spacetradersapi-chatbox.herokuapp.com:443/announce'
      ]); // for debug only
    })

    window.addEventListener("unload", () => {
      play.leave()
    })
  })

  onCleanup(() => {
    play.leave()
  })

  return (
    <>
      <Toaster />
      <UserNameDialog/>
      <MainAppBar rightSide={
        <Button
          color="inherit"
          sx={{fontWeight: "700"}}
          onClick={quitPlay}
        >
          离开
        </Button>
      }>
        {sessionName}
        <IconButton
          sx={{ marginLeft: "8px", color: "inherit" }}
          onClick={copyLink}
        >
          <Link sx={{ color: "inherit" }} />
        </IconButton>
      </MainAppBar>
      
      <div style={{display: "flex"}}>
        <MainDrawer>
          <UserList show={userNameSet()}/>
        </MainDrawer>
        <Background paddingTop={ is600px() ? "16px" : "32px" }>
          <Player />
        </Background>
      </div>
    </>
  );
};

export default Play;
