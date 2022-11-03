export interface FormProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  onAddTodo: () => void;
}
