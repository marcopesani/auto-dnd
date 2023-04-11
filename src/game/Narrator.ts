import { fetchChatCompletions } from "@/lib/openai";
import { ICharacter } from "@/game/Character";
import { ChatCompletionRequestMessageRoleEnum } from "openai";
import { EventEmitter } from "events";

export default class Narrator extends EventEmitter {
  private _memory: string[] = [];
  private _characters: ICharacter[] = [];

  constructor(story: string) {
    super();
    this._memory.push(story);
  }

  addCharacter(character: ICharacter) {
    this._characters.push(character);
  }

  async round() {
    const actions: { action: string; name: string }[] = [];
    const characters = this._characters;
    const context = this._memory.slice(-3).join("\n");

    for (let i = 0; i < characters.length; i++) {
      const character = characters[i];
      const action = await character.think(context);
      if (action) actions.push({ action, name: character.name });
    }

    const completion = await fetchChatCompletions([
      {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: `You are the dungeon master. You listen to the characters' actions and decide what happens next.`,
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.Assistant,
        content: `Here is the context you are into:
          """
          ${context}
          """`,
      },
      ...actions.map((action) => ({
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `${action.name} ${action.action}`,
        name: action.name,
      })),
    ]);

    const outcome = completion.choices[0].message?.content;

    if (outcome) {
      this._memory.push(outcome);
      for (let i = 0; i < characters.length; i++) {
        const character = characters[i];
        character.remember(outcome);
      }
    }

    this.emit("outcome", outcome);
    return outcome;
  }
}
