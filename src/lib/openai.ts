import {
  ChatCompletionRequestMessageRoleEnum,
  CreateChatCompletionResponse,
} from "openai";

export interface ChatCompletionRequestMessage {
  role: ChatCompletionRequestMessageRoleEnum;
  content: string;
  name?: string;
}

export async function fetchChatCompletions(
  messages: ChatCompletionRequestMessage[],
  model: string = "gpt-3.5-turbo"
): Promise<CreateChatCompletionResponse> {
  // get apiKey from local storage
  const apiKey = localStorage.getItem("apiKey");
  const url = "https://api.openai.com/v1/chat/completions";
  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  });
  const body = JSON.stringify({
    model,
    messages,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching chat completions: ${error}`);
  }
}
