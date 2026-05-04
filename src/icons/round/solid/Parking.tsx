import { createIcon } from '../../Icon';

export const Parking = createIcon(
  <>
    <circle cx='12' cy='12' r='9' fill='currentColor' stroke='currentColor' />
    <path d='M10 8V16' stroke='white' strokeLinecap='round' strokeLinejoin='round' />
    <path
      d='M10 8V7.5C9.72386 7.5 9.5 7.72386 9.5 8H10ZM10 12H9.5C9.5 12.2761 9.72386 12.5 10 12.5V12ZM10 8V8.5H13V8V7.5H10V8ZM13 12V11.5H10V12V12.5H13V12ZM10 12H10.5V8H10H9.5V12H10ZM15 10H14.5C14.5 10.8284 13.8284 11.5 13 11.5V12V12.5C14.3807 12.5 15.5 11.3807 15.5 10H15ZM13 8V8.5C13.8284 8.5 14.5 9.17157 14.5 10H15H15.5C15.5 8.61929 14.3807 7.5 13 7.5V8Z'
      fill='white'
    />
  </>,
  'RoundSolidParking'
);
