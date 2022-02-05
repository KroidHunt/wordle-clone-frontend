import { Box } from "@mui/material";
import _ from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import words from "../data";
import Keyboard from "./keyboard";
import Popup from "./popup";

const useStateRef = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return [setValue, ref, value];
};

const Matrix = ({ size = 5, theme }) => {
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

  const [matrixClr, setMatrixClr] = useState({});
  const [msg, setMsg] = useState("");
  const [styleKeys, setStyleKeys] = useState(false);
  const [setMatrix, matrixRef, matrix] = useStateRef([]);
  const [setGuess, guessRef] = useStateRef([]);
  const [setAllGUess, allGuessRef] = useStateRef([]);
  const guessWord = useRef(
    words[size][Math.floor(Math.random() * words[size].length)]
  );

  const setColor = useCallback(() => {
    const colors = {};
    const word = guessWord.current;
    for (let row = 0; row < matrixRef.current.length; row++) {
      matrixRef.current[row].forEach((char, index) => {
        if (word[index] === char.toLowerCase()) {
          colors[`${row}-${index}`] = "#538D4E";
        } else if (word.includes(char.toLowerCase())) {
          colors[`${row}-${index}`] = "#B59F3B";
        } else {
          colors[`${row}-${index}`] = "grey";
        }
      });
    }
    setMatrixClr(colors);
  }, [matrixRef]);

  const handleKeyPress = useCallback(
    (event, keyvalue) => {
      const key = event ? event.key : keyvalue;
      let currGuess = guessRef.current;
      const isBackspace = key === "Backspace";
      const isEnter = key === "Enter";
      const isLetter = key.match(/[a-z]{1}/i);
      if (isEnter) {
        if (currGuess.length !== size) {
          setMsg("Not enough letters");
          return;
        }
        if (allGuessRef.current.length === size) {
          return;
        }
        const guessedWord = currGuess.join("").toLowerCase();
        if (!words[size].includes(guessedWord)) {
          setMsg("Not in word list");
          return;
        }
        allGuessRef.current.push(currGuess);
        currGuess = [];
        setAllGUess(allGuessRef.current);
        setGuess(currGuess);
        setStyleKeys(true);
        setColor();
        if (guessedWord === guessWord.current) {
          window.removeEventListener("keydown", handleKeyPress);
        }
      } else if (isBackspace && currGuess.length > 0) {
        currGuess.splice(currGuess.length - 1, 1);
        setGuess(currGuess);
      } else if (
        !isBackspace &&
        !isEnter &&
        isLetter &&
        key.length === 1 &&
        currGuess.length < size
      ) {
        currGuess.push(key);
        setGuess(currGuess);
      }

      if (isEnter || isBackspace || isLetter) {
        setMatrix([...allGuessRef.current, currGuess]);
      }
    },
    [allGuessRef, guessRef, setAllGUess, setGuess, size, setColor, setMatrix]
  );

  useEffect(() => {
    if (msg) {
      setTimeout(() => setMsg(""), 2000);
    }
  }, [msg]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: "1",
          overflow: "hidden",
          flexDirection: "column",
          height: "58vh",
        }}
      >
        {msg && <Popup message={msg} />}
        {_.times(size, (r) => {
          return (
            <Box key={`row_${r}`}>
              {_.times(size, (c) => {
                const val =
                  matrix && matrix[r] && matrix[r][c] ? matrix[r][c] : "";
                const bgClr = matrixClr[`${r}-${c}`] || "transparent";
                return (
                  <Box sx={boxStyle} key={`col_${c}`}>
                    <input
                      type="text"
                      name={`bx_${r}_${c}`}
                      style={{
                        ...inputStyle,
                        background: bgClr,
                      }}
                      defaultValue={val.toUpperCase()}
                      disabled
                    />
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Box>
      <Keyboard
        theme={theme}
        handleKeyPress={handleKeyPress}
        styleKeys={styleKeys}
        setStyleKeys={setStyleKeys}
        word={guessWord.current}
      />
    </div>
  );
};

export default Matrix;
