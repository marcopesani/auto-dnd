import React, { useState } from "react";
import Game from "@/game";

const PlayButton = ({ game }: { game: Game | null }) => {
  const [running, setRunning] = useState(false);
  const [buttonColor, setButtonColor] = useState("bg-green-500");
  const [buttonText, setButtonText] = useState("Play");

  const handleClick = () => {
    if (running && game) {
      game.stop();
      setRunning(false);
      setButtonColor("bg-green-500");
      setButtonText("Play");
    } else if (!running && game) {
      game.start();
      setRunning(true);
      setButtonColor("bg-red-500");
      setButtonText("Stop");
    }
  };

  return (
    <button
      className={`text-white px-4 py-2 rounded ${buttonColor}`}
      onClick={handleClick}
    >
      {buttonText}
    </button>
  );
};

export default PlayButton;
