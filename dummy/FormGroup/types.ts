import { ReactNode } from 'react';

import { ButtonProps } from '@@components/Button/types';

export interface FormGroupProps {
  label?: ReactNode;
  buttonProps?: ButtonProps;
  errorMessage?: ReactNode;
  timerContent?: ReactNode;
  caption?: ReactNode;
  required?: boolean;
}
