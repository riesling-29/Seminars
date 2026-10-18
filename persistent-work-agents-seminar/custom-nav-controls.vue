<template>
  <div class="archive-links" aria-label="관련 글과 세미나 안내">
    <a href="https://blog29.vercel.app/blog/persistent-work-agents" title="이 발표의 해설 글 읽기">해설 글</a>
    <a href="https://blog29.vercel.app/seminars/persistent-work-agents-seminar" title="세미나 안내와 관련 자료 보기">세미나 안내</a>
  </div>
</template>

<style scoped>
.archive-links { display: flex; flex-wrap: wrap; align-items: center; gap: 4px; margin-left: 4px; }
.archive-links a { display: inline-flex; align-items: center; min-height: 44px; padding: 6px 10px; border: 1px solid #4f5b3a; border-radius: 4px; color: #4f5b3a; background: #fffcf6; font-family: system-ui, sans-serif; font-size: 13px; font-weight: 650; line-height: 1.4; text-decoration: none; }
.archive-links a:hover { text-decoration: underline; text-underline-offset: 3px; }
.archive-links a:focus-visible { outline: 3px solid #a54832; outline-offset: 2px; }
@media print { .archive-links { display: none; } }
</style>
