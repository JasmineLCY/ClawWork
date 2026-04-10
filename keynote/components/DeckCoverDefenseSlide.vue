<script setup lang="ts">
import { t } from '../composables/i18n';
</script>

<template>
  <div class="cw-grid"></div>
  <div class="glow-orb glow-green cw-pulse" style="top: -120px; right: 20%"></div>
  <div class="glow-orb glow-purple cw-pulse" style="bottom: -100px; left: -60px"></div>
  <div class="glow-orb glow-cyan cw-pulse" style="top: 50%; right: -80px"></div>
  <div class="cw-scanline"></div>

  <div class="cw-split--hero">
    <div class="cw-hero-copy">
      <div class="cw-brand-row">
        <img src="/images/clawwork-logo.png" class="cw-logo-lg cw-float cw-logo-glow" alt="ClawWork" />
        <span class="cw-brand-divider">×</span>
        <img src="/images/openclaw-logo.png" class="cw-logo-openclaw cw-float-slow" alt="OpenClaw" />
      </div>

      <h1 class="cw-hero-title" style="font-size: 2rem; max-width: 20em; line-height: 1.35;">
        <span style="display: block;">
          {{
            t({
              en: 'Hardening OpenClaw Agent:',
              zh: '加固 OpenClaw Agent：',
              ja: 'OpenClaw Agent の強化：',
              ko: 'OpenClaw Agent 강화:',
              fr: 'Durcir l’Agent OpenClaw :',
              de: 'OpenClaw-Agent härten:',
              es: 'Endurecer el Agent OpenClaw:',
              pt: 'Blindando o Agent OpenClaw:',
            })
          }}
        </span>
        <span style="display: block;">
          {{
            t({
              en: 'Defense in Depth & ClawWork Workbench',
              zh: '纵深防御与 ClawWork 工作台',
              ja: '多層防御と ClawWork ワークベンチ',
              ko: '심층 방어와 ClawWork 워크벤치',
              fr: 'Défense en profondeur & atelier ClawWork',
              de: 'Defense in Depth & ClawWork-Werkbank',
              es: 'Defensa en profundidad y banco ClawWork',
              pt: 'Defesa em profundidade e workbench ClawWork',
            })
          }}
        </span>
      </h1>

      <a href="https://github.com/clawwork-ai/ClawWork" target="_blank" class="cw-inline-repo">
        <GhIcon />
        clawwork-ai/ClawWork
      </a>

      <div class="cw-meta-row">
        <span>samzong</span>
      </div>
    </div>
  </div>
</template>
