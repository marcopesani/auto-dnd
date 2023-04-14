import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Story from "@/game/Story";

export default function Home() {
  const [story, setStory] = useState<string>("");
  const [acts, setActs] = useState<string[]>([]);

  useEffect(() => {
    const storyInstance = new Story();

    async function getStory() {
      const _story = await storyInstance.generateStory({
        acts: 3,
      });
      setStory(_story);
      /*
      const _acts = await storyInstance.generateActs({
        scenes: 5,
        acts: 3,
        story: _story,
      });
      setActs(_acts);*/
    }

    getStory();
  }, []);

  return (
    <main>
      <div className="w-1/2">
        <h1 className="text-2xl font-bold">Story</h1>
        <ReactMarkdown>{story}</ReactMarkdown>
      </div>
      {/*
      <div className="w-1/2">
        <h1 className="text-2xl font-bold">Acts</h1>
        {acts.map((act, index) => (
          <ReactMarkdown key={index}>{act}</ReactMarkdown>
        ))}
      </div>
        */}
    </main>
  );
}
