import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);

const LOGIN_SCHEMA = Yup.object({
  email: Yup.string().email('Invalid email address').required(),
  password: Yup.string().password().required(),
});

export default LOGIN_SCHEMA;
