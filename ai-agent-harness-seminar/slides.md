---
theme: default
layout: cover-tech
title: "모델에서 시스템으로: AI Agent와 Agent Harness"
info: |-
  회사 내부 엔지니어를 위한 AI Agent와 Harness 세미나.
  LLM의 다음 Token 예측에서 모델 밖의 실행 시스템까지 독립적으로 설명한다.
author: riesling29
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
  다음 Token을 생성하는 모델에서, 관찰·행동·검증을 반복하는 작업 시스템으로
</p>

<div class="ts-cover-badges">
  <StatusBadge tone="cyan">본편 30장</StatusBadge>
  <StatusBadge tone="amber">약 70–75분 · 질의응답 별도</StatusBadge>
  <StatusBadge>생산성 수치 주장 없음</StatusBadge>
</div>

<!--
- 핵심 문장: 오늘은 모델 내부의 다음 Token 예측이 어떻게 외부 행동을 수행하는 Agent 시스템으로 확장되는지 설명한다.
- 연결 문장: 먼저 모델 내부의 표현 계산과 다음 Token 예측을 정의한 뒤, 모델 밖의 실행 계층으로 경계를 넓힌다.
- 오해 경고: Agent가 LLM보다 본질적으로 더 똑똑한 별도 모델이라는 뜻이 아니다.
- 설명: 이 발표는 앞선 Attention과 KV Cache 강의를 들은 청중을 위해 모델 경로는 한 장만 복습한다. 모델은 문맥을 바탕으로 출력을 생성하고, Agent 시스템은 그 밖에서 Tool, State, Permission, Validator, Trace를 연결한다. 특정 제품의 우월성이나 생산성 향상은 이 발표의 주장이 아니다.
- 출처/근거: docs/SEMINAR_CONTEXT.md의 ‘중심 명제’를 사용하되, 독립 발표가 가능하도록 도입 설명을 확장했다. 확인 2026-07-23.
-->


---
layout: concept
title: "앞선 시간에서 오늘로: KV Cache는 도구가 아닙니다"
---
<div class="ts-title-row"><h1>앞선 시간에서 오늘로: KV Cache는 도구가 아닙니다</h1><span class="ts-slide-index">02</span></div>
<div class="ts-card-grid cols-3">
<ConceptCard label="Attention" title="현재 맥락을 계산">입력 토큰 사이의 관계로 표현을 갱신합니다.</ConceptCard>
<ConceptCard label="KV Cache" title="생성 계산을 재사용">이미 처리한 토큰의 Key·Value를 재사용합니다.</ConceptCard>
<ConceptCard label="Harness" title="다음 입력을 구성" accent="cyan">파일·도구 결과·대화 중 무엇을 모델에 보여줄지 정합니다.</ConceptCard>
</div>
<TakeawayBox>KV Cache는 추론 계산의 재사용이고, 작업 기억은 시스템이 관리하는 맥락과 상태입니다.</TakeawayBox>
<SourceFooter source="Hugging Face · Cache explanation" status="확인 2026-09-26" />
<!--
- 이미 배운 Attention과 KV Cache를 약 2분만 복습합니다.
- KV Cache가 파일을 열거나 세션 밖의 정보를 영구히 저장하지 않습니다. 다음 호출의 입력 맥락은 별도 시스템이 구성합니다.
- 원출처: Hugging Face, Cache explanation, https://huggingface.co/docs/transformers/main/cache_explanation/ . 확인 2026-09-26.
-->

---
layout: concept
title: AI 에이전트의 범위는 하나로 고정되지 않았습니다
---
<div class="ts-title-row"><h1>AI 에이전트의 범위는 하나로 고정되지 않았습니다</h1><span class="ts-slide-index">03</span></div>
<div class="ts-card-grid cols-2">
<ConceptCard label="Xi Kang" title="의사결정 지원">일반인이 활용할 수 있는 예측·판단 지원까지 넓게 봅니다.</ConceptCard>
<ConceptCard label="Liu Jiren" title="감지하고 행동">환경을 감지하고 자율적으로 판단·행동하는 점을 강조합니다.</ConceptCard>
<ConceptCard label="Nancy Xu" title="행위 능력">LLM에 행위 능력을 더해 디지털 동반자·직원처럼 봅니다.</ConceptCard>
<ConceptCard label="Darko Matovski" title="감독의 경계">업무별 자율성의 범위와 사람의 감독 지점을 묻습니다.</ConceptCard>
</div>
<TakeawayBox>이 발표는 ‘관찰→선택→도구 실행→결과 재관찰’을 반복하는 시스템을 작업 정의로 사용합니다.</TakeawayBox>
<SourceFooter source="WEF · 2024 Dalian panel" status="확인 2026-09-26" />
<!--
- 2024년 6월 중국 다롄의 WEF Annual Meeting of the New Champions 패널 ‘What Can AI Assistants Do?’를 정리한 기사입니다.
- 서로 다른 강조점을 한 가지 공식 정의처럼 제시하지 않습니다. 3분 내외로 폭을 설명한 후 이 발표의 작업 정의를 선언합니다.
- 출처: WEF, What is an AI agent and what will they do? Experts explain, https://www.weforum.org/stories/2024/07/what-is-an-ai-agent-experts-explain/ . 확인 2026-09-26.
-->

---
layout: concept
title: 에이전트는 환경과 오가는 하나의 시스템입니다
---
<div class="ts-title-row"><h1>에이전트는 환경과 오가는 하나의 시스템입니다</h1><span class="ts-slide-index">04</span></div>
<div class="ts-agent-loop">
<div class="ts-agent-boundary-label">AI AGENT · WEF 2024 Figure 1 재구성</div>
<div class="ts-card-grid cols-3">
<ConceptCard label="01 · Sensors" title="감지">환경·사용자 입력을 관찰</ConceptCard>
<ConceptCard label="02 · Control centre" title="판단" accent="cyan">목표와 관찰을 바탕으로 다음 행동 선택</ConceptCard>
<ConceptCard label="03 · Effectors" title="행동">허용된 인터페이스로 환경에 작용</ConceptCard>
</div>
</div>
<div class="ts-contrast-grid mt-5"><div class="ts-contrast-panel"><h3>환경 · 경계 바깥</h3><p>파일, 웹, 코드, 사용자, 다른 시스템</p></div><div class="ts-contrast-panel"><h3>다시 관찰</h3><p>행동 결과가 다음 판단의 입력으로 돌아옵니다.</p></div></div>
<TakeawayBox>WEF의 세 기능은 에이전트의 구성요소이며, Agent 자체는 이 셋과 반복 경계를 아우릅니다.</TakeawayBox>
<SourceFooter source="WEF · Navigating the AI Frontier (2024), Fig. 1" status="확인 2026-09-26" />
<!--
- WEF 2024 보고서 Figure 1 p.7의 Sensors, Control centre, Effectors와 Environment 경계를 테마에 맞춘 자체 도형으로 재구성했습니다. WEF 원본 그림을 복제하지 않았습니다.
- 이 그림은 개념적 모델입니다. LLM 하나가 세 기능을 모두 직접 실행한다는 뜻은 아닙니다.
- 출처: WEF, Navigating the AI Frontier, 2024, p.7, https://reports.weforum.org/docs/WEF_Navigating_the_AI_Frontier_2024.pdf . 확인 2026-09-26.
-->

---
layout: concept
title: 켄자쿠로 구분해 보는 LLM·하네스·에이전트
---
<div class="ts-title-row"><h1>켄자쿠로 구분해 보는 LLM·하네스·에이전트</h1><span class="ts-slide-index">05</span></div>
<p class="ts-subtitle">『주술회전』의 켄자쿠는 다른 사람의 몸을 차지하는 설정이 있습니다. 이 설정을 시스템의 경계를 나눠 보는 비유로만 사용합니다.</p>
<div class="ts-agent-loop mt-5"><div class="ts-agent-boundary-label">비유 전체 · 켄자쿠와 몸</div>
<div class="ts-card-grid cols-3">
<ConceptCard label="뇌 상태의 켄자쿠" title="LLM" accent="cyan">입력을 바탕으로 다음 출력을 선택하는 모델</ConceptCard>
<ConceptCard label="사용할 수 있는 몸" title="Harness">몸이 제공하는 능력·제약 ↔ 도구·권한·실행 환경</ConceptCard>
<ConceptCard label="몸을 얻은 켄자쿠" title="Agent" accent="amber">모델과 실행 환경이 결합해 외부에 작용하는 시스템</ConceptCard>
</div></div>
<TakeawayBox tone="amber">비유의 한계: 몸과 모델의 관계는 실제 소프트웨어 구조와 같지 않으며, 에이전트의 능력은 모델·도구·권한 설계가 함께 결정합니다.</TakeawayBox>
<SourceFooter source="켄자쿠 설정 · 작품 공식 캐릭터 소개" status="확인 2026-09-26" />
<!--
- 켄자쿠의 설정은 개념을 구분하기 위한 짧은 예시로만 사용합니다. 이후 문단이나 사례로 주술 설정을 확장하지 않습니다.
- 독자가 캐릭터를 모를 수 있으므로 ‘뇌를 옮겨 다른 몸의 능력을 쓰는 인물’이라는 전제를 먼저 설명합니다. 저작권 확인이 없는 원본 캐릭터 이미지는 삽입하지 않고 자체 도형을 사용합니다.
- 원설정 확인: https://jujutsukaisen.jp/character/ . 2026-09-26.
-->

---
layout: split-compare
title: 텍스트 생성과 작업 수행은 다른 문제다
---

<div class="ts-title-row">
  <h1>텍스트 생성과 작업 수행은 다른 문제다</h1>
  <span class="ts-slide-index">06</span>
</div>

<div class="ts-contrast-grid">
  <div class="ts-contrast-panel">
    <h3>Model Output</h3>
    <p>“수정을 완료했습니다.”라는 Token sequence를 생성한다.</p>
    <div class="ts-evidence-strip mt-5"><EvidenceTag>Text</EvidenceTag><EvidenceTag>Tool Request</EvidenceTag></div>
  </div>
  <div class="ts-contrast-panel" style="border-color: rgba(103,214,154,.5)">
    <h3><span style="color: var(--ts-green)">Environment Outcome</span></h3>
    <p>파일이 실제로 바뀌고, 렌더링되며, 검사 명령을 통과한다.</p>
    <div class="ts-evidence-strip mt-5"><EvidenceTag>Artifact</EvidenceTag><EvidenceTag>Validator</EvidenceTag></div>
  </div>
</div>

<TakeawayBox>자연스러운 응답은 외부 환경의 상태 변화를 보장하지 않는다.</TakeawayBox>

<SourceFooter source="Brown et al. 2020 §5 · Anthropic 2026 ‘Outcome’" status="MODEL / ENVIRONMENT BOUNDARY" />

<!--
- 핵심 문장: 텍스트로 완료를 말하는 것과 외부 환경에서 완료된 것은 다른 사건이다.
- 연결 문장: Token 확률과 진실 확률을 구분했으니, 이제 텍스트와 행동 결과의 경계로 이동한다.
- 오해 경고: 모델이 Tool Call 형식을 출력했다고 해서 Tool이 실행되었거나 성공했다는 뜻은 아니다.
- 설명: Model Output은 Text 또는 구조화된 Tool Request일 수 있다. 실제 작업은 별도 실행 계층이 요청을 해석하고 권한을 확인한 뒤 환경을 변경해야 발생한다. 완료 판정은 마지막 문장의 자연스러움이 아니라 파일, 데이터베이스, 테스트 결과처럼 환경에 남은 Outcome을 확인해야 한다.
- 출처/근거: Brown et al., ‘Language Models are Few-Shot Learners’, 2020, §5 Limitations. Anthropic, ‘Demystifying evals for AI agents’, 2026, ‘The structure of an evaluation’의 outcome 정의. 확인 2026-07-23.
-->


---
layout: process-flow
title: Tool Use는 구조화된 출력을 외부 행동과 연결한다
---

<div class="ts-title-row">
  <h1>Tool Use는 구조화된 출력을 외부 행동과 연결한다</h1>
  <span class="ts-slide-index">07</span>
</div>

<div class="ts-agent-loop">
  <div class="ts-agent-boundary-label">STRUCTURED ACTION REQUEST</div>
  <div class="ts-agent-flow">
    <FlowNode step="Model" title="tool_use 요청" tone="cyan" />
    <div class="ts-flow-arrow">→</div>
    <FlowNode step="Harness" title="Parse · Dispatch" />
    <div class="ts-flow-arrow">→</div>
    <FlowNode step="Control" title="Permission" tone="amber" />
    <div class="ts-flow-arrow">→</div>
    <FlowNode step="Environment" title="Tool 실행" tone="cyan" />
    <div class="ts-flow-arrow">→</div>
    <FlowNode step="Observation" title="tool_result" />
  </div>
</div>

<div class="ts-contrast-grid mt-4">
  <div class="ts-contrast-panel"><h3>모델이 제안하는 것</h3><p class="ts-mono">{ tool: "build", args: { … } }</p></div>
  <div class="ts-contrast-panel"><h3>Harness가 책임지는 것</h3><p>Schema 검증 · 권한 판정 · 실행 · 결과 수집</p></div>
</div>

<TakeawayBox tone="amber">모델 출력은 행동 요청이다. 환경 변화는 Harness가 요청을 검증하고 실행한 뒤에만 발생한다.</TakeawayBox>

<SourceFooter source="Anthropic 2024 ‘Augmented LLM’ · Liu et al. 2026 §3.1" status="TOOL BOUNDARY" />

<!--
- 핵심 문장: 모델이 생성하는 tool_use는 행동 자체가 아니라 Harness에 보내는 구조화된 행동 요청이다.
- 연결 문장: 텍스트 생성과 작업 수행 사이에 어떤 시스템 경계가 필요한지 요청과 실행을 분리해 본다.
- 오해 경고: Tool 이름과 인자가 생성되었다고 해서 Tool이 실행되었거나 환경이 바뀐 것은 아니다. Tool을 한 번 호출하는 것만으로 Agent라고 분류하지 않는다.
- 설명: 모델은 Tool 이름과 인자를 구조화해 제안한다. Harness는 Schema를 Parse하고 Permission 또는 Approval을 적용한 뒤 Tool 구현으로 Dispatch한다. 실행 결과인 tool_result는 다시 Context에 들어가 다음 판단의 관찰이 된다. Liu et al.의 Claude Code 분석은 모델이 파일시스템·Shell·Network를 직접 조작하는 대신 이 구조화된 경계를 통해 Harness에 행동을 요청한다고 설명한다.
- 출처/근거: Anthropic, ‘Building Effective Agents’, 2024, ‘Building block: The augmented LLM’, https://www.anthropic.com/engineering/building-effective-agents. Jiacheng Liu et al., ‘Dive into Claude Code: The Design Space of Today’s and Future AI Agent Systems’, arXiv:2604.14228v1, 2026, §3.1 ‘Design Questions and Running Example’, p.6. PDF 확인 2026-07-23. 후자는 Claude Code v2.1.88 공개 코드의 역분석 Snapshot이며 Anthropic 공식 아키텍처 문서로 취급하지 않는다.
-->


---
layout: concept
title: 도구 요청과 실행 결과는 호출 ID로 연결됩니다
---
<div class="ts-title-row"><h1>도구 요청과 실행 결과는 호출 ID로 연결됩니다</h1><span class="ts-slide-index">08</span></div>
<div class="ts-contrast-grid"><div class="ts-contrast-panel">
<h3>OpenAI Responses API · 개념 축약</h3>
<pre class="ts-code-block">{"type":"function_call","call_id":"call_1",
 "name":"run_test","arguments":"{\"suite\":\"order\"}"}
{"type":"function_call_output","call_id":"call_1",
 "output":"FAIL: 10000 != 9900"}</pre></div>
<div class="ts-contrast-panel"><h3>Anthropic Messages API · 개념 축약</h3>
<pre class="ts-code-block">{"type":"tool_use","id":"toolu_1",
 "name":"run_test","input":{"suite":"order"}}
{"type":"tool_result","tool_use_id":"toolu_1",
 "content":"FAIL: 10000 != 9900"}</pre></div></div>
<TakeawayBox>서로 다른 API의 예시입니다. Claude Code·Hermes 내부 전송을 그대로 보여주는 공통 표준은 아닙니다.</TakeawayBox>
<SourceFooter source="OpenAI function calling · Anthropic tool use" status="확인 2026-09-26" />
<!--
- 각 요청은 모델이 생성하지만, 실행은 애플리케이션의 도구 구현이 담당합니다. 두 형식은 동일한 개념을 다른 API가 표현한 축약 예시이며 실제 요청 전문이 아닙니다.
- Hermes의 정규화된 로그 표기(<tool_call>/<tool_response>)도 실제 공급자 wire format과 구분합니다.
- 출처: OpenAI https://developers.openai.com/api/docs/guides/function-calling ; Anthropic https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview ; Hermes https://hermes-agent.nousresearch.com/docs/developer-guide/adding-providers . 확인 2026-09-26.
-->

---
layout: split-compare
title: 경로를 누가 결정하는지가 실행 형태를 가른다
---

<div class="ts-title-row">
  <h1>경로를 누가 결정하는지가 실행 형태를 가른다</h1>
  <span class="ts-slide-index">09</span>
</div>

<div class="ts-card-grid">
  <ConceptCard label="텍스트 응답" title="LLM Chat">모델이 응답 생성<br><span class="ts-muted">외부 행동은 기본 전제 아님</span></ConceptCard>
  <ConceptCard label="명시적 호출" title="Tool Use">Tool 요청과 결과<br><span class="ts-muted">한 번의 호출도 가능</span></ConceptCard>
  <ConceptCard label="고정 경로" title="Workflow">코드·규칙이 단계 결정<br><span class="ts-muted">반복과 분기가 미리 정의됨</span></ConceptCard>
  <ConceptCard label="동적 경로" title="Agent" accent="cyan">모델이 다음 행동 선택<br><span class="ts-muted">Harness 안에서 반복</span></ConceptCard>
</div>

<TakeawayBox label="작업 정의" tone="amber">Tool이 있다는 사실만으로 Agent라고 부르지 않는다. 분류는 업계의 단일 표준이 아니다.</TakeawayBox>

<SourceFooter source="Anthropic 2024 ‘What are agents?’ · SEMINAR_CONTEXT" status="WORKING DEFINITION" />

<!--
- 핵심 문장: Chat, Tool Use, Workflow, Agent는 Tool의 유무 하나가 아니라 경로 결정 주체와 반복 구조로 구분한다.
- 연결 문장: Tool Use의 실행 경계를 본 뒤 네 가지 형태를 한 화면에서 정리한다.
- 오해 경고: 업계 전체가 합의한 단일 taxonomy라고 주장하지 않으며, Tool Call이 있으면 모두 Agent라는 식으로 분류하지 않는다.
- 설명: Chat은 텍스트 응답 중심이다. Tool Use는 외부 호출을 포함하지만 한 번으로 끝날 수 있다. Workflow는 단계와 분기가 주로 코드에 정의된다. Agent는 중간 결과를 관찰해 모델이 다음 행동과 Tool을 동적으로 선택한다. 실제 시스템은 이 형태를 혼합할 수 있으므로 이 표는 세미나의 작업 정의다.
- 출처/근거: Anthropic, ‘Building Effective Agents’, 2024, ‘What are agents?’ 및 ‘Workflows and agents’, https://www.anthropic.com/engineering/building-effective-agents. docs/SEMINAR_CONTEXT.md, ‘용어 정의’. 확인 2026-07-23.
-->


---
layout: process-flow
title: Agent는 결과를 다시 관찰하며 행동을 바꾼다
---

<div class="ts-title-row">
  <h1>Agent는 결과를 다시 관찰하며 행동을 바꾼다</h1>
  <span class="ts-slide-index">10</span>
</div>

<AgentLoopDiagram />

<TakeawayBox>Observe → Decide → Act → Observe → Verify를 종료 조건까지 반복한다.</TakeawayBox>

<SourceFooter source="Anthropic 2024 ‘Agents’ · SEMINAR_CONTEXT" status="SYSTEM MODEL" />

<!--
- 핵심 문장: Agent Loop는 Tool 실행 결과를 다시 관찰하고 다음 행동을 수정하는 폐루프다.
- 연결 문장: 네 실행 형태 중 Agent만 확대해 반복 구조를 본다.
- 오해 경고: Verify는 모델이 스스로 ‘좋아 보인다’고 평가하는 것만을 뜻하지 않는다.
- 설명: Task Contract와 Context에서 출발해 모델이 행동을 고르고 Tool을 실행한다. 결과는 State 또는 Artifact로 돌아오며, Test·Schema·수치 재계산·사람 검토 같은 Validator가 Outcome을 판정한다. 실패하면 한도 안에서 재시도하고, 위험 작업은 Approval Gate에서 멈추며, 필수 입력이 없거나 Budget을 넘으면 Stop Condition으로 종료한다.
- 출처/근거: Anthropic, ‘Building Effective Agents’, 2024, ‘Agents’와 ‘Evaluator-optimizer’. docs/SEMINAR_CONTEXT.md, ‘Agent Loop’, ‘엔지니어링 폐루프 비유’. 확인 2026-07-23.
-->


---
layout: evidence
title: 합성 버그를 실제로 실행하면 테스트가 실패합니다
---
<div class="ts-title-row"><h1>합성 버그를 실제로 실행하면 테스트가 실패합니다</h1><span class="ts-slide-index">11</span></div>
<div class="ts-contrast-grid"><div class="ts-contrast-panel"><h3>입력과 도구 호출</h3><pre class="ts-code-block">rg -n 'tax_rate|discount_rate' order.py
python -m unittest -v</pre><p class="mt-3">가격 10,000 · 할인 10% · 세금 10%</p></div>
<div class="ts-contrast-panel"><h3>관찰된 결과</h3><pre class="ts-code-block">test_discount_first ... FAIL
test_no_discount ... ok
AssertionError: 10000 != 9900</pre><p class="mt-3">기존 구현은 할인액에 세금을 반영하지 않았습니다.</p></div></div>
<TakeawayBox tone="amber">실패 기록을 읽어야 다음 수정 경로가 정해집니다. 코드는 합성 예제이고 출력은 해당 예제를 실제 실행한 결과입니다.</TakeawayBox>
<SourceFooter source="합성 재현 코드 · demos/edge-build-agent/example" status="확인 2026-09-26" />
<!--
- 합성 order.py와 unittest를 demos/edge-build-agent/example에 추가했습니다. 첫 명령으로 해당 줄을 찾고 두 번째 명령의 exit code 1과 실패 내용을 관찰합니다.
- 예제의 기대값은 (10000 × 0.9) × 1.1 = 9900입니다. 이 숫자는 합성 입력이며 실제 경제적 효과가 아닙니다.
- 도구 기록은 재현 가능하도록 예제와 README에 포함합니다.
-->

---
layout: evidence
title: 작은 수정 뒤 같은 테스트로 결과를 다시 판정합니다
---
<div class="ts-title-row"><h1>작은 수정 뒤 같은 테스트로 결과를 다시 판정합니다</h1><span class="ts-slide-index">12</span></div>
<div class="ts-contrast-grid"><div class="ts-contrast-panel"><h3>수정 · 최소 Diff</h3><pre class="ts-code-block">discounted = price * (1 - discount_rate)
return round(discounted * (1 + tax_rate))</pre><p class="mt-3">할인 뒤 금액에 세금을 적용합니다.</p></div>
<div class="ts-contrast-panel"><h3>재검증 · Validator</h3><pre class="ts-code-block">python -m unittest -v
test_discount_first ... ok
test_no_discount ... ok
Ran 2 tests in 0.000s · OK</pre></div></div>
<TakeawayBox>모델의 “완료했습니다”가 아니라, 파일 변경과 독립된 테스트 결과가 이 작은 작업의 완료 근거입니다.</TakeawayBox>
<SourceFooter source="합성 재현 코드 · unittest 결과" status="확인 2026-09-26" />
<!--
- 실패 단계와 수정 단계는 합성 코드에서 재현한 도구 실행입니다. 자동으로 모델이 이 선택을 했다거나 생산성 이점을 보였다고 주장하지 않습니다.
- 이전 코드와 수정 코드를 동시에 수록해 발표자가 명령을 직접 재현할 수 있습니다.
- 만일 테스트 실패나 Python 부재 시 이 정적 Trace를 대체 화면으로 사용합니다.
-->

---
layout: concept
title: Agent는 실행 중 다음 경로를 동적으로 결정한다
---

<div class="ts-title-row">
  <h1>Agent는 실행 중 다음 경로를 동적으로 결정한다</h1>
  <span class="ts-slide-index">13</span>
</div>

<div class="ts-card-grid">
  <ConceptCard label="01 · Scope" title="무엇을 더 조사할까?" accent="cyan">관련 파일과 Context 범위 선택</ConceptCard>
  <ConceptCard label="02 · Tool" title="어떤 Tool을 쓸까?" accent="cyan">검색, 수정, 실행 순서 선택</ConceptCard>
  <ConceptCard label="03 · Feedback" title="결과에 어떻게 대응할까?">재시도, 우회, 추가 관찰</ConceptCard>
  <ConceptCard label="04 · Boundary" title="언제 묻거나 멈출까?" accent="amber">불명확한 입력, 위험 행동, 한도 도달</ConceptCard>
</div>

<TakeawayBox>Workflow는 경로를 코드가 주로 정하고, Agent는 관찰된 결과에 따라 경로를 바꾼다.</TakeawayBox>

<SourceFooter source="Anthropic 2024 ‘What are agents?’" status="WORKING DISTINCTION" />

<!--
- 핵심 문장: Agent의 핵심은 Tool 보유가 아니라 관찰에 따라 다음 행동 경로를 선택하는 데 있다.
- 연결 문장: 현재 Codex 사례에서 고정된 단계와 동적으로 결정된 부분을 분리한다.
- 오해 경고: 동적 결정이 무제한 자율성이나 무작위 행동을 뜻하지 않는다.
- 설명: Agent는 어떤 파일을 더 읽을지, 어떤 Tool을 어떤 순서로 쓸지, 실패 후 재시도할지 중단할지를 실행 중 결정한다. 그러나 가능한 Tool, 쓰기 경로, Budget, Approval Gate와 Stop Condition은 Harness가 제한한다. 경로가 사전에 완전히 정해져 있고 예외도 코드로 처리된다면 Workflow가 더 단순하고 검증하기 쉬울 수 있다.
- 출처/근거: Anthropic, ‘Building Effective Agents’, 2024, ‘What are agents?’ 및 ‘When (and when not) to use agents’, https://www.anthropic.com/engineering/building-effective-agents. docs/SEMINAR_CONTEXT.md, ‘용어 정의’. 확인 2026-07-23.
-->


---
layout: concept
title: 최근 보고서는 에이전트 안의 역할도 나눕니다
---
<div class="ts-title-row"><h1>최근 보고서는 에이전트 안의 역할도 나눕니다</h1><span class="ts-slide-index">14</span></div>
<div class="ts-agent-loop"><div class="ts-agent-boundary-label">AI AGENT · WEF 2025 Figure 2 재구성</div><div class="ts-card-grid cols-3">
<ConceptCard label="Application" title="사용자 경험">목표 입력과 결과 전달</ConceptCard>
<ConceptCard label="Orchestration" title="흐름 관리" accent="cyan">작업 단계·도구·상태 조정</ConceptCard>
<ConceptCard label="Reasoning" title="판단">맥락을 해석하고 다음 행동 제안</ConceptCard>
</div></div>
<div class="ts-contrast-grid mt-5">
<div class="ts-contrast-panel"><h3>외부 앱 · MCP</h3><p>앱과 도구의 연결 경계</p></div>
<div class="ts-contrast-panel"><h3>다른 에이전트 · A2A</h3><p>에이전트 간 상호작용 경계</p></div>
</div>
<TakeawayBox>이 세 층은 에이전트 안의 개념적 역할입니다. 특정 제품의 내부 구현 도면은 아닙니다.</TakeawayBox>
<SourceFooter source="WEF · AI Agents in Action (2025), Fig. 2" status="확인 2026-09-26" />
<!--
- WEF 2025 보고서 Figure 2 p.8의 Agent 내부 Application, Orchestration, Reasoning과 외부 앱/다른 Agent의 MCP/A2A 연결을 현재 디자인의 카드로 다시 그렸습니다.
- MCP와 A2A는 연결을 설명하는 도식 요소로만 언급하고 실제 모든 제품이 이를 사용한다는 뜻이 아닙니다.
- 출처: WEF, AI Agents in Action: Foundations for Evaluation and Governance, 2025, Figure 2 p.8, https://reports.weforum.org/docs/WEF_AI_Agents_in_Action_Foundations_for_Evaluation_and_Governance_2025.pdf . 확인 2026-09-26.
-->

---
layout: concept
title: Harness는 Agent Loop의 실행 경계를 관리한다
---

<div class="ts-title-row">
  <h1>Harness는 Agent Loop의 실행 경계를 관리한다</h1>
  <span class="ts-slide-index">15</span>
</div>

<HarnessBoundaryDiagram />

<TakeawayBox>Harness는 모델이 무엇을 보고, 어떤 Tool에 접근하고, 어떤 조건에서 실행할지를 결정한다.</TakeawayBox>

<SourceFooter source="Anthropic 2026 ‘Agent harness’ · Liu et al. 2026 Fig. 5" status="WORKING DEFINITION" />

<!--
- 핵심 문장: Harness는 모델이 보는 Context, 접근 가능한 Tool Surface, 실행의 허용 방식과 완료 판정을 관리하는 시스템 계층이다.
- 연결 문장: Agent가 동적으로 결정하는 영역을 봤으니, 그 자율성의 외곽 경계와 통제 지점을 본다.
- 오해 경고: Agent가 존재한다고 Harness가 안전하거나 충분하게 설계되었다는 뜻은 아니다. Harness라는 말도 업계의 단일 표준 구현을 뜻하지 않는다.
- 설명: Liu et al.의 Figure 5는 Harness의 개입 지점을 세 질문으로 정리할 수 있게 한다. assemble 단계는 모델이 무엇을 보는지, Tool Pool은 무엇에 접근 가능한지, execute 단계는 행동이 허용되는지와 어떤 방식으로 실행되는지를 결정한다. 이 덱은 여기에 State, Budget, Validator, Trace와 Stop을 포함해 작업 시스템의 경계로 사용한다.
- 출처/근거: Anthropic, ‘Demystifying evals for AI agents’, 2026, ‘The structure of an evaluation’의 agent harness 정의. Anthropic, ‘Effective Harnesses for Long-Running Agents’, 2025, ‘The long-running agent problem’. Jiacheng Liu et al., ‘Dive into Claude Code: The Design Space of Today’s and Future AI Agent Systems’, arXiv:2604.14228v1, 2026, Figure 5와 §6, pp.16–18. PDF 확인 2026-07-23. Liu et al.은 Claude Code v2.1.88의 역분석 Snapshot이므로 세 통제 지점은 설계 관점으로 사용하고 세부 구현을 보편화하지 않는다.
-->


---
layout: concept
title: Context, Tool, State, Artifact는 서로 다른 수명주기를 가진다
---

<div class="ts-title-row">
  <h1>Context, Tool, State, Artifact는 서로 다른 수명주기를 가진다</h1>
  <span class="ts-slide-index">16</span>
</div>

<div class="ts-card-grid">
  <ConceptCard label="현재 호출의 제한된 View" title="Context" accent="cyan">지시·History·Tool Result 중 이번 호출에 조립된 정보</ConceptCard>
  <ConceptCard label="노출된 행동 표면" title="Tool" accent="cyan">현재 호출에서 모델이 요청할 수 있는 관찰·변경 인터페이스</ConceptCard>
  <ConceptCard label="호출 밖에서도 지속" title="State">진행 단계·Budget·Transcript·재시도처럼 이어지는 작업 정보</ConceptCard>
  <ConceptCard label="검사 가능한 결과" title="Artifact" accent="green">코드·보고서·그림·구조화 데이터처럼 남는 산출물</ConceptCard>
</div>

<TakeawayBox>Context는 모델이 지금 보는 View일 뿐이다. State와 Artifact는 Context Window보다 오래 지속될 수 있다.</TakeawayBox>

<SourceFooter source="Anthropic 2025 ‘Long-running agent problem’ · Liu et al. 2026 §7·§9" status="EXECUTION ELEMENTS" />

<!--
- 핵심 문장: Context는 현재 호출에 조립된 제한된 View이고, State와 Artifact는 Context Window 밖에서도 지속될 수 있다.
- 연결 문장: Harness가 무엇을 보여주고 접근시키는지 봤으니, 경계 안의 정보가 얼마나 오래 살아남는지 구분한다.
- 오해 경고: Context에 있었던 정보가 자동으로 장기 State가 되거나, Transcript에 남은 정보가 곧 검증 가능한 Artifact가 되는 것은 아니다.
- 설명: Context는 System Prompt, Project Instruction, 대화 History, Tool Result처럼 현재 모델 호출이 읽을 수 있도록 조립된 입력이다. Tool은 그 호출에서 노출된 행동 인터페이스다. State는 진행 단계, Budget, Transcript처럼 반복이나 Session을 넘어 유지될 수 있고, Artifact는 Validator가 직접 검사할 결과다. Liu et al.의 Claude Code 분석은 Lazy Loading, Deferred Tool Schema, Context Compaction과 Append-oriented Transcript를 통해 현재 View와 지속 State를 분리하는 한 구현 사례를 보여준다.
- 출처/근거: Anthropic, ‘Effective Harnesses for Long-Running Agents’, 2025, ‘The long-running agent problem’과 environment management. Jiacheng Liu et al., ‘Dive into Claude Code: The Design Space of Today’s and Future AI Agent Systems’, arXiv:2604.14228v1, 2026, §7 ‘Context Construction and Memory’, pp.18–20; §9 ‘Session Persistence and Recovery’, pp.23–24. PDF 확인 2026-07-23. 구현 세부는 v2.1.88 Snapshot에만 유효하다.
-->


---
layout: split-compare
title: 같은 모델도 Harness에 따라 다른 Agent가 된다
---

<div class="ts-title-row">
  <h1>같은 모델도 Harness에 따라 다른 Agent가 된다</h1>
  <span class="ts-slide-index">17</span>
</div>

<div class="ts-contrast-grid">
  <div class="ts-contrast-panel">
    <div class="ts-eyebrow">NARROW HARNESS</div>
    <h3>읽기·분석 Agent</h3>
    <p>선별 Context · Read-only Tool · 짧은 Budget · 보고서 Artifact · 사람 검토</p>
  </div>
  <div class="ts-contrast-panel" style="border-color: rgba(244,184,90,.5)">
    <div class="ts-eyebrow ts-amber">BROADER HARNESS</div>
    <h3>수정·검증 Agent</h3>
    <p>작업 State · Write·Execute Tool · Sandbox · Test · Git Diff · 위험 행동 Approval</p>
  </div>
</div>

<div class="ts-evidence-strip mt-5">
  <EvidenceTag>동일 Model</EvidenceTag><EvidenceTag>무엇을 보는가</EvidenceTag><EvidenceTag>무엇에 접근하는가</EvidenceTag><EvidenceTag>무엇을 실행할 수 있는가</EvidenceTag>
</div>

<TakeawayBox>Agent의 실제 능력과 위험 범위는 Model뿐 아니라 Harness 구성의 함수다.</TakeawayBox>

<SourceFooter source="Anthropic 2026 ‘Agent harness’ · Liu et al. 2026 Fig. 5" status="SYSTEM CLAIM" />

<!--
- 핵심 문장: 같은 모델이어도 무엇을 보고, 무엇에 접근하고, 무엇을 실행할 수 있는지가 달라지면 다른 Agent가 된다.
- 연결 문장: 실행 구성요소의 수명주기를 구분했으니 그 조합이 시스템 행동을 어떻게 바꾸는지 비교한다.
- 오해 경고: Harness를 넓히는 것이 항상 성능 향상이라는 뜻은 아니며 위험, 비용과 검증 부담도 함께 바뀐다.
- 설명: 왼쪽은 선별된 Context와 Read-only Tool만 가진 분석 Agent다. 오른쪽은 작업 State, Write·Execute Tool과 Test를 사용하지만 Sandbox와 Approval을 요구한다. Liu et al.의 Figure 5에 맞춰 차이를 ‘모델이 무엇을 보는가’, ‘어떤 Tool에 접근하는가’, ‘실행이 어떤 조건으로 허용되는가’로 읽을 수 있다. 각 요소의 정량 기여도는 별도 평가 전에는 알 수 없다.
- 출처/근거: Anthropic, ‘Demystifying evals for AI agents’, 2026, agent harness 정의. Anthropic, ‘Effective Harnesses for Long-Running Agents’, 2025. Jiacheng Liu et al., ‘Dive into Claude Code: The Design Space of Today’s and Future AI Agent Systems’, arXiv:2604.14228v1, 2026, Figure 5와 §6, pp.16–18. PDF 확인 2026-07-23. 세부 구현은 v2.1.88 Snapshot이고 비교축만 일반 설계 관점으로 사용한다.
-->


---
layout: concept
title: 할 수 있음과 해도 됨은 다른 경계다
---

<div class="ts-title-row">
  <h1>할 수 있음과 해도 됨은 다른 경계다</h1>
  <span class="ts-slide-index">18</span>
</div>

<div class="ts-control-grid">
  <div class="ts-control-panel">
    <h3><span class="ts-cyan">Permission</span></h3>
    <p>제안된 Tool 요청을 실행할 수 있는가? allow · ask · deny로 판정</p>
  </div>
  <div class="ts-control-panel" data-tone="red">
    <h3><span style="color: var(--ts-red)">Sandbox</span></h3>
    <p>승인된 실행이 어느 File system·Process·Network 경계에서 동작하는가?</p>
  </div>
  <div class="ts-control-panel" data-tone="amber">
    <h3><span style="color: var(--ts-amber)">Human Approval</span></h3>
    <p>자동 판정만으로 처리하지 않을 위험 예외를 사람이 결정</p>
  </div>
  <div class="ts-control-panel">
    <h3>Defense in Depth</h3>
    <p>Prompt 지시·권한 판정·OS 격리를 독립된 통제 층으로 유지</p>
  </div>
</div>

<TakeawayBox tone="amber">Permission은 실행 여부, Sandbox는 실행 경계, Approval은 위험 예외의 사람 결정이다.</TakeawayBox>

<SourceFooter source="Claude Code Docs ‘Permissions’·‘Sandboxing’ · Liu et al. 2026 §5.4" status="PRODUCT EXAMPLE" />

<!--
- 핵심 문장: Permission은 실행 여부를 판정하고, Sandbox는 승인된 실행이 동작할 자원 경계를 격리한다.
- 연결 문장: 같은 모델이 다른 Agent가 되는 가장 직접적인 이유인 통제 요소를 실행 전 경계로 본다.
- 오해 경고: Sandbox 하나가 모든 위험을 제거하거나, Permission 승인과 사람 승인이 항상 올바른 결과를 보장한다고 말하지 않는다.
- 설명: 모델의 Tool 요청은 먼저 Permission에서 allow, ask, deny 판정을 받는다. 승인된 Shell 명령도 File system과 Network가 제한된 Sandbox 안에서 실행될 수 있다. 두 장치는 authorization과 isolation이라는 서로 다른 축이다. Liu et al.의 분석에서도 permission-approved 명령이 sandboxed될 수 있다고 구분하며, 한 층이 실패할 때 다른 층이 남도록 Defense in Depth를 구성한 제품 사례를 제시한다.
- 출처/근거: Claude Code Docs, ‘Configure permissions’, https://code.claude.com/docs/en/permissions; ‘Sandboxing’, https://code.claude.com/docs/en/sandboxing. Jiacheng Liu et al., ‘Dive into Claude Code: The Design Space of Today’s and Future AI Agent Systems’, arXiv:2604.14228v1, 2026, §5.4 ‘Shell Sandboxing’, p.15. PDF 확인 2026-07-23. 공식 문서를 우선 근거로 사용하고 Liu et al.은 v2.1.88 구현 Snapshot을 보조 근거로 사용한다.
-->


---
layout: split-compare
title: 완료는 마지막 문장이 아니라 Outcome이 증명한다
---

<div class="ts-title-row">
  <h1>완료는 마지막 문장이 아니라 Outcome이 증명한다</h1>
  <span class="ts-slide-index">19</span>
</div>

<div class="ts-outcome-grid">
  <div class="ts-outcome-panel">
    <div class="ts-eyebrow">TRANSCRIPT</div>
    <h3>“작업을 완료했습니다.”</h3>
    <p>Agent의 마지막 Text는 관찰 대상이지 완료 증거가 아니다.</p>
  </div>
  <div class="ts-outcome-panel" data-tone="green">
    <div class="ts-eyebrow" style="color: var(--ts-green)">OUTCOME + VALIDATOR</div>
    <h3>Artifact · Test · State</h3>
    <p>파일 존재, Build, Test, Schema, 수치 재계산, 허용 경로 Diff로 독립 판정</p>
  </div>
</div>

<div class="ts-evidence-strip mt-5">
  <StatusBadge tone="green">PASS: 정의된 Acceptance Criteria</StatusBadge>
  <StatusBadge tone="red">STOP: 한도 · Context · Hook · Abort</StatusBadge>
</div>

<TakeawayBox>Stop은 Loop의 종료이고, Done은 Validator가 확인한 환경의 최종 상태다.</TakeawayBox>

<SourceFooter source="Anthropic 2026 ‘Outcome·Grader’ · Liu et al. 2026 §4.5" status="PRIMARY + SNAPSHOT" />

<!--
- 핵심 문장: Agent Loop가 멈춘 것과 작업이 완료된 것은 다르며, Done은 환경의 Outcome과 Validator로 판정한다.
- 연결 문장: Permission과 Sandbox가 행동 전 경계라면 Validator와 Stop Condition은 행동 후 결과 경계다.
- 오해 경고: Model이 자신 있게 완료를 선언했거나 Tool이 오류 없이 끝났다는 사실만으로 성공이라고 판정하지 않는다.
- 설명: Transcript는 과정의 기록이고 Outcome은 trial 종료 시점의 환경 상태다. Validator 또는 Grader는 Acceptance Criteria에 따라 Artifact, Test, Schema, 수치와 Diff를 검사한다. Liu et al.이 분석한 Loop의 종료 원인에는 Text-only 응답, Max turns, Context overflow, Hook intervention과 Explicit abort가 포함된다. 어느 경우든 Loop가 멈췄다는 사실만으로 Done이 되지는 않는다.
- 출처/근거: Anthropic, ‘Demystifying evals for AI agents’, 2026, ‘The structure of an evaluation’의 task, grader, transcript, outcome 정의, https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents. Jiacheng Liu et al., ‘Dive into Claude Code: The Design Space of Today’s and Future AI Agent Systems’, arXiv:2604.14228v1, 2026, §4.5 ‘Stop Conditions’, p.12. PDF 확인 2026-07-23. Stop Condition 목록은 v2.1.88 Snapshot이고, Stop과 Done의 구분은 이 세미나의 시스템 설계 주장이다.
-->


---
layout: evidence
title: Trace는 실패 원인을 시간순으로 재구성한다
---

<div class="ts-title-row">
  <h1>Trace는 실패 원인을 시간순으로 재구성한다</h1>
  <span class="ts-slide-index">20</span>
</div>

<div class="ts-trace-timeline">
  <div class="ts-trace-event"><span>01 · INPUT</span><strong>요청·Context</strong></div>
  <div class="ts-trace-event"><span>02 · DECISION</span><strong>선택한 Tool</strong></div>
  <div class="ts-trace-event" data-tone="amber"><span>03 · CONTROL</span><strong>Permission·Approval</strong></div>
  <div class="ts-trace-event"><span>04 · RESULT</span><strong>stdout·Artifact</strong></div>
  <div class="ts-trace-event" data-tone="green"><span>05 · VALIDATE</span><strong>검사 결과</strong></div>
  <div class="ts-trace-event"><span>06 · STOP</span><strong>종료 이유</strong></div>
</div>

<div class="ts-contrast-grid mt-5">
  <div class="ts-contrast-panel"><h3>Trace로 묻는 질문</h3><p>어떤 입력과 판단이 어떤 Tool 실행과 Outcome으로 이어졌는가?</p></div>
  <div class="ts-contrast-panel"><h3>Trace의 한계</h3><p>기록이 있다는 사실은 정답이나 안전을 보장하지 않으며 민감정보 마스킹이 필요하다.</p></div>
</div>

<SourceFooter source="Anthropic 2026 ‘Transcript’ · SEMINAR_CONTEXT" status="OBSERVABILITY" />

<!--
- 핵심 문장: Trace는 Agent의 선택, Tool 호출, 결과, 승인과 종료 이유를 시간순으로 재구성하는 근거다.
- 연결 문장: Outcome이 틀렸거나 Validator가 실패했을 때 원인을 찾으려면 과정의 기록이 필요하다.
- 오해 경고: Trace가 존재한다고 작업이 정확하거나 안전한 것은 아니며, 추론 기록을 그대로 설명이나 인과 증거로 취급하지 않는다.
- 설명: 입력과 Context, 선택한 Tool, Permission 또는 Approval, Tool Result, Validator 판정, Stop 이유를 연결하면 어디서 실패했는지 조사할 수 있다. Trace는 재현과 디버깅에 유용하지만 민감한 경로, 데이터, Token이 들어갈 수 있어 수집 범위와 마스킹, 보존 정책이 필요하다. Grader 문제인지 Agent 문제인지 구분하려면 Outcome과 함께 읽는다.
- 출처/근거: Anthropic, ‘Demystifying evals for AI agents’, 2026, ‘The structure of an evaluation’과 ‘Check the transcripts’, https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents. docs/SEMINAR_CONTEXT.md, ‘Trace’, ‘보안 제약’. 확인 2026-07-23.
-->


---
layout: concept
title: 코딩 에이전트는 같은 작업도 다른 접점으로 만납니다
---
<div class="ts-title-row"><h1>코딩 에이전트는 같은 작업도 다른 접점으로 만납니다</h1><span class="ts-slide-index">21</span></div>
<div class="ts-card-grid cols-3">
<ConceptCard label="Anthropic" title="Claude Code" accent="cyan">코드베이스를 읽고 파일·명령 도구로 작업하는 코딩 에이전트</ConceptCard>
<ConceptCard label="OpenAI" title="Codex" accent="cyan">저장소 작업을 수행하고 변경·검증 결과를 제시하는 코딩 에이전트</ConceptCard>
<ConceptCard label="OpenCode" title="OpenCode">오픈 소스 코딩 에이전트</ConceptCard>
</div>
<div class="ts-contrast-grid mt-5"><div class="ts-contrast-panel"><h3>Pi</h3><p>확장·조합이 쉬운 작은 코딩 하네스</p></div><div class="ts-contrast-panel"><h3>Oh my pi</h3><p>Pi 계열에서 확장된 별도 코딩 에이전트 프로젝트</p></div></div>
<TakeawayBox>제품명보다 작업 위치·허용 도구·권한·검증 방식이 실제 사용 경험을 좌우합니다.</TakeawayBox>
<SourceFooter source="Claude Code · Codex · OpenCode · Pi · Oh my pi" status="확인 2026-09-26" />
<!--
- 이름을 한 제품의 단순 대체재처럼 줄 세우지 않습니다. 기능과 배포 방식은 빠르게 바뀌므로 발표 직전 공식 문서를 다시 확인합니다.
- 출처: https://code.claude.com/docs/en/features-overview ; https://developers.openai.com/codex ; https://opencode.ai/docs ; https://pi.dev/ ; https://github.com/can1357/oh-my-pi . 확인 2026-09-26.
-->

---
layout: concept
title: Hermes와 OpenClaw는 사용 환경의 폭을 보여줍니다
---
<div class="ts-title-row"><h1>Hermes와 OpenClaw는 사용 환경의 폭을 보여줍니다</h1><span class="ts-slide-index">22</span></div>
<div class="ts-contrast-grid"><div class="ts-contrast-panel">
<h3>Hermes Agent</h3><p>모델 공급자를 연결해 도구를 사용하는 에이전트입니다. 로컬 모델 연결 시에도 도구 권한과 외부 통신은 별도로 설계해야 합니다.</p>
<div class="ts-evidence-strip"><EvidenceTag>모델 연결</EvidenceTag><EvidenceTag>도구</EvidenceTag><EvidenceTag>실행 기록</EvidenceTag></div></div>
<div class="ts-contrast-panel"><h3>OpenClaw</h3><p>메시지 채널과 Gateway를 중심으로 에이전트·도구·세션을 연결합니다. 채널 접근 권한과 작업 권한을 함께 봅니다.</p>
<div class="ts-evidence-strip"><EvidenceTag>채널</EvidenceTag><EvidenceTag>Gateway</EvidenceTag><EvidenceTag>승인</EvidenceTag></div></div></div>
<TakeawayBox>‘로컬’은 모델 실행 위치를 뜻할 수 있지만, 사용한 도구·검색·연결 서비스까지 모두 로컬이라는 뜻은 아닙니다.</TakeawayBox>
<SourceFooter source="Hermes Agent · OpenClaw 공식 문서" status="확인 2026-09-26" />
<!--
- Hermes는 사용자가 진행한 Local LLM 사례와 연결합니다. 실제 공급자·도구 설정마다 데이터 경로가 달라지며 ‘항상 로컬 전용’이라고 말하지 않습니다.
- OpenClaw 역시 Gateway와 채널 연결이라는 사용 맥락을 중심으로 소개합니다.
- 출처: https://hermes-agent.nousresearch.com/docs/integrations/providers ; https://docs.openclaw.ai/concepts/features ; https://docs.openclaw.ai/gateway/protocol . 확인 2026-09-26.
-->

---
layout: concept
title: 유연성이 필요 없으면 Agent를 쓰지 않는다
---

<div class="ts-title-row">
  <h1>유연성이 필요 없으면 Agent를 쓰지 않는다</h1>
  <span class="ts-slide-index">23</span>
</div>

<div class="ts-contrast-grid">
  <div class="ts-contrast-panel">
    <div class="ts-eyebrow">SIMPLE PATH</div>
    <h3>Do Nothing · Chat · Script · Workflow</h3>
    <p>입출력과 경로가 고정되고 예외를 코드화할 수 있으면 더 단순한 대안을 우선한다.</p>
  </div>
  <div class="ts-contrast-panel" style="border-color: rgba(244,184,90,.5)">
    <div class="ts-eyebrow ts-amber">AGENT CANDIDATE</div>
    <h3>동적 조사 경로 + 외부 검증</h3>
    <p>경로를 미리 정하기 어렵고, 실패 비용이 낮으며, Outcome을 독립 검증할 수 있을 때만 검토한다.</p>
  </div>
</div>

<div class="ts-agent-loop mt-5">
  <div class="ts-agent-boundary-label">FIRST PILOT</div>
  <div class="ts-agent-flow">
    <FlowNode step="01" title="작은 복사본" />
    <div class="ts-flow-arrow">→</div>
    <FlowNode step="02" title="제한 권한" tone="amber" />
    <div class="ts-flow-arrow">→</div>
    <FlowNode step="03" title="외부 Validator" tone="green" />
    <div class="ts-flow-arrow">→</div>
    <FlowNode step="04" title="Trace 비교" />
    <div class="ts-flow-arrow">→</div>
    <FlowNode step="05" title="계속·제한·중단" />
  </div>
</div>

<TakeawayBox>가장 단순한 대안과 같은 기준으로 비교하고, 이점이 없거나 검증 비용이 크면 중단한다.</TakeawayBox>

<SourceFooter source="Anthropic 2024 ‘When not to use agents’ · SEMINAR_CONTEXT" status="DECISION FRAME" />

<!--
- 핵심 문장: Agent는 기본 선택이 아니라 단순한 대안으로 해결되지 않는 작은 문제의 후보여야 한다.
- 연결 문장: 모델 내부에서 Harness와 검증까지의 논리를 실제 도입 판단으로 닫는다.
- 오해 경고: Agent가 최신 기술이라는 이유, Tool을 연결할 수 있다는 이유만으로 도입하지 않는다.
- 설명: Do Nothing, Chat, Script, Workflow와 Agent를 같은 실패 비용, 검증 비용, 권한 위험으로 비교한다. 고정 경로와 명확한 I/O라면 Script나 Workflow가 더 예측 가능하다. Agent 후보는 동적 조사 경로가 필요하고, 복사본과 제한 권한에서 실행할 수 있으며, 외부 Validator가 Outcome을 판정할 수 있어야 한다. 근거가 없으면 판단을 유보하고 파일럿의 이점이 없으면 중단한다.
- 출처/근거: Anthropic, ‘Building Effective Agents’, 2024, ‘When (and when not) to use agents’, https://www.anthropic.com/engineering/building-effective-agents. docs/SEMINAR_CONTEXT.md, ‘세미나 이후 사용 전환 전략’, ‘성공 기준’. 확인 2026-07-23.
-->


---
layout: concept
title: 코드를 다 읽기 어려워질수록 Audit 가능한 창구를 먼저 만든다
---

<div class="ts-title-row">
  <h1>코드를 다 읽기 어려워질수록 Audit 가능한 창구를 먼저 만든다</h1>
  <span class="ts-slide-index">24</span>
</div>

<div class="ts-card-grid">
  <ConceptCard label="01 · Scope" title="무엇이 바뀌었나?" accent="cyan">Changed Files · Git Diff · 영향 범위</ConceptCard>
  <ConceptCard label="02 · Intent" title="왜 바뀌었나?" accent="cyan">Task Contract · 선택 이유 · Trace</ConceptCard>
  <ConceptCard label="03 · Evidence" title="제대로 됐나?" accent="green">Build · Test · Validator · Outcome</ConceptCard>
  <ConceptCard label="04 · Authority" title="누가 받아들일까?" accent="amber">Owner · Approval · Rollback 판단</ConceptCard>
</div>

<TakeawayBox>Audit 창구는 코드 리뷰를 없애지 않는다. 사람이 볼 범위를 좁히고 판정 근거를 모은다.</TakeawayBox>

<SourceFooter source="발표자 실무 관찰 · Anthropic 2026 Outcome/Transcript · Liu et al. 2026 §9" status="WORKING PRINCIPLE" />

<!--
- 핵심 문장: Agent가 만드는 코드 양을 사람이 같은 깊이로 모두 읽기 어려워질수록, 변경 범위와 판정 근거를 한곳에서 감사할 수 있는 구조가 중요해진다.
- 연결 문장: Agent를 쓰지 않을 조건까지 봤으니, 실제 활용 사례로 넘어가기 전에 사람이 통제권을 유지하는 공통 운영 원칙을 세운다.
- 오해 경고: Audit 창구는 코드 리뷰를 대체하지 않는다. Test·Diff·Trace가 있어도 의미 오류와 보안 문제를 놓칠 수 있으며, 안전·규제·핵심 로직은 전수 또는 전문 리뷰가 필요할 수 있다.
- 설명: 발표자의 실무 관찰은 Agent가 생성하는 변경량이 커질 때 모든 Line을 같은 수준으로 검토하기 어렵다는 것이다. 이에 대한 설계 원칙은 네 질문을 한 창구에 모으는 것이다. 무엇이 바뀌었는지는 Diff, 왜 바뀌었는지는 Task Contract와 Trace, 제대로 됐는지는 Validator와 Outcome, 받아들일지는 Owner와 Approval이 답한다. 이어지는 사례들은 Agent가 무엇을 할 수 있는지뿐 아니라 이 Audit 창구를 어떻게 구성하는지를 보여준다.
- 출처/근거: Chanta Minero 선생님의 Agent Coding 실무 관찰에서 도출한 잠정 설계 원칙이며 정량적으로 검증된 보편 법칙은 아니다. Anthropic, ‘Demystifying evals for AI agents’, 2026의 Transcript·Outcome·Grader 구분과 Jiacheng Liu et al., ‘Dive into Claude Code’, 2026, §9의 Append-oriented Transcript를 보조 근거로 사용한다. 변경이 작아 전수 리뷰가 충분하거나 Audit 신호가 중대한 결함을 반복적으로 놓치면 이 원칙의 적용 범위를 축소한다. 첫 실제 Pilot과 전체 리허설에서 재검토한다.
-->


---
layout: concept
title: 이 블로그 글은 두 경로로 작성·게시됐습니다
---
<div class="ts-title-row"><h1>이 블로그 글은 두 경로로 작성·게시됐습니다</h1><span class="ts-slide-index">25</span></div>
<div class="ts-contrast-grid">
<div class="ts-contrast-panel"><h3>경로 A · 로컬 모델 + Hermes</h3><p>글 초안 → 로컬 LLM → Hermes의 도구 실행 → 파일 검토·수정</p><div class="ts-evidence-strip"><EvidenceTag>모델 설정</EvidenceTag><EvidenceTag>파일 권한</EvidenceTag><EvidenceTag>검토</EvidenceTag></div></div>
<div class="ts-contrast-panel"><h3>경로 B · GPT + GitHub + Vercel</h3><p>요청 → GitHub 연결 권한 → 저장소 수정·커밋 → Vercel 빌드 → 웹에서 확인</p><div class="ts-evidence-strip"><EvidenceTag>연결 범위</EvidenceTag><EvidenceTag>main 변경</EvidenceTag><EvidenceTag>배포 확인</EvidenceTag></div></div></div>
<TakeawayBox>두 경로에서 모델·도구·저장소·배포 플랫폼의 역할을 구분해야 변경의 주체와 검증 지점을 알 수 있습니다.</TakeawayBox>
<SourceFooter source="블로그 · AI 에이전트와 하네스" status="확인 2026-09-26" />
<!--
- 블로그 ‘AI 에이전트와 하네스: 처음부터 설명하기’에 소개한 실제 작성 경로를 발표용으로 압축했습니다. 개별 도구의 내부 명령/권한 설정은 사용자 환경에 따라 다릅니다.
- GitHub 연결 사용자는 앱 인증, 저장소 범위와 쓰기 권한을 확인하고 대상 브랜치 수정·배포 결과를 점검합니다. 로그인 정보나 토큰을 슬라이드에 넣지 않습니다.
- 출처: https://blog29.vercel.app/blog/ai-agent-harness ; GitHub/Vercel 연결은 이 발표의 사례. 확인 2026-09-26.
-->

---
layout: process-flow
title: 파일 정리는 삭제보다 정리안과 미리보기부터 맡긴다
---

<div class="ts-title-row">
  <h1>파일 정리는 삭제보다 정리안과 미리보기부터 맡긴다</h1>
  <span class="ts-slide-index">26</span>
</div>

<div class="ts-agent-loop">
  <div class="ts-agent-boundary-label">FOLDER ORGANIZATION</div>
  <div class="ts-agent-flow">
    <FlowNode step="Scope" title="지정 폴더만" />
    <div class="ts-flow-arrow">→</div>
    <FlowNode step="Observe" title="목록·중복 확인" tone="cyan" />
    <div class="ts-flow-arrow">→</div>
    <FlowNode step="Plan" title="분류·이름 제안" tone="cyan" />
    <div class="ts-flow-arrow">→</div>
    <FlowNode step="Approval" title="변경 Preview" tone="amber" />
    <div class="ts-flow-arrow">→</div>
    <FlowNode step="Verify" title="개수·충돌 확인" tone="green" />
  </div>
</div>

<div class="ts-contrast-grid mt-4">
  <div class="ts-contrast-panel"><h3>이렇게 요청한다</h3><p>“다운로드 폴더를 유형·날짜별로 정리할 계획을 먼저 보여줘. 승인 전에는 이동하지 말고 삭제는 하지 마.”</p></div>
  <div class="ts-contrast-panel"><h3>완료를 이렇게 확인한다</h3><p>변경 전·후 파일 수 · 이름 충돌 · 이동 목록 · 실패 파일</p></div>
</div>

<TakeawayBox tone="amber">첫 작업은 삭제보다 Preview와 되돌릴 수 있는 이동·이름 변경이 적합하다.</TakeawayBox>

<SourceFooter source="합성 시나리오 · Tool과 Permission에 따라 가능 범위가 달라짐" status="PRACTICAL EXAMPLE" />

<!--
- 핵심 문장: 파일 정리는 Agent가 관찰·계획·변경·검증을 반복하는 구조를 이해하기 쉬운 첫 사례다.
- 연결 문장: Agent를 쓸 조건을 확인했으니, 일상에서 결과를 직접 검사할 수 있는 작은 작업부터 본다.
- 오해 경고: ‘정리해줘’라는 요청만으로 삭제나 대규모 이동을 허용하지 않는다. Preview가 있다고 실제 변경이 안전하다고 자동 보장되는 것도 아니다.
- 설명: 사용자는 하나의 폴더만 Scope로 지정하고, Agent에게 파일 목록과 중복 후보를 조사하게 한다. Agent는 분류와 이름 변경안을 먼저 보여주고, 사람 승인 뒤에만 이동한다. 완료 여부는 설명 문장이 아니라 변경 전후 파일 수, 충돌, 실패 목록으로 확인한다. 삭제가 필요하면 별도 작업으로 분리하는 편이 경계를 확인하기 쉽다.
- 출처/근거: 사용자 요청을 바탕으로 구성한 합성 시나리오. Anthropic, ‘Building Effective Agents’, 2024, ‘When (and when not) to use agents’의 명확한 성공 기준과 피드백 구조를 적용했다. 특정 제품의 기능·효과를 보장하는 사례가 아니며 2026-07-23 현재 이 세미나의 적용 예시다.
-->


---
layout: process-flow
title: 여러 자료는 요약보다 근거가 남는 비교표로 맡긴다
---

<div class="ts-title-row">
  <h1>여러 자료는 요약보다 근거가 남는 비교표로 맡긴다</h1>
  <span class="ts-slide-index">27</span>
</div>

<div class="ts-agent-loop">
  <div class="ts-agent-boundary-label">RESEARCH & STUDY</div>
  <div class="ts-agent-flow">
    <FlowNode step="Input" title="PDF·문서 지정" />
    <div class="ts-flow-arrow">→</div>
    <FlowNode step="Observe" title="근거·페이지 추출" tone="cyan" />
    <div class="ts-flow-arrow">→</div>
    <FlowNode step="Compare" title="공통점·차이" tone="cyan" />
    <div class="ts-flow-arrow">→</div>
    <FlowNode step="Artifact" title="표·요약·초안" />
    <div class="ts-flow-arrow">→</div>
    <FlowNode step="Verify" title="인용 위치 확인" tone="green" />
  </div>
</div>

<div class="ts-contrast-grid mt-4">
  <div class="ts-contrast-panel"><h3>이렇게 요청한다</h3><p>“이 PDF 5개를 비교해 핵심 주장·차이·근거 페이지를 표로 만들고, 확인할 수 없는 내용은 ‘알 수 없음’으로 표시해줘.”</p></div>
  <div class="ts-contrast-panel"><h3>응용할 수 있는 결과</h3><p>공부 노트 · 구매 전 비교표 · 보고서 초안 · 발표자료 Storyboard</p></div>
</div>

<TakeawayBox>좋은 요약은 짧은 글이 아니라 원문으로 돌아갈 수 있는 근거 경로를 남긴다.</TakeawayBox>

<SourceFooter source="현재 PDF→Slidev 작업을 일반화한 합성 시나리오" status="EVIDENCE-BASED EXAMPLE" />

<!--
- 핵심 문장: 여러 문서를 읽히는 작업에서는 요약문보다 주장과 원문 위치를 연결한 비교표가 더 검증하기 쉽다.
- 연결 문장: 로컬 파일 정리에서 한 단계 나아가, 읽기와 판단이 필요한 자료 조사 사례를 본다.
- 오해 경고: 페이지 번호가 붙었다고 해석이 정확해지는 것은 아니며, Agent가 만든 인용과 원문을 표본 검사해야 한다. 저작권이 있는 원문을 장문으로 복제하지 않는다.
- 설명: 사용자는 분석할 PDF나 문서를 명시하고, Agent에게 주장·공통점·차이·근거 페이지를 추출하게 한다. 결과는 공부 노트, 비교표, 보고서나 발표자료 초안으로 바꿀 수 있다. 완료 판정은 각 중요한 문장이 실제 원문 페이지에서 확인되는지, 모르는 내용을 만들어내지 않았는지로 한다. 현재 이 세미나가 PDF를 읽어 슬라이드 근거로 통합한 작업과 같은 구조다.
- 출처/근거: 이번 세션의 ‘Dive into Claude Code.pdf’ 조사→근거 선별→Slidev 반영 과정을 일반화한 합성 시나리오. 검증되지 않은 생산성 수치는 사용하지 않는다. 적용 판단은 자료 형식과 사용 가능한 PDF·문서 Tool에 따라 달라지며 2026-07-23 기준이다.
-->


---
layout: process-flow
title: 반복되는 표 작업은 원본을 보존한 복사본으로 맡긴다
---

<div class="ts-title-row">
  <h1>반복되는 표 작업은 원본을 보존한 복사본으로 맡긴다</h1>
  <span class="ts-slide-index">28</span>
</div>

<div class="ts-agent-loop">
  <div class="ts-agent-boundary-label">TABLE & REPORT</div>
  <div class="ts-agent-flow">
    <FlowNode step="Protect" title="원본 Read-only" />
    <div class="ts-flow-arrow">→</div>
    <FlowNode step="Inspect" title="열·형식 확인" tone="cyan" />
    <div class="ts-flow-arrow">→</div>
    <FlowNode step="Transform" title="정리·통합" tone="cyan" />
    <div class="ts-flow-arrow">→</div>
    <FlowNode step="Artifact" title="새 파일 저장" />
    <div class="ts-flow-arrow">→</div>
    <FlowNode step="Validate" title="행 수·합계 대조" tone="green" />
  </div>
</div>

<div class="ts-contrast-grid mt-4">
  <div class="ts-contrast-panel"><h3>이렇게 요청한다</h3><p>“월별 CSV를 하나로 합치고 날짜·열 이름을 통일해 새 XLSX로 저장해줘. 원본은 덮어쓰지 말고 제외한 행을 보고해줘.”</p></div>
  <div class="ts-contrast-panel"><h3>완료를 이렇게 확인한다</h3><p>입력 행 수 = 출력 행 수 + 제외 행 수 · 합계 재계산 · Schema 검사</p></div>
</div>

<TakeawayBox>표 작업은 ‘파일이 생겼다’가 아니라 행 수·합계·제외 규칙이 맞아야 완료다.</TakeawayBox>

<SourceFooter source="합성 CSV·XLSX 시나리오 · 실제 업무 데이터 사용 금지" status="VALIDATABLE EXAMPLE" />

<!--
- 핵심 문장: 반복되는 표 변환은 원본 보존과 결정론적 Validator를 함께 둘 수 있어 적용 구조를 설명하기 좋다.
- 연결 문장: 자료 조사처럼 해석이 필요한 사례에 이어, 수치와 Schema로 결과를 더 직접 검증할 수 있는 사례를 본다.
- 오해 경고: 새 파일이 열리거나 Agent가 합계가 맞다고 말한 것만으로 완료하지 않는다. 개인정보와 실제 회사 데이터는 승인되지 않은 Agent 환경에 넣지 않는다.
- 설명: 사용자는 월별 CSV를 복사본에서 통합하고 날짜 형식과 열 이름을 정규화하도록 요청한다. Agent는 원본을 Read-only로 취급하고 새 파일을 만든다. 입력 행 수와 출력·제외 행 수가 일치하는지, 합계가 재계산되는지, 예상 Schema를 만족하는지 별도 Validator로 확인한다. 규칙이 완전히 고정되어 있다면 다음부터는 Agent보다 Script나 Workflow로 전환할 수 있다.
- 출처/근거: 합성 CSV·XLSX를 가정한 적용 시나리오이며 실제 업무 데이터와 성과 수치를 사용하지 않는다. docs/SEMINAR_CONTEXT.md의 결정론적 Validator와 Script·Workflow 대안 원칙을 적용했다. 유효성은 데이터 형식과 Validator 정의가 유지되는 동안에만 성립한다.
-->


---
layout: process-flow
title: 검색과 계획은 맡기되 예약·결제는 사람이 승인한다
---

<div class="ts-title-row">
  <h1>검색과 계획은 맡기되 예약·결제는 사람이 승인한다</h1>
  <span class="ts-slide-index">29</span>
</div>

<div class="ts-agent-loop">
  <div class="ts-agent-boundary-label">LIFE PLANNING</div>
  <div class="ts-agent-flow">
    <FlowNode step="Scope" title="조건·예산" />
    <div class="ts-flow-arrow">→</div>
    <FlowNode step="Research" title="현재 정보·출처" tone="cyan" />
    <div class="ts-flow-arrow">→</div>
    <FlowNode step="Compare" title="선택지·Trade-off" tone="cyan" />
    <div class="ts-flow-arrow">→</div>
    <FlowNode step="Draft" title="일정·Checklist" />
    <div class="ts-flow-arrow">→</div>
    <FlowNode step="Approval" title="예약·결제는 사람" tone="amber" />
  </div>
</div>

<div class="ts-contrast-grid mt-4">
  <div class="ts-contrast-panel"><h3>이렇게 요청한다</h3><p>“주말 1박 2일 계획을 예산 안에서 비교해 링크·확인 날짜·예산표를 만들어줘. 로그인·예약·결제는 하지 마.”</p></div>
  <div class="ts-contrast-panel"><h3>완료를 이렇게 확인한다</h3><p>출처 최신성 · 예산 합계 · 이동 가능성 · 미확정 조건 목록</p></div>
</div>

<TakeawayBox tone="amber">Agent는 선택지를 준비할 수 있지만, 돈·계정·외부 약속은 별도 Approval 경계다.</TakeawayBox>

<SourceFooter source="합성 생활 계획 시나리오 · 가격·일정은 반드시 재확인" status="HUMAN APPROVAL" />

<!--
- 핵심 문장: 생활 계획에서는 정보 수집과 비교는 위임할 수 있지만 예약, 결제와 외부 약속은 사람의 결정으로 남긴다.
- 연결 문장: 로컬 파일과 표를 넘어 Browser가 필요한 작업에서도 같은 Harness 경계를 적용한다.
- 오해 경고: Agent가 제공한 가격, 운영 시간과 예약 가능성은 변할 수 있다. 출처 링크가 있어도 결제 직전에 다시 확인해야 하며 계정과 개인정보 접근을 자동 허용하지 않는다.
- 설명: 사용자는 날짜, 예산, 선호와 제외 조건을 주고 Agent에게 최신 출처를 조사해 선택지와 Trade-off를 비교하게 한다. Agent는 일정, 예산표와 Checklist를 작성하지만 로그인, 예약, 결제와 메시지 전송은 하지 않는다. 완료 판정은 출처 확인 날짜, 예산 합계, 이동 가능성과 미확정 조건이 명시됐는지로 한다.
- 출처/근거: 일반 생활 계획을 가정한 합성 시나리오. 가격·일정·규정은 시점에 따라 변하므로 실제 사용 시 현재 원출처 확인이 필요하다. Agent가 더 좋은 선택을 보장한다는 주장은 하지 않으며, 유효기간은 사용자가 최종 확인하는 시점까지다.
-->


---
layout: split-compare
title: 첫 Agent 요청에는 범위·금지·검증·중단 조건을 함께 쓴다
---

<div class="ts-title-row">
  <h1>첫 Agent 요청에는 범위·금지·검증·중단 조건을 함께 쓴다</h1>
  <span class="ts-slide-index">30</span>
</div>

<div class="ts-contrast-grid">
  <div class="ts-contrast-panel">
    <div class="ts-eyebrow">COPY & ADAPT</div>
    <h3>첫 요청의 기본 골격</h3>
    <p class="ts-mono">목적: 무엇을 만들 것인가<br>입력: 어느 파일·폴더를 볼 것인가<br>허용: 읽기·복사본 작성<br>금지: 삭제·전송·결제·설치<br>산출물: 파일명과 형식<br>검증: 무엇을 대조할 것인가<br>중단: 언제 질문하거나 멈출 것인가</p>
  </div>
  <div class="ts-contrast-panel" style="border-color: rgba(244,184,90,.5)">
    <div class="ts-eyebrow ts-amber">BEFORE EXECUTION</div>
    <h3>Agent가 확인해야 할 것</h3>
    <p>모르는 입력은 질문한다.<br>변경 전에 Preview를 보여준다.<br>범위 밖 파일은 건드리지 않는다.<br>위험 행동은 승인 전에 멈춘다.<br>마지막에 Diff와 Validator를 보고한다.</p>
  </div>
</div>

<div class="ts-evidence-strip mt-5">
  <EvidenceTag>Small Scope</EvidenceTag><EvidenceTag>Reversible</EvidenceTag><EvidenceTag>Observable</EvidenceTag><EvidenceTag>Validatable</EvidenceTag>
</div>

<TakeawayBox>좋은 첫 요청은 긴 Prompt가 아니라 검사 가능한 작은 작업 계약이다.</TakeawayBox>

<SourceFooter source="SEMINAR_CONTEXT ‘Agent Task Contract’ · 합성 요청 Template" status="AUDIENCE ACTION" />

<!--
- 핵심 문장: 첫 Agent 요청은 목표만 설명하는 문장이 아니라 범위, 금지, 산출물, 검증과 중단 조건을 포함한 작은 작업 계약이어야 한다.
- 연결 문장: 네 사례의 공통 구조를 청중이 자신의 작업에 복사할 수 있는 요청 골격으로 마무리한다.
- 오해 경고: Prompt에 ‘하지 마’라고 쓴 것만으로 강제 통제가 생기지 않는다. 실제 Permission, Sandbox와 Approval 설정이 요청문과 일치해야 한다.
- 설명: 목적과 입력 범위를 먼저 쓰고, 허용 행동과 금지 행동을 분리한다. 산출물의 파일명과 형식을 정하고, 행 수·출처·Build 같은 Validator를 지정한다. 필수 정보가 없거나 범위 밖 행동이 필요할 때는 질문하거나 멈추도록 한다. 첫 적용은 작은 복사본, 되돌릴 수 있는 변경, 관찰 가능한 Trace와 독립 Validator가 있는 작업이 적합하다.
- 출처/근거: docs/SEMINAR_CONTEXT.md의 ‘Agent Task Contract’, ‘안전 원칙’과 본 덱 14–20번의 Harness 요소를 청중용 Template으로 재구성했다. 합성 Template이며 특정 Agent 제품이 모든 항목을 기술적으로 강제한다고 주장하지 않는다. 실제 강제 가능 범위는 사용 중인 Tool과 Permission 설정을 확인해야 한다.
-->

