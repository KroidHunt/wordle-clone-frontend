import { Container, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Help from "./components/help";
import Matrix from "./components/matrix";
import NavBar from "./components/navbar";

function App() {
  const size = 5;
  const [theme, setTheme] = useState("dark");
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const locTheme = localStorage.getItem("theme");
    if (locTheme) {
      ["dark", "light"].includes(locTheme)
        ? setTheme(locTheme)
        : setTheme("dark");
    }
  }, []);

  useEffect(() => {
    const root = document.getElementById("root");
    root.style = `height:100vh; background:${
      theme === "dark" ? "#272727" : "#ffffff"
    }`;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const th = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", th);
      return th;
    });
  };

  const toggleHelp = () => {
    setShowHelp((prev) => !prev);
  };

  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth="sm" sx={{ padding: 0 }} className="App">
        <Help
          theme={theme}
          open={showHelp}
          toggleHelp={toggleHelp}
          size={size}
        />
        <NavBar
          toggleTheme={toggleTheme}
          theme={theme}
          toggleHelp={toggleHelp}
        />
        <Matrix theme={theme} size={size} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
