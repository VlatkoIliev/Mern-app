export interface ITodo {
  _id: string;
  user: string;
  title: string;
  isDone: boolean;
  updatedAt?: string;
  createdAt?: string;
}

export interface TodoProps {
  id: string;
  todo: ITodo;
  onUpdateTodo: (todo: ITodo) => void;
  onDeleteTodo: (_id: string) => void;
}
