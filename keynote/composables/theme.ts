import { ref, watch } from 'vue';
import { THEMES, DEFAULT_THEME_ID, type ThemeManifest } from '../themes';

const STORAGE_KEY = 'cw-theme';

export { THEMES };
export type { ThemeManifest };

function isKnown(id: string): boolean {
  return THEMES.some((t) => t.id === id);
}

function detect(): string {
  if (typeof localStorage === 'undefined') return DEFAULT_THEME_ID;
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved && isKnown(saved) ? saved : DEFAULT_THEME_ID;
}

function applyToDom(id: string) {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = id;
}

export const theme = ref<string>(detect());

applyToDom(theme.value);

watch(theme, (id) => {
  applyToDom(id);
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, id);
  }
});

export function setTheme(id: string) {
  if (!isKnown(id)) return;
  theme.value = id;
}

export function nextTheme() {
  const i = THEMES.findIndex((t) => t.id === theme.value);
  const next = THEMES[(i + 1) % THEMES.length];
  theme.value = next.id;
}
