import { DoneOutline, ErrorOutline, InfoOutlined } from "@suid/icons-material"
import { Box } from "@suid/material"
import { JSX } from "solid-js"
import toast from "solid-toast"
import { is600px } from "../../utils/responsive"

const SNACKBAR_COLOR = {
  "SUCCESS": "rgb(46, 125, 50)",
  "WARNING": "rgb(237, 108, 2)",
  "ERROR": "rgb(211, 47, 47)",
  "INFO": "rgb(2, 136, 209)"
}

const displayCopyLinkToaster = () => {
  toast(getMaterialSnackbarText({
    text: "链接已复制到剪切板",
    textColor: "#ffffff"
  }), getMaterialSnackbarOptions({
    icon: InfoOutlined({
      sx: {
        color: "#ffffff"
      }
    }),
    background: SNACKBAR_COLOR.INFO
  }))
}

const displayCopyLinkFailToaster = () => {
  toast.error(getMaterialSnackbarText({
    text: "复制时出现错误",
    textColor: "#ffffff"
  }), getMaterialSnackbarOptions({
    icon: ErrorOutline({
      sx: {
        color: "#ffffff"
      }
    }),
    background: SNACKBAR_COLOR.ERROR
  }))
}

const displaySuccessMessage = (text: string) => {
  toast.success(
    getMaterialSnackbarText({
      text,
      textColor: "#ffffff"
    }),
    getMaterialSnackbarOptions({
      icon: DoneOutline({
        sx: {
          color: "#ffffff"
        }
      }),
      background: SNACKBAR_COLOR.SUCCESS
    })
  )
}

function getMaterialSnackbarText(opt: {
  text: string,
  textColor?: string,
}) {
  return Box({
    children: opt.text,
    sx: {
      padding: "8px 0",
      fontSize: "14px",
      fontWeight: "700",
      color: (opt.textColor || "#000000")
    }
  })
}

function getMaterialSnackbarOptions(opt: {
  icon?: JSX.Element,
  background?: string
}) {
  return {
    icon: opt.icon,
    style: {
      padding: "6px 16px",
      borderRadius: "4px",
      background: (opt.background || "#ffffff")
    },
    position: is600px() ? "bottom-center" : "top-right" as "bottom-center" | "top-right"
  }
}

export {
  displayCopyLinkToaster,
  displayCopyLinkFailToaster,
  displaySuccessMessage
}