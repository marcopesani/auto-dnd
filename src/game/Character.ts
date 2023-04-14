import { getChatOpenAIModel } from "@/lib/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { EventEmitter } from "events";
import { Character as CharacterType, Stats as CharacterStats } from "@/pages/api/characters/types";

export interface ICharacter {
  think(objective: string, context: string): Promise<string | undefined>;
  remember(context: string): void;
  name: string;
}

export default class Character extends EventEmitter implements ICharacter {
  private _memory: string[] = [];
  private _soul: string = "";
  private _name: string = "";
  private _chatModel = getChatOpenAIModel();
  private _stats: CharacterStats = {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  };

  constructor(data: CharacterType) {
    super();
    this._soul = `You are a character within a Dungeons & Dragons roleplaying game,
    embodying the persona of ${data.name}, a ${data.description.desc}. Whenever you are prompted to think,
    communicate, or take action, remain true to your character.
    Respond in first person as if engaged in genuine dialogue, utilizing language fitting
    for your role and providing detailed explanations of your intentions.
    You are creative and used to think out of the box.`;
    this._name = data.name;
    this._stats = data.stats;
  }

  async think(objective: string, context: string): Promise<string | undefined> {
    const memory = this._memory.slice(-3).join("\n");

    const { text: decision } = await this._chatModel.call([
      new SystemChatMessage(this._soul),
      new HumanChatMessage(
        `I'm the dungeon master, and this is the context you are into:
        """
        ${context}
        """

        This is what you remember:
        """
        ${memory}
        """

        These are your objectives:
        """
        ${objective}
        """

        Describe the action you will try to execute in a single sentence.`
      ),
    ]);
    this.emit("decision", decision);
    return decision;
  }

  remember(context: string) {
    this._memory.push(context);
  }

  get name() {
    return this._name;
  }

  getStat(stat: keyof CharacterStats) {
    return this._stats[stat];
  }

  getStatsList() {
    return Object.keys(this._stats).map((stat) => ({
      stat,
      value: this._stats[stat as keyof CharacterStats],
    }));
  }

  get stats() {
    return this._stats;
  }

  get intelligence() {
    return this._stats.intelligence;
  }

  get wisdom() {
    return this._stats.wisdom;
  }

  get charisma() {
    return this._stats.charisma;
  }

  get strength() {
    return this._stats.strength;
  }

  get dexterity() {
    return this._stats.dexterity;
  }

  get constitution() {
    return this._stats.constitution;
  }
}
