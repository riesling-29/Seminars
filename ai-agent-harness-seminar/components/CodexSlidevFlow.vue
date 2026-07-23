<template>
  <div class="ts-codex-flow" aria-label="Codex and Slidev agent workflow">
    <div class="ts-codex-row">
      <FlowNode step="01" title="사용자 요청" tone="neutral" />
      <div class="ts-flow-arrow">→</div>
      <FlowNode step="02" title="저장소·Deck 조사" tone="cyan" />
      <div class="ts-flow-arrow">→</div>
      <FlowNode step="03" title="Slidev MCP Tool" tone="cyan" />
      <div class="ts-flow-arrow">→</div>
      <FlowNode step="04" title="Markdown 수정" tone="cyan" />
    </div>

    <div class="ts-codex-turn">↓</div>

    <div class="ts-codex-row">
      <FlowNode step="08" title="Git Diff" tone="green" />
      <div class="ts-flow-arrow">←</div>
      <FlowNode step="07" title="Build · Validation" tone="green" />
      <div class="ts-flow-arrow">←</div>
      <FlowNode step="06" title="브라우저 확인" tone="amber" />
      <div class="ts-flow-arrow">←</div>
      <FlowNode step="05" title="Hot Reload" tone="cyan" />
    </div>
  </div>
</template>
