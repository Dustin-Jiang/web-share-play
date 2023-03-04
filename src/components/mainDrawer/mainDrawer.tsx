import { Toolbar, Drawer, Slide } from "@suid/material";
import { children, createEffect, createSignal, ParentComponent, Show } from "solid-js";
import { isMobile } from "../../utils/responsive";
import { drawer, toggleDrawer } from "../../viewmodel/play";

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
    <Show when={!isMobile()} fallback={
        <Drawer
          variant="temporary"
          open={drawer()}
          onClose={toggleDrawer}
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: "240px",
              boxSizing: "border-box",
              zIndex: "1000",
              height: "100vh",
            },
            flexShrink: 0,
            zIndex: "1000"
          }}
        >
          <Toolbar />
          {ctx()}
        </Drawer>
    }>
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
          },
          display: display(),
          flexShrink: 0,
        }}
      >
        <Toolbar />
        {ctx()}
      </Drawer>
    </Show>
  );
};

export default MainDrawer;
