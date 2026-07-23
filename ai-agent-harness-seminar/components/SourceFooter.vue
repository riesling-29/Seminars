<script setup lang="ts">
withDefaults(defineProps<{
  source: string
  status?: string
}>(), {
  status: '',
})
</script>

<template>
  <footer class="ts-source-footer">
    <span>SOURCE · {{ source }}</span>
    <span v-if="status">{{ status }}</span>
  </footer>
</template>
