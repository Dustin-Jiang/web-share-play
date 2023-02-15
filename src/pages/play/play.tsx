import { useParams } from "@solidjs/router";
import { Link } from "@suid/icons-material";
import { IconButton } from "@suid/material";
import { Component, createSignal, onCleanup, onMount } from "solid-js";
import Background from "../../components/background/background";
import MainAppBar from "../../components/mainAppBar/mainAppBar";
import MainDrawer from "../../components/mainDrawer/mainDrawer";
import Player from "../../components/play/player/player";
import UserList from "../../components/play/userList/userList";
import UserNameDialog from "../../components/play/userNameDialog";
import { onUserNameSet } from "../../viewmodel/play/userNameDialog"
import { getSession, setSesion } from "../../model/session";
import getTrackers from "../../utils/trackers";
import { copyLink, Play as PlayViewModel } from "../../viewmodel/play";
import { Toaster } from "solid-toast";

const Play: Component = () => {
  const sessionName = useParams().sessionName;
  const [userNameSet, setUserNameSet] = createSignal<boolean>(false)
  let play: PlayViewModel
  
  onMount(async () => {
    if (sessionName !== getSession().sessionName) {
      setSesion({...getSession(), sessionName})
    }

    onUserNameSet().then(async () => {
      play = new PlayViewModel(sessionName, await getTrackers());
      setUserNameSet(true)
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
      <MainAppBar>
        {getSession().sessionName || sessionName}
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
        <Background>
          <Player
            songInfo={{
              name: "Choeur: Jésus demeure ma joie, Consolation et sève de mon coeur",
            }}
          />
        </Background>
      </div>
    </>
  );
};

export default Play;
