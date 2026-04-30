import { ButtonHTMLAttributes } from 'react';

export type SelectableOptionProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  shape?: 'default' | 'round' | 'square';
  size?: 's' | 'm' | 'l';
  selected?: boolean;
};
