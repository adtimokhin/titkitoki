"use client"
import React, { useState } from "react";

const ScoreBox = ({ initialScore = 0 }) => {
  const [score, setScore] = useState(initialScore);

  return (
    <div className="flex flex-col items-center justify-center bg-purple-500 text-white rounded-r-full h-12 px-4">
      <p className="text-xs font-light">Score</p>
      <p className="text-xl font-bold">{score}</p>
    </div>
  );
};

export default ScoreBox;
