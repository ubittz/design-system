import { createIcon } from '../../Icon';

export const Parking = createIcon(
  <>
    <circle cx="12" cy="12" r="9" stroke="currentColor" />
    <path d="M10 8V16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 8H13C14.1 8 15 8.9 15 10C15 11.1 14.1 12 13 12H10V8Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </>,
  'RoundStrokeParking'
);
