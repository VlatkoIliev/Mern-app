const Form = ({ title, setTitle, onAddTodo }) => {
  const handleSubmit = (e) => {
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
        Add Todo
      </button>
    </form>
  );
};

export default Form;
