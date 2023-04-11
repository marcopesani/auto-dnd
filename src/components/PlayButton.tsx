import React, { useState, useEffect } from "react";

interface PlayButtonProps {
  running: boolean;
  startGameFunction: () => void;
  stopGameFunction: () => void;
  disabled?: boolean;
}

const PlayButton = ({
  running,
  startGameFunction,
  stopGameFunction,
  disabled = false,
}: PlayButtonProps) => {
  const [buttonColor, setButtonColor] = useState("bg-green-500");
  const [buttonText, setButtonText] = useState("Play");

  const handleClick = () => {
    if (running) {
      stopGameFunction();
      setButtonColor("bg-green-500");
      setButtonText("Play");
    } else if (!running) {
      startGameFunction();
      setButtonColor("bg-red-500");
      setButtonText("Stop");
    }
  };

  useEffect(() => {
    if (disabled) {
      setButtonColor("bg-gray-300");
    } else {
      setButtonColor("bg-green-500");
    }
  }, [disabled]);

  return (
    <button
      className={`text-white px-10 py-2 rounded ${buttonColor}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
};

export default PlayButton;
