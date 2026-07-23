<script setup lang="ts">
const tokens = ['센서', '진동', '이상', '탐지']
const weights = [
  [0.88, 0.10, 0.04, 0.02],
  [0.34, 0.82, 0.22, 0.08],
  [0.12, 0.46, 0.90, 0.35],
  [0.08, 0.18, 0.42, 0.86],
]
</script>

<template>
  <div class="ts-heatmap-wrap" aria-label="Illustrative self-attention heatmap">
    <div class="ts-heatmap-axis">Key token →</div>
    <div class="ts-heatmap">
      <div class="ts-heatmap-corner">Query ↓</div>
      <div v-for="token in tokens" :key="`col-${token}`" class="ts-heatmap-label">
        {{ token }}
      </div>
      <template v-for="(row, rowIndex) in weights" :key="`row-${tokens[rowIndex]}`">
        <div class="ts-heatmap-label row">{{ tokens[rowIndex] }}</div>
        <div
          v-for="(weight, columnIndex) in row"
          :key="`${rowIndex}-${columnIndex}`"
          class="ts-heatmap-cell"
          :style="{ '--weight': weight }"
        />
      </template>
    </div>
    <div class="ts-diagram-caption">예시적 Attention pattern · 실제 Head마다 값과 패턴이 달라진다</div>
  </div>
</template>
