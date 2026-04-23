'use client';

import React from 'react';

export type SNSProvider = 'kakao' | 'naver' | 'google' | 'apple';

export interface SNSButtonProps {
  provider: SNSProvider;
  shape?: 'circle' | 'square';
  label?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const PROVIDER_STYLES: Record<SNSProvider, { background: string; color: string; border?: string }> = {
  kakao: { background: '#FEE500', color: '#191919' },
  naver: { background: '#5CA847', color: '#FFFFFF' },
  google: { background: '#FFFFFF', color: '#191919', border: '1px solid #E1E4E8' },
  apple: { background: '#010101', color: '#FFFFFF' },
};

function KakaoLogo(): React.JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 3C5.58172 3 2 5.79086 2 9.2C2 11.2846 3.29218 13.1198 5.30003 14.2402L4.38587 17.4959C4.33112 17.6958 4.55778 17.8564 4.73154 17.7368L8.41882 15.3063C8.93806 15.3679 9.46528 15.4 10 15.4C14.4183 15.4 18 12.6091 18 9.2C18 5.79086 14.4183 3 10 3Z"
        fill="#191919"
      />
    </svg>
  );
}

function NaverLogo(): React.JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.7143 10.54L7.08571 3H3V17H7.28571V9.46L12.9143 17H17V3H12.7143V10.54Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function GoogleLogo(): React.JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.1713 10.1788C18.1713 9.53535 18.1166 8.92035 18.0168 8.33203H10.2V11.8356H14.7098C14.4873 13.0196 13.7981 14.0249 12.7695 14.6684V17.0724H15.5877C17.2068 15.5782 18.1713 13.4017 18.1713 10.1788Z"
        fill="#4285F4"
      />
      <path
        d="M10.2001 19.4C13.0687 19.4 15.4719 18.4302 15.5878 17.0724L12.7696 14.6684C11.8958 15.2684 10.7695 15.6311 10.2001 15.6311C7.42961 15.6311 5.08734 13.1204 4.31539 10.9727H1.40625V13.4484C2.98398 16.5893 6.33398 19.4 10.2001 19.4Z"
        fill="#34A853"
      />
      <path
        d="M4.31527 10.9727C4.12277 10.3727 4.01211 9.73423 4.01211 9.07756C4.01211 8.42089 4.12277 7.78239 4.31527 7.18239V4.70673H1.40613C0.733021 6.04673 0.349609 7.54673 0.349609 9.07756C0.349609 10.6084 0.733021 12.1084 1.40613 13.4484L4.31527 10.9727Z"
        fill="#FBBC05"
      />
      <path
        d="M10.2001 3.52389C11.3719 3.52389 12.4218 3.94106 13.2489 4.76339L15.6558 2.35656C14.4683 1.24856 12.4651 0.399561 10.2001 0.399561C6.33398 0.399561 2.98398 2.92206 1.40625 6.06289L4.31539 8.53856C5.08734 6.39089 7.42961 3.52389 10.2001 3.52389Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function AppleLogo(): React.JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.0527 15.2088C16.7641 15.875 16.4234 16.4872 16.029 17.0492C15.4956 17.8094 15.059 18.3475 14.7225 18.6635C14.2003 19.1679 13.6395 19.4266 13.0384 19.4418C12.6068 19.4418 12.0865 19.3186 11.4807 19.069C10.873 18.8204 10.3139 18.6972 9.8021 18.6972C9.26681 18.6972 8.69263 18.8204 8.07852 19.069C7.4635 19.3186 6.96817 19.4494 6.58975 19.4647C6.01277 19.4941 5.43729 19.2279 4.86281 18.6635C4.50055 18.3235 4.04576 17.7678 3.49919 16.9964C2.91342 16.1725 2.43054 15.2166 2.05072 14.1265C1.64416 12.9503 1.44043 11.8116 1.44043 10.7094C1.44043 9.44738 1.71424 8.35744 2.26261 7.44295C2.69277 6.7072 3.26544 6.12787 3.98197 5.70404C4.69851 5.28021 5.47094 5.06451 6.30077 5.04918C6.75647 5.04918 7.35501 5.19181 8.09919 5.47236C8.84147 5.75382 9.31918 5.89644 9.53048 5.89644C9.69121 5.89644 10.22 5.72857 11.1136 5.39384C11.9577 5.08444 12.6711 4.95655 13.2571 5.00808C14.8554 5.13787 16.0599 5.78371 16.8668 6.94957C15.4393 7.81363 14.7329 9.02193 14.7485 10.571C14.763 11.7784 15.1998 12.7886 16.0569 13.5984C16.4486 13.9762 16.8869 14.268 17.3749 14.4748C17.2721 14.7319 17.1643 14.9769 17.0527 15.2088ZM13.3626 0.792553C13.3626 1.74075 13.0152 2.62575 12.3226 3.44495C11.4877 4.41698 10.4748 4.97669 9.37686 4.88803C9.3613 4.77416 9.35222 4.65428 9.35222 4.52827C9.35222 3.61799 9.74822 2.64376 10.4538 1.84622C10.8064 1.44305 11.254 1.10702 11.7965 0.837985C12.3378 0.572786 12.8496 0.424897 13.3309 0.396484C13.3465 0.528775 13.3626 0.661075 13.3626 0.792553Z"
        fill="white"
      />
    </svg>
  );
}

const PROVIDER_LOGOS: Record<SNSProvider, () => React.JSX.Element> = {
  kakao: KakaoLogo,
  naver: NaverLogo,
  google: GoogleLogo,
  apple: AppleLogo,
};

export function SNSButton({
  provider,
  shape = 'circle',
  label,
  onClick,
  className,
  style,
}: SNSButtonProps): React.JSX.Element {
  const providerStyle = PROVIDER_STYLES[provider];
  const Logo = PROVIDER_LOGOS[provider];

  if (shape === 'circle') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 52,
          height: 52,
          borderRadius: 999,
          padding: 0,
          background: providerStyle.background,
          color: providerStyle.color,
          border: providerStyle.border ?? 'none',
          boxSizing: 'border-box',
          cursor: 'pointer',
          ...style,
        }}
      >
        <Logo />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        width: '100%',
        height: 48,
        borderRadius: 4,
        padding: '0 16px',
        background: providerStyle.background,
        color: providerStyle.color,
        border: providerStyle.border ?? 'none',
        boxSizing: 'border-box',
        cursor: 'pointer',
        fontSize: 14,
        fontWeight: 500,
        lineHeight: '22px',
        letterSpacing: '-0.02em',
        ...style,
      }}
    >
      <Logo />
      {label && <span>{label}</span>}
    </button>
  );
}
