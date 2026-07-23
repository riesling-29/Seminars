<script setup lang="ts">
withDefaults(defineProps<{
  tone?: 'neutral' | 'cyan' | 'amber' | 'green' | 'red'
}>(), {
  tone: 'neutral',
})
</script>

<template>
  <span class="ts-status-badge" :data-tone="tone"><slot /></span>
</template>
