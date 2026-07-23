<script setup lang="ts">
const steps = [
  { token: '분석', condition: 'c' },
  { token: '을', condition: 'c, x₁' },
  { token: '시작', condition: 'c, x₁:₂' },
  { token: '합니다', condition: 'c, x₁:₃' },
]
</script>

<template>
  <div class="ts-token-chain" aria-label="Autoregressive token generation chain">
    <div class="ts-token-context">
      <span>Context c</span>
      센서 데이터를 먼저
    </div>
    <template v-for="(step, index) in steps" :key="step.token">
      <div class="ts-token-arrow">→</div>
      <div class="ts-token-step">
        <span>p(x{{ index + 1 }} | {{ step.condition }})</span>
        <strong>{{ step.token }}</strong>
      </div>
    </template>
  </div>
</template>
