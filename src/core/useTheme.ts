import { useDesignSystem } from './DesignSystemProvider';

export function useTheme() {
  const { theme } = useDesignSystem();
  return theme;
}
