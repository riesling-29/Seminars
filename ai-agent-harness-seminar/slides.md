---
theme: default
layout: seminar-cover
title: "AI 에이전트와 하네스: 처음부터 설명하기"
author: riesling29
info: "Attention과 KV Cache 이후, 블로그 본문을 바탕으로 한 회사 세미나"
colorSchema: light
favicon: /favicon.svg
fonts:
  provider: none
transition: none
aspectRatio: 16/9
canvasWidth: 980
drawings:
  persist: false
mdc: true
---

<p class="eyebrow">ATTENTION과 KV CACHE 다음에 볼 것</p>
<h1>AI 에이전트와 하네스:<br>처음부터 설명하기</h1>
<p class="cover-deck">LLM은 다음 토큰을 만드는 모델입니다.<br>그런데 어떻게 파일을 고치고 테스트까지 실행할까요?</p>
<p class="cover-byline">riesling29 · 2026.09</p>
<SeminarSource href="https://blog29.vercel.app/blog/ai-agent-harness" label="원문: AI 에이전트와 하네스: 처음부터 설명하기" page="01 / 28" />

<!--
이 발표는 블로그 〈AI 에이전트와 하네스: 처음부터 설명하기〉의 내용과 순서를 바탕으로 합니다. 청중은 Attention과 KV Cache의 개념을 이미 배웠습니다. 오늘은 그 계산을 다시 유도하기보다, 모델의 출력이 컴퓨터에서의 실제 작업으로 이어지는 과정을 설명합니다. 모델, 하네스, 실행 환경을 각각 구분한 뒤 같은 계산 오류 예제로 확인합니다.

원문 대응: 표지
출처: https://blog29.vercel.app/blog/ai-agent-harness
-->

---
layout: seminar
title: "Attention에서 에이전트로"
---

<h1>Attention에서 에이전트로</h1>
<div class="columns divided">
<section><h2>모델 내부에서 하는 일</h2><p><b>Attention</b>은 입력 맥락을 참고해 토큰의 표현을 계산합니다.</p><p><b>KV Cache</b>는 이미 처리한 토큰의 key와 value를 재사용합니다.</p></section>
<section><h2>작업을 이어 가는 데 필요한 것</h2><p>파일을 읽고, 명령을 실행하고, 그 결과를 다음 입력에 넣어야 합니다.</p><p>이 부분은 <b>모델 바깥의 프로그램</b>이 맡습니다.</p></section>
</div><p class="note">KV Cache의 계산 재사용과 에이전트의 작업 기억은 역할이 다릅니다.</p>
<SeminarSource href="https://huggingface.co/docs/transformers/main/cache_explanation/" label="Hugging Face · How caching works" page="02 / 28" />

<!--
앞선 강의 내용을 한 장으로 연결합니다. Attention은 맥락을 계산하는 데 쓰이고 KV Cache는 생성 과정의 중복 계산을 줄입니다. 캐시 자체가 파일을 열거나 세션 사이의 작업을 영구히 저장하지는 않습니다. 대화, 파일, 실행 결과 중 무엇을 다음 모델 입력에 포함할지 결정하는 별도 코드가 필요합니다. 여기서 모델 바깥의 운영 구조로 시선을 옮깁니다.

원문 대응: Attention에서 에이전트로
출처: https://huggingface.co/docs/transformers/main/cache_explanation/
-->

---
layout: seminar
title: "모델을 둘러싼 실행 구조"
---

<h1>모델을 둘러싼 실행 구조</h1>
<p>모델은 <b>도구를 쓰겠다는 요청</b>을 출력할 수 있습니다.</p>
<SeminarDiagram kind="overview" />
<p class="small">하네스는 모델 호출과 도구 연결을 운영하는 코드입니다. 실행 환경에는 실제 파일과 프로세스가 있습니다.</p>
<SeminarSource href="https://blog29.vercel.app/blog/ai-agent-harness" label="블로그 · 모델과 주변 프로그램의 왕복" page="03 / 28" />

<!--
프로그램은 사용 가능한 도구 설명을 모델에 전달합니다. 모델이 도구 이름과 입력값을 반환하면 하네스가 요청을 확인하고 실행에 연결합니다. 결과는 다음 모델 입력에 들어갑니다. 결과를 읽은 모델은 답변을 마치거나 다른 호출을 선택합니다. 이 반복으로 목표를 수행하는 시스템을 이 발표에서는 에이전트라고 설명합니다. 하네스와 실제 실행 공간을 구분할 수 있다는 점을 먼저 짚고 뒤에서 자세히 봅니다.

원문 대응: Attention에서 에이전트로
출처: https://blog29.vercel.app/blog/ai-agent-harness
-->

---
layout: seminar
title: "에이전트를 정의하는 관점"
---

<h1>에이전트를 정의하는 관점</h1>
<p class="small">2024년 6월 중국 다롄에서 열린 WEF 행사에서 전문가들은 서로 다른 측면을 강조했습니다.</p>
<table class="compact"><thead><tr><th>전문가</th><th>강조한 내용</th></tr></thead><tbody>
<tr><td>Xi Kang</td><td>일반인도 사용할 수 있는 예측·의사결정 지원</td></tr>
<tr><td>Liu Jiren</td><td>환경을 감지하고 스스로 판단·행동하는 능력</td></tr>
<tr><td>Nancy Xu</td><td>LLM에 행동 능력을 더한 디지털 동반자·직원</td></tr>
<tr><td>Darko Matovski</td><td>업무별 자율성과 사람의 감독 사이의 경계</td></tr>
</tbody></table>
<p class="note">‘에이전트’의 범위는 자료마다 다릅니다. 맡는 목표와 실제 행동 범위를 함께 봐야 합니다.</p>
<SeminarSource href="https://www.weforum.org/stories/2024/07/what-is-an-ai-agent-experts-explain/" label="WEF · What is an AI agent and what will they do?" page="04 / 28" />

<!--
WEF는 세계경제포럼입니다. 다롄에서 개최한 Annual Meeting of the New Champions의 ‘What Can AI Assistants Do?’ 패널을 정리한 기사입니다. Xi Kang은 Vanderbilt University, Liu Jiren은 Neusoft, Nancy Xu는 Moonhub, Darko Matovski는 causaLens 소속으로 소개됐습니다. 넓은 의사결정 지원부터 자율적 행동과 감독까지 강조점이 다릅니다. 하나의 엄밀한 정의에 모두 합의했다고 해석하지 않습니다.

원문 대응: Attention에서 에이전트로
출처: https://www.weforum.org/stories/2024/07/what-is-an-ai-agent-experts-explain/
-->

---
layout: seminar
title: "감지·판단·행동과 환경"
---

<h1>감지·판단·행동과 환경</h1>
<SeminarDiagram kind="core" />
<p class="small">코딩 작업에서는 파일·오류 메시지가 관측 대상이고, 파일 수정·터미널 도구가 행동을 수행합니다. 제어센터에는 모델과 작업을 조정하는 구조가 함께 놓입니다.</p>
<SeminarSource href="https://www.weforum.org/publications/navigating-the-ai-frontier-a-primer-on-the-evolution-and-impact-of-ai-agents/" label="WEF 2024 · Navigating the AI Frontier, p.7 Figure 1 재구성" page="05 / 28" />

<!--
WEF 2024 보고서 Figure 1, 7쪽을 바탕으로 다시 그린 개념도입니다. 점선으로 묶인 센서·제어센터·이펙터 전체가 Agent이며 환경은 바깥에 있습니다. 사용자 목표는 제어센터로 전달됩니다. 센서는 관측을 가져오고 이펙터는 환경에 작용합니다. 코딩 에이전트에서는 사용자 요청, 저장소 파일, 명령 결과를 읽고, LLM의 판단과 하네스의 호출·상태 관리가 다음 행동을 연결합니다. 제어센터를 LLM 하나와 같은 말로 보지 않아야 합니다. 이 대응은 설명용이며 특정 제품의 설계도는 아닙니다.

원문 대응: AI 에이전트의 핵심 구조: 감지·판단·행동
출처: https://www.weforum.org/publications/navigating-the-ai-frontier-a-primer-on-the-evolution-and-impact-of-ai-agents/
-->

---
layout: seminar
title: "LLM·하네스·에이전트의 관계"
---

<h1>LLM·하네스·에이전트의 관계</h1>
<table class="compact"><thead><tr><th>구성</th><th>맡는 역할</th></tr></thead><tbody>
<tr><td>LLM</td><td>현재 입력에서 답변이나 다음 도구 요청을 만듭니다.</td></tr>
<tr><td>하네스</td><td>모델을 호출하고, 도구·작업 상태·권한을 연결합니다.</td></tr>
<tr><td>에이전트</td><td>목표를 받아 위 요소로 작업을 이어 가는 전체 시스템입니다.</td></tr>
</tbody></table>
<KenjakuAside />
<SeminarSource href="https://developers.openai.com/api/docs/guides/agents-api/architecture" label="블로그 · 켄자쿠 비유 / OpenAI Agents architecture" page="06 / 28" />

<!--
세 용어를 먼저 실제 역할로 정리합니다. 하단의 켄자쿠는 짧은 보조 비유입니다. 주술회전의 켄자쿠는 자신의 뇌를 다른 사람의 몸으로 옮겨 그 몸의 능력을 사용하는 인물입니다. 뇌는 LLM, 몸은 하네스, 몸을 얻고 행동하는 상태는 에이전트에 대응합니다. 몸의 능력을 쓸 수 있듯 연결 도구도 중요하다는 정도로만 사용합니다. 실제 구조에서는 하네스와 실행 환경을 따로 둘 수 있습니다. 이미지: 사용자가 제공해 블로그에 수록한 원작 그림을 비율을 유지한 작은 크기로 표시합니다. 캐릭터 출처: https://jujutsukaisen.jp/character/ .

원문 대응: 켄자쿠로 보는 LLM·에이전트·하네스
출처: https://developers.openai.com/api/docs/guides/agents-api/architecture
-->

---
layout: seminar
title: "모델에게 도구 설명을 전달합니다"
---

<h1>모델에게 도구 설명을 전달합니다</h1>
<div class="columns">
<section><h2>하네스가 알려 주는 정보</h2><p><b>이름</b>　<code>run_command</code></p><p><b>설명</b>　작업 환경에서 명령 실행</p><p><b>입력</b>　명령을 담은 <code>command</code> 문자열</p></section>
<section><h2>모델이 만드는 호출 요청</h2><pre class="code" v-pre>{
  "name": "run_command",
  "arguments": {
    "command": "npm test"
  }
}</pre></section>
</div><p class="note"><code>run_command</code>는 도구 이름이고, <code>npm test</code>는 그 도구에 넘기는 명령입니다.</p>
<SeminarSource href="https://developers.openai.com/api/docs/guides/function-calling" label="OpenAI Function calling · Anthropic Tool use" page="07 / 28" />

<!--
도구를 쓰는 모델 요청에는 도구 이름, 기능 설명, 입력 형식이 함께 들어갑니다. 모델은 그 설명을 바탕으로 필요한 도구와 인자를 선택합니다. 오른쪽 JSON은 블로그와 같은 단순화한 예시이며 특정 제품의 실제 API 메시지 전문은 아닙니다. 이 출력만으로 명령이 실행된 것은 아닙니다. 모델이 알 수 있는 도구 범위와 실제 도구 구현을 애플리케이션이 제공한다는 점을 설명합니다.

원문 대응: LLM이 도구를 요청하고, 실행기가 명령을 수행합니다
출처: https://developers.openai.com/api/docs/guides/function-calling
-->

---
layout: seminar
title: "호출·실행·결과 전달의 순서"
---

<h1>호출·실행·결과 전달의 순서</h1>
<SeminarDiagram kind="sequence" />
<p class="small">실행 결과를 받은 뒤 모델이 추가 조사, 수정 또는 종료를 선택합니다.</p>
<SeminarSource href="https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview" label="OpenAI Function calling · Anthropic Tool use" page="08 / 28" />

<!--
세 세로선은 서로 다른 역할입니다. 하네스가 모델에 목표와 도구 설명을 제공합니다. 모델은 호출을 출력합니다. 하네스는 도구 이름과 입력 형식을 확인하고 구현된 권한·승인 정책을 적용합니다. 터미널 도구라면 실행 환경에서 프로세스가 시작되고 stdout, stderr, 종료 코드를 수집합니다. 하네스가 그 결과를 다음 입력에 넣어야 모델이 결과를 알 수 있습니다. 제공자 측에서 실행하는 서버 도구도 있으므로 모든 실행이 사용자 로컬 컴퓨터에서 일어난다고 일반화하지 않습니다.

원문 대응: LLM이 도구를 요청하고, 실행기가 명령을 수행합니다
출처: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview
-->

---
layout: seminar
title: "실행 권한과 다음 행동의 선택"
---

<h1>실행 권한과 다음 행동의 선택</h1>
<div class="columns divided">
<section><h2>호출이 허용되지 않으면</h2><p>하네스가 실행을 거절하거나 사람의 승인을 기다릴 수 있습니다.</p><p><b>요청을 출력했다는 사실과 실행 허용 여부는 다릅니다.</b></p></section>
<section><h2>도구 결과가 돌아오면</h2><p>모델은 오류를 읽고 수정할지, 더 조사할지, 답변을 마칠지 고릅니다.</p><p>이 선택을 반복하도록 구성하면 에이전트 작업이 됩니다.</p></section>
</div><p class="note">단계가 주로 코드에 미리 정해져 있으면 워크플로, 중간 결과에 따라 모델이 경로를 고르면 에이전트로 구분할 수 있습니다.</p>
<SeminarSource href="https://www.anthropic.com/engineering/building-effective-agents" label="Anthropic · Building effective agents" page="09 / 28" />

<!--
블로그는 사람이 매번 다음 단계를 직접 지정하는 도구 사용과, 목표를 받고 다음 단계를 모델이 선택하는 시스템을 구분합니다. Anthropic도 미리 정한 코드 경로를 따르는 workflow와 모델이 경로·도구를 동적으로 선택하는 agent를 구분합니다. 실제 제품은 둘을 섞을 수 있습니다. 자율성이 있다는 말이 무제한 권한을 뜻하지 않는다는 점을 뒤의 권한 절과 연결합니다.

원문 대응: LLM이 도구를 요청하고, 실행기가 명령을 수행합니다
출처: https://www.anthropic.com/engineering/building-effective-agents
-->

---
layout: seminar
title: "실행 예제: 할인 후 세금 계산"
---

<h1>실행 예제: 할인 후 세금 계산</h1>
<p class="lead">10,000원에서 10%를 할인한 뒤,<br>남은 금액에 10%의 세금을 적용합니다.</p>
<div class="formula">10,000 × 0.9 × 1.1 = <b>9,900원</b></div>
<div class="columns"><p>처음 함수의 결과<br><span class="big-number" style="color:var(--error)">10,000원</span></p><p>테스트의 예상값<br><span class="big-number">9,900원</span></p></div>
<SeminarSource href="https://blog29.vercel.app/blog/ai-agent-harness" label="블로그 · 합성 Python 예제" page="10 / 28" />

<!--
블로그의 주문 금액 예제를 그대로 사용합니다. 설명을 위해 계산 순서 오류를 일부러 넣은 합성 Python 코드입니다. 기존 함수는 할인 전 금액에 세금을 더하고 할인액을 빼기 때문에 10,000원을 반환합니다. 할인 후 남은 9,000원에 10% 세금을 더하면 9,900원입니다. 다음 장에서 파일 확인, 테스트 실패, 수정, 재검증을 차례로 봅니다. 회사 코드나 실제 주문 데이터가 아닙니다.

원문 대응: 실제 실행 기록: 실패한 테스트를 고친 과정
출처: https://blog29.vercel.app/blog/ai-agent-harness
-->

---
layout: seminar
title: "실행 기록: 확인·실패·수정·재검증"
---

<h1>실행 기록: 확인·실패·수정·재검증</h1>
<RecordedTrace />
<p class="small">합성 예제의 실행 기록 재생입니다. 명령과 결과를 발췌하고 각 단계의 의미를 덧붙였습니다.</p>
<SeminarSource href="https://github.com/riesling-29/Seminars/tree/main/ai-agent-harness-seminar/demos/edge-build-agent/example" label="재현 코드와 명령: demos/edge-build-agent/example/README.md" page="11 / 28" />

<!--
‘다음’ 버튼으로 네 단계를 순서대로 보여 줍니다. 첫 단계는 파일의 계산식과 예상값 확인입니다. 두 번째는 python -m unittest -v의 실제 실패 출력과 종료 코드 1입니다. 세 번째는 apply_patch로 할인 후 세금 계산식으로 변경한 부분입니다. 마지막은 같은 테스트 두 개가 통과하고 종료 코드 0을 반환한 기록입니다. 재생 화면은 LLM을 새로 호출하는 라이브 실행이 아닙니다. 블로그의 실제 기록과 같은 합성 예제를 이 저장소 코드로 재현했습니다. 정확한 명령은 demos/edge-build-agent/example/README.md에 있습니다.

원문 대응: 실제 실행 기록: 실패한 테스트를 고친 과정
출처: https://github.com/riesling-29/Seminars/tree/main/ai-agent-harness-seminar/demos/edge-build-agent/example
-->

---
layout: seminar
title: "이 예제에서 각자 한 일"
---

<h1>이 예제에서 각자 한 일</h1>
<pre class="code" v-pre>discounted_price = price * (1 - discount_rate)
return round(discounted_price * (1 + tax_rate))</pre>
<table><tbody><tr><td>LLM</td><td>실패 결과를 읽고 수정과 재테스트를 요청했습니다.</td></tr><tr><td>하네스와 도구</td><td>요청을 실행에 연결하고 파일 변경·테스트 결과를 돌려줬습니다.</td></tr><tr><td>완료 확인</td><td>수정된 계산식과 테스트 결과를 함께 확인했습니다.</td></tr></tbody></table>
<SeminarSource href="https://blog29.vercel.app/blog/ai-agent-harness" label="블로그 · 모델의 선택과 도구의 실행" page="12 / 28" />

<!--
모델의 행동이 무엇이었는지 되짚습니다. 모델이 프로세스나 파일 시스템 자체가 된 것이 아니라 도구를 선택하고 요청한 것입니다. 파일을 실제로 바꾼 주체는 파일 수정 도구이며 테스트를 시작한 주체는 실행 환경입니다. ‘완료했습니다’라는 문장만으로 작업 성공을 판정할 수 없고 실제 변경과 검사 결과가 필요합니다. 두 테스트가 이 합성 예제를 검사하지만 모든 경계 조건을 검증했다는 뜻은 아닙니다.

원문 대응: 실제 실행 기록: 실패한 테스트를 고친 과정
출처: https://blog29.vercel.app/blog/ai-agent-harness
-->

---
layout: seminar
title: "공개 API 예시: OpenAI"
---

<h1>공개 API 예시: OpenAI</h1>
<p>같은 호출과 결과가 API에서는 아래처럼 표현될 수 있습니다.</p>
<div class="columns"><section><p class="code-label">모델의 호출 · Responses API</p><pre class="code" v-pre>{
  "type": "function_call",
  "call_id": "call_123",
  "name": "run_command",
  "arguments":
    "{\"command\":\"npm test\"}"
}</pre></section><section><p class="code-label">실행 뒤 돌려주는 결과</p><pre class="code" v-pre>{
  "type": "function_call_output",
  "call_id": "call_123",
  "output": "All tests passed"
}</pre><p class="code-caption">같은 <code>call_id</code>가 요청과 결과를 연결합니다.</p></section></div>
<SeminarSource href="https://developers.openai.com/api/docs/guides/function-calling" label="OpenAI · Function calling" page="13 / 28" />

<!--
블로그의 OpenAI Responses API 예시입니다. arguments는 JSON 객체를 담은 문자열입니다. function_call이 모델의 출력이고, 애플리케이션 코드가 도구를 실행한 후 function_call_output을 돌려줍니다. 이 둘만으로 전체 API 요청을 구성한 것은 아닙니다. 메시지 이력 등 바깥 봉투는 생략했습니다. 제품 내부 통신 형식을 그대로 캡처한 것이 아니라 공식 API 형식의 교육용 예시입니다.

원문 대응: API에서는 호출과 결과를 어떤 형식으로 주고받을까요?
출처: https://developers.openai.com/api/docs/guides/function-calling
-->

---
layout: seminar
title: "공개 API 예시: Claude와 Hermes"
---

<h1>공개 API 예시: Claude와 Hermes</h1>
<div class="columns"><section><p class="code-label">Claude Messages API · 호출</p><pre class="code" v-pre>{
  "type": "tool_use",
  "id": "toolu_123",
  "name": "run_command",
  "input": {"command": "npm test"}
}</pre></section><section><p class="code-label">실행 결과</p><pre class="code" v-pre>{
  "type": "tool_result",
  "tool_use_id": "toolu_123",
  "content": "All tests passed"
}</pre></section></div>
<p class="note">Hermes의 <code>&lt;tool_call&gt;</code>·<code>&lt;tool_response&gt;</code>는 실행 기록의 정규화 표현일 수 있습니다. 모든 제품이 쓰는 단일 통신 형식은 없습니다.</p>
<SeminarSource href="https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview" label="Anthropic Tool use · Hermes trajectory" page="14 / 28" />

<!--
Claude에서는 tool_use의 input이 객체이고, 결과는 원래 id를 tool_use_id로 참조합니다. 이는 Claude의 공개 API 예시이며 Claude Code 내부 메시지와 바이트 단위로 같다는 뜻이 아닙니다. Hermes는 공급자별 형식으로 변환할 수 있고 trajectory 기록에서는 호출과 결과를 tool_call/tool_response 태그로 감싼 정규화 표현을 쓸 수 있습니다. 기록 형식과 실제 네트워크 전송 형식을 구분합니다. Hermes 문서: https://hermes-agent.nousresearch.com/docs/agents/trajectory/ .

원문 대응: API에서는 호출과 결과를 어떤 형식으로 주고받을까요?
출처: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview
-->

---
layout: seminar
title: "에이전트와 하네스를 구분하는 기준"
---

<h1>에이전트와 하네스를 구분하는 기준</h1>
<table><thead><tr><th>구분</th><th>버그 수정 작업에서의 역할</th></tr></thead><tbody>
<tr><td>LLM</td><td>“테스트를 실행하자” 같은 다음 요청을 만듭니다.</td></tr>
<tr><td>하네스</td><td>모델을 호출하고 요청·권한·결과 전달·종료를 관리합니다.</td></tr>
<tr><td>실행 환경</td><td>저장소 파일과 터미널이 실제로 작동하는 공간입니다.</td></tr>
<tr><td>에이전트</td><td>목표를 받아 읽기·수정·테스트를 이어 가는 전체 시스템입니다.</td></tr>
</tbody></table>
<p class="note">제품마다 경계가 조금씩 다릅니다. 단어보다 실제로 맡는 역할을 확인하는 편이 도움이 됩니다.</p>
<SeminarSource href="https://developers.openai.com/api/docs/guides/agents-api/architecture" label="블로그 · OpenAI Agents architecture" page="15 / 28" />

<!--
앞서 비유로 본 관계를 실제 코드 예제 이후에 정리합니다. 에이전트는 일을 하는 전체 시스템, 하네스는 그 안에서 반복 호출과 도구·상태·권한을 잇는 운영 구조입니다. 제품 이름이 둘을 동시에 가리키기도 합니다. 하네스를 모델을 제외한 나머지 전부라고 간단히 설명할 수 있지만, 실행 환경을 따로 두면 실제 설계를 더 정확히 설명할 수 있습니다.

원문 대응: ‘에이전트’와 ‘하네스’는 어떻게 구분할까요?
출처: https://developers.openai.com/api/docs/guides/agents-api/architecture
-->

---
layout: seminar
title: "WEF의 소프트웨어 에이전트 구조"
---

<h1>WEF의 소프트웨어 에이전트 구조</h1>
<SeminarDiagram kind="layers" />
<p class="small">오케스트레이션은 하네스와 역할이 겹칩니다. 두 용어의 범위가 항상 같지는 않습니다.</p>
<SeminarSource href="https://reports.weforum.org/docs/WEF_AI_Agents_in_Action_Foundations_for_Evaluation_and_Governance_2025.pdf" label="WEF 2025 · AI Agents in Action, p.8 Figure 2 재구성" page="16 / 28" />

<!--
WEF 2025 보고서 Figure 2, 8쪽을 블로그처럼 다시 그렸습니다. 점선 경계 안에 응용, 오케스트레이션, 추론 세 층이 있습니다. LLM 같은 모델은 추론 층에 놓이고, 사용자와 만나는 응용 부분 및 흐름을 조정하는 운영 부분과 함께 움직입니다. MCP는 외부 앱·도구, A2A는 다른 에이전트로 연결되는 경로를 나타냅니다. 이 구조도는 기능의 개념적 구분이며 특정 제품의 내부 구현을 보장하지 않습니다.

원문 대응: ‘에이전트’와 ‘하네스’는 어떻게 구분할까요?
출처: https://reports.weforum.org/docs/WEF_AI_Agents_in_Action_Foundations_for_Evaluation_and_Governance_2025.pdf
-->

---
layout: seminar
title: "같은 모델에 다른 도구를 연결하면"
---

<h1>같은 모델에 다른 도구를 연결하면</h1>
<div class="columns divided"><section><h2>저장소 읽기만 허용</h2><p>관련 파일을 찾고 오류 원인과 수정안을 설명합니다.</p><p>수정안을 실제로 적용하고 검사하는 단계는 사람에게 남습니다.</p></section>
<section><h2>수정과 테스트도 허용</h2><p>파일을 바꾸고 테스트 결과를 받아 다음 수정을 선택할 수 있습니다.</p><p>허용한 도구와 권한에 따라 <b>작업 경로</b>가 달라집니다.</p></section></div>
<p class="note">결과 차이를 비교하려면 모델, 과제, 도구 설명, 데이터, 권한, 사람의 개입도 함께 확인해야 합니다.</p>
<SeminarSource href="https://www.anthropic.com/engineering/building-effective-agents" label="블로그 · Anthropic의 도구 설계 논의" page="17 / 28" />

<!--
같은 LLM을 연결해도 하네스가 노출한 도구, 작업 환경, 허용 권한이 다르면 할 수 있는 작업이 달라집니다. 다만 이를 하네스의 효과만으로 단정할 수는 없습니다. 모델 성능, 주어진 정보, 도구 설명, 작업 종류, 사람의 개입도 결과에 영향을 줍니다. 블로그가 도구 설계와 사용성에 주목하는 이유를 설명합니다.

원문 대응: ‘에이전트’와 ‘하네스’는 어떻게 구분할까요?
출처: https://www.anthropic.com/engineering/building-effective-agents
-->

---
layout: seminar
title: "자율성과 실행 권한"
---

<h1>자율성과 실행 권한</h1>
<p><b>다음 단계를 스스로 고르는 정도</b>와 <b>실제로 바꿀 수 있는 범위</b>는 다른 축입니다.</p>
<table class="compact"><thead><tr><th>맡긴 일</th><th>스스로 고르는 것</th><th>허용하거나 보류할 것</th></tr></thead><tbody>
<tr><td>문서 요약</td><td>읽을 문서와 탐색 순서</td><td>읽기만 허용</td></tr>
<tr><td>버그 수정</td><td>오류에 따른 수정 경로</td><td>특정 저장소 수정·테스트 허용</td></tr>
<tr><td>고객 답장</td><td>근거 수집과 초안 구성</td><td>외부 발송은 승인 전 보류</td></tr>
</tbody></table><p class="note">같은 터미널 도구도 권한 범위에 따라 실행할 수 있는 명령이 달라집니다.</p>
<SeminarSource href="https://reports.weforum.org/docs/WEF_AI_Agents_in_Action_Foundations_for_Evaluation_and_Governance_2025.pdf" label="블로그 · WEF 2025의 자율성과 권한" page="18 / 28" />

<!--
블로그의 세 가지 설계 예시입니다. 제품의 기본값을 뜻하지 않습니다. 자율성은 다음 경로를 고르는 정도, 권한은 실제 자원에 작용할 수 있는 범위입니다. 문서를 스스로 폭넓게 탐색하더라도 쓰기 권한은 없을 수 있습니다. 고객 답장 초안을 완성할 수 있어도 발송은 별도 승인 대상으로 둘 수 있습니다. 이 구분이 다음 평가·거버넌스 논의의 출발점입니다.

원문 대응: 자율성과 권한: 에이전트에 맡기는 범위
출처: https://reports.weforum.org/docs/WEF_AI_Agents_in_Action_Foundations_for_Evaluation_and_Governance_2025.pdf
-->

---
layout: seminar
title: "에이전트를 평가하기 전의 분류"
---

<h1>에이전트를 평가하기 전의 분류</h1>
<div class="columns divided"><section><h2>다섯 가지 특성</h2><p><b>기능</b>　무슨 기능을 수행하나요?<br><b>역할</b>　어떤 책임을 맡나요?<br><b>예측 가능성</b>　행동을 얼마나 예상할 수 있나요?<br><b>자율성</b>　다음 단계를 얼마나 스스로 고르나요?<br><b>권한</b>　어디까지 실행할 수 있나요?</p></section><section><h2>두 가지 맥락</h2><p><b>쓰임새</b><br>어떤 과제에 사용하나요?</p><p><b>운영 환경</b><br>어떤 데이터·시스템과 연결되나요?</p></section></div>
<p class="note">같은 모델을 쓰더라도 업무와 운영 환경이 달라지면 평가 기준도 달라집니다.</p>
<SeminarSource href="https://reports.weforum.org/docs/WEF_AI_Agents_in_Action_Foundations_for_Evaluation_and_Governance_2025.pdf" label="WEF 2025 · Foundations for Evaluation and Governance" page="19 / 28" />

<!--
WEF 2025는 에이전트를 다섯 특성과 두 맥락 축으로 살펴봅니다. 이 분류는 점수를 매기기 전에 평가 대상을 구체화하는 과정입니다. 일회성 문서 요약과 고객에게 직접 발송하는 시스템을 똑같은 기준으로 볼 수 없다는 예로 설명합니다. 용어 자체를 외우게 하기보다 ‘무슨 일을 어디서 어느 권한으로 하나’를 묻는 목적을 전달합니다.

원문 대응: 자율성과 권한: 에이전트에 맡기는 범위
출처: https://reports.weforum.org/docs/WEF_AI_Agents_in_Action_Foundations_for_Evaluation_and_Governance_2025.pdf
-->

---
layout: seminar
title: "분류에서 운영 통제까지"
---

<h1>분류에서 운영 통제까지</h1>
<div class="timeline">
<div><h3>분류</h3><p>어떤 일을 어떤 환경에서 하는지 정리합니다.</p></div>
<div><h3>평가</h3><p>과제 성공, 도구 실패, 예외 상황에서의 행동을 확인합니다.</p></div>
<div><h3>위험 평가</h3><p>실패나 오용의 가능성과 피해 정도를 살펴봅니다.</p></div>
<div><h3>거버넌스</h3><p>접근 권한, 사람의 감독, 기록·모니터링을 정합니다.</p></div>
</div><p class="note">모델 답변의 정확도에 더해, 실제 과제에서 도구를 어떻게 쓰는지도 평가합니다.</p>
<SeminarSource href="https://reports.weforum.org/docs/WEF_AI_Agents_in_Action_Foundations_for_Evaluation_and_Governance_2025.pdf" label="WEF 2025 · 평가·위험 평가·거버넌스" page="20 / 28" />

<!--
블로그에 풀어 쓴 WEF의 네 단계입니다. 평가에서는 완료 시간, 도구 호출 성공률, 오류 유형, 예외 상황의 견고성 같은 항목을 살펴볼 수 있습니다. 이 발표는 실제 제품의 성과 수치를 측정하지 않았으므로 숫자를 제시하지 않습니다. 위험 평가를 거친 뒤 접근 통제와 사람의 감독을 설정하는 관계를 설명합니다.

원문 대응: 자율성과 권한: 에이전트에 맡기는 범위
출처: https://reports.weforum.org/docs/WEF_AI_Agents_in_Action_Foundations_for_Evaluation_and_Governance_2025.pdf
-->

---
layout: seminar
title: "코드 저장소에서 쓰는 에이전트"
---

<h1>코드 저장소에서 쓰는 에이전트</h1>
<table><thead><tr><th>제품</th><th>주요 사용 맥락</th></tr></thead><tbody>
<tr><td>Claude Code</td><td>저장소를 읽고 수정하며 명령을 실행하는 코딩 에이전트</td></tr>
<tr><td>Codex</td><td>파일 읽기·수정·실행을 수행하며, CLI에서는 로컬 저장소와 도구를 사용</td></tr>
<tr><td>OpenCode</td><td>모델과 도구 접근 권한, 작업용·계획용 에이전트 구성을 설정</td></tr>
</tbody></table>
<p class="statement">제품을 볼 때도 모델, 도구, 권한, 실행 장소를 나누어 볼 수 있습니다.</p>
<p class="small">블로그가 2026-09-23 확인한 공식 자료 기준입니다. 동일 조건의 성능 비교가 아닙니다.</p>
<SeminarSource href="https://code.claude.com/docs/en/overview" label="Claude Code · Codex CLI · OpenCode 공식 문서" page="21 / 28" />

<!--
Claude Code, Codex, OpenCode 모두 코드 작업이라는 맥락이 있지만 사용하는 인터페이스와 모델·도구 설정은 다릅니다. 제품의 지원 환경과 기본값은 바뀔 수 있어 발표 전 다시 확인해야 합니다. 공식 링크: https://code.claude.com/docs/en/overview , https://developers.openai.com/codex/cli , https://opencode.ai/docs/agents/ .

원문 대응: 실제로 어떤 에이전트들이 있나
출처: https://code.claude.com/docs/en/overview
-->

---
layout: seminar
title: "확장 가능한 하네스와 메시징 연결"
---

<h1>확장 가능한 하네스와 메시징 연결</h1>
<table class="compact"><thead><tr><th>프로젝트</th><th>주요 사용 맥락</th></tr></thead><tbody>
<tr><td>Pi</td><td>작은 기본 구성에 확장·스킬을 더하는 터미널 하네스</td></tr>
<tr><td>Oh My Pi</td><td>Pi에서 갈라진 별도 코딩 에이전트. 추가 개발 도구 통합</td></tr>
<tr><td>Hermes Agent</td><td>터미널 작업, 세션 간 기억·스킬, 메시징 연결</td></tr>
<tr><td>OpenClaw</td><td>메시지 앱을 에이전트의 세션·도구·자동화에 연결하는 게이트웨이</td></tr>
</tbody></table><p class="note">Hermes Agent는 에이전트 프로젝트입니다. Pi와 Oh My Pi도 서로 다른 프로젝트입니다.</p>
<SeminarSource href="https://hermes-agent.nousresearch.com/docs/" label="Pi · Oh My Pi · Hermes Agent · OpenClaw 공식 문서" page="22 / 28" />

<!--
블로그와 같은 구분을 유지합니다. Hermes라는 언어 모델과 Hermes Agent 프로젝트를 혼동하지 않아야 합니다. OpenClaw는 코드 편집기보다는 메시지 채널과 세션, 도구, 자동화를 잇는 게이트웨이 역할에 무게가 있습니다. 로컬 모델을 연결하더라도 검색·외부 API·메시징 도구의 데이터 흐름은 별도로 확인해야 합니다. 공식 링크: https://pi.dev/docs/latest , https://github.com/can1357/oh-my-pi , https://hermes-agent.nousresearch.com/docs/ , https://docs.openclaw.ai/ . 블로그 확인일 2026-09-23.

원문 대응: 실제로 어떤 에이전트들이 있나
출처: https://hermes-agent.nousresearch.com/docs/
-->

---
layout: seminar
title: "MCP·스킬·메모리의 역할"
---

<h1>MCP·스킬·메모리의 역할</h1>
<div class="columns three divided">
<section><h2>MCP</h2><p>앱이 외부 도구·자료에 연결되는 <b>프로토콜</b>입니다.</p><p class="small">예: 에이전트 앱이 자료 검색 도구와 연결</p></section>
<section><h2>스킬</h2><p>특정 업무에서 참고하는 <b>절차와 자료</b>를 묶습니다.</p><p class="small">지침을 적는 것만으로 새 실행 권한이 생기지는 않습니다.</p></section>
<section><h2>메모리</h2><p>세션 사이에도 남겨 다시 활용하는 <b>기록</b>입니다.</p><p class="small">토큰 계산을 재사용하는 KV Cache와 역할이 다릅니다.</p></section>
</div><p class="note">도구 연결, 업무 지침, 지속 기록은 각각 다른 부분을 담당합니다.</p>
<SeminarSource href="https://modelcontextprotocol.io/specification/2025-11-25/architecture" label="MCP 공식 사양 · Pi 스킬/확장 · Hermes 메모리" page="23 / 28" />

<!--
제품 소개에 자주 붙는 용어를 블로그와 같은 순서로 설명합니다. MCP는 에이전트나 모델의 이름이 아닙니다. 스킬은 지침·자료이며 실제 실행 기능을 추가하는 코드와 구분합니다. 메모리는 보존된 기록을 다음 작업에 다시 쓰는 층입니다. 필요한 부분이 모델의 입력에 포함돼야 판단에 쓰입니다. 출처: MCP 공식 사양 https://modelcontextprotocol.io/specification/2025-11-25/architecture , https://pi.dev/docs/latest/skills/ , https://pi.dev/docs/latest/extensions/ , https://hermes-agent.nousresearch.com/docs/user-guide/features/memory/ .

원문 대응: 실제로 어떤 에이전트들이 있나
출처: https://modelcontextprotocol.io/specification/2025-11-25/architecture
-->

---
layout: seminar
title: "작은 과제를 처음부터 끝까지 맡기기"
---

<h1>작은 과제를 처음부터 끝까지 맡기기</h1>
<blockquote class="quote">“이 저장소의 로그인 테스트가 왜 실패하는지 찾아 주세요.<br>외부 전송이나 배포는 하지 말아 주세요.”</blockquote>
<div class="columns divided"><section><h2>과정에서 확인할 것</h2><p>어떤 도구를 요청했는지<br>어떤 행동이 허용됐는지<br>결과를 보고 무엇을 선택했는지</p></section><section><h2>완료 후 확인할 것</h2><p>변경된 파일과 코드<br>실행한 테스트의 범위<br>해결되지 않은 문제</p></section></div>
<SeminarSource href="https://blog29.vercel.app/blog/ai-agent-harness" label="블로그 · 실제 과제에서의 사용" page="24 / 28" />

<!--
블로그의 로그인 테스트 예시입니다. 작은 과제 하나를 처음부터 끝까지 맡기면 모델 요청, 하네스의 정책, 도구 실행 결과를 구분해 볼 수 있습니다. 회사 규정상 허용된 범위와 복사본 등 적절한 환경을 정한 뒤 시도해야 합니다. 성공하더라도 변경 내용과 테스트 범위를 사람에게 남겨야 합니다. 구체적인 팀 데이터나 인증 정보를 발표 자료에 넣지 않습니다.

원문 대응: 실제 과제에서는 어떻게 쓰일까
출처: https://blog29.vercel.app/blog/ai-agent-harness
-->

---
layout: seminar
title: "문서·데이터 작업과 더 단순한 대안"
---

<h1>문서·데이터 작업과 더 단순한 대안</h1>
<table class="compact"><thead><tr><th>작업</th><th>가능한 방식</th><th>확인할 결과</th></tr></thead><tbody>
<tr><td>문서 비교</td><td>자료를 읽고 근거 링크가 있는 비교표 작성</td><td>원문과 인용·해석의 일치</td></tr>
<tr><td>데이터 분석</td><td>허용 폴더에서 스크립트 실행·오류 수정</td><td>입력, 계산, 재현 가능한 출력</td></tr>
<tr><td>단순 질문</td><td>모델 한 번 호출</td><td>답변의 정확성</td></tr>
<tr><td>고정된 반복 작업</td><td>스크립트 또는 미리 정한 워크플로</td><td>정해진 검사와 실패 처리</td></tr>
</tbody></table><p class="note">중간 결과에 따라 경로를 바꿀 필요가 있는지 먼저 살펴봅니다. 기존 방식이 충분하면 유지할 수도 있습니다.</p>
<SeminarSource href="https://www.anthropic.com/engineering/building-effective-agents" label="블로그 · Anthropic Building effective agents" page="25 / 28" />

<!--
블로그의 문서 정리와 데이터 분석 예시 및 단순한 대안을 한 장으로 정리합니다. 외부 발송·결제·운영 배포처럼 되돌리기 어려운 행동은 별도 승인 경계가 필요합니다. 단발 질문이나 순서가 항상 같은 작업에는 복잡한 agent loop가 필요하지 않을 수 있습니다. Anthropic도 단순한 방식으로 해결되는지 먼저 살피도록 권합니다.

원문 대응: 실제 과제에서는 어떻게 쓰일까
출처: https://www.anthropic.com/engineering/building-effective-agents
-->

---
layout: seminar
title: "이 블로그 글은 이렇게 쓰였습니다"
---

<h1>이 블로그 글은 이렇게 쓰였습니다</h1>
<SeminarDiagram kind="writing" />
<p class="small">GitHub 연결에서는 대상 저장소와 쓰기 권한을 확인하고, Vercel에는 그 저장소의 배포 연결을 설정합니다. 커밋 이후에는 빌드 상태와 실제 페이지를 확인합니다.</p>
<SeminarSource href="https://blog29.vercel.app/blog/ai-agent-harness" label="블로그 작성 흐름 · GitHub 연결 · Vercel Git 배포" page="26 / 28" />

<!--
사용자가 블로그를 작성한 두 경로를 정리합니다. 첫 경로는 Local LLM과 Hermes로 로컬 파일을 다루는 방식이고, 두 번째는 GPT/Codex에서 GitHub에 연결해 저장소를 수정하는 방식입니다. 따라 할 때는 GitHub 앱 인증과 대상 저장소 접근 범위를 확인하고, Vercel에서 저장소를 가져와 빌드 명령과 배포 브랜치를 설정합니다. 그다음 수정 요청, 변경 검토, 커밋, 배포 상태 확인, 실제 페이지 확인으로 진행합니다. 일반적인 ChatGPT GitHub 검색 연결과 Codex의 쓰기 기능은 환경과 권한에 따라 다르므로 로그인만 했다고 쓰기가 보장되지는 않습니다. 출처: https://help.openai.com/en/articles/11145903-connecting-github-to-chatgpt , https://developers.openai.com/codex/cloud , https://vercel.com/docs/git .

원문 대응: 이 블로그 글은 이렇게 쓰였습니다
출처: https://blog29.vercel.app/blog/ai-agent-harness
-->

---
layout: seminar
title: "정리: 목표·도구·권한·결과"
---

<h1>정리: 목표·도구·권한·결과</h1>
<p class="lead">AI 에이전트는 목표를 받아 도구를 사용하고,<br>그 결과를 다음 판단에 반영하는 시스템입니다.</p>
<div class="columns divided"><section><h2>구조를 읽는 질문</h2><p>누가 다음 요청을 만드나요?<br>누가 실행을 허용하나요?<br>누가 실제 파일과 명령을 다루나요?</p></section><section><h2>사용할 때의 질문</h2><p>어디까지 맡길 수 있나요?<br>무엇으로 결과를 확인하나요?<br>언제 사람이 개입하나요?</p></section></div><p class="note">LLM, 하네스, 실행 환경을 함께 보면 제품 이름 뒤의 작동 방식을 이해할 수 있습니다.</p>
<SeminarSource href="https://blog29.vercel.app/blog/ai-agent-harness" label="블로그 · AI 에이전트와 하네스: 처음부터 설명하기" page="27 / 28" />

<!--
첫 질문으로 돌아갑니다. LLM 자체는 출력을 만드는 모델이지만 주변 프로그램과 도구를 통해 작업 시스템의 일부가 됩니다. 하네스는 모델 호출과 도구·상태·권한을 운영하고, 실행 환경이 실제 파일과 명령을 다룹니다. 모델의 이름만으로 에이전트의 능력이나 위험을 판단할 수 없다는 블로그의 결론을 다시 말합니다. 질문을 받습니다.

원문 대응: 정리
출처: https://blog29.vercel.app/blog/ai-agent-harness
-->

---
layout: seminar
title: "본문과 참고 자료"
---

<h1>본문과 참고 자료</h1>
<div class="references">
<p><a href="https://blog29.vercel.app/blog/ai-agent-harness" target="_blank">블로그 원문</a><small>AI 에이전트와 하네스: 처음부터 설명하기</small></p>
<p><a href="https://huggingface.co/docs/transformers/main/cache_explanation/" target="_blank">Hugging Face</a><small>How caching works</small></p>
<p><a href="https://www.weforum.org/publications/navigating-the-ai-frontier-a-primer-on-the-evolution-and-impact-of-ai-agents/" target="_blank">WEF 2024</a><small>Navigating the AI Frontier · Figure 1</small></p>
<p><a href="https://reports.weforum.org/docs/WEF_AI_Agents_in_Action_Foundations_for_Evaluation_and_Governance_2025.pdf" target="_blank">WEF 2025 PDF</a><small>AI Agents in Action · Figure 2와 평가 프레임워크</small></p>
<p><a href="https://developers.openai.com/api/docs/guides/function-calling" target="_blank">OpenAI</a><small>Function calling</small></p>
<p><a href="https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview" target="_blank">Anthropic</a><small>Tool use with Claude</small></p>
<p><a href="https://www.anthropic.com/engineering/building-effective-agents" target="_blank">Building effective agents</a><small>워크플로·에이전트의 구분과 도구 설계</small></p>
<p><a href="https://github.com/riesling-29/Seminars/tree/main/ai-agent-harness-seminar" target="_blank">슬라이드와 재현 코드</a><small>원고 · 발표자 노트 · 합성 테스트 예제</small></p>
</div>
<SeminarSource href="https://blog29.vercel.app/blog/ai-agent-harness" label="riesling29 · 참고 자료" page="28 / 28" />

<!--
상세 출처와 제품별 공식 문서는 각 슬라이드의 발표자 노트 및 docs/SOURCES_2026-09-26.md에 있습니다. 이 장의 링크는 브라우저에서 직접 열 수 있습니다. 질의응답 중 특정 부분을 확인할 때 블로그 원문의 해당 절로 돌아갈 수 있습니다.

원문 대응: 참고 자료
출처: https://blog29.vercel.app/blog/ai-agent-harness
-->
