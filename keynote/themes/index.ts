import type { ThemeManifest } from './types';
import { defaultTheme } from './default/manifest';
import { daocloudTheme } from './daocloud/manifest';

export type { ThemeManifest };

export const THEMES: ThemeManifest[] = [defaultTheme, daocloudTheme];

export const DEFAULT_THEME_ID = defaultTheme.id;
