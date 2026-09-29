<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  kind: 'fact' | 'hypothesis' | 'unavailable'
  note?: string
}>(), {
  note: '',
})

const labels = {
  fact: 'FACT',
  hypothesis: 'HYPOTHESIS',
  unavailable: 'UNAVAILABLE',
}

const korean = {
  fact: '공식 자료',
  hypothesis: '가설',
  unavailable: '공식 자료 없음',
}

const label = computed(() => labels[props.kind])
const sub = computed(() => props.note || korean[props.kind])
</script>

<template>
  <span class="ev" :data-kind="kind"><b>{{ label }}</b><span>{{ sub }}</span></span>
</template>
