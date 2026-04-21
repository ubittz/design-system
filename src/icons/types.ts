export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /** px 단위 숫자 또는 CSS 값 문자열 */
  size?: number | string;
  /** 아이콘 색상 (기본: 'currentColor') */
  color?: string;
}
