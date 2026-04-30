import { InputHTMLAttributes } from 'react';

export type SearchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  onSearch?: (value: string) => void;
};
