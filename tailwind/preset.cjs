/**
 * @ubittz/design-system Tailwind CSS v3 Preset
 *
 * Usage (tailwind.config.js):
 *   const ubittzPreset = require('@ubittz/design-system/tailwind-preset');
 *   module.exports = { presets: [ubittzPreset], ... };
 *
 * Note: tokens.css CSS variables are loaded automatically when importing
 * the design system, so utility values resolve at runtime.
 */

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function colorFamily(name, extra) {
  var all = (extra || []).concat(shades);
  var result = {};
  for (var i = 0; i < all.length; i++) {
    result[all[i]] = 'var(--color-' + name + '-' + all[i] + ')';
  }
  return result;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        // Base colors
        gray: colorFamily('gray', [0, 10]),
        coral: colorFamily('coral'),
        apple: colorFamily('apple'),
        carrot: colorFamily('carrot'),
        orange: colorFamily('orange'),
        mustard: colorFamily('mustard'),
        lemon: colorFamily('lemon'),
        coffee: colorFamily('coffee'),
        grass: colorFamily('grass'),
        sage: colorFamily('sage'),
        pistachio: colorFamily('pistachio'),
        sky: colorFamily('sky'),
        blueberry: colorFamily('blueberry'),
        violet: colorFamily('violet'),
        plum: colorFamily('plum'),
        purple: colorFamily('purple'),
        wine: colorFamily('wine'),

        // Brand colors
        'brand-primary': colorFamily('brand-primary'),
        'brand-secondary': colorFamily('brand-secondary'),

        // Semantic - Surface
        surface: {
          DEFAULT: 'var(--color-surface-default)',
          subtle: 'var(--color-surface-subtle)',
          muted: 'var(--color-surface-muted)',
          emphasis: 'var(--color-surface-emphasis)',
        },

        // Semantic - Border
        border: {
          DEFAULT: 'var(--color-border-default)',
          subtle: 'var(--color-border-subtle)',
          emphasis: 'var(--color-border-emphasis)',
        },

        // Semantic - Text
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          inverse: 'var(--color-text-inverse)',
          'on-primary': 'var(--color-text-on-primary)',
          'on-secondary': 'var(--color-text-on-secondary)',
        },

        // Semantic - Icon
        icon: {
          DEFAULT: 'var(--color-icon-default)',
          subtle: 'var(--color-icon-subtle)',
          emphasis: 'var(--color-icon-emphasis)',
          inverse: 'var(--color-icon-inverse)',
        },

        // System
        system: {
          success: 'var(--color-system-success)',
          'success-light': 'var(--color-system-success-light)',
          warning: 'var(--color-system-warning)',
          'warning-light': 'var(--color-system-warning-light)',
          error: 'var(--color-system-error)',
          'error-light': 'var(--color-system-error-light)',
          info: 'var(--color-system-info)',
          'info-light': 'var(--color-system-info-light)',
        },
      },

      spacing: {
        0: 'var(--spacing-0)',
        1: 'var(--spacing-1)',
        2: 'var(--spacing-2)',
        3: 'var(--spacing-3)',
        4: 'var(--spacing-4)',
        5: 'var(--spacing-5)',
        6: 'var(--spacing-6)',
        8: 'var(--spacing-8)',
        10: 'var(--spacing-10)',
        12: 'var(--spacing-12)',
        16: 'var(--spacing-16)',
        20: 'var(--spacing-20)',
        24: 'var(--spacing-24)',
      },

      fontFamily: {
        kr: 'var(--font-family-kr)',
        en: 'var(--font-family-en)',
      },

      fontSize: {
        'app-heading1': 'var(--font-size-app-heading1)',
        'app-heading2': 'var(--font-size-app-heading2)',
        'app-heading3': 'var(--font-size-app-heading3)',
        'app-body1': 'var(--font-size-app-body1)',
        'app-body2': 'var(--font-size-app-body2)',
        'app-caption': 'var(--font-size-app-caption)',
        'app-overline': 'var(--font-size-app-overline)',
        'web-display': 'var(--font-size-web-display)',
        'web-heading1': 'var(--font-size-web-heading1)',
        'web-heading2': 'var(--font-size-web-heading2)',
        'web-heading3': 'var(--font-size-web-heading3)',
        'web-heading4': 'var(--font-size-web-heading4)',
        'web-body1': 'var(--font-size-web-body1)',
        'web-body2': 'var(--font-size-web-body2)',
        'web-caption': 'var(--font-size-web-caption)',
        'web-overline': 'var(--font-size-web-overline)',
      },

      fontWeight: {
        regular: 'var(--font-weight-regular)',
        medium: 'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
        bold: 'var(--font-weight-bold)',
      },

      lineHeight: {
        'kr-tight': 'var(--line-height-kr-tight)',
        'kr-normal': 'var(--line-height-kr-normal)',
        'kr-relaxed': 'var(--line-height-kr-relaxed)',
        'en-tight': 'var(--line-height-en-tight)',
        'en-normal': 'var(--line-height-en-normal)',
        'en-relaxed': 'var(--line-height-en-relaxed)',
      },

      letterSpacing: {
        'kr-tight': 'var(--letter-spacing-kr-tight)',
        'kr-normal': 'var(--letter-spacing-kr-normal)',
        'kr-wide': 'var(--letter-spacing-kr-wide)',
        'en-tight': 'var(--letter-spacing-en-tight)',
        'en-normal': 'var(--letter-spacing-en-normal)',
        'en-wide': 'var(--letter-spacing-en-wide)',
      },
    },
  },
};
