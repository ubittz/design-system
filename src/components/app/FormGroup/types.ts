import { ButtonProps } from '../Button';

export interface FormGroupProps {
  label?: React.ReactNode;
  required?: boolean;
  caption?: React.ReactNode;
  errorMessage?: React.ReactNode;
  buttonProps?: ButtonProps;
  timerContent?: React.ReactNode;
}
