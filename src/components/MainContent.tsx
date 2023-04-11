import ConsoleStream from "@/components/ConsoleStream";
import PlayButton from "@/components/PlayButton";
import Game from "@/game";
import { StopyUpdate } from "@/game/types";

const MainContent = ({
  apiKey,
  initialStory,
  story,
  game,
}: {
  apiKey: string;
  initialStory: string;
  story: StopyUpdate[];
  game: Game | null;
}) => {
  return (
    <section className="bg-gray-100 text-gray-900 w-3/4 p-4 flex flex-col h-screen">
      <div className="mb-4 flex-shrink-0">
        <h1 className="text-xl font-bold mb-2">The story so far...</h1>
        <p className="text-sm">{initialStory}</p>
      </div>

      <ConsoleStream story={story} />
      <div className="flex flex-shrink-0 mt-4">
        <PlayButton game={game} />
      </div>
    </section>
  );
};

export default MainContent;
