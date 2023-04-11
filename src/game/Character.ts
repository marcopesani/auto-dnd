import { getChatOpenAIModel } from "@/lib/openai";
import {
  HumanChatMessage,
  SystemChatMessage,
  AIChatMessage,
} from "langchain/schema";
import { EventEmitter } from "events";

export interface ICharacter {
  think(context: string): Promise<string | undefined>;
  remember(context: string): void;
  name: string;
}

export default class Character extends EventEmitter implements ICharacter {
  private _memory: string[] = [];
  private _soul: string = "";
  private _name: string = "";
  private _chatModel = getChatOpenAIModel();

  constructor(name: string, description: string) {
    super();
    this._soul = `You are a character within a Dungeons & Dragons roleplaying game,
    embodying the persona of ${name}, a ${description}. Whenever you are prompted to think,
    communicate, or take action, remain true to your character.
    Respond in first person as if engaged in genuine dialogue, utilizing language fitting
    for your role and providing detailed explanations of your intentions.`;
    this._name = name;
  }

  async think(context: string): Promise<string | undefined> {
    const memory = this._memory.slice(-3).join("\n");

    const { text: decision } = await this._chatModel.call([
      new SystemChatMessage(
        this._soul
      ),
      new HumanChatMessage(
        `I'm the dungeon master, and this is the context you are into:
        """
        ${context}
        """

        This is what you remember:
        """
        ${memory}
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
}
