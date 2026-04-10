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

      <h1 class="cw-hero-title">
        <span class="cw-shimmer">ClawWork</span>
      </h1>

      <p class="cw-subtitle">
        {{
          t({
            en: 'The Task Workbench for OpenClaw',
            zh: 'OpenClaw 的任务工作台',
            ja: 'OpenClaw のタスクワークベンチ',
            ko: 'OpenClaw 태스크 워크벤치',
            fr: "L'atelier de tâches pour OpenClaw",
            de: 'Die Aufgaben-Werkbank für OpenClaw',
            es: 'El banco de tareas para OpenClaw',
            pt: 'A bancada de tarefas para OpenClaw',
          })
        }}
      </p>

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
