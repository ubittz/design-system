/**
 * Typography Tokens
 * Figma Variables에서 가져온 타이포그래피 스타일
 */

export interface TypographyStyle {
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  lineHeight: string;
  letterSpacing: string;
}

// ============================================================================
// MOBILE TYPOGRAPHY (APP)
// ============================================================================
export const mobileTypography = {
  kr: {
    title: {
      h1: {
        fontFamily: 'Pretendard',
        fontSize: '28px',
        fontWeight: 700,
        lineHeight: '34px',
        letterSpacing: '-0.02em',
      },
      h2: {
        fontFamily: 'Pretendard',
        fontSize: '24px',
        fontWeight: 700,
        lineHeight: '32px',
        letterSpacing: '-0.02em',
      },
      h3: {
        fontFamily: 'Pretendard',
        fontSize: '20px',
        fontWeight: 700,
        lineHeight: '28px',
        letterSpacing: '-0.02em',
      },
      h4: {
        fontFamily: 'Pretendard',
        fontSize: '18px',
        fontWeight: 700,
        lineHeight: '26px',
        letterSpacing: '-0.02em',
      },
      subtitle1: {
        fontFamily: 'Pretendard',
        fontSize: '18px',
        fontWeight: 500,
        lineHeight: '26px',
        letterSpacing: '-0.02em',
      },
      subtitle2: {
        fontFamily: 'Pretendard',
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '24px',
        letterSpacing: '-0.02em',
      },
      subtitle3: {
        fontFamily: 'Pretendard',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '22px',
        letterSpacing: '-0.02em',
      },
    },
    body: {
      body1: {
        fontFamily: 'Pretendard',
        fontSize: '20px',
        fontWeight: 400,
        lineHeight: '28px',
        letterSpacing: '-0.02em',
      },
      body2: {
        fontFamily: 'Pretendard',
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '24px',
        letterSpacing: '-0.02em',
      },
      body3: {
        fontFamily: 'Pretendard',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '22px',
        letterSpacing: '-0.02em',
      },
      caption1: {
        fontFamily: 'Pretendard',
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: '20px',
        letterSpacing: '-0.02em',
      },
      caption2: {
        fontFamily: 'Pretendard',
        fontSize: '10px',
        fontWeight: 400,
        lineHeight: '16px',
        letterSpacing: '0',
      },
    },
    button: {
      button1: {
        fontFamily: 'Pretendard',
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '24px',
        letterSpacing: '-0.02em',
      },
      button2: {
        fontFamily: 'Pretendard',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '22px',
        letterSpacing: '-0.02em',
      },
      button3: {
        fontFamily: 'Pretendard',
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: '20px',
        letterSpacing: '-0.02em',
      },
    },
  },
  en: {
    title: {
      h1: {
        fontFamily: 'Pretendard',
        fontSize: '28px',
        fontWeight: 700,
        lineHeight: '34px',
        letterSpacing: '0',
      },
      h2: {
        fontFamily: 'Pretendard',
        fontSize: '24px',
        fontWeight: 700,
        lineHeight: '32px',
        letterSpacing: '0',
      },
      h3: {
        fontFamily: 'Pretendard',
        fontSize: '20px',
        fontWeight: 700,
        lineHeight: '28px',
        letterSpacing: '0',
      },
      h4: {
        fontFamily: 'Pretendard',
        fontSize: '18px',
        fontWeight: 700,
        lineHeight: '26px',
        letterSpacing: '0',
      },
      subtitle1: {
        fontFamily: 'Pretendard',
        fontSize: '18px',
        fontWeight: 500,
        lineHeight: '26px',
        letterSpacing: '0',
      },
      subtitle2: {
        fontFamily: 'Pretendard',
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '24px',
        letterSpacing: '0',
      },
      subtitle3: {
        fontFamily: 'Pretendard',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '22px',
        letterSpacing: '0',
      },
    },
    body: {
      body1: {
        fontFamily: 'Pretendard',
        fontSize: '20px',
        fontWeight: 400,
        lineHeight: '28px',
        letterSpacing: '0',
      },
      body2: {
        fontFamily: 'Pretendard',
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '24px',
        letterSpacing: '0',
      },
      body3: {
        fontFamily: 'Pretendard',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '22px',
        letterSpacing: '0',
      },
      caption1: {
        fontFamily: 'Pretendard',
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: '20px',
        letterSpacing: '0',
      },
      caption2: {
        fontFamily: 'Pretendard',
        fontSize: '10px',
        fontWeight: 400,
        lineHeight: '16px',
        letterSpacing: '0',
      },
    },
    button: {
      button1: {
        fontFamily: 'Pretendard',
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '24px',
        letterSpacing: '0',
      },
      button2: {
        fontFamily: 'Pretendard',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '22px',
        letterSpacing: '0',
      },
      button3: {
        fontFamily: 'Pretendard',
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: '20px',
        letterSpacing: '0',
      },
    },
  },
} as const;

// ============================================================================
// WEB TYPOGRAPHY
// ============================================================================
export const webTypography = {
  kr: {
    title: {
      h1: {
        fontFamily: 'Pretendard',
        fontSize: '52px',
        fontWeight: 800,
        lineHeight: '68px',
        letterSpacing: '-0.02em',
      },
      h2: {
        fontFamily: 'Pretendard',
        fontSize: '44px',
        fontWeight: 700,
        lineHeight: '60px',
        letterSpacing: '-0.02em',
      },
      h3: {
        fontFamily: 'Pretendard',
        fontSize: '36px',
        fontWeight: 700,
        lineHeight: '48px',
        letterSpacing: '-0.02em',
      },
      h4: {
        fontFamily: 'Pretendard',
        fontSize: '28px',
        fontWeight: 700,
        lineHeight: '40px',
        letterSpacing: '-0.02em',
      },
      subtitle1: {
        fontFamily: 'Pretendard',
        fontSize: '24px',
        fontWeight: 600,
        lineHeight: '32px',
        letterSpacing: '-0.02em',
      },
      subtitle2: {
        fontFamily: 'Pretendard',
        fontSize: '18px',
        fontWeight: 600,
        lineHeight: '28px',
        letterSpacing: '-0.02em',
      },
    },
    body: {
      body1: {
        fontFamily: 'Pretendard',
        fontSize: '20px',
        fontWeight: 400,
        lineHeight: '32px',
        letterSpacing: '-0.02em',
      },
      body3: {
        fontFamily: 'Pretendard',
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '24px',
        letterSpacing: '-0.02em',
      },
      body4: {
        fontFamily: 'Pretendard',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '22px',
        letterSpacing: '-0.02em',
      },
      caption: {
        fontFamily: 'Pretendard',
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: '18px',
        letterSpacing: '-0.02em',
      },
    },
    button: {
      button1: {
        fontFamily: 'Pretendard',
        fontSize: '16px',
        fontWeight: 600,
        lineHeight: '24px',
        letterSpacing: '-0.02em',
      },
      button2: {
        fontFamily: 'Pretendard',
        fontSize: '14px',
        fontWeight: 600,
        lineHeight: '20px',
        letterSpacing: '-0.02em',
      },
      button3: {
        fontFamily: 'Pretendard',
        fontSize: '12px',
        fontWeight: 600,
        lineHeight: '16px',
        letterSpacing: '-0.02em',
      },
    },
  },
  en: {
    title: {
      h1: {
        fontFamily: 'Pretendard',
        fontSize: '52px',
        fontWeight: 800,
        lineHeight: '68px',
        letterSpacing: '0',
      },
      h2: {
        fontFamily: 'Pretendard',
        fontSize: '44px',
        fontWeight: 700,
        lineHeight: '60px',
        letterSpacing: '0',
      },
      h3: {
        fontFamily: 'Pretendard',
        fontSize: '36px',
        fontWeight: 700,
        lineHeight: '48px',
        letterSpacing: '0',
      },
      h4: {
        fontFamily: 'Pretendard',
        fontSize: '28px',
        fontWeight: 700,
        lineHeight: '40px',
        letterSpacing: '0',
      },
      subtitle1: {
        fontFamily: 'Pretendard',
        fontSize: '24px',
        fontWeight: 600,
        lineHeight: '32px',
        letterSpacing: '0',
      },
      subtitle2: {
        fontFamily: 'Pretendard',
        fontSize: '18px',
        fontWeight: 600,
        lineHeight: '28px',
        letterSpacing: '0',
      },
    },
    body: {
      body1: {
        fontFamily: 'Pretendard',
        fontSize: '20px',
        fontWeight: 400,
        lineHeight: '32px',
        letterSpacing: '0',
      },
      body3: {
        fontFamily: 'Pretendard',
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '24px',
        letterSpacing: '0',
      },
      body4: {
        fontFamily: 'Pretendard',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '22px',
        letterSpacing: '0',
      },
      caption: {
        fontFamily: 'Pretendard',
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: '16px',
        letterSpacing: '0',
      },
    },
    button: {
      button2: {
        fontFamily: 'Pretendard',
        fontSize: '14px',
        fontWeight: 600,
        lineHeight: '20px',
        letterSpacing: '0',
      },
      button3: {
        fontFamily: 'Pretendard',
        fontSize: '12px',
        fontWeight: 600,
        lineHeight: '16px',
        letterSpacing: '0',
      },
    },
  },
} as const;

// ============================================================================
// 타입 정의
// ============================================================================
export type MobileTypographyKR = typeof mobileTypography.kr;
export type MobileTypographyEN = typeof mobileTypography.en;
export type WebTypographyKR = typeof webTypography.kr;
export type WebTypographyEN = typeof webTypography.en;
