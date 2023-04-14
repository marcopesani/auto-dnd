import { getChatOpenAIModel, getOpenAIModel } from "@/lib/openai";
import {
  HumanChatMessage,
  SystemChatMessage,
  AIChatMessage,
} from "langchain/schema";
import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

interface Round {
  start: string;
  objective: string;
  npcs: string[];
  enemies: string[];
}

export default class Story {
  private _chatModel = getChatOpenAIModel();
  private _llmModel = getOpenAIModel();
  private _system: string = `I am ChatGPT, a large language model trained by OpenAI. Please provide instructions and I will respond using markdown.`;

  async generateStory({ acts, abstract }: { acts: number; abstract?: string }) {
    const { text: story } = await this._chatModel.call([
      new SystemChatMessage(`
      I am TolkienGPT, an advanced language model created by OpenAI, designed to craft exceptional fantasy stories.
      All the villains and NPCs must be unique and memorable. Kindly provide your instructions and I will generate a creative and captivating narrative,
      ensuring to present it in a properly formatted JSON output, imitating an API response, without any additional comment. 
      Here's the JSON format that will be adhered to:
      {
        "title": "string (max 100 characters)",
        "abstract": "string (max 500 characters)",
        "lore": "string (max 500 characters)",
        "campaign_objective": "string (max 500 characters)",
        "acts": [
        {
          "id": "integer (act number)",
          "title": "string (max 100 characters)",
          "setting": "string (max 500 characters)",
          "act_objective": "string (max 500 characters)",
          "ending": "string (max 500 characters)",
        }
        ...additional acts
        ]
      }
      `),
      new HumanChatMessage(
        `Write a D&D campaign.
        ${abstract}
        Organize it in these chapters:
        - Abstract
        - Lore
        - The campaign objective
        - ${acts} Acts (each act should have a settings, and an act objective converging to the final one. The setting of each act must connect to previous act ending )`
      ),
    ]);

    return story;
  }

  async generateActs({
    scenes,
    acts,
    story,
  }: {
    scenes: number;
    acts: number;
    story: string;
  }) {
    const actsRequest = [];
    for (let i = 0; i < acts; i++) {
      actsRequest.push([
        new SystemChatMessage(this._system),
        new HumanChatMessage(
          `Write a D&D campaign. Organize it in these chapters:
          - Abstract
          - Lore
          - ${acts} Acts (each act should have a settings, and an act objective converging to the final one)
          - The final objective`
        ),
        new AIChatMessage(story),
        new HumanChatMessage(
          `Split Act ${
            i + 1
          } into ${scenes} scenes. Each scene could be a fight to win, a puzzle to solve, an item to obtain, an information to collect.
          For each scene describe the setting, that must connect to previous scene ending, the NPCs and what the player
          need to accomplish in order to consider the scene ended. The final scene must introduce the next act.`
        ),
      ]);
    }

    const { generations } = await this._chatModel.generate(actsRequest);

    return generations.map((act) => act[0].text);
  }
}
