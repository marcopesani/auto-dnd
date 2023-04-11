import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import Game from "@/game";
import Character from "@/game/Character";
import { StoryUpdate } from "@/game/types";

export default function Home() {
  const [initialStory, setInitialStory] =
    useState<string>(`You are in the mines of Moria. You have a closed door if front of you.
  From the other side of the door, creepy sounds come. Sound of danger.
  But you have to cross it to continue in your quest.`);
  const [game, setGame] = useState<Game | null>(null);
  const [story, setStory] = useState<StoryUpdate[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const gameInstance = new Game(initialStory);
    const charactersList = [];

    gameInstance.on("storyUpdate", (type, update, name) => {
      setStory((prevStory) => [
        ...prevStory,
        {
          type,
          update,
          name,
        },
      ]);
    });

    charactersList.push(new Character("Neo", "the one"));
    charactersList.push(new Character("Gimli", "dwarf"));
    charactersList.push(new Character("Spiderman", "superhero"));
    charactersList.push(new Character("Frodo", "hobbit"));
    charactersList.forEach((character) => {
      gameInstance.addCharacter(character);
    });

    setCharacters(charactersList);
    setGame(gameInstance);

    return () => {
      if (gameInstance) {
        gameInstance.stop();
      }
    };
  }, []);

  return (
    <main className="h-screen w-full flex">
      <Sidebar characters={characters} />
      <MainContent
        initialStory={initialStory}
        game={game}
        story={story}
      />
    </main>
  );
}
