import { Link, useNavigate } from 'react-router-dom';

// Header and back to dashboard

const PageNotFound = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      localStorage.removeItem('user');
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    navigate('/dashboard');
  };
  return (
    <>
      <header className='todo-header'>
        <div className='logo'>Logo</div>
      </header>
      <main className='main-error-page'>
        <section>
          <h2 className='not-found-text'>
            Oops, looks like the page you requested doesn't exist.
          </h2>
          <button onClick={handleClick} className='btn-back'>
            Go Back
          </button>
        </section>
      </main>
    </>
  );
};

export default PageNotFound;
