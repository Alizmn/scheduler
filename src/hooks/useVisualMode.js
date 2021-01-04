import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (replace) {
      setHistory((perv) => [...perv.slice(0, perv.length-1), newMode]);
    } else {
      setHistory((perv) => [...perv, newMode]);
    }
  };
  const back = () => {
    if (history.length > 1) {
      setHistory(history.slice(0, history.length - 1));
      setMode(history[history.length - 2]);
    }
  };
  return {mode, transition, back};
}
