import { createIcon } from '../../Icon';

export const Profile = createIcon(
  <>
    <circle cx='12' cy='12' r='9' fill='currentColor' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' />
    <mask id='mask0_profile' style={{ maskType: 'alpha' }} maskUnits='userSpaceOnUse' x='2' y='2' width='20' height='20'>
      <circle cx='12' cy='12' r='9' fill='currentColor' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </mask>
    <g mask='url(#mask0_profile)'>
      <path
        d='M5 19C5 16.2386 7.23858 14 10 14H14C16.7614 14 19 16.2386 19 19C19 21.7614 16.7614 24 14 24H10C7.23858 24 5 21.7614 5 19Z'
        fill='white'
      />
    </g>
    <circle cx='12' cy='9' r='3' fill='white' />
  </>,
  'RoundSolidProfile'
);
