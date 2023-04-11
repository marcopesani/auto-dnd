import ConsoleStream from "@/components/ConsoleStream";
import PlayButton from "@/components/PlayButton";
import Game from "@/game";
import { StoryUpdate } from "@/game/types";
import useApiKey from "@/hooks/useApiKey";

import React, { useState } from "react";

interface MainContentProps {
  initialStory: string;
  story: StoryUpdate[];
  game: Game | null;
}

const MainContent: React.FC<MainContentProps> = ({ initialStory, story, game }) => {
  const [running, setRunning] = useState(false);
  const [apiKey, setApiKey] = useApiKey();

  function startGame() {
    if (game) {
      game.start();
      setRunning(true);
    }
  }

  function stopGame() {
    if (game) {
      game.stop();
      setRunning(false);
    }
  }

  const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
  };

  return (
    <section className="bg-gray-100 text-gray-900 w-3/4 p-4 flex flex-col h-screen">
      <div className="mb-4 flex-shrink-0">
        <h1 className="text-xl font-bold mb-2">The story so far...</h1>
        <p className="text-sm">{initialStory}</p>
      </div>

      <ConsoleStream story={story} />
      <div className="flex items-center flex-shrink-0 mt-4 space-x-4">
        <input
          type="text"
          value={apiKey}
          onChange={handleApiKeyChange}
          placeholder="OpenAI API Key"
          className="border border-gray-300 rounded py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500 flex-grow"
          disabled={running}
        />
        <PlayButton
          running={running}
          startGameFunction={startGame}
          stopGameFunction={stopGame}
          disabled={apiKey === ""}
        />
      </div>
    </section>
  );
};

export default MainContent;
