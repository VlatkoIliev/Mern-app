// Hooks
import { useState, useCallback } from 'react';
import {
  useFetchTodos,
  useAddNewTodo,
  useDeleteTodo,
  useUpdateTodo,
} from '../api/hooks';

// Components
import Spinner from '../components/Spinner';
import Todo from '../components/Todo';
import Header from '../components/Header';
import Filter from '../components/Filter';
import Form from '../components/Form';

// utils
import debounce from 'lodash.debounce';

const Dashboard = () => {
  const { isLoading, isError, error, data } = useFetchTodos();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('All todos');
  const [title, setTitle] = useState('');

  // Mutations with custom hooks
  const { mutate: addTodo } = useAddNewTodo();
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: updateTodo } = useUpdateTodo();

  const handleAddTodo = () => {
    addTodo({ title, isDone: false });
  };

  const handleDeleteTodo = (id) => {
    deleteTodo(id);
  };

  const handleUpdateTodoStatus = (todo) => {
    updateTodo({ ...todo, isDone: !todo.isDone });
  };

  // Search

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const debounceTermHandler = useCallback(debounce(handleSearchTerm, 800), []);

  const filteredListByTerm = () => {
    if (searchTerm === '') return data?.data;

    return data?.data.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Filter
  const handleFilter = (e) => {
    setFilterBy(e.target.value);
  };

  const filterListByStatus = (todos) => {
    if (filterBy === 'All todos') {
      return todos;
    } else if (filterBy === 'Completed todos') {
      return todos.filter((todo) => todo.isDone);
    } else if (filterBy === 'Pending todos') {
      return todos.filter((todo) => !todo.isDone);
    }
  };

  if (isLoading) return <Spinner />;
  if (isError) return <p>Error: {error.message}</p>;

  const filteredBySearchTerm = filteredListByTerm();
  const filteredByTermAndStatus = filterListByStatus(filteredBySearchTerm);

  return (
    <>
      <Header />
      <div className='todo-container'>
        <section className='todo-section'>
          <div className='form-container'>
            <h2>Todo list fullstack</h2>
            <Form title={title} setTitle={setTitle} onAddTodo={handleAddTodo} />

            <Filter
              handleFilter={handleFilter}
              filterBy={filterBy}
              handleTerm={handleSearchTerm}
              term={searchTerm}
            />
          </div>

          <aside className='todo-sidebar'>
            <ul className='todo-list'>
              {data?.data &&
                filteredByTermAndStatus.map((todo) => {
                  const { _id } = todo;
                  const id = _id;
                  return (
                    <Todo
                      key={id}
                      todo={todo}
                      id={id}
                      onDeleteTodo={() => handleDeleteTodo(id)}
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
