export type TodoState = 'completed' | 'open';

export type Todo = {
  id: string;
  title: string;
  state: TodoState;
};
