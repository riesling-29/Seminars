<script setup lang="ts">
withDefaults(defineProps<{
  step?: string
  title: string
  tone?: 'neutral' | 'cyan' | 'amber' | 'green' | 'red'
}>(), {
  step: '',
  tone: 'neutral',
})
</script>

<template>
  <div class="ts-flow-node" :data-tone="tone">
    <div v-if="step" class="ts-flow-step">{{ step }}</div>
    <div class="ts-flow-title">{{ title }}</div>
  </div>
</template>
