export type Role = "user" | "assistant" | "system";

export type ChatMessage = {
  id: string;
  role: Role;
  content: string;
  thinking?: string;
  createdAt: number;
  error?: string;
};

export type Conversation = {
  id: string;
  title: string;
  messages: ChatMessage[];
  model: string;
  createdAt: number;
  updatedAt: number;
};

export type ConnectionStatus = "idle" | "checking" | "online" | "offline";

export type Settings = {
  tunnelUrl: string;
  model: string;
  systemPrompt: string;
  temperature: number;
  numCtx: number;
  forceProxy: boolean;
  demoMode: boolean;
};

export type OllamaModel = {
  name: string;
  size?: number;
  modified_at?: string;
  details?: { parameter_size?: string; family?: string; quantization_level?: string };
};

export type OllamaRunningModel = {
  name: string;
  model?: string;
  size?: number;
  size_vram?: number;
  digest?: string;
  details?: { parameter_size?: string; family?: string; quantization_level?: string };
  expires_at?: string;
};
