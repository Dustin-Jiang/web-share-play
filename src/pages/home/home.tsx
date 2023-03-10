import { Box, Button, Paper, TextField, Typography } from "@suid/material";
import type { Component } from "solid-js";
import MainAppBar from "../../components/mainAppBar/mainAppBar";
import styles from "./home.module.css";

import Background from "../../components/background/background";
import IconTitle from "../../components/home/iconTitle/iconTitle";

import { buttonSubmit, loading, userNameChange, userNameError, userName } from "../../viewmodel/home/home"
import { is600px } from "../../utils/responsive";

const Home: Component = () => {
  return (
    <>
      <MainAppBar>SharePlay</MainAppBar>
      <Background>
        <Paper class={
          is600px() ? styles.panelMobile : styles.panel
        }>
          <IconTitle>
            <Typography variant="h5">开始 SharePlay</Typography>
          </IconTitle>

          <Box
            sx={{ margin: "8px 0" }}>
            <TextField
              label="你的名字"
              id="userName"
              variant="standard"
              fullWidth
              required
              value={userName()}
              error={userNameError()}
              onChange={userNameChange}
              helperText={userNameError() && "必须输入用户名"}
            />
          </Box>
          <Button variant="contained" sx={{
            margin: "8px 0"
          }}
            onClick={buttonSubmit}
            disabled={loading()}
          >开始</Button>
        </Paper>
      </Background>
    </>
  );
};

export default Home;
