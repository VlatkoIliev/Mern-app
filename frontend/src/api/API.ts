// Libraries
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { instance } from './axiosInstance';

// Components
import { ITodo } from '../interface/todoProps';

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

const fetchTodo = async ({ queryKey }: { queryKey: string[] }) => {
  const id: string = queryKey[1];
  const response = await instance.get(`/${id}`);
  return response;
};

export const useFetchTodo = (id: any) => {
  return useQuery(['todo', id], fetchTodo);
};

// Add new todo

const addTodo = async (newTodo: ITodo) => {
  const todo: ITodo = {
    _id: newTodo._id,
    user: newTodo.user,
    title: newTodo.title,
    isDone: newTodo.isDone,
  };
  const response = await instance.post('/', todo);
  return response;
};

// Invalidation is used to refetch the todos after the post

export const useAddNewTodo = () => {
  const queryClient = useQueryClient();
  return useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
};

// Delete

const deleteTodo = async (id: string) => {
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

const updateTodo = async (newTodo: ITodo) => {
  const todo: ITodo = {
    _id: newTodo._id,
    user: newTodo.user,
    title: newTodo.title,
    isDone: newTodo.isDone,
  };
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
