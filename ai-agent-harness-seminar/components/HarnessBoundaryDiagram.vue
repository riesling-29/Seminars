<template>
  <div class="ts-harness-boundary" aria-label="Agent loop inside a harness boundary">
    <div class="ts-harness-label">Agent Harness · System Boundary</div>
    <div class="ts-harness-top-rail">
      <span>Input</span><span>Context</span><span>Tool</span><span>State</span><span>Budget</span>
    </div>
    <div class="ts-harness-loop">
      <FlowNode step="Observe" title="환경·결과 관찰" />
      <div class="ts-flow-arrow">→</div>
      <FlowNode step="Decide" title="다음 행동 선택" tone="cyan" />
      <div class="ts-flow-arrow">→</div>
      <FlowNode step="Act" title="Tool 실행" tone="cyan" />
      <div class="ts-flow-arrow">→</div>
      <FlowNode step="Verify" title="Outcome 판정" tone="green" />
    </div>
    <div class="ts-harness-bottom-rail">
      <span>Permission</span><span>Approval</span><span>Validator</span><span>Trace</span><span>Stop</span>
    </div>
  </div>
</template>
