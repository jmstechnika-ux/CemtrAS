export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export type UserRole = 'Marketing' | 'Sales' | 'Procurement' | 'Engineering' | 'Site Team';

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  selectedRole: UserRole;
}