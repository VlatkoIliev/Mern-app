import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUser } from '../utils/getUser';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/todos',
  headers: {
    Authorization: `Bearer ${getUser()}`,
  },
});

// CRUD api

// Get all todos

const fetchTodos = async () => {
  const response = await instance.get('/');
  return response;
};

export const useFetchTodos = () => {
  return useQuery(['todos'], fetchTodos);
};

// Get todo by id

const fetchTodo = async ({ queryKey }) => {
  const id = queryKey[1];
  const response = await instance.get(`/${id}`);
  return response;
};

export const useFetchTodo = (id) => {
  return useQuery(['todo', id], fetchTodo);
};

// Add new todo

const addTodo = async (newTodo) => {
  const response = await instance.post('/', newTodo);
  return response;
};

// Invalidation is used to refetch the todos after the post
// Optimistic update - not triggering the fetching after post
export const useAddNewTodo = () => {
  const queryClient = useQueryClient();
  return useMutation(addTodo, {
    onSuccess: (data) => {
      // queryClient.invalidateQueries(['todos']);
      queryClient.setQueryData(['todos'], (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    },
  });
};

// Delete

const deleteTodo = async (id) => {
  const response = await instance.delete(`/${id}`);
  return response;
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
};

// Update

const updateTodo = async (todo) => {
  const response = await instance.put(`/${todo._id}`, todo);
  return response;
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
};
