import { createIcon } from '../../Icon';

export const CircleCheck = createIcon(
  <>
    <circle cx="12" cy="12" r="9" stroke="currentColor" />
    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </>,
  'RoundStrokeCircleCheck'
);
