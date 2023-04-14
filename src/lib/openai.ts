import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAI } from "langchain/llms/openai";

let chatModel:ChatOpenAI;
let llmModel:OpenAI;

export function getChatOpenAIModel() {
  const apiKey = localStorage.getItem("apiKey");
  if (!apiKey) {
    throw new Error("No OpenAI API key found in local storage.");
  }

  if (!chatModel) {
    chatModel = new ChatOpenAI({
      temperature: 0.75,
      openAIApiKey: apiKey,
    });
  }

  return chatModel;
}

export function getOpenAIModel() {
  const apiKey = localStorage.getItem("apiKey");
  if (!apiKey) {
    throw new Error("No OpenAI API key found in local storage.");
  }

  if (!llmModel) {
    llmModel = new OpenAI({
      temperature: 0.25,
      openAIApiKey: apiKey,
    });
  }

  return llmModel;
}
