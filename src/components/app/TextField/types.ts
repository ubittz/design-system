import { InputHTMLAttributes } from 'react';

import { FormGroupProps } from '../FormGroup';

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & FormGroupProps & {
  shape?: 'default' | 'line';
  unit?: string;
  format?: string;
};
