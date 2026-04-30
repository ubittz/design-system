import { FormGroupProps } from '../FormGroup';

export type DropdownOption = {
  label: string;
  value: string;
};

export type DropdownProps = FormGroupProps & {
  shape?: 'default' | 'line';
  placeholder?: string;
  value?: string;
  options?: DropdownOption[];
  disabled?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
};
