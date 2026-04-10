<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { lang, nextLang, setLang, LANGS, LANG_LABELS, type Lang } from './composables/i18n';
import { theme, setTheme, nextTheme, THEMES } from './composables/theme';

const open = ref(false);
const themeOpen = ref(false);

const currentTheme = computed(() => THEMES.find((t) => t.id === theme.value) ?? THEMES[0]);

function onKey(e: KeyboardEvent) {
  if (e.target instanceof HTMLElement && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
  if (e.key === 'l' || e.key === 'L') {
    nextLang();
    open.value = false;
  }
  if (e.key === 't' || e.key === 'T') {
    nextTheme();
    themeOpen.value = false;
  }
}

function pick(l: Lang) {
  setLang(l);
  open.value = false;
}

function pickTheme(id: string) {
  setTheme(id);
  themeOpen.value = false;
}

onMounted(() => window.addEventListener('keydown', onKey));
onUnmounted(() => window.removeEventListener('keydown', onKey));
</script>

<template>
  <div class="theme-anchor">
    <button class="theme-switch" @click="themeOpen = !themeOpen" :title="currentTheme.label">
      {{ currentTheme.emoji }}
    </button>
    <div v-if="themeOpen" class="theme-menu">
      <button
        v-for="t in THEMES"
        :key="t.id"
        class="theme-option"
        :class="{ 'theme-option--active': t.id === theme }"
        @click="pickTheme(t.id)"
      >
        <span class="theme-option-emoji">{{ t.emoji }}</span>
        <span>{{ t.label }}</span>
      </button>
    </div>
  </div>
  <div class="lang-anchor">
    <button class="lang-switch" @click="open = !open">
      {{ LANG_LABELS[lang] }}
    </button>
    <div v-if="open" class="lang-menu">
      <button
        v-for="l in LANGS"
        :key="l"
        class="lang-option"
        :class="{ 'lang-option--active': l === lang }"
        @click="pick(l)"
      >
        {{ LANG_LABELS[l] }}
      </button>
    </div>
  </div>
</template>
