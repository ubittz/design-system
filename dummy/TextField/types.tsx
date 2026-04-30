import { InputHTMLAttributes } from 'react';

import { FormGroupProps } from '@@components/FormGroup/types';

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & FormGroupProps;
