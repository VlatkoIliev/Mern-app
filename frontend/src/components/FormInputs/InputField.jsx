import { useField } from 'formik';

const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name} className='input-label'>
        {label}
      </label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className='input-error'>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default InputField;
