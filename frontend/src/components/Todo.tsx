// Libraries

import { useNavigate } from 'react-router-dom';

// interface
import { TodoProps } from '../interface/todoProps';

const Todo = ({ todo, id, onDeleteTodo, onUpdateTodo }: TodoProps) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/${id}`);
  };
  return (
    <li className='todo-item' onClick={handleNavigate}>
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
