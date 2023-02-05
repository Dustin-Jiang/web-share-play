import { Cast } from "@suid/icons-material";
import { Avatar, Box } from "@suid/material";
import { yellow } from "@suid/material/colors";
import { children, ParentComponent } from "solid-js";

const IconTitle: ParentComponent = (props) => {
  const title = children(() => props.children);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <Avatar sx={{ bgcolor: yellow[700], margin: "8px" }}>
          <Cast />
        </Avatar>
        {title()}
      </Box>
    </>
  );
};

export default IconTitle;
