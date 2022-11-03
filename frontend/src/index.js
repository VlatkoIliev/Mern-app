import React from 'react';
import ReactDOM from 'react-dom/client';

// Components

import App from './App';
import LoginForm from './pages/LoginForm';
import SignUpForm from './pages/SignUpForm';
import TodoDetails from './pages/TodoDetails';
import PageNotFound from './pages/PageNotFound';
import Dashboard from './pages/Dashboard';

// Libraries

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Styles
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/register' element={<SignUpForm />} />
        <Route path='/:id' element={<TodoDetails />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
