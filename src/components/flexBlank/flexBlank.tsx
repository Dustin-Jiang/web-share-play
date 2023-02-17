import { Box } from "@suid/material"
import { Component } from "solid-js"

const FlexBlank : Component = () => {
  return (
    <>
      <Box sx={{ display: "inline-block", flexGrow: "1", width: "100%", flexShrink: "1" }} />
    </>
  )
}

export default FlexBlank