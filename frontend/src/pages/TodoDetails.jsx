import { Link, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useFetchTodo } from '../api/hooks';
import { formatter } from '../utils/formatter';

// Get the id from the url params
// pass the id to the the custom hook to fetch the specific todo item
// define the fetch function which accepts the retrieved id

const TodoDetails = () => {
  const { id } = useParams();
  const { isLoading, isError, error, data } = useFetchTodo(id);

  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  if (isError) return <h3>{error.message}</h3>;

  const { title, isDone, createdAt, updatedAt } = data?.data;

  return (
    <>
      <header className='todo-header'>
        <div className='logo'>Logo</div>
      </header>
      <div className='todo-card'>
        <h3 className='todo-details'>Todo details</h3>
        <p className='todo-title'>
          <b>Title:</b> {title ? title : null}
        </p>
        <p className='todo-status'>
          <b>Status:</b> {isDone ? 'completed' : 'pending'}
        </p>
        <hr />
        <p className='todo-created'>
          <b>Created</b>: {formatter.format(Date.parse(createdAt))}
        </p>
        {isDone && (
          <p>
            <b>Completed</b>: {formatter.format(Date.parse(updatedAt))}
          </p>
        )}
      </div>
      <button
        className='btn-back'
        onClick={() => {
          navigate('/dashboard');
        }}
      >
        Back to Dashboard
      </button>
    </>
  );
};

export default TodoDetails;
