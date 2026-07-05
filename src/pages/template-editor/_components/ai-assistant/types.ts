export interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  updates?: Record<string, unknown>;
  status?: 'pending' | 'applied' | 'dismissed';
  error?: boolean;
}
