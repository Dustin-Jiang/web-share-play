import { AppBar, Typography, IconButton, Box, Toolbar } from "@suid/material";
import { children, JSX, ParentComponent } from "solid-js";
import MenuIcon from "@suid/icons-material/Menu";
import { toggleDrawer } from "../../viewmodel/play";

const MainAppBar: ParentComponent<{
  rightSide?: JSX.Element
}> = (props) => {
  let title = children(() => props.children)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            {title()}
          </Typography>
          {props.rightSide}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MainAppBar;
