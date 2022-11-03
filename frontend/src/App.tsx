import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import './App.css';

const App = () => {
  return (
    <>
      <header className='todo-header'>
        <div className='logo'>Logo</div>
        <nav className='header-nav'>
          <ul className='header-list'>
            <li>
              <Link to='/login' className='header-link'>
                Login
              </Link>
            </li>
            <li>
              <Link to='/register' className='header-link'>
                Sign up
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <section className='home-section'>
        <h1 className='greeting-title'>Welcome user</h1>
      </section>
    </>
  );
};

export default App;
