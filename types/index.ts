export type ChatRole = "assistant" | "user" | "system";
export interface ChatMessage {
  role: ChatRole;
  content: string;
}
export type AnswerMessage = ChatMessage & { role: "assistant" };
export type SystemMessage = ChatMessage & { role: "system" };
