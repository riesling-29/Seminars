<template>
  <div class="harness-boundary" aria-label="Agent loop and harness boundary diagram">
    <div class="boundary-label">Permission · Sandbox · Trace</div>
    <div class="flow">
      <div class="node goal"><small>사용자 목표</small><strong>Task Contract</strong></div>
      <div class="arrow">→</div>
      <div class="node"><small>Observe / Decide</small><strong>Agent Decision</strong></div>
      <div class="arrow">→</div>
      <div class="node"><small>Act</small><strong>Tool Execution</strong></div>
      <div class="arrow">→</div>
      <div class="node"><small>Observe</small><strong>State / Artifact</strong></div>
      <div class="arrow">→</div>
      <div class="node validator"><small>Verify</small><strong>Validator</strong></div>
    </div>
    <div class="branches">
      <div class="branch retry"><span>↺ 실패</span><strong>Agent 재시도</strong></div>
      <div class="branch approval"><span>⏸ 위험 작업</span><strong>Human Approval</strong></div>
      <div class="branch success"><span>✓ 성공</span><strong>Outcome</strong></div>
    </div>
    <div class="stop-note">재시도 한도 또는 필수 입력 누락 → Stop Condition</div>
  </div>
</template>

<style scoped>
.harness-boundary {
  position: relative;
  margin-top: 1.7rem;
  border: 3px solid #334155;
  border-radius: 1rem;
  padding: 2rem 1.2rem 1rem;
  background: #f8fafc;
}
.boundary-label {
  position: absolute;
  top: -0.85rem;
  left: 1.25rem;
  border-radius: 9999px;
  background: #334155;
  color: white;
  padding: 0.3rem 0.9rem;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
}
.flow {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr auto 1fr;
  gap: 0.45rem;
  align-items: center;
}
.node {
  min-height: 4.6rem;
  border: 1px solid #94a3b8;
  border-radius: 0.6rem;
  background: white;
  padding: 0.65rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
  text-align: center;
}
.node small { color: #64748b; font-size: 0.62rem; }
.node strong { font-size: 0.8rem; line-height: 1.15; }
.goal { border-color: #60a5fa; background: #eff6ff; }
.validator { border-color: #8b5cf6; background: #f5f3ff; }
.arrow { color: #64748b; font-size: 1.2rem; }
.branches {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.65rem;
  margin-top: 0.8rem;
}
.branch {
  border-radius: 0.5rem;
  padding: 0.45rem 0.75rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.72rem;
}
.branch strong { font-size: 0.72rem; }
.retry { background: #fff7ed; color: #9a3412; }
.approval { background: #fef2f2; color: #991b1b; }
.success { background: #f0fdf4; color: #166534; }
.stop-note {
  margin-top: 0.65rem;
  color: #475569;
  font-size: 0.68rem;
  text-align: center;
}
</style>

