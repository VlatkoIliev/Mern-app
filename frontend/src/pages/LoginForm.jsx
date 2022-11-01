// Hooks
import { useState } from 'react';

// Components
import InputField from '../components/FormInputs/InputField';
import Spinner from '../components/Spinner';

// Libraries
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import axios from 'axios';

// Validation Schema
import LOGIN_SCHEMA from '../validation/loginSchema';

// Icons
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const LoginForm = () => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(null);
  const navigate = useNavigate();

  const handleIcon = () => {
    setIsEyeOpen(!isEyeOpen);
  };

  // response returns user details(_id, email, and token)
  // store the access token in storage

  const handleLogin = async (values) => {
    const { email, password } = values;

    const body = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/api/login',
        body
      );
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      navigate('/dashboard');
    } catch (error) {
      // set error (incorrect password) in state
      if (error.response) {
        let message = error.response.data.message;
        setIncorrectPassword(message);
        setTimeout(() => {
          setIncorrectPassword(null);
        }, 3000);
      }
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={LOGIN_SCHEMA}
      onSubmit={async (values) => {
        await handleLogin(values);
      }}
    >
      {({ isSubmitting }) => (
        <>
          <header className='todo-header'>
            <div className='logo'>Logo</div>
          </header>
          <Form className='user-form'>
            <div className='input-container'>
              <InputField
                label='Email'
                name='email'
                type='email'
                placeholder='joe@gmail.com'
                className='input-fields'
              />
            </div>
            <div className='input-container password-container'>
              <InputField
                label='Password'
                name='password'
                type={isEyeOpen ? 'text' : 'password'}
                placeholder='********'
                className='input-fields'
              />
              {isEyeOpen ? (
                <AiOutlineEye className='icon-eye-open' onClick={handleIcon} />
              ) : (
                <AiOutlineEyeInvisible
                  className='icon-eye-open'
                  onClick={handleIcon}
                />
              )}
              {incorrectPassword && <p>Incorrect password</p>}
            </div>

            <button type='submit' className='btn-submit'>
              {isSubmitting ? <Spinner /> : 'Sign In'}
            </button>
            <p className='signup-text'>
              Don't have an account?
              <Link to='/register' className='signup-link'>
                Sign Up
              </Link>
            </p>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default LoginForm;
