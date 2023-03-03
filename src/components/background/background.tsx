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

const BackgroundTop: ParentComponent<{
  paddingTop?: string
}> = (props) => {
  if (!props.paddingTop) props.paddingTop = "0px"
  const ctx = children(() => props.children)
  return (
    <>
      <div class={styles.backdrop}>
        <Box class={styles.containerTop}>
          <Box sx={{
            marginTop: `calc(64px + ${props.paddingTop})`,
            marginBottom: `32px`
          }}>
            {ctx()}
          </Box>
        </Box>
      </div>
    </>
  )
}


export default Background
export {
  BackgroundTop
}