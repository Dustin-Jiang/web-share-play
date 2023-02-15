import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@suid/material";
import { Component, createSignal } from "solid-js";
import { getUserInfo } from "../../model/userInfo";
import { handleSubmit, handleValueChange, valueError } from "../../viewmodel/play/userNameDialog";

const [hasUserName, setHasUserName] = createSignal<boolean>(
  getUserInfo().name !== ""
  && getUserInfo().name !== undefined
)

const UserNameDialog: Component = () => {
  return (
    <>
      <Dialog open={!hasUserName()}>
        <DialogTitle>
          在进入之前
        </DialogTitle>
        <DialogContent>
          <TextField
            variant="standard"
            label="设置你的名字"
            required
            onChange={handleValueChange}
            error={valueError()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>确定</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UserNameDialog
export { hasUserName, setHasUserName }