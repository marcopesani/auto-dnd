import { getChatOpenAIModel } from "@/lib/openai";
import {
  HumanChatMessage,
  SystemChatMessage,
  AIChatMessage,
} from "langchain/schema";
import { ICharacter } from "@/game/Character";
import { EventEmitter } from "events";

export default class Narrator extends EventEmitter {
  private _memory: string[] = [];
  private _characters: ICharacter[] = [];
  private _chatModel = getChatOpenAIModel();

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

    const { text: outcome } = await this._chatModel.call([
      new SystemChatMessage(
        `You are the dungeon master. You listen to the characters' actions and decide what happens next.`
      ),
      new AIChatMessage(
        `Here is the context you are into:
          """
          ${context}
          """`
      ),
      ...actions.map((action) => {
        const message = new HumanChatMessage(`${action.name} ${action.action}`);
        message.name = action.name;
        return message;
      }),
    ]);

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
