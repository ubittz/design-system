import { FormGroupProps } from '../FormGroup';

type PickerBaseProps = FormGroupProps & {
  shape?: 'default' | 'line';
  placeholder?: string;
  disabled?: boolean;
  formatDate?: (date: Date) => string;
  formatRange?: (range: [Date, Date]) => string;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  style?: React.CSSProperties;
};

type PickerSingleProps = PickerBaseProps & {
  mode?: 'single';
  value?: Date | null;
  onChange?: (date: Date) => void;
};

type PickerRangeProps = PickerBaseProps & {
  mode: 'range';
  value?: [Date, Date] | null;
  onChange?: (range: [Date, Date] | null) => void;
};

export type PickerProps = PickerSingleProps | PickerRangeProps;
