import { Box, IconButton } from "@mui/material";
import { Backspace, SubdirectoryArrowLeft } from "@mui/icons-material";

const keysrow1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keysrow2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keysrow3 = ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"];

const KeyboardBtn = ({ display, val, state, handleKeyPress }) => {
  const style = {
    background:
      state === "ok"
        ? "#538D4E"
        : state === "hmm"
        ? "#B59F3B"
        : state === "no"
        ? "grey"
        : "lightgrey",
    color: state ? "white" : "black",
    fontWeight: "bold",
    fontSize: "0.8rem",
    border: "0",
    margin: "0.3rem",
    height: "2.6rem",
    borderRadius: "4px",
    cursor: "pointer",
    userSelect: "none",
    width: "1.8rem",
    textAlign: "center",
  };
  return (
    <IconButton
      className="keyboard-btn"
      style={style}
      onClick={() => handleKeyPress(null, val)}
    >
      {display}
    </IconButton>
  );
};

const Keyboard = ({ theme, handleKeyPress }) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        padding: "0",
      }}
    >
      <Box>
        {keysrow1.map((key, col) => (
          <KeyboardBtn
            handleKeyPress={handleKeyPress}
            theme={theme}
            val={key}
            display={key}
            key={`keybtn_${col}`}
          />
        ))}
      </Box>
      <Box>
        {keysrow2.map((key, col) => (
          <KeyboardBtn
            handleKeyPress={handleKeyPress}
            theme={theme}
            val={key}
            display={key}
            key={`keybtn_${col}`}
          />
        ))}
      </Box>
      <Box>
        {keysrow3.map((key, col) =>
          col === 0 ? (
            <KeyboardBtn
              theme={theme}
              handleKeyPress={handleKeyPress}
              display={
                <SubdirectoryArrowLeft sx={{ verticalAlign: "middle" }} />
              }
              val={key}
              key={`keybtn_${col}`}
            />
          ) : col === keysrow3.length - 1 ? (
            <KeyboardBtn
              theme={theme}
              handleKeyPress={handleKeyPress}
              display={<Backspace sx={{ verticalAlign: "middle" }} />}
              val={key}
              key={`keybtn_${col}`}
            />
          ) : (
            <KeyboardBtn
              handleKeyPress={handleKeyPress}
              theme={theme}
              val={key}
              display={key}
              key={`keybtn_${col}`}
            />
          )
        )}
      </Box>
    </Box>
  );
};

export default Keyboard;
