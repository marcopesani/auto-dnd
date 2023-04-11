import { StoryUpdate } from "@/game/types";
import { useEffect, useRef } from "react";

const ConsoleStream = ({ story }: { story: StoryUpdate[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [story]);

  return (
    <div className="bg-white p-4 rounded shadow flex-grow overflow-y-auto" ref={scrollRef}>
      {story.map(({ type, update, name }, index) => (
        <div key={index} className={`p-2 ${index % 2 === 0 ? "bg-white" : "bg-gray-200"}`}>
          <h6 className="text-sm font-bold">{type} {name}</h6>
          <p>{update}</p>
        </div>
      ))}
    </div>
  );
};

export default ConsoleStream;
