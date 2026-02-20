// ============================================================================
// BASE COLORS (고정값 - 절대 변경되지 않음)
// ============================================================================
export const baseColors = {
  // Gray Scale
  gray: {
    0: '#FFFFFF',
    10: '#DCDFE4',
    50: '#F3F5F7',
    100: '#E1E4E8',
    200: '#CBCFD7',
    300: '#B4BAC5',
    400: '#9DA5B4',
    500: '#808A9D',
    600: '#667085',
    700: '#4B5362',
    800: '#31363F',
    900: '#16181D',
  },

  // Sky (Primary Base)
  sky: {
    50: '#EBF5FE',
    100: '#D8EBFD',
    200: '#B6D9FC',
    300: '#89C2FA',
    400: '#59A8F8',
    500: '#288FF6', // main
    600: '#0975E1',
    700: '#075CB0',
    800: '#05427F',
    900: '#03294E',
  },

  // Pistachio (Secondary Base)
  pistachio: {
    50: '#F3FAF0',
    100: '#E1F2D9',
    200: '#C3E4B4',
    300: '#A4D78E',
    400: '#86C969',
    500: '#68BC43',
    600: '#539636',
    700: '#3E7128',
    800: '#2A4B1B',
    900: '#1D3513',
  },

  // Coral
  coral: {
    50: '#FCF3F3',
    100: '#F7DEDE',
    200: '#F1C6C6',
    300: '#E79D9D',
    400: '#DE7D7D',
    500: '#D05858',
    600: '#BF3636',
    700: '#972B2B',
    800: '#6F1F1F',
    900: '#481414',
  },

  // Apple (Error)
  apple: {
    50: '#FCEDEF',
    100: '#FAD2D7',
    200: '#F5A5AE',
    300: '#F07584',
    400: '#EB475B',
    500: '#E51931',
    600: '#B81428',
    700: '#93101F',
    800: '#650B15',
    900: '#40070E',
  },

  // Orange (Warning)
  orange: {
    50: '#FFF7F0',
    100: '#FEEBD7',
    200: '#FDDBB9',
    300: '#FCC288',
    400: '#FBA856',
    500: '#F98F24',
    600: '#E57506',
    700: '#B35C05',
    800: '#814203',
    900: '#502902',
  },

  // Grass (Success)
  grass: {
    50: '#F9FDED',
    100: '#EFF9D2',
    200: '#DFF2A6',
    300: '#CEEC79',
    400: '#BFE54D',
    500: '#B0DF20',
    600: '#8CB319',
    700: '#6A8613',
    800: '#46590D',
    900: '#313E09',
  },

  // Additional Colors
  carrot: {
    50: '#FCF1EE',
    100: '#F7DCD4',
    200: '#F3C6BA',
    300: '#EDAA97',
    400: '#E5876C',
    500: '#DD6440',
    600: '#C74823',
    700: '#9C391C',
    800: '#712914',
    900: '#46190C',
  },

  mustard: {
    50: '#FFF7E5',
    100: '#FFF0CC',
    200: '#FFE099',
    300: '#FFD166',
    400: '#FFC133',
    500: '#FFB200',
    600: '#CC8E00',
    700: '#996B00',
    800: '#664700',
    900: '#3D2B00',
  },

  lemon: {
    50: '#FFFBE5',
    100: '#FFF7CC',
    200: '#FFF1A3',
    300: '#FFEA70',
    400: '#FFE23D',
    500: '#FFDA0A',
    600: '#D6B600',
    700: '#A38B00',
    800: '#705F00',
    900: '#473D00',
  },

  coffee: {
    50: '#F8F5F1',
    100: '#EEE6DD',
    200: '#E0D2C2',
    300: '#D4BBAA',
    400: '#C3A488',
    500: '#AF8560',
    600: '#926749',
    700: '#6D4D37',
    800: '#523A29',
    900: '#33241A',
  },

  sage: {
    50: '#F5F7F2',
    100: '#E6ECDF',
    200: '#D2DDC5',
    300: '#B9CAA5',
    400: '#A0B785',
    500: '#8CA86C',
    600: '#728D54',
    700: '#586D41',
    800: '#3E4D2E',
    900: '#27301D',
  },

  blueberry: {
    50: '#EDF0FD',
    100: '#DAE1FB',
    200: '#B6C3F7',
    300: '#889DF2',
    400: '#6882EE',
    500: '#4364EA',
    600: '#1E46E6',
    700: '#1436BD',
    800: '#0F298F',
    900: '#0B1C61',
  },

  violet: {
    50: '#EEEDFD',
    100: '#D4D1FA',
    200: '#BAB5F7',
    300: '#8F87F2',
    400: '#745EED',
    500: '#5B40E2',
    600: '#5026D9',
    700: '#401FAD',
    800: '#2D1579',
    900: '#1D0E4E',
  },

  plum: {
    50: '#F8EDFD',
    100: '#ECD1FA',
    200: '#E1B5F7',
    300: '#CE87F2',
    400: '#BE5EED',
    500: '#AF3AE9',
    600: '#A11AE5',
    700: '#8114B8',
    800: '#5A0E81',
    900: '#3A0953',
  },

  purple: {
    50: '#FBEDFD',
    100: '#F6D1FA',
    200: '#F0B5F7',
    300: '#E787F2',
    400: '#DF5EED',
    500: '#D83AE9',
    600: '#D11AE5',
    700: '#A714B8',
    800: '#750E81',
    900: '#4B0953',
  },

  wine: {
    50: '#FDEDF5',
    100: '#FAD1E5',
    200: '#F6ACD1',
    300: '#F287BD',
    400: '#ED59A3',
    500: '#E82B8A',
    600: '#CA1670',
    700: '#9C1157',
    800: '#6E0C3D',
    900: '#37061F',
  },
} as const;

// ============================================================================
// SEMANTIC COLORS (오버라이딩 가능)
// ============================================================================
export const defaultSemanticColors = {
  brand: {
    primary: {
      50: baseColors.sky[50],
      100: baseColors.sky[100],
      200: baseColors.sky[200],
      300: baseColors.sky[300],
      400: baseColors.sky[400],
      500: baseColors.sky[500], // main
      600: baseColors.sky[600],
      700: baseColors.sky[700],
      800: baseColors.sky[800],
      900: baseColors.sky[900],
    },
    secondary: {
      50: baseColors.pistachio[50],
      100: baseColors.pistachio[100],
      200: baseColors.pistachio[200],
      300: baseColors.pistachio[300],
      400: baseColors.pistachio[400],
      500: baseColors.pistachio[500],
      600: baseColors.pistachio[600],
      700: baseColors.pistachio[700],
      800: baseColors.pistachio[800],
      900: baseColors.pistachio[900],
    },
  },

  surface: {
    default: {
      background: baseColors.gray[50], // Surface/Default/Background
      foreground: baseColors.gray[0], // Surface/Default/Foreground
      primary: '{brand.primary.500}', // 동적 참조
      brandSecondary: '{brand.primary.50}', // 동적 참조
      gray: baseColors.gray[50],
      disabled: baseColors.gray[100],
      hover: baseColors.gray[50],
    },
    inverse: {
      background: baseColors.gray[900],
    },
  },

  border: {
    default: {
      default: baseColors.gray[100],
      primary: baseColors.gray[900],
      secondary: baseColors.gray[50],
      brand: '{brand.primary.500}', // 동적 참조
      hover: '{brand.primary.500}', // 동적 참조
    },
    inverse: {
      primary: baseColors.gray[100],
      secondary: baseColors.gray[700],
      brand: '{brand.primary.50}', // 동적 참조
    },
  },

  text: {
    default: {
      primary: baseColors.gray[900],
      secondary: baseColors.gray[700],
      tertiary: baseColors.gray[600],
      quaternary: baseColors.gray[400],
      label: baseColors.gray[600],
      placeholder: baseColors.gray[300],
      caption: baseColors.gray[600],
      disabled: baseColors.gray[200],
      brandPrimary: '{brand.primary.500}', // 동적 참조
      discount: baseColors.coral[600],
    },
    inverse: {
      primary: baseColors.gray[0],
      secondary: baseColors.gray[200],
      tertiary: baseColors.gray[300],
      caption: baseColors.gray[400],
      disabled: baseColors.gray[700],
      brand: '{brand.primary.100}', // 동적 참조
    },
  },

  icon: {
    default: {
      primary: baseColors.gray[800],
      secondary: baseColors.gray[700],
      tertiary: baseColors.gray[600],
      quaternary: baseColors.gray[400],
      brand: '{brand.primary.500}', // 동적 참조
      disabled: baseColors.gray[200],
      selected: '{brand.primary.500}', // 동적 참조
    },
    inverse: {
      primary: baseColors.gray[0],
      secondary: baseColors.gray[200],
      tertiary: baseColors.gray[300],
      quaternary: baseColors.gray[500],
      disabled: baseColors.gray[700],
    },
  },

  system: {
    success: {
      content: baseColors.grass[600],
      surface: baseColors.grass[50],
      borderPrimary: baseColors.grass[200],
      borderSecondary: baseColors.grass[600],
    },
    info: {
      content: baseColors.sky[600],
      surface: baseColors.sky[50],
      borderPrimary: baseColors.sky[200],
      borderSecondary: baseColors.sky[600],
    },
    warning: {
      content: baseColors.orange[500],
      surface: baseColors.orange[50],
      borderPrimary: baseColors.orange[200],
      borderSecondary: baseColors.orange[500],
    },
    error: {
      content: baseColors.apple[600],
      surface: baseColors.apple[50],
      borderPrimary: baseColors.apple[200],
      borderSecondary: baseColors.apple[600],
    },
  },
} as const;

// ============================================================================
// COMPONENT TOKENS (Semantic Colors 참조)
// ============================================================================
export const componentTokens = {
  button: {
    primary: {
      background: '{surface.default.primary}', // -> Brand.Primary.500
      label: '{text.inverse.primary}', // -> White
      icon: '{icon.inverse.primary}', // -> White
    },
    secondary: {
      background: '{surface.default.brandSecondary}', // -> Brand.Primary.50
      label: '{text.default.brandPrimary}', // -> Brand.Primary.500
      icon: '{icon.default.brand}', // -> Brand.Primary.500
    },
    ghost: {
      border: '{border.default.brand}', // -> Brand.Primary.500
      label: '{text.default.brandPrimary}', // -> Brand.Primary.500
      icon: '{icon.default.brand}', // -> Brand.Primary.500
    },
    gray: {
      background: '{surface.default.gray}', // -> Gray.50
      label: '{text.default.label}', // -> Gray.600
      icon: '{icon.default.tertiary}', // -> Gray.600
    },
    outline: {
      border: '{border.default.default}', // -> Gray.100
      label: '{text.default.label}', // -> Gray.600
      icon: '{icon.default.tertiary}', // -> Gray.600
    },
    disabled: {
      background: '{surface.default.disabled}', // -> Gray.100
      label: '{text.default.disabled}', // -> Gray.200
      icon: '{icon.default.disabled}', // -> Gray.200
    },
    text: {
      label: '{text.default.label}', // -> Gray.600
      icon: '{icon.default.tertiary}', // -> Gray.600
    },
  },

  systemButton: {
    success: {
      background: '{system.success.content}', // -> Grass.600
      label: '{text.inverse.primary}', // -> White
    },
    info: {
      background: '{system.info.content}', // -> Sky.600
      label: '{text.inverse.primary}', // -> White
    },
    warning: {
      background: '{system.warning.content}', // -> Orange.500
      label: '{text.inverse.primary}', // -> White
    },
    error: {
      background: '{system.error.content}', // -> Apple.600
      label: '{text.inverse.primary}', // -> White
    },
  },

  navigation: {
    default: {
      background: '{surface.default.foreground}', // -> White
      borderPrimary: '{border.default.default}', // -> Gray.100
      borderSecondary: '{border.default.secondary}', // -> Gray.50
      text: '{text.default.label}', // -> Gray.600
      title: '{text.default.primary}', // -> Gray.900
      iconDefault: '{icon.default.quaternary}', // -> Gray.400
      iconPrimary: '{icon.default.primary}', // -> Gray.800
    },
    selected: {
      background: '{surface.default.primary}', // -> Brand.Primary.500
      border: '{border.default.brand}', // -> Brand.Primary.500
      text: '{text.default.brandPrimary}', // -> Brand.Primary.500
      inverseText: '{text.inverse.primary}', // -> White
      icon: '{icon.default.brand}', // -> Brand.Primary.500
      inverseIcon: '{icon.inverse.primary}', // -> White
    },
  },

  input: {
    default: {
      background: '{surface.default.foreground}', // -> White
      border: '{border.default.default}', // -> Gray.100
      icon: '{icon.default.quaternary}', // -> Gray.400
      label: '{text.default.label}', // -> Gray.600
      placeholder: '{text.default.placeholder}', // -> Gray.300
      text: '{text.default.secondary}', // -> Gray.700
      caption: '{text.default.caption}', // -> Gray.600
    },
    focused: {
      border: '{border.default.brand}', // -> Brand.Primary.500
      cursor: '{surface.default.primary}', // -> Brand.Primary.500
    },
    selected: {
      background: '{surface.default.brandSecondary}', // -> Brand.Primary.50
      text: '{text.default.brandPrimary}', // -> Brand.Primary.500
      icon: '{icon.default.brand}', // -> Brand.Primary.500
    },
    disabled: {
      background: '{surface.default.disabled}', // -> Gray.100
      text: '{text.default.disabled}', // -> Gray.200
      icon: '{icon.default.disabled}', // -> Gray.200
    },
    hover: {
      background: '{surface.default.hover}', // -> Gray.50
    },
    error: {
      caption: '{system.error.content}', // -> Apple.600
      border: '{system.error.content}', // -> Apple.600
    },
  },

  calendar: {
    default: {
      background: '{surface.default.foreground}', // -> White
      border: '{border.default.default}', // -> Gray.100
      text: '{text.default.secondary}', // -> Gray.700
      icon: '{icon.default.secondary}', // -> Gray.700
    },
    today: {
      border: '{border.default.brand}', // -> Brand.Primary.500
      text: '{text.default.brandPrimary}', // -> Brand.Primary.500
    },
    hover: {
      background: '{surface.default.hover}', // -> Gray.50
    },
    selected: {
      background: '{surface.default.primary}', // -> Brand.Primary.500
      range: '{surface.default.brandSecondary}', // -> Brand.Primary.50
      text: '{text.inverse.primary}', // -> White
    },
    disabled: {
      text: '{text.default.disabled}', // -> Gray.200
    },
  },

  modal: {
    background: '{surface.default.foreground}', // -> White
    title: '{text.default.primary}', // -> Gray.900
    body: '{text.default.secondary}', // -> Gray.700
  },

  list: {
    product: {
      name: '{text.default.primary}', // -> Gray.900
      description: '{text.default.label}', // -> Gray.600
      brand: '{text.default.label}', // -> Gray.600
      price: '{text.default.primary}', // -> Gray.900
      originalPrice: '{text.default.disabled}', // -> Gray.200
      discountRate: '{text.default.discount}', // -> Coral.600
      heart: '{text.inverse.primary}', // -> White
      metaData: '{text.default.quaternary}', // -> Gray.400
    },
    table: {
      header: {
        background: '{surface.default.gray}', // -> Gray.50
        border: '{border.default.default}', // -> Gray.100
        text: '{text.default.label}', // -> Gray.600
        required: '{system.error.content}', // -> Apple.600
      },
      body: {
        border: '{border.default.default}', // -> Gray.100
        text: '{text.default.secondary}', // -> Gray.700
      },
    },
    menu: {
      default: {
        background: '{surface.default.foreground}', // -> White
        border: '{border.default.default}', // -> Gray.100
        label: '{text.default.secondary}', // -> Gray.700
        selectedLabel: '{text.default.brandPrimary}', // -> Brand.Primary.500
        icon: '{icon.default.quaternary}', // -> Gray.400
        arrow: '{icon.default.secondary}', // -> Gray.700
      },
      depth: {
        background: '{surface.default.gray}', // -> Gray.50
        label: '{text.default.label}', // -> Gray.600
      },
    },
    card: {
      background: '{surface.default.foreground}', // -> White
      border: '{border.default.default}', // -> Gray.100
      title: '{text.default.primary}', // -> Gray.900
      body: '{text.default.label}', // -> Gray.600
    },
  },

  filter: {
    default: {
      background: '{surface.default.foreground}', // -> White
      border: '{border.default.default}', // -> Gray.100
      text: '{text.default.label}', // -> Gray.600
    },
    selected: {
      background: '{surface.default.primary}', // -> Brand.Primary.500
      border: '{border.default.brand}', // -> Brand.Primary.500
      text: '{text.inverse.primary}', // -> White
    },
  },

  toggle: {
    default: {
      background: '{surface.default.gray}', // -> Gray.50
      label: '{text.default.label}', // -> Gray.600
    },
    selected: {
      background: '{surface.default.foreground}', // -> White
      label: '{text.default.brandPrimary}', // -> Brand.Primary.500
    },
  },
} as const;
