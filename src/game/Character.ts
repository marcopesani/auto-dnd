import { fetchChatCompletions } from "@/lib/openai";
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
    const response = await fetchChatCompletions([
      {
        role: "system",
        content: this._soul,
      },
      {
        role: "user",
        content: `I'm the dungeon master, and this is the context you are into:
          """
          ${context}
          """

          This is what you remember:
          """
          ${memory}
          """
          Describe the action you will try to execute in a single sentence.`,
        name: this._name,
      },
    ]);

    const decision = response.choices[0].message?.content;
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
