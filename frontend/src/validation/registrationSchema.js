import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);

const SIGN_UP_SCHEMA = Yup.object({
  firstName: Yup.string().max(15, 'Must be 15 characters or less').required(),
  lastName: Yup.string().max(20, 'Must be 20 characters or less').required(),
  email: Yup.string().email('Invalid email address').required(),
  password: Yup.string()
    .password()
    .required(
      'Password must contain at least 8 characters, 1 number, 1 symbol, 1 uppercase and 1 lowercase letter'
    ),
  confirmPassword: Yup.string()
    .required()
    .oneOf(
      [Yup.ref('password'), null],
      'Password and Confirm password must match'
    ),
});

export default SIGN_UP_SCHEMA;
