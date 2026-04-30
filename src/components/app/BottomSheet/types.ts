import { FullButtonProps } from '../Button';

export type BottomSheetButtonProps = Omit<FullButtonProps, 'children'> & {
  label: string;
};

export type BottomSheetProps = {
  open?: boolean;
  title?: string;
  showClose?: boolean;
  button?: BottomSheetButtonProps;
  onClose?: () => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export type BottomSheetOptions = Omit<BottomSheetProps, 'open' | 'children'> & {
  content?: React.ReactNode;
};

export type BottomSheetContextValue = {
  open: (options: BottomSheetOptions) => void;
  close: () => void;
};
