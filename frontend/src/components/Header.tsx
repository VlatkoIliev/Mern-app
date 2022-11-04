// Libraries

import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  // After login redirect to home page
  const handleLogout = () => {
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className='todo-header'>
      <div className='logo'>Logo</div>
      <nav className='header-nav'>
        <ul className='header-list'>
          <li>
            <button className='btn-logout' onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
