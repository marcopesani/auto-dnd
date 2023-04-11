import { ChatOpenAI } from "langchain/chat_models/openai";

let openai:ChatOpenAI;

export function getChatOpenAIModel() {
  const apiKey = localStorage.getItem("apiKey");
  if (!apiKey) {
    throw new Error("No OpenAI API key found in local storage.");
  }

  if (!openai) {
    openai = new ChatOpenAI({
      temperature: 0.9,
      openAIApiKey: apiKey,
    });
  }

  return openai;
}
