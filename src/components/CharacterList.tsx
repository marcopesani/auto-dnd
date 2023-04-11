import Character from "@/game/Character";

const CharacterList = ({ characters }: { characters: Character[] }) => {
  // Replace with actual character data

  return (
    <ul>
      {characters.map((character, index) => (
        <li key={index} className="mb-2">
          {character.name}
        </li>
      ))}
    </ul>
  );
};

export default CharacterList;
