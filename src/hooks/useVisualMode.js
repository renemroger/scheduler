import React, { useState, useEffect } from "react";

export function useVisualMode(newMode) {
  const [mode, setMode] = useState({
    mode: newMode,
    transition,
    history: [newMode],
    back
  });

  function transition(newMode, skip = false) {
    let newHistory = mode.history
    newHistory.push(newMode);
    if (skip) {
      back();
    }

    setMode(prev => ({
      ...prev,
      mode: newMode,
      history: newHistory
    }))
  }
  function back() {
    let newHistory = mode.history
    if (newHistory.length > 1) {
      newHistory.pop();
    }
    newMode = mode.history[mode.history.length - 1]

    setMode(prev => ({
      ...prev,
      history: newHistory,
      mode: newMode
    }))
  }

  return mode

}
