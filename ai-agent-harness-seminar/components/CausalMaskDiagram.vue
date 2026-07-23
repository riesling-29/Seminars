<script setup lang="ts">
const tokens = ['x₁', 'x₂', 'x₃', 'x₄', 'x₅']
</script>

<template>
  <div class="ts-mask-wrap" aria-label="Causal mask matrix">
    <div class="ts-mask-axis">참조할 Key position →</div>
    <div class="ts-mask-grid">
      <div class="ts-mask-corner">Query ↓</div>
      <div v-for="token in tokens" :key="`head-${token}`" class="ts-mask-label">{{ token }}</div>
      <template v-for="(_, row) in tokens" :key="`mask-row-${row}`">
        <div class="ts-mask-label">{{ tokens[row] }}</div>
        <div
          v-for="(_, column) in tokens"
          :key="`${row}-${column}`"
          class="ts-mask-cell"
          :data-state="column <= row ? 'visible' : 'blocked'"
        >
          {{ column <= row ? '●' : '×' }}
        </div>
      </template>
    </div>
    <div class="ts-mask-legend">
      <span><i class="visible" />현재·과거</span>
      <span><i class="blocked" />미래 차단</span>
    </div>
  </div>
</template>
