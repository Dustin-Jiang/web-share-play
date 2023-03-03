import { Box } from "@suid/material";
import { children, ParentComponent } from "solid-js";

const NoWrapText: ParentComponent = (props) => {
  const ctx = children(() => props.children)

  return (
    <Box sx={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}}>
      { ctx() }
    </Box>
  )
}

export {
  NoWrapText
}