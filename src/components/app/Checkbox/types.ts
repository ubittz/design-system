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
  /** 토글 콘텐츠 (ReactNode를 전달하면 화살표가 표시되고 클릭 시 콘텐츠가 펼쳐짐) */
  content?: React.ReactNode;
  /** 토글 콘텐츠 최대 높이 (기본값: 80) */
  contentMaxHeight?: number;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 체크 상태 변경 콜백 */
  onChange?: (checked: boolean) => void;
  /** 추가 className */
  className?: string;
  /** 추가 스타일 */
  style?: React.CSSProperties;
};
