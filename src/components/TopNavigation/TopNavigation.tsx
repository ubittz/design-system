'use client';

import React from 'react';

import { useDesignSystem } from '../../core/DesignSystemProvider';
import { TopNavigation as AppTopNavigation } from '../app/TopNavigation';
import type { TopNavigationProps as AppTopNavigationProps } from '../app/TopNavigation';
import { TopNavigation as WebTopNavigation } from '../web/TopNavigation';
import type { TopNavigationProps as WebTopNavigationProps } from '../web/TopNavigation';

export type TopNavigationProps = AppTopNavigationProps & WebTopNavigationProps;

export function TopNavigation(props: TopNavigationProps): React.JSX.Element {
  const { platform } = useDesignSystem();
  const Component = platform === 'web' ? WebTopNavigation : AppTopNavigation;
  return <Component {...props} />;
}
