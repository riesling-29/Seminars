<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  title: string
  accent?: 'neutral' | 'cyan' | 'amber' | 'green'
}>(), {
  label: '',
  accent: 'neutral',
})
</script>

<template>
  <article class="ts-concept-card" :data-accent="accent">
    <div v-if="label" class="ts-concept-label">{{ label }}</div>
    <h3 class="ts-concept-title">{{ title }}</h3>
    <div class="ts-concept-body"><slot /></div>
  </article>
</template>
