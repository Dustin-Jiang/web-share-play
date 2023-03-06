import { useMediaQuery } from "@suid/material"

const is400px = useMediaQuery("(max-width: 400px)")
const is600px = useMediaQuery("(max-width: 600px)")
const is900px = useMediaQuery("(max-width: 900px)")

export {
  is400px,
  is600px,
  is900px
}