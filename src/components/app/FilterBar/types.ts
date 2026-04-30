export type FilterOption = {
  label: string;
  value: string;
};

export type FilterBarProps = {
  options: FilterOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
};
