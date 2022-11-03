import { FieldProps } from 'formik';

export interface InputFieldProps extends FieldProps<any> {
  name: string;
  label?: string;
}
