<template>
  <div class="ts-agent-loop" aria-label="Agent loop and harness boundary diagram">
    <div class="ts-agent-boundary-label">Permission · Sandbox · Trace</div>
    <div class="ts-agent-flow">
      <FlowNode step="사용자 목표" title="Task Contract" />
      <div class="ts-flow-arrow">→</div>
      <FlowNode step="Observe / Decide" title="Agent Decision" tone="cyan" />
      <div class="ts-flow-arrow">→</div>
      <FlowNode step="Act" title="Tool Execution" tone="cyan" />
      <div class="ts-flow-arrow">→</div>
      <FlowNode step="Observe" title="State / Artifact" />
      <div class="ts-flow-arrow">→</div>
      <FlowNode step="Verify" title="Validator" tone="green" />
    </div>
    <div class="ts-agent-branches">
      <div class="ts-agent-branch retry"><span>↺ 실패</span><strong>Agent 재시도</strong></div>
      <div class="ts-agent-branch approval"><span>⏸ 위험 작업</span><strong>Human Approval</strong></div>
      <div class="ts-agent-branch success"><span>✓ 검증 통과</span><strong>Outcome</strong></div>
    </div>
    <div class="ts-agent-stop">재시도 한도 또는 필수 입력 누락 → Stop Condition</div>
  </div>
</template>
