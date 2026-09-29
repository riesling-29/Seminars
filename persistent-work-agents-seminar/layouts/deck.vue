<script setup lang="ts">
import { computed } from 'vue'

type Source = { name: string, url: string }

const props = defineProps<{
  frontmatter?: Record<string, any>
}>()

const sources = computed<Source[]>(() => {
  const value = props.frontmatter?.sources
  return Array.isArray(value) ? value : []
})
</script>

<template>
  <div class="slidev-layout deck" :class="$frontmatter.class">
    <header class="deck-header">
      <span class="deck-kicker">{{ $frontmatter.section || 'Persistent Work Agents' }}</span>
      <span class="deck-checked">확인 2026-09-29</span>
    </header>
    <main class="deck-content"><slot /></main>
    <footer class="deck-footer">
      <span class="deck-sources">
        <template v-if="sources.length">
          <span class="deck-sources-label">SOURCE</span>
          <a v-for="source in sources" :key="source.url" :href="source.url" target="_blank" rel="noreferrer">{{ source.name }}</a>
        </template>
        <span v-else>상시 작업 에이전트 · 공개 자료 기반 비교</span>
      </span>
      <span class="deck-page">{{ $page }} / {{ $nav.total }}</span>
    </footer>
  </div>
</template>
