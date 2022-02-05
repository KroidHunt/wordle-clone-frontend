import { DarkMode, HelpOutline, LightMode, Refresh } from "@mui/icons-material";
import { IconButton, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";

const appbarStyle = {
  boxShadow: "none",
  borderBottom: "1px grey solid",
};

const NavBar = ({ toggleTheme, theme, toggleHelp }) => {
  return (
    <AppBar
      position="sticky"
      sx={{
        ...appbarStyle,
        background: theme === "dark" ? "#272727" : "#ffffff",
      }}
    >
      <Toolbar>
        <IconButton aria-label="help" edge="start" onClick={toggleHelp}>
          <HelpOutline />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "700",
            flexGrow: "1",
            textAlign: "center",
            color: theme === "dark" ? "#ffffff" : "#808080",
          }}
        >
          WORDLE CLONE
        </Typography>
        <IconButton
          aria-label="reload"
          onClick={() => window.location.reload()}
        >
          <Refresh />
        </IconButton>
        <IconButton aria-label="theme" onClick={toggleTheme}>
          {theme === "dark" ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
