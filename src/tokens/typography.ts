export const typography = {
  fontFamily: {
    kr: "'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif",
    en: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },

  app: {
    fontSize: {
      heading1: '24px',
      heading2: '20px',
      heading3: '18px',
      body1: '16px',
      body2: '14px',
      caption: '12px',
      overline: '10px',
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      kr: { tight: 1.3, normal: 1.5, relaxed: 1.7 },
      en: { tight: 1.2, normal: 1.4, relaxed: 1.6 },
    },
    letterSpacing: {
      kr: { tight: '-0.02em', normal: '0', wide: '0.02em' },
      en: { tight: '-0.01em', normal: '0', wide: '0.05em' },
    },
  },

  web: {
    fontSize: {
      display: '48px',
      heading1: '32px',
      heading2: '28px',
      heading3: '24px',
      heading4: '20px',
      body1: '16px',
      body2: '14px',
      caption: '12px',
      overline: '10px',
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      kr: { tight: 1.3, normal: 1.6, relaxed: 1.8 },
      en: { tight: 1.2, normal: 1.5, relaxed: 1.7 },
    },
    letterSpacing: {
      kr: { tight: '-0.02em', normal: '0', wide: '0.02em' },
      en: { tight: '-0.01em', normal: '0', wide: '0.05em' },
    },
  },
} as const;
