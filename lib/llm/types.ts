export type ChatRole = "system" | "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type ChatCompletionRequest = {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
};

export type ChatCompletionResponse = {
  id?: string;
  choices: Array<{
    index: number;
    message: ChatMessage;
    finish_reason?: string;
  }>;
};


