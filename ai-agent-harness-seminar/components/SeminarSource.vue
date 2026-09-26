<script setup lang="ts">
defineProps<{ href?: string; label: string; page: string }>()
</script>
<template>
  <footer class="seminar-source">
    <a v-if="href" :href="href" target="_blank" rel="noopener noreferrer">{{ label }}</a>
    <span v-else>{{ label }}</span>
    <span>{{ page }}</span>
  </footer>
</template>
