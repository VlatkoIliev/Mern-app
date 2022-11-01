import { useNavigate } from 'react-router-dom';

const Todo = ({ todo, id, onDeleteTodo, onUpdateTodo }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/${id}`);
  };
  return (
    <li key={id} className='todo-item' onClick={handleNavigate}>
      <p className='todo-title'>{todo.title}</p>
      <button
        className='btn-delete-item'
        onClick={(e) => {
          e.stopPropagation();
          onDeleteTodo(id);
        }}
      >
        Delete
      </button>

      <div className='todo-item-statusbar'>
        <label>{todo.isDone ? 'Completed' : 'Pending'}</label>
        <input
          className='todo-checkbox'
          type='checkbox'
          checked={todo.isDone}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => {
            e.stopPropagation();
            onUpdateTodo(todo);
          }}
        />
      </div>
    </li>
  );
};

export default Todo;
