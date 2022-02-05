import { CloseOutlined, Refresh } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
  Slide,
  DialogContent,
  Divider,
  Box,
  Container,
} from "@mui/material";
import _ from "lodash";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Help = ({ theme, open, toggleHelp, size }) => {
  const boxStyle = {
    display: "inline-block",
    border: "0.18rem grey solid",
    margin: "0.5rem",
  };

  const inputStyle = {
    maxWidth: "0.85rem",
    padding: "0.5rem",
    border: "none",
    textAlign: "center",
    fontWeight: "700",
    margin: "0",
    color: theme === "dark" ? "#ffffff" : "black",
  };

  return (
    <Dialog
      fullScreen
      fullWidth
      open={open}
      onClose={toggleHelp}
      TransitionComponent={Transition}
      sx={{
        background: theme === "dark" ? "#272727" : "#FFFFFF",
      }}
    >
      <Container maxWidth="sm">
        <DialogTitle sx={{ textAlign: "center", marginBottom: "1rem" }}>
          <Typography variant="h6" sx={{ display: "inline" }}>
            HOW TO PLAY
          </Typography>
          <IconButton sx={{ float: "right" }} onClick={toggleHelp}>
            <CloseOutlined />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ marginBottom: "1rem" }}>
            Guess the <strong>WORDLE</strong> in {size} tries.
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: "1rem" }}>
            Each guess must be a valid {size} letter word. Hit the enter button
            to submit.
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: "1rem" }}>
            After each guess, the color of the tiles will change to show how
            close your guess was to the word.
          </Typography>
          <Divider />
          <Typography
            variant="body2"
            sx={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            <strong>Examples</strong>
          </Typography>
          {_.times(5, (n) => {
            const word = "WEARLY";
            return (
              <Box sx={boxStyle} key={`example_${n}`}>
                <input
                  type="text"
                  style={{
                    ...inputStyle,
                    background: n === 0 ? "#538D4E" : "transparent",
                  }}
                  defaultValue={word[n]}
                  disabled
                />
              </Box>
            );
          })}
          <Typography
            variant="body2"
            sx={{ marginTop: "0.2rem", marginBottom: "1rem" }}
          >
            The letter <strong>W</strong> is in the word and in the correct
            spot.
          </Typography>
          {_.times(5, (n) => {
            const word = "PILLS";
            return (
              <Box sx={boxStyle} key={`example_${n}`}>
                <input
                  type="text"
                  style={{
                    ...inputStyle,
                    background: n === 1 ? "#B59F3B" : "transparent",
                  }}
                  defaultValue={word[n]}
                  disabled
                />
              </Box>
            );
          })}
          <Typography
            variant="body2"
            sx={{ marginTop: "0.2rem", marginBottom: "1rem" }}
          >
            The letter <strong>I</strong> is in the word but in the wrong spot.
          </Typography>
          {_.times(5, (n) => {
            const word = "VAGUE";
            return (
              <Box sx={boxStyle} key={`example_${n}`}>
                <input
                  type="text"
                  style={{
                    ...inputStyle,
                    background: n === 3 ? "grey" : "transparent",
                  }}
                  defaultValue={word[n]}
                  disabled
                />
              </Box>
            );
          })}
          <Typography
            variant="body2"
            sx={{ marginTop: "0.2rem", marginBottom: "1rem" }}
          >
            The letter <strong>U</strong> is not in the word in any spot.
          </Typography>
          <Divider />
          <Typography variant="body2" sx={{ marginTop: "1.5rem" }}>
            <strong>
              A new WORDLE will be available on each refresh{" "}
              <Refresh
                sx={{ verticalAlign: "middle", cursor: "pointer" }}
                onClick={() => window.location.reload()}
              />
            </strong>
          </Typography>
        </DialogContent>
      </Container>
    </Dialog>
  );
};

export default Help;
