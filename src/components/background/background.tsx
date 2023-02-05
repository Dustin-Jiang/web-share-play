import { Box } from "@suid/material";
import { children, ParentComponent } from "solid-js";
import styles from "./background.module.css"

const Background : ParentComponent = (props) => {
  const ctx = children(() => props.children)

  return (
    <>
      <div class={styles.backdrop}>
        <Box class={styles.container}>
          <Box sx={{
            marginTop: "64px"
          }}>{ctx()}</Box>
        </Box>
      </div>
    </>
  );
}

export default Background