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
          default: {
            DEFAULT: 'var(--color-surface-default-foreground)',
            foreground: 'var(--color-surface-default-foreground)',
            background: 'var(--color-surface-default-background)',
            'brand-primary': 'var(--color-surface-default-brand-primary)',
            'brand-secondary': 'var(--color-surface-default-brand-secondary)',
            gray: 'var(--color-surface-default-gray)',
            disabled: 'var(--color-surface-default-disabled)',
            hover: 'var(--color-surface-default-hover)',
          },
          inverse: {
            background: 'var(--color-surface-inverse-background)',
          },
        },

        // Semantic - Border
        border: {
          default: {
            DEFAULT: 'var(--color-border-default-default)',
            primary: 'var(--color-border-default-primary)',
            secondary: 'var(--color-border-default-secondary)',
            brand: 'var(--color-border-default-brand)',
            hover: 'var(--color-border-default-hover)',
          },
          inverse: {
            primary: 'var(--color-border-inverse-primary)',
            secondary: 'var(--color-border-inverse-secondary)',
            brand: 'var(--color-border-inverse-brand)',
          },
        },

        // Semantic - Text
        text: {
          default: {
            DEFAULT: 'var(--color-text-default-primary)',
            primary: 'var(--color-text-default-primary)',
            secondary: 'var(--color-text-default-secondary)',
            tertiary: 'var(--color-text-default-tertiary)',
            quaternary: 'var(--color-text-default-quaternary)',
            label: 'var(--color-text-default-label)',
            placeholder: 'var(--color-text-default-placeholder)',
            caption: 'var(--color-text-default-caption)',
            disabled: 'var(--color-text-default-disabled)',
            brand: 'var(--color-text-default-brand)',
            discount: 'var(--color-text-default-discount)',
          },
          inverse: {
            primary: 'var(--color-text-inverse-primary)',
            secondary: 'var(--color-text-inverse-secondary)',
            tertiary: 'var(--color-text-inverse-tertiary)',
            caption: 'var(--color-text-inverse-caption)',
            disabled: 'var(--color-text-inverse-disabled)',
            brand: 'var(--color-text-inverse-brand)',
          },
        },

        // Semantic - Icon
        icon: {
          default: {
            DEFAULT: 'var(--color-icon-default-primary)',
            primary: 'var(--color-icon-default-primary)',
            secondary: 'var(--color-icon-default-secondary)',
            tertiary: 'var(--color-icon-default-tertiary)',
            quaternary: 'var(--color-icon-default-quaternary)',
            brand: 'var(--color-icon-default-brand)',
            disabled: 'var(--color-icon-default-disabled)',
            selected: 'var(--color-icon-default-selected)',
          },
          inverse: {
            primary: 'var(--color-icon-inverse-primary)',
            secondary: 'var(--color-icon-inverse-secondary)',
            tertiary: 'var(--color-icon-inverse-tertiary)',
            quaternary: 'var(--color-icon-inverse-quaternary)',
            disabled: 'var(--color-icon-inverse-disabled)',
          },
        },

        // System
        system: {
          success: {
            content: 'var(--color-system-success-content)',
            surface: 'var(--color-system-success-surface)',
            'border-primary': 'var(--color-system-success-border-primary)',
            'border-secondary': 'var(--color-system-success-border-secondary)',
          },
          info: {
            content: 'var(--color-system-info-content)',
            surface: 'var(--color-system-info-surface)',
            'border-primary': 'var(--color-system-info-border-primary)',
            'border-secondary': 'var(--color-system-info-border-secondary)',
          },
          warning: {
            content: 'var(--color-system-warning-content)',
            surface: 'var(--color-system-warning-surface)',
            'border-primary': 'var(--color-system-warning-border-primary)',
            'border-secondary': 'var(--color-system-warning-border-secondary)',
          },
          error: {
            content: 'var(--color-system-error-content)',
            surface: 'var(--color-system-error-surface)',
            'border-primary': 'var(--color-system-error-border-primary)',
            'border-secondary': 'var(--color-system-error-border-secondary)',
          },
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

      boxShadow: {
        'modal-depth': 'var(--shadow-modal-depth)',
        'icon': 'var(--shadow-icon)',
        'fa-button-white': 'var(--shadow-fa-button-white)',
        'fa-button-black': 'var(--shadow-fa-button-black)',
      },
    },
  },
};
