import { useState, useCallback } from 'react';

// Hooks
import {
  useFetchTodos,
  useAddNewTodo,
  useDeleteTodo,
  useUpdateTodo,
} from '../api/API';

// Components
import Spinner from '../components/Spinner';
import Todo from '../components/Todo';
import Header from '../components/Header';
import Filter from '../components/Filter';
import Form from '../components/Form';

// interfaces
import { ITodo } from '../interface/todoProps';

// utils
import { getUserId } from '../utils/getUser';
import debounce from 'lodash.debounce';

const Dashboard = () => {
  const { isLoading, isError, data } = useFetchTodos();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterBy, setFilterBy] = useState<string>('All todos');
  const [title, setTitle] = useState<string>('');

  // Mutations with custom hooks
  const { mutate: addTodo } = useAddNewTodo();
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: updateTodo } = useUpdateTodo();

  const handleAddTodo = () => {
    const userId = getUserId();

    const item = {
      _id: '',
      user: userId,
      title,
      isDone: false,
    };
    addTodo(item);
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id);
  };

  const handleUpdateTodoStatus = (todo: ITodo) => {
    const item = {
      ...todo,
      isDone: !todo.isDone,
    };
    updateTodo(item);
  };

  // Search
  const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const debounceTermHandler = useCallback(debounce(handleSearchTerm, 800), []);

  const filteredListByTerm = () => {
    if (searchTerm === '') return data?.data;

    return data?.data.filter((todo: ITodo) =>
      todo.title.toLowerCase().includes(searchTerm?.toLowerCase())
    );
  };

  // Filter
  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(e.target.value);
  };

  const filterListByStatus = (todos: ITodo[]) => {
    if (filterBy === 'All todos') {
      return todos;
    } else if (filterBy === 'Completed todos') {
      return todos.filter((todo) => todo.isDone);
    } else if (filterBy === 'Pending todos') {
      return todos.filter((todo) => !todo.isDone);
    }
  };

  if (isLoading) return <Spinner />;
  if (isError) return <p>Error</p>;

  const filteredBySearchTerm = filteredListByTerm();
  const filteredByTermAndStatus: ITodo[] | undefined =
    filterListByStatus(filteredBySearchTerm);

  return (
    <>
      <Header />
      <div className='todo-container'>
        <section className='todo-section'>
          <div className='form-container'>
            <Form title={title} setTitle={setTitle} onAddTodo={handleAddTodo} />
            <Filter
              value={filterBy}
              handleFilter={handleFilter}
              handleTerm={handleSearchTerm}
            />
          </div>

          <aside className='todo-sidebar'>
            <ul className='todo-list'>
              {data?.data &&
                filteredByTermAndStatus?.map((todo: ITodo) => {
                  return (
                    <Todo
                      key={todo._id}
                      todo={todo}
                      id={todo._id}
                      onDeleteTodo={() => handleDeleteTodo(todo._id)}
                      onUpdateTodo={handleUpdateTodoStatus}
                    />
                  );
                })}
            </ul>
          </aside>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
