import { FormProps } from '../interface/formProps';

const Form = ({ title, setTitle, onAddTodo }: FormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddTodo();
    setTitle('');
  };
  return (
    <form className='todo-form' onSubmit={handleSubmit}>
      <input
        className='input'
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button type='submit' className='form-btn'>
        Go
      </button>
    </form>
  );
};

export default Form;
