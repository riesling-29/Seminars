---
theme: default
layout: cover-tech
title: "모델에서 시스템으로: AI Agent와 Agent Harness"
info: |
  회사 내부 엔지니어를 위한 초기 샘플 슬라이드.
  합성 데이터와 검증 가능한 작업 경계를 중심으로 한다.
author: Chanta Research Group
colorSchema: light
favicon: /favicon.svg
fonts:
  provider: none
transition: slide-left
drawings:
  persist: false
mdc: true
---

<div class="ts-eyebrow">From Models to Systems · Technical Systems Editorial</div>

<h1>모델에서 시스템으로:<br><span class="ts-cyan">AI Agent와 Agent Harness</span></h1>

<p class="ts-subtitle">
  답변을 생성하는 모델에서, 관찰·행동·검증을 반복하는 작업 시스템으로
</p>

<div class="ts-cover-badges">
  <StatusBadge tone="cyan">초기 샘플 8장</StatusBadge>
  <StatusBadge tone="amber">잠정 설계</StatusBadge>
  <StatusBadge>합성 데이터만 사용</StatusBadge>
</div>

<!--
이 자료는 특정 Agent 제품의 홍보나 생산성 향상 약속이 아니다.
오늘의 목표는 모델 밖의 시스템 경계와 적용하지 말아야 할 조건까지 이해하는 것이다.
-->

---
layout: section-tech
title: 모델 안의 추론에서 모델 밖의 작업 시스템으로
---

<div class="ts-eyebrow">Context Shift · 02</div>

<div class="ts-section-bridge">
  <ConceptCard label="앞선 세미나" title="모델 안의 추론">
    <div class="ts-evidence-strip">
      <EvidenceTag>Self-Attention</EvidenceTag>
      <EvidenceTag>LLM</EvidenceTag>
      <EvidenceTag>KV Cache</EvidenceTag>
    </div>
  </ConceptCard>
  <div class="ts-section-arrow">→</div>
  <ConceptCard label="이번 세미나" title="모델 밖의 작업 시스템" accent="cyan">
    <div class="ts-evidence-strip">
      <EvidenceTag>Tool</EvidenceTag>
      <EvidenceTag>State</EvidenceTag>
      <EvidenceTag>Validator</EvidenceTag>
    </div>
  </ConceptCard>
</div>

<TakeawayBox>“답을 말한다”와 “파일을 만들고 실행 결과로 확인한다” 사이에는 시스템이 필요하다.</TakeawayBox>

<!--
앞선 발표의 실제 표현과 범위는 원자료를 확인한 뒤 맞춘다.
모델 내부 지식이 불필요해지는 것이 아니라, 외부 행동을 통제하는 새 층이 추가된다는 연결을 만든다.
-->

---
layout: split-compare
title: Chat, Tool Use, Workflow, Agent
---

<div class="ts-title-row">
  <h1>Chat, Tool Use, Workflow, Agent</h1>
  <span class="ts-slide-index">EXECUTION MODES · 03</span>
</div>

<div class="ts-card-grid">
  <ConceptCard label="텍스트 응답" title="LLM Chat">
    텍스트 응답 중심<br><span class="ts-muted">외부 행동은 기본 전제 아님</span>
  </ConceptCard>
  <ConceptCard label="명시적 호출" title="Tool Use">
    명시된 Tool 호출<br><span class="ts-muted">한 번의 호출도 가능</span>
  </ConceptCard>
  <ConceptCard label="고정 경로" title="Workflow">
    경로를 코드·규칙이 결정<br><span class="ts-muted">반복과 분기가 미리 정의됨</span>
  </ConceptCard>
  <ConceptCard label="동적 선택" title="Agent" accent="cyan">
    관측에 따라 다음 행동 선택<br><span class="ts-muted">Harness 안에서 반복</span>
  </ConceptCard>
</div>

<TakeawayBox label="작업 정의" tone="amber">Tool이 있다는 사실만으로 Agent라고 부르지 않는다. 분류는 업계의 단일 표준이 아니다.</TakeawayBox>

<SourceFooter source="docs/SEMINAR_CONTEXT.md · 용어 정의" status="WORKING DEFINITION" />

<!--
경로 결정 주체와 반복 여부를 분리해서 설명한다.
고정 경로라면 Workflow가 더 예측 가능하고 검증하기 쉬울 수 있다.
-->

---
layout: process-flow
title: "Agent Loop: 말이 아니라 결과를 다시 본다"
---

<div class="ts-title-row">
  <h1>Agent Loop: 말이 아니라 결과를 다시 본다</h1>
  <span class="ts-slide-index">CONTROL LOOP · 04</span>
</div>

<AgentLoopDiagram />

<TakeawayBox>같은 입력에서도 경로가 달라질 수 있다. 그래서 외부 Validator와 Stop Condition이 필요하다.</TakeawayBox>

<SourceFooter source="docs/SEMINAR_CONTEXT.md · Agent Loop" status="SYSTEM MODEL" />

<!--
폐루프 비유를 사용하되 LLM은 결정론적 제어기가 아니라는 한계를 바로 말한다.
Verify는 모델이 스스로 “좋아 보인다”고 말하는 것이 아니라 Test, Schema, 수치 재계산 또는 사람 검토를 포함한다.
-->

---
layout: concept
title: Harness는 Agent의 실행 경계를 통제한다
---

<div class="ts-title-row">
  <h1>Harness는 Agent의 실행 경계를 통제한다</h1>
  <span class="ts-slide-index">SYSTEM BOUNDARY · 05</span>
</div>

<div class="ts-card-grid">
  <ConceptCard label="01 · 관찰" title="Context / State" accent="cyan">
    무엇을 보고 기억하는가
  </ConceptCard>
  <ConceptCard label="02 · 실행" title="Tool / Permission · Sandbox" accent="cyan">
    무엇을 할 수 있고, 어디에서 실행하는가
  </ConceptCard>
  <ConceptCard label="03 · 판정" title="Validator · Approval Gate" accent="amber">
    누가 완료를 판정하고, 언제 사람이 멈춰 세우는가
  </ConceptCard>
  <ConceptCard label="04 · 기록과 종료" title="Trace / Stop">
    무엇이 있었고 언제 끝나는가
  </ConceptCard>
</div>

<TakeawayBox>모델 성능과 시스템 성능은 같지 않다. 각 요소의 기여도는 평가 전에는 <strong>알 수 없음</strong>이다.</TakeawayBox>

<SourceFooter source="docs/SEMINAR_CONTEXT.md · 중심 명제" status="WORKING DEFINITION" />

<!--
Harness를 특정 제품의 고유 명칭이 아니라 이 세미나의 시스템 계층 작업 정의로 소개한다.
Sandbox와 Guardrail도 완전한 안전 보장이 아니며 실제 강제 범위를 확인해야 한다.
-->

---

# Agent를 사용하지 않아야 할 경우

<div class="grid grid-cols-2 gap-8 mt-8">
  <div>
    <h3 class="text-xl font-bold text-slate-700">Script / Workflow가 나은 신호</h3>
    <ul class="mt-5 space-y-3">
      <li>작업 경로와 입출력이 고정됨</li>
      <li>예외를 코드로 충분히 정의 가능</li>
      <li>동적 판단의 가치가 없음</li>
      <li>Agent 검토 비용이 직접 작업보다 큼</li>
    </ul>
  </div>
  <div class="rounded-xl border-2 border-red-300 bg-red-50 p-6">
    <h3 class="text-xl font-bold text-red-800">도입을 보류할 신호</h3>
    <ul class="mt-5 space-y-3 text-red-950">
      <li>성공을 검증할 방법이 없음</li>
      <li>작은 오류가 안전사고·큰 손실로 이어짐</li>
      <li>실시간 장비 제어에 직접 연결해야 함</li>
      <li>기밀·비가역 작업의 통제가 미확정</li>
    </ul>
  </div>
</div>

<p class="mt-8 text-center text-xl font-semibold">Do Nothing도 비교 가능한 설계 대안이다.</p>

<!--
Agent를 기본 선택으로 놓지 않는다.
근거가 부족하면 보류가 결론이며, 자동화를 하지 않는 현재 방식의 비용과 위험도 함께 비교한다.
-->

---
layout: demo
title: "데모 예고: 누락을 추정하지 않는 Agent"
---

<div class="ts-title-row">
  <h1>데모 예고: 누락을 추정하지 않는 Agent</h1>
  <span class="ts-slide-index">SYNTHETIC DEMO · 07</span>
</div>

<div class="ts-demo-flow">
  <div class="ts-demo-panel">
    <div class="ts-eyebrow">합성 입력</div>
    <h3 class="ts-mono">vibration.csv</h3>
    <p class="ts-muted ts-mono">metadata.yaml</p>
    <div class="ts-evidence-strip">
      <StatusBadge tone="red">sampling_frequency_hz 누락</StatusBadge>
    </div>
  </div>
  <div class="ts-section-arrow">→</div>
  <div class="ts-demo-panel warning">
    <div class="ts-eyebrow ts-amber">기대 동작</div>
    <h3>추정하지 않고 중단</h3>
    <ul>
      <li>누락 사실 기록</li>
      <li>영향 설명</li>
      <li>사용자 확인 요청</li>
      <li>Trace에 blocked 상태 보존</li>
    </ul>
  </div>
</div>

<div class="ts-evidence-strip">
  <EvidenceTag>metrics.json</EvidenceTag>
  <EvidenceTag>waveform.png</EvidenceTag>
  <EvidenceTag>spectrum.png</EvidenceTag>
  <EvidenceTag>report.md</EvidenceTag>
  <EvidenceTag>trace.json</EvidenceTag>
</div>

<SourceFooter source="docs/DEMO_PLAN.md · 합성 진동 신호" status="DESIGN PREVIEW · NOT IMPLEMENTED" />

<!--
이번 단계에는 데모 구현이 없다. 이 화면은 설계를 예고할 뿐 성공을 주장하지 않는다.
실제 진단 결론을 내리지 않으며, metadata 보완 후에도 Validator가 Artifact를 독립 검사한다.
-->

---
layout: evidence
title: 이 저장소에서 다음으로 확인할 것
---

<div class="ts-title-row">
  <h1>이 저장소에서 다음으로 확인할 것</h1>
  <span class="ts-slide-index">EVIDENCE PATH · 08</span>
</div>

<div class="ts-card-grid cols-3">
  <ConceptCard label="01" title="Storyboard">
    28장의 역할과 필요한 근거
  </ConceptCard>
  <ConceptCard label="02" title="Handout">
    Task Contract · Use Case · Safety · Evaluation
  </ConceptCard>
  <ConceptCard label="03" title="Demo Plan">
    합성 입력 · 승인 · Validator · 대체 Trace
  </ConceptCard>
</div>

<TakeawayBox label="가장 적합한 다음 작업">Storyboard의 사실 주장에 원출처 연결 · 전체 슬라이드와 데모 구현 전 시간과 발표 환경 확인</TakeawayBox>

<SourceFooter source="docs/SEMINAR_STORYBOARD.md · docs/DEMO_PLAN.md · handouts/" status="NEXT EVIDENCE GATE" />

<!--
현재 저장소는 기반 단계이며 전체 발표나 데모가 완성된 상태가 아니다.
다음에는 사실 주장의 근거를 검증하고, 실제 시간·환경에 맞춰 구성을 줄이거나 바꾼다.
-->
