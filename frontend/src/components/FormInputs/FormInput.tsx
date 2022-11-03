import { getIn } from 'formik';
import { InputFieldProps } from '../../interface/inputFieldProps';

const FormInput = ({ field, form, label, ...props }: InputFieldProps) => {
  const error = getIn(form.errors, field.name);
  const touched = getIn(form.touched, field.name);
  return (
    <>
      <label className='input-label'>{label}</label>
      <input {...field} {...props} className='input-fields' />
      {error && touched ? <span>{error}</span> : null}
    </>
  );
};

export default FormInput;
