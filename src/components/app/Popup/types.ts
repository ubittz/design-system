import { ButtonProps } from '../Button';

export type PopupButtonProps = Omit<ButtonProps, 'children'> & {
  label: string;
};

export type PopupProps = {
  open?: boolean;
  title: string;
  body?: string;
  confirmButton?: PopupButtonProps;
  cancelButton?: PopupButtonProps;
  onBackdropClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
};

export type PopupOptions = Omit<PopupProps, 'open'>;

export type PopupContextValue = {
  open: (options: PopupOptions) => void;
  close: () => void;
};
