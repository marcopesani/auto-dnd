import CharacterList from '@/components/CharacterList';
import Character from "@/game/Character";

const Sidebar = ({characters}:{characters:Character[]}) => {
  return (
    <aside className="bg-gray-800 text-white w-1/4 p-4">
      <h1 className="text-xl font-bold mb-4">Characters</h1>
      <CharacterList characters={characters} />
    </aside>
  );
};

export default Sidebar;