<script setup lang="ts">
const candidates = [
  { token: '분석', level: 0.92, label: '상대적으로 높음' },
  { token: '확인', level: 0.68, label: '중간' },
  { token: '보고', level: 0.43, label: '중간 이하' },
  { token: '정지', level: 0.18, label: '낮음' },
]
</script>

<template>
  <div class="ts-probability-panel" aria-label="Illustrative next-token probability bars">
    <div class="ts-probability-context">
      <span>Context</span>
      “센서 데이터를 먼저”
    </div>
    <div v-for="candidate in candidates" :key="candidate.token" class="ts-probability-row">
      <strong>{{ candidate.token }}</strong>
      <div class="ts-probability-track">
        <div class="ts-probability-fill" :style="{ '--level': candidate.level }" />
      </div>
      <span>{{ candidate.label }}</span>
    </div>
    <div class="ts-diagram-caption">형태 설명을 위한 합성 분포 · 실제 모델 출력값이 아님</div>
  </div>
</template>
