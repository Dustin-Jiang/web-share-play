import { Toolbar, Drawer } from "@suid/material";
import { children, createEffect, createSignal, ParentComponent } from "solid-js";
import { drawer } from "../../viewmodel/play";

const MainDrawer: ParentComponent = (props) => {
  const ctx = children(() => props.children);

  const [display, setDisplay] = createSignal<"block" | "none">(
    drawer() ? "block" : "none"
  );
  createEffect(() => {
    if (drawer()) setDisplay("block")
    else {
      setDisplay("block")
      setTimeout(() => {
        setDisplay("none")
      }, 100)
    }
  })

  return (
    <Drawer
      variant="persistent"
      open={drawer()}
      sx={{
        [`& .MuiDrawer-paper`]: {
          width: "240px",
          boxSizing: "border-box",
          zIndex: "100",
          position: "relative",
          height: "100vh",
          display: display(),
        },
        flexShrink: 0,
      }}
    >
      <Toolbar />
      {ctx()}
    </Drawer>
  );
};

export default MainDrawer;
