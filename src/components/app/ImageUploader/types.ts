export type ImageFile = {
  id: string;
  file?: File;
  url: string;
  name: string;
};

export type ImageUploaderProps = {
  value?: ImageFile[];
  maxCount?: number;
  accept?: string;
  disabled?: boolean;
  onClick?: () => void;
  onChange?: (files: ImageFile[]) => void;
  className?: string;
  style?: React.CSSProperties;
};
