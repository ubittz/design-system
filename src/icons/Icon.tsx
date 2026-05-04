import type { IconProps } from './types';

export type IconComponent = {
  (props: IconProps): React.JSX.Element;
  displayName?: string;
};

export function createIcon(svgContent: React.ReactNode, displayName: string): IconComponent {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const Icon: IconComponent = ({ size = 24, color, className, style, children: _children, ...props }) => (
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
