export type CheckboxProps = {
  /** 체크 여부 */
  checked?: boolean;
  /** 크기 (S: 작은 사이즈, M: 기본 사이즈) */
  size?: 'S' | 'M';
  /** 아이콘 모양 (default: 라운드, square: 사각형) */
  shape?: 'default' | 'square';
  /** 라벨 텍스트 */
  label?: string;
  /** 캡션 텍스트 (예: "필수") */
  caption?: string;
  /** 우측 화살표 표시 여부 */
  arrow?: boolean;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 체크 상태 변경 콜백 */
  onChange?: (checked: boolean) => void;
  /** 추가 className */
  className?: string;
  /** 추가 스타일 */
  style?: React.CSSProperties;
};
