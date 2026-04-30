import { TextareaHTMLAttributes } from 'react';

import { FormGroupProps } from '../FormGroup';

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & FormGroupProps & {
  shape?: 'default' | 'square';
};
