export type Priority = 'easy' | 'medium' | 'hard';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: string;
}