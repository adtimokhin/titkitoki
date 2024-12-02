"use client";

import { useEffect, useState, useRef } from "react";
import sharedMakeyMakeyHandler from "@/scripts/makeymakeyHandler";
import { useGameTurn } from "./GameProvider";
import {
  setToLoose,
  setToWin,
  showNewElement,
  updateSequenceForWrappers,
} from "@/scripts/game/wrapperManager";

const GameLogicWrapper = ({ children }) => {
  const { isTimeToPlay, setIsTimeToPlay, setHasWonRound } = useGameTurn(); // Game state
  const [winSequence, setWinSequence] = useState(""); // Win sequence
  const [userSequence, setUserSequence] = useState(""); // User input sequence

  const userSequenceRef = useRef(userSequence); // Ref for user sequence
  const winSequenceRef = useRef(winSequence); // Ref for win sequence
  const isTimeToPlayRef = useRef(isTimeToPlay); // Ref for is it time to play

  // Sync refs whenever state updates
  useEffect(() => {
    userSequenceRef.current = userSequence;
  }, [userSequence]);

  useEffect(() => {
    winSequenceRef.current = winSequence;
  }, [winSequence]);

  useEffect(() => {
    isTimeToPlayRef.current = isTimeToPlay;
  }, [isTimeToPlay]);

  // Function to generate or extend the win sequence
  const generateWinSequence = () => {
    const symbols = ["w", "a", "s", "d", "f", "g"];
    const newSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    const newSequence = winSequenceRef.current + newSymbol;

    showNewElement(newSymbol);

    setWinSequence(newSequence);
    console.log("New win sequence:", newSequence);
  };

  // Function to handle key presses
  const gameKeyPressed = (key) => {
    if (!isTimeToPlayRef.current) return;

    const currentWinSequence = winSequenceRef.current;
    const currentUserSequence = userSequenceRef.current;

    if (currentWinSequence[currentUserSequence.length] === key) {
      const newSequence = currentUserSequence + key;
      setUserSequence(newSequence);

      updateSequenceForWrappers([...newSequence]);

      if (newSequence.length === currentWinSequence.length) {
        setToWin();
        setUserSequence(""); // Reset sequence for next game
        generateWinSequence(); // Extend the win sequence
        setIsTimeToPlay(false); // Finish the round
      }
    } else {
      setToLoose();
      setUserSequence(""); // Reset on loss
    }
  };

  // Register MakeyMakey handlers
  useEffect(() => {
    const keys = ["w", "a", "s", "d", "f", "g"];
    keys.forEach((key) => {
      sharedMakeyMakeyHandler.addFunction(key, () => gameKeyPressed(key));
    });

    sharedMakeyMakeyHandler.addFunction(" ", () => {
      setUserSequence(""); // Reset user sequence on spacebar
    });

    // Generate the initial win sequence
    if (winSequenceRef.current.length == 0) {
      generateWinSequence();
    }

    // Cleanup on unmount
    return () => {
      keys.forEach((key) => sharedMakeyMakeyHandler.removeFunction(key));
      sharedMakeyMakeyHandler.removeFunction(" ");
    };
  }, [isTimeToPlay]); // Re-register if `isTimeToPlay` changes

  return (
    <div>
      <div className="game-info fixed top-4">
        <p>Win Sequence: {winSequence}</p>
        <p>Your Sequence: {userSequence}</p>
      </div>
      {children}
    </div>
  );
};

export default GameLogicWrapper;
