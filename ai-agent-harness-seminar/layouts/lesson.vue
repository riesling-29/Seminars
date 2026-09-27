<template>
  <div class="slidev-layout lesson" :class="$frontmatter.class">
    <div class="lesson-section">{{ $frontmatter.section || 'AI 에이전트와 하네스' }}</div>
    <main class="lesson-content"><slot /></main>
    <footer class="lesson-footer">
      <a v-if="$frontmatter.source" :href="$frontmatter.source" target="_blank" rel="noreferrer">{{ $frontmatter.sourceName || '출처' }}</a>
      <span v-else>블로그 〈AI 에이전트와 하네스: 처음부터 설명하기〉</span>
      <span class="lesson-page">{{ $page }} / {{ $nav.total }}</span>
    </footer>
  </div>
</template>
