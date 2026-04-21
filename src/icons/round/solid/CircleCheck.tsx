import { createIcon } from '../../Icon';

export const CircleCheck = createIcon(
  <>
    <circle cx="12" cy="12" r="9" fill="currentColor" stroke="currentColor" />
    <path d="M9 12L11 14L15 10" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
  </>,
  'RoundSolidCircleCheck',
);
