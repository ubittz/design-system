import type { IconProps } from './types';

export function createIcon(svgContent: React.ReactNode, displayName: string): React.FC<IconProps> {
  const Icon: React.FC<IconProps> = ({ size = 24, color, className, style, children: _, ...props }) => (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      style={{ color, ...style }}
      {...props}
    >
      {svgContent}
    </svg>
  );
  Icon.displayName = displayName;
  return Icon;
}
