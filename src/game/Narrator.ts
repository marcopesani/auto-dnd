import { getChatOpenAIModel, getOpenAIModel } from "@/lib/openai";
import {
  HumanChatMessage,
  SystemChatMessage,
  AIChatMessage,
} from "langchain/schema";
import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";
import { ICharacter } from "@/game/Character";
import { EventEmitter } from "events";

export default class Narrator extends EventEmitter {
  private _memory: string[] = [];
  private _characters: ICharacter[] = [];
  private _chatModel = getChatOpenAIModel();
  private _llmModel = getOpenAIModel();
  private _system: string = `You are the Dungeon Master in a Dungeons & Dragons roleplaying game,
    orchestrating the narrative and controlling the world in which the characters find themselves.
    Guided by creativity and fairness, you are responsible for describing locations, roleplaying non-player
    characters, and presenting challenges and scenarios for the players to navigate. As a steward of the game,
    ensure that players remain engaged, while fostering a fun and collaborative atmosphere. When you talk,
    you avoid to repeat that you are the Dungeon Master, and you narrate the story in the Tolkien style.`;

  constructor(story: string) {
    super();
    this._memory.push(story);
  }

  addCharacter(character: ICharacter) {
    this._characters.push(character);
  }

  async round() {
    const objectives = await this.getObjectives();
    const actions = await this.getCharacterActions(objectives);
    const outcome = await this.getOutcome(actions);

    if (outcome) {
      this._memory.push(outcome);
      this.updateCharactersMemory(outcome);
    }

    this.emit("outcome", outcome);
    return outcome;
  }

  private async getObjectives() {
    const { text: objective } = await this._chatModel.call([
      new SystemChatMessage(this._system),
      new HumanChatMessage(
        `This is the current context:
        """
        ${this._memory.slice(-1).join("\n")}
        """.
        What is the single most important objective the players should coordinate to reach? Provide a shot and to the point answer.`
      ),
    ]);
    return objective;
  }

  private async getCharacterActions(objective: string) {
    const actions: { action: string; name: string }[] = [];
    const characters = this._characters;
    const context = this._memory.slice(-3).join("\n");

    for (let i = 0; i < characters.length; i++) {
      const character = characters[i];
      const action = await character.think(objective, context);
      if (action) actions.push({ action, name: character.name });
    }

    return actions;
  }

  private async getOutcome(actions: { action: string; name: string }[]) {
    const { text: outcome } = await this._chatModel.call([
      new SystemChatMessage(this._system),
      new AIChatMessage(
        `Here is the context you are into:
        """
        ${this._memory.slice(-3).join("\n")}
        """.
        What are you going to do?`
      ),
      ...actions.map((action) => {
        const message = new HumanChatMessage(action.action);
        message.name = action.name;
        return message;
      }),
    ]);

    return outcome;
  }

  private updateCharactersMemory(outcome: string) {
    for (let i = 0; i < this._characters.length; i++) {
      const character = this._characters[i];
      character.remember(outcome);
    }
  }
}
