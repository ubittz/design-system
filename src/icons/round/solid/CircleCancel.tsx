import { createIcon } from '../../Icon';

export const CircleCancel = createIcon(
  <>
    <circle cx="12" cy="12" r="9" fill="currentColor" stroke="currentColor" />
    <path d="M9 15L15 9" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 15L9 9" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
  </>,
  'RoundSolidCircleCancel',
);
