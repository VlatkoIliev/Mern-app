// Hooks
import { useState } from 'react';

// Components
import InputField from '../components/FormInputs/InputField';
import Spinner from '../components/Spinner';

// Libraries
// Libraries
import { useNavigate } from 'react-router-dom';
import { Formik, Form, FormikValues } from 'formik';
import axios from 'axios';

// Validation schema
import SIGN_UP_SCHEMA from '../validation/registrationSchema';

// Assets
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const SignUpForm = () => {
  const [isEyeOpenPass, setIsEyeOpenPass] = useState<boolean>(false);
  const [isEyeOpenConPass, setIsEyeOpenConPass] = useState<boolean>(false);
  const [emailExists, setEmailExists] = useState<string>('');

  const handleIconPass = () => {
    setIsEyeOpenPass(!isEyeOpenPass);
  };

  const handleIconConPass = () => {
    setIsEyeOpenConPass(!isEyeOpenConPass);
  };

  const navigate = useNavigate();

  const handleSubmit = async (values: FormikValues) => {
    const { firstName, lastName, email, password, confirmPassword } = values;
    const body: FormikValues = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    };
    try {
      const response = await axios.post(
        'http://localhost:5000/api/register',
        body
      );
      if (response.data) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      navigate('/login');
    } catch (error: any) {
      if (error.response) {
        let message = error.response.data.message;
        setEmailExists(message);
        setTimeout(() => {
          setEmailExists('');
        }, 3000);
      }
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={SIGN_UP_SCHEMA}
      onSubmit={async (values: FormikValues) => {
        await handleSubmit(values);
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
                label='First Name'
                name='firstName'
                type='text'
                placeholder='Joe'
                className='input-fields'
              />
            </div>
            <div className='input-container'>
              <InputField
                label='Last Name'
                name='lastName'
                type='text'
                placeholder='Smith'
                className='input-fields'
              />
            </div>
            <div className='input-container'>
              <InputField
                label='Email'
                name='email'
                type='email'
                placeholder='joe@gmail.com'
                className='input-fields'
              />
              {emailExists && <p>Email already exists</p>}
            </div>
            <div className='input-container password-container'>
              <InputField
                label='Password'
                name='password'
                type={isEyeOpenPass ? 'text' : 'password'}
                placeholder='********'
                className='input-fields'
              />
              {isEyeOpenPass ? (
                <AiOutlineEye
                  className='icon-eye-open'
                  onClick={handleIconPass}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className='icon-eye-open'
                  onClick={handleIconPass}
                />
              )}
            </div>
            <div className='input-container password-container'>
              <InputField
                label='Confirm Password'
                name='confirmPassword'
                type={isEyeOpenConPass ? 'text' : 'password'}
                placeholder='********'
                className='input-fields'
              />
              {isEyeOpenConPass ? (
                <AiOutlineEye
                  className='icon-eye-open'
                  onClick={handleIconConPass}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className='icon-eye-open'
                  onClick={handleIconConPass}
                />
              )}
            </div>

            <button type='submit' className='btn-submit'>
              {isSubmitting ? <Spinner /> : ' Submit'}
            </button>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default SignUpForm;
