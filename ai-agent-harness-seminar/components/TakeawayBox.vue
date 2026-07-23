<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  tone?: 'cyan' | 'amber'
}>(), {
  label: 'Takeaway',
  tone: 'cyan',
})
</script>

<template>
  <div class="ts-takeaway" :data-tone="tone">
    <div class="ts-takeaway-label">{{ label }}</div>
    <div class="ts-takeaway-body"><slot /></div>
  </div>
</template>
