export type RadioButtonProps = {
  /** 선택 상태 */
  checked?: boolean;
  /** 크기 */
  size?: 'S' | 'M';
  /** 라벨 텍스트 */
  label?: string;
  /** 값 */
  value?: string;
  /** 라디오 그룹 이름 */
  name?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 변경 콜백 */
  onChange?: (checked: boolean) => void;
  /** 추가 className */
  className?: string;
  /** 추가 스타일 */
  style?: React.CSSProperties;
};
