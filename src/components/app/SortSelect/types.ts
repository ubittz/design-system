export type SortSelectOption = {
  label: string;
  value: string;
};

export type SortSelectProps = {
  options: SortSelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
};
