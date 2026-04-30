export type ToggleProps = {
  /** Toggle option labels */
  items: string[];
  /** Active option index */
  activeIndex: number;
  /** Change handler */
  onChange?: (index: number) => void;
  /** Additional className */
  className?: string;
  /** Additional styles */
  style?: React.CSSProperties;
};
