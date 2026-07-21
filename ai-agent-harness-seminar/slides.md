---
theme: default
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

<div class="h-full flex flex-col justify-center">
  <p class="text-sm tracking-[0.25em] uppercase text-slate-500 mb-5">From Models to Systems</p>
  <h1 class="!text-5xl !leading-tight !mb-6">모델에서 시스템으로:<br><span class="text-blue-600">AI Agent와 Agent Harness</span></h1>
  <p class="text-xl text-slate-600 max-w-3xl">
    답변을 생성하는 모델에서, 관찰·행동·검증을 반복하는 작업 시스템으로
  </p>
  <div class="mt-12 flex gap-3 text-sm">
    <span class="px-3 py-1 rounded-full bg-blue-50 text-blue-700">초기 샘플 8장</span>
    <span class="px-3 py-1 rounded-full bg-amber-50 text-amber-800">잠정 설계</span>
    <span class="px-3 py-1 rounded-full bg-slate-100 text-slate-700">합성 데이터만 사용</span>
  </div>
</div>

<!--
이 자료는 특정 Agent 제품의 홍보나 생산성 향상 약속이 아니다.
오늘의 목표는 모델 밖의 시스템 경계와 적용하지 말아야 할 조건까지 이해하는 것이다.
-->

---
layout: section
---

<div class="grid grid-cols-[1fr_auto_1fr] items-center gap-8 mt-8">
  <div>
    <p class="text-sm text-slate-500 uppercase tracking-wider">앞선 세미나</p>
    <h2 class="text-3xl font-bold mt-3">모델 안의 추론</h2>
    <div class="mt-6 flex flex-wrap gap-2">
      <span class="term">Self-Attention</span>
      <span class="term">LLM</span>
      <span class="term">KV Cache</span>
    </div>
  </div>
  <div class="text-4xl text-blue-600">→</div>
  <div>
    <p class="text-sm text-slate-500 uppercase tracking-wider">이번 세미나</p>
    <h2 class="text-3xl font-bold mt-3">모델 밖의 작업 시스템</h2>
    <div class="mt-6 flex flex-wrap gap-2">
      <span class="term">Tool</span>
      <span class="term">State</span>
      <span class="term">Validator</span>
    </div>
  </div>
</div>

<div class="mt-14 border-l-4 border-blue-500 pl-5 text-xl">
  “답을 말한다”와 “파일을 만들고 실행 결과로 확인한다” 사이에는 시스템이 필요하다.
</div>

<!--
앞선 발표의 실제 표현과 범위는 원자료를 확인한 뒤 맞춘다.
모델 내부 지식이 불필요해지는 것이 아니라, 외부 행동을 통제하는 새 층이 추가된다는 연결을 만든다.
-->

---

# Chat, Tool Use, Workflow, Agent

<div class="grid grid-cols-4 gap-3 mt-8 text-sm">
  <div class="compare-card">
    <div class="compare-title">LLM Chat</div>
    <p>텍스트 응답 중심</p>
    <p class="compare-foot">외부 행동은 기본 전제 아님</p>
  </div>
  <div class="compare-card">
    <div class="compare-title">Tool Use</div>
    <p>명시된 Tool 호출</p>
    <p class="compare-foot">한 번의 호출도 가능</p>
  </div>
  <div class="compare-card">
    <div class="compare-title">Workflow</div>
    <p>경로를 코드·규칙이 결정</p>
    <p class="compare-foot">반복과 분기가 미리 정의됨</p>
  </div>
  <div class="compare-card border-blue-500">
    <div class="compare-title text-blue-700">Agent</div>
    <p>관측에 따라 다음 행동 선택</p>
    <p class="compare-foot">Harness 안에서 반복</p>
  </div>
</div>

<div class="mt-10 rounded-lg bg-amber-50 px-5 py-4 text-amber-900">
  <strong>작업 정의:</strong> Tool이 있다는 사실만으로 Agent라고 부르지 않는다. 분류는 업계의 단일 표준이 아니다.
</div>

<!--
경로 결정 주체와 반복 여부를 분리해서 설명한다.
고정 경로라면 Workflow가 더 예측 가능하고 검증하기 쉬울 수 있다.
-->

---

# Agent Loop: 말이 아니라 결과를 다시 본다

<AgentLoopDiagram />

<p class="mt-3 text-center text-sm text-slate-500">
  같은 입력에서도 경로가 달라질 수 있다. 그래서 외부 Validator와 Stop Condition이 필요하다.
</p>

<!--
폐루프 비유를 사용하되 LLM은 결정론적 제어기가 아니라는 한계를 바로 말한다.
Verify는 모델이 스스로 “좋아 보인다”고 말하는 것이 아니라 Test, Schema, 수치 재계산 또는 사람 검토를 포함한다.
-->

---

# Harness는 Agent의 실행 경계를 통제한다

<div class="relative mt-8 rounded-2xl border-3 border-slate-700 p-8 bg-slate-50">
  <div class="absolute -top-4 left-6 bg-slate-700 text-white px-4 py-1 rounded-full text-sm">Agent Harness</div>
  <div class="grid grid-cols-3 gap-4">
    <div class="harness-box"><strong>Context / State</strong><span>무엇을 보고 기억하는가</span></div>
    <div class="harness-box"><strong>Tool / Permission</strong><span>무엇을 할 수 있는가</span></div>
    <div class="harness-box"><strong>Sandbox</strong><span>어디에서 실행하는가</span></div>
    <div class="harness-box"><strong>Validator</strong><span>누가 완료를 판정하는가</span></div>
    <div class="harness-box"><strong>Approval Gate</strong><span>언제 사람이 멈춰 세우는가</span></div>
    <div class="harness-box"><strong>Trace / Stop</strong><span>무엇이 있었고 언제 끝나는가</span></div>
  </div>
</div>

<div class="mt-7 text-lg text-center">
  모델 성능과 시스템 성능은 같지 않다. 각 요소의 기여도는 평가 전에는 <strong>알 수 없음</strong>이다.
</div>

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

# 데모 예고: 누락을 추정하지 않는 Agent

<div class="grid grid-cols-[1fr_auto_1fr] gap-8 items-stretch mt-8">
  <div class="rounded-xl bg-slate-100 p-6">
    <p class="text-sm text-slate-500">합성 입력</p>
    <h3 class="text-2xl font-bold mt-2">vibration.csv</h3>
    <p class="mt-2">metadata.yaml</p>
    <div class="mt-6 px-3 py-2 rounded bg-red-100 text-red-800">sampling_frequency_hz 누락</div>
  </div>
  <div class="flex items-center text-4xl">→</div>
  <div class="rounded-xl border-2 border-amber-400 p-6">
    <p class="text-sm text-amber-700">기대 동작</p>
    <h3 class="text-2xl font-bold mt-2">추정하지 않고 중단</h3>
    <ul class="mt-4 space-y-2">
      <li>누락 사실 기록</li>
      <li>영향 설명</li>
      <li>사용자 확인 요청</li>
      <li>Trace에 blocked 상태 보존</li>
    </ul>
  </div>
</div>

<div class="mt-8 flex justify-center gap-3 text-sm">
  <span class="artifact">metrics.json</span>
  <span class="artifact">waveform.png</span>
  <span class="artifact">spectrum.png</span>
  <span class="artifact">report.md</span>
  <span class="artifact">trace.json</span>
</div>

<!--
이번 단계에는 데모 구현이 없다. 이 화면은 설계를 예고할 뿐 성공을 주장하지 않는다.
실제 진단 결론을 내리지 않으며, metadata 보완 후에도 Validator가 Artifact를 독립 검사한다.
-->

---

# 이 저장소에서 다음으로 확인할 것

<div class="grid grid-cols-3 gap-5 mt-9">
  <div class="next-card"><span>01</span><strong>Storyboard</strong><p>28장의 역할과 필요한 근거</p></div>
  <div class="next-card"><span>02</span><strong>Handout</strong><p>Task Contract·Use Case·Safety·Evaluation</p></div>
  <div class="next-card"><span>03</span><strong>Demo Plan</strong><p>합성 입력·승인·Validator·대체 Trace</p></div>
</div>

<div class="mt-10 rounded-xl bg-blue-600 text-white p-6 flex items-center justify-between">
  <div>
    <p class="text-sm opacity-80">가장 적합한 다음 작업</p>
    <p class="text-2xl font-bold mt-1">Storyboard의 사실 주장에 원출처 연결</p>
  </div>
  <div class="text-sm text-right opacity-90">
    전체 슬라이드·데모 구현 전<br>시간과 발표 환경 확인
  </div>
</div>

<!--
현재 저장소는 기반 단계이며 전체 발표나 데모가 완성된 상태가 아니다.
다음에는 사실 주장의 근거를 검증하고, 실제 시간·환경에 맞춰 구성을 줄이거나 바꾼다.
-->
