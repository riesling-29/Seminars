---
theme: default
title: "AI 에이전트와 하네스: 처음부터 설명하기"
author: ""
layout: seminar-cover
info: "Attention과 KV Cache에서 도구 호출과 에이전트 구조까지"
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

<p class="eyebrow">Attention과 KV Cache 개념을 배운 분들이라면</p>
<h1>AI 에이전트와 하네스:<br>처음부터 설명하기</h1>
<p class="cover-deck">LLM은 다음 토큰을 만드는 모델입니다.<br>그런데 코딩 어시스턴트는 어떻게 파일을 고치고 테스트할까요?</p>
<SeminarSource label="AI 에이전트와 하네스 세미나" page="1 / 32" />

<!--
Attention·KV Cache에서 시작해 도구 호출, 실행, 에이전트 구조와 실제 사용까지 이어 갑니다.
-->

---
layout: seminar
title: "LLM이 할 수 있는 일과, 혼자서는 못 하는 일"
---

<h1>LLM이 할 수 있는 일과, 혼자서는 못 하는 일</h1>
<div class="columns divided">
<section><h2>입력 안에서 할 수 있는 일</h2><p>질문에 답하고, 글·코드를 만들고, 주어진 맥락에서 다음 단계를 고릅니다.</p><p>도구 설명이 있으면 <b>도구 이름과 인자를 담은 호출 요청</b>을 만들 수 있습니다.</p></section>
<section><h2>도구 연결 없이 직접 하지는 못하는 일</h2><p>내 컴퓨터의 파일 열기, 터미널 명령 실행, 외부 서비스에 요청 보내기</p><p>이 행동에는 파일·명령·서비스에 연결된 프로그램이 필요합니다.</p></section>
</div><p class="statement">모델은 요청을 만들 수 있지만, 요청을 실제 작업으로 바꾸는 것은 연결된 프로그램과 도구입니다.</p>
<SeminarSource href="https://qwen.readthedocs.io/en/latest/framework/function_call.html" label="Qwen · Function Calling" page="2 / 32" />

<!--
여기서 ‘혼자서는 못 한다’는 표현은 모델 자체와 도구가 연결된 시스템을 구분합니다. 입력에 포함된 파일 내용에 대해 설명하거나 코드를 작성하는 것과, 파일을 직접 읽고 수정하는 것은 다른 일입니다.
-->

---
layout: seminar
title: "‘에이전트’는 어디까지를 말할까요?"
---

<h1>‘에이전트’는 어디까지를 말할까요?</h1>
<p>WEF의 2024년 토론에서 전문가들은 서로 다른 면을 강조했습니다.</p>
<div class="perspectives">
<section><b>예측·의사결정</b><span>사람의 선택을 돕는 기능</span></section>
<section><b>감지·행동</b><span>환경을 읽고 스스로 반응</span></section>
<section><b>디지털 동반자</b><span>LLM에 행동 능력을 더한 시스템</span></section>
<section><b>자율성·감독</b><span>업무별로 사람이 개입할 경계</span></section>
</div>
<p class="note">그래서 제품 이름보다 목표·환경·행동 범위·사람의 감독을 함께 봐야 합니다.</p>
<SeminarSource href="https://www.weforum.org/stories/technological-innovation/what-is-an-ai-agent-experts-explain/" label="WEF · 전문가들이 설명하는 AI 에이전트" page="3 / 32" />

<!--
WEF 기사에서 소개한 Xi Kang, Liu Jiren, Nancy Xu, Darko Matovski의 관점을 쉬운 말로 요약했습니다. 에이전트의 단일한 정의를 주장하는 페이지가 아닙니다.
-->

---
layout: seminar
title: "도구와 결과를 이어 주는 바깥 프로그램"
---

<h1>도구와 결과를 이어 주는 바깥 프로그램</h1>
<SeminarDiagram kind="overview" />
<p class="note">예: “로그인 테스트 실패 원인을 찾아줘” → 파일과 테스트를 살펴봄 → 결과를 모델에 돌려줌 → 수정 또는 설명</p>
<SeminarSource href="https://blog29.vercel.app/blog/ai-agent-harness" label="블로그 원문 · 모델과 도구의 왕복" page="4 / 32" />

<!--
LLM이 도구 호출을 만들고, 하네스가 호출을 확인해 등록된 도구로 전달합니다. 실행 결과가 다음 입력으로 돌아오면 모델은 추가 작업이나 종료를 선택합니다. 녹색이 아닌 전체 도식 경계에 해당하는 에이전트 정의는 넓은 설명 중 하나입니다.
-->

---
layout: seminar
title: "에이전트의 기본 구조: 감지·판단·행동"
---

<h1>에이전트의 기본 구조: 감지·판단·행동</h1>
<SeminarDiagram kind="core" />
<p class="note">환경에서 결과를 읽고, 다음 행동을 정하고, 행동의 결과를 다시 읽는 순환입니다.</p>
<SeminarSource href="https://www.weforum.org/publications/navigating-the-ai-frontier-a-primer-on-the-evolution-and-impact-of-ai-agents/" label="WEF 2024 · Figure 1, p. 7" page="5 / 32" />

<!--
WEF 2024 도식의 센서·제어센터·이펙터 구조를 바탕으로 새로 그렸습니다. 바깥 환경은 디지털일 수도 물리적일 수도 있습니다. 이번 발표에서는 뒤 장에서 이를 코딩 어시스턴트에 대응시킵니다.
-->

---
layout: seminar
title: "코딩 어시스턴트에 대입해 보면"
---

<h1>코딩 어시스턴트에 대입해 보면</h1>
<table class="compact"><thead><tr><th>에이전트 구조</th><th>코딩 어시스턴트의 예</th></tr></thead><tbody>
<tr><td>목표</td><td>“로그인 테스트가 왜 실패하는지 찾아줘”</td></tr>
<tr><td>센서</td><td>요청, 저장소 파일, 테스트의 오류 메시지</td></tr>
<tr><td>제어센터</td><td>LLM의 다음 단계 판단 + 하네스의 작업 상태·도구·권한 관리</td></tr>
<tr><td>이펙터</td><td>파일 읽기·수정, 터미널에서 테스트 실행</td></tr>
<tr><td>환경</td><td>코드 저장소, 터미널, 연결된 서비스</td></tr>
</tbody></table>
<p class="note">테스트 실패는 ‘감지’, 수정 방법 선택은 ‘판단’, 파일 수정·재실행은 ‘행동’입니다.</p>
<SeminarSource href="https://blog29.vercel.app/blog/ai-agent-harness" label="블로그 원문 · 코딩 에이전트 대응표" page="6 / 32" />

<!--
이 표는 WEF 구조를 코딩 작업에 대응시킨 설명입니다. 특정 제품의 내부 구현도를 나타내는 것은 아닙니다.
-->

---
layout: seminar
title: "소프트웨어 에이전트 안의 세 층"
---

<h1>소프트웨어 에이전트 안의 세 층</h1>
<SeminarDiagram kind="layers" />
<p class="note">앞 장의 제어센터는 주로 오케스트레이션 층과 맞닿고, LLM은 추론 층에 놓입니다. 이 층을 포함한 점선 경계 전체가 에이전트입니다.</p>
<SeminarSource href="https://reports.weforum.org/docs/WEF_AI_Agents_in_Action_Foundations_for_Evaluation_and_Governance_2025.pdf" label="WEF 2025 · Figure 2, p. 8" page="7 / 32" />

<!--
WEF 2025의 application·orchestration·reasoning 층과 MCP·A2A 연결을 바탕으로 재구성했습니다. 여기서 하네스는 오케스트레이션과 역할이 겹치지만 두 용어가 항상 같은 범위를 가리키지는 않습니다.
-->

---
layout: seminar
title: "에이전트 전체와 하네스는 같은 말이 아닙니다"
---

<h1>에이전트 전체와 하네스는 같은 말이 아닙니다</h1>
<div class="columns three divided">
<section><h2>LLM</h2><p>현재 입력에서 답변이나 다음 도구 요청을 만듭니다.</p></section>
<section><h2>하네스</h2><p>맥락 구성, 모델 호출, 도구 라우팅, 상태·승인·종료를 관리합니다.</p></section>
<section><h2>실행 환경</h2><p>파일과 명령이 실제로 작동하는 저장소·터미널·샌드박스입니다.</p></section>
</div>
<p class="statement">에이전트는 목표를 받고 이 요소들로 작업을 이어 가는 전체 시스템입니다.</p>
<SeminarSource href="https://developers.openai.com/api/docs/guides/agents-api/architecture" label="OpenAI · 에이전트 아키텍처" page="8 / 32" />

<!--
제품마다 하네스와 실행 환경을 어디까지 묶는지는 다를 수 있습니다. 세 요소를 먼저 역할로 나누면 이름 경계에 덜 헷갈립니다.
-->

---
layout: seminar
title: "하네스는 모델에 무엇을 알려 줄까요?"
---

<h1>하네스는 모델에 무엇을 알려 줄까요?</h1>
<p>도구 설명은 모델이 <b>어떤 일을 어떤 입력으로 요청할 수 있는지</b> 알려 줍니다.</p>
<div class="columns">
<section><h2>제공하는 도구 명세</h2><pre class="code" v-pre>{
  "name": "run_command",
  "description": "작업 폴더에서 명령 실행",
  "parameters": {
    "type": "object",
    "properties": {
      "command": {"type": "string"}
    },
    "required": ["command"]
  }
}</pre></section>
<section><h2>호출 전에 하네스가 관리</h2><p>현재 목표와 대화·작업 상태</p><p>등록된 도구와 입력 형식</p><p>허용된 폴더·명령과 승인 규칙</p></section>
</div>
<p class="note">도구 목록을 알려 주는 것과 실제 실행을 허용하는 것은 별도입니다.</p>
<SeminarSource href="https://qwen.readthedocs.io/en/latest/framework/function_call.html" label="Qwen · 도구 설명과 입력 형식" page="9 / 32" />

<!--
도구 명세는 단순화한 설명용 예입니다. 실제 API는 JSON Schema 등 정해진 입력 형식을 사용합니다.
-->

---
layout: seminar
title: "모델은 구조화된 호출을 돌려줍니다"
---

<h1>모델은 구조화된 호출을 돌려줍니다</h1>
<div class="columns">
<section><h2>하네스가 전달한 도구</h2><p><code>run_command</code><br>작업 폴더에서 명령 실행</p><p>입력: 실행할 명령 문자열</p></section>
<section><h2>모델이 반환한 호출 요청</h2><pre class="code" v-pre>&lt;tool_call&gt;
{"name":"run_command",
 "arguments":{"command":"pytest tests/test_login.py -q"}}
&lt;/tool_call&gt;</pre></section>
</div>
<p class="statement">이 출력은 “이 도구를 이 인자로 실행해 달라”는 요청입니다. 아직 테스트를 실행한 결과가 아닙니다.</p>
<SeminarSource href="https://qwen.readthedocs.io/en/latest/getting_started/concepts.html" label="Qwen3 · Hermes-style tool calling" page="10 / 32" />

<!--
Qwen3의 공식 문서는 tool calling에 Hermes-style 형식을 권하고 예시로 tool_call XML 태그 안에 이름과 인자 객체를 둡니다. 도구 요청을 담은 assistant 메시지에는 다른 내용이 함께 올 수도 있습니다.
-->

---
layout: seminar
title: "Qwen3 예시: 요청과 결과는 이렇게 왕복합니다"
---

<h1>Qwen3 예시: 요청과 결과는 이렇게 왕복합니다</h1>
<div class="columns">
<section><h2>① 모델 → 하네스</h2><pre class="code" v-pre>&lt;|im_start|&gt;assistant
&lt;tool_call&gt;
{"name":"run_command",
 "arguments":{"command":"pytest tests/test_login.py -q"}}
&lt;/tool_call&gt;&lt;|im_end|&gt;</pre><p>모델이 도구와 인자를 제안합니다.</p></section>
<section><h2>② 실행기 → 하네스 → 모델</h2><pre class="code" v-pre>&lt;|im_start|&gt;user
&lt;tool_response&gt;
{"exit_code":1,"stderr":"1 failed"}
&lt;/tool_response&gt;&lt;|im_end|&gt;</pre><p>하네스가 실행 결과를 다음 입력에 넣습니다.</p></section>
</div>
<p class="note">Qwen 문서의 구조를 단순화한 예입니다. 실제 실행기는 도구를 실행하고, 형식화와 전달은 템플릿·프레임워크가 맡을 수 있습니다.</p>
<SeminarSource href="https://qwen.readthedocs.io/en/latest/getting_started/concepts.html" label="Qwen3 공식 형식 · 도구 호출과 결과" page="11 / 32" />

<!--
Qwen3는 Hermes와 유사한 tool-calling 템플릿을 사용합니다. 공식 가이드는 function/tool definitions를 제공하고, 모델 출력의 호출을 애플리케이션에서 처리한 후 결과를 대화에 되돌려 넣도록 설명합니다. arguments는 객체 형식을 권하고 도구 결과는 별도 메시지로 포함합니다. 예시의 pytest 결과는 설명용 합성 값입니다.
-->

---
layout: seminar
title: "요청이 실제 실행으로 바뀌는 다섯 단계"
---

<h1>요청이 실제 실행으로 바뀌는 다섯 단계</h1>
<SeminarDiagram kind="sequence" />
<p class="note">결과가 돌아오면 모델은 추가 조사·수정·종료 중 다음 행동을 고릅니다.</p>
<SeminarSource href="https://developers.openai.com/api/docs/guides/function-calling" label="OpenAI · Function calling" page="12 / 32" />

<!--
이 슬라이드는 모델 요청과 실행을 분리합니다. 모델은 호출을 생성하고, 하네스는 형식·권한을 검사하고, 등록된 도구 구현이 실행 환경과 상호작용합니다.
-->

---
layout: seminar
title: "권한 확인과 다음 단계 선택"
---

<h1>권한 확인과 다음 단계 선택</h1>
<div class="columns divided">
<section><h2>요청은 거절되거나 보류될 수 있습니다</h2><p>읽기만 허용된 폴더 밖이면 실행을 막습니다.</p><p>외부 발송이나 배포에는 승인을 요구할 수 있습니다.</p></section>
<section><h2>결과가 다음 행동을 바꿉니다</h2><p><b>테스트 통과</b> → 변경을 확인하고 종료</p><p><b>테스트 실패</b> → 오류를 읽고 조사·수정·재실행</p></section>
</div>
<p class="statement">고정 순서로 실행하는 것은 워크플로, 결과에 따라 모델이 경로를 선택하는 것은 에이전트 방식에 가깝습니다.</p>
<SeminarSource href="https://www.anthropic.com/engineering/building-effective-agents" label="Anthropic · 워크플로와 에이전트" page="13 / 32" />

<!--
워크플로와 에이전트는 완전히 배타적인 종류라기보다 설계 방식의 차이로 보는 것이 안전합니다. 에이전트도 승인과 종료 조건에 묶일 수 있습니다.
-->

---
layout: seminar
title: "예제로 볼 문제: 할인과 세금 계산"
---

<h1>예제로 볼 문제: 할인과 세금 계산</h1>
<p class="lead">10,000원짜리 상품에 10% 할인을 적용하고,<br>할인된 금액에 10% 세금을 붙입니다.</p>
<div class="formula">10,000 × (1 − 0.10) × (1 + 0.10) = <b>9,900원</b></div>
<div class="columns"><section><h2>요구한 순서</h2><p>① 할인: 10,000 → 9,000원</p><p>② 세금: 9,000 → 9,900원</p></section><section><h2>테스트가 확인할 답</h2><p class="big-number">9,900원</p></section></div>
<SeminarSource href="https://blog29.vercel.app/blog/ai-agent-harness" label="블로그 원문 · 실행 예제" page="14 / 32" />

<!--
이 작은 Python 예제는 설명을 위해 오류를 일부러 넣은 합성 사례입니다.
-->

---
layout: seminar
title: "처음 코드가 왜 틀렸을까요?"
---

<h1>처음 코드가 왜 틀렸을까요?</h1>
<div class="columns divided">
<section><h2>잘못된 계산</h2><pre class="code" v-pre>세금: 10,000 × 10% = 1,000
할인: 10,000 × 10% = 1,000
결과: 10,000 + 1,000 − 1,000
     = 10,000원</pre></section>
<section><h2>기대하는 계산</h2><pre class="code" v-pre>할인 후 가격: 10,000 − 1,000 = 9,000
세금: 9,000 × 10% = 900
결과: 9,000 + 900 = 9,900원</pre></section>
</div>
<p class="note">할인과 세금의 순서가 다르면 결과도 달라집니다. 테스트가 잘못된 계산을 찾아냅니다.</p>
<SeminarSource href="https://blog29.vercel.app/blog/ai-agent-harness" label="블로그 원문 · 실패 원인" page="15 / 32" />

<!--
할인 전 금액에 세금을 계산해 10,000원을 반환하는 초기 함수와 9,900원이라는 테스트 기대값의 차이를 풀어 썼습니다.
-->

---
layout: seminar
title: "실행 기록: 파일 확인 → 실패 → 수정 → 재검증"
---

<h1>실행 기록: 파일 확인 → 실패 → 수정 → 재검증</h1>
<RecordedTrace />
<p class="small">실행 기록의 명령과 결과를 발췌해 재생합니다. 특정 모델 API의 원본 대화 전체는 아닙니다.</p>
<SeminarSource href="https://github.com/riesling-29/Seminars/tree/main/ai-agent-harness-seminar/demos/edge-build-agent/example" label="합성 예제 · 재현 코드" page="16 / 32" />

<!--
예제 작업 폴더에서 실행한 합성 기록을 재생합니다. 요청·도구 출력·수정 및 테스트 재실행을 확인할 수 있습니다. 성공은 두 개의 작은 테스트 범위에 한정됩니다.
-->

---
layout: seminar
title: "이 예제에서 누가 무엇을 했나요?"
---

<h1>이 예제에서 누가 무엇을 했나요?</h1>
<table><thead><tr><th>역할</th><th>예제에서 한 일</th></tr></thead><tbody>
<tr><td>LLM</td><td>테스트 실패를 읽고 계산식 수정·재실행 요청을 선택</td></tr>
<tr><td>하네스</td><td>요청·도구·작업 상태를 연결하고 결과를 다시 전달</td></tr>
<tr><td>파일·명령 도구</td><td>코드 파일 수정, 테스트 프로세스 실행</td></tr>
<tr><td>사람</td><td>목표와 허용 범위를 정하고 변경·테스트 범위를 확인</td></tr>
</tbody></table>
<p class="statement">모델이 코드를 ‘직접 손으로’ 바꾼 것이 아니라, 변경 도구를 요청하고 결과를 읽었습니다.</p>
<SeminarSource href="https://blog29.vercel.app/blog/ai-agent-harness" label="블로그 원문 · 실행 주체 구분" page="17 / 32" />

<!--
기능 분담을 설명하기 위한 예제의 추상화입니다. 실제 제품에 따라 하네스 내부와 실행기의 경계는 다르게 나뉠 수 있습니다.
-->

---
layout: seminar
title: "공개 API의 도구 왕복: 누가 호출하고, 누가 실행하나"
---

<h1>공개 API의 도구 왕복: 누가 호출하고, 누가 실행하나</h1>
<div class="columns">
<section><h2>OpenAI Responses API</h2><p>① <b>모델이 반환</b>: function_call</p><pre class="code" v-pre>{"type":"function_call",
 "call_id":"call_123",
 "name":"run_command",
 "arguments":"{"command":"npm test"}"}</pre><p>② <b>앱이 실행 후 반환</b>: function_call_output + 같은 call_id</p></section>
<section><h2>Claude Messages API</h2><p>① <b>모델이 반환</b>: tool_use</p><pre class="code" v-pre>{"type":"tool_use",
 "id":"toolu_123",
 "name":"run_command",
 "input":{"command":"npm test"}}</pre><p>② <b>앱이 실행 후 반환</b>: tool_result + tool_use_id</p></section>
</div>
<p class="note">두 API 모두 모델이 요청하고, 애플리케이션이 실행한 뒤 결과를 연결해 돌려줍니다.</p>
<SeminarSource href="https://developers.openai.com/api/docs/guides/function-calling" label="OpenAI Function Calling · Anthropic tool use" page="18 / 32" />

<!--
예시는 각 공개 API의 구조를 간략히 보여 줍니다. 필드·응답 envelope는 API마다 다르며, Claude Code 제품의 내부 wire format을 뜻하지 않습니다.
-->

---
layout: seminar
title: "API 표현은 달라도 실행 구조는 같습니다"
---

<h1>API 표현은 달라도 실행 구조는 같습니다</h1>
<table class="compact"><thead><tr><th>순서</th><th>OpenAI Responses</th><th>Claude Messages</th></tr></thead><tbody>
<tr><td>모델 → 앱</td><td><code>function_call</code>, <code>call_id</code>, 이름, 인자</td><td><code>tool_use</code>, <code>id</code>, 이름, input</td></tr>
<tr><td>앱 동작</td><td colspan="2">이름으로 도구 구현을 찾아 입력을 전달하고 실행</td></tr>
<tr><td>앱 → 모델</td><td><code>function_call_output</code>, 같은 call_id</td><td><code>tool_result</code>, 원래 tool_use_id</td></tr>
<tr><td>다음 단계</td><td colspan="2">모델이 결과를 읽고 다음 요청 또는 답변을 생성</td></tr>
</tbody></table>
<p class="statement">호출 요청과 실행 결과를 같은 짝으로 연결하는 것이 왕복의 핵심입니다.</p>
<SeminarSource href="https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview" label="Anthropic · tool_use / tool_result" page="19 / 32" />

<!--
상세 필드 이름은 각 공식 API 문서를 따릅니다. 모든 제품이 공유하는 하나의 표준 메시지 형식은 없습니다.
-->

---
layout: seminar
title: "에이전트·하네스·실행 환경을 역할로 구분하기"
---

<h1>에이전트·하네스·실행 환경을 역할로 구분하기</h1>
<div class="columns divided">
<section><h2>일을 이어 가는 전체</h2><p><b>에이전트</b><br>목표를 받고 읽기 → 수정 → 테스트 → 보고를 이어 가는 시스템</p></section>
<section><h2>그 안의 운영과 실제 실행</h2><p><b>하네스</b>: 맥락·도구·상태·권한·종료를 관리</p><p><b>실행 환경</b>: 파일·명령이 실제로 작동하는 공간</p></section>
</div>
<p class="note">“누가 다음 행동을 고르나? 누가 허용하나? 누가 실행하나?”를 물으면 경계가 선명해집니다.</p>
<SeminarSource href="https://developers.openai.com/api/docs/guides/agents-api/architecture" label="OpenAI · 하네스와 실행 환경" page="20 / 32" />

<!--
에이전트는 전체 시스템, 하네스는 운영 구조를 의미하는 경우가 많습니다. 그러나 제품과 문헌에 따라 경계가 다르므로 정의를 먼저 확인해야 합니다.
-->

---
layout: seminar
title: "같은 모델도 연결된 권한에 따라 달라집니다"
---

<h1>같은 모델도 연결된 권한에 따라 달라집니다</h1>
<div class="columns divided">
<section><h2>저장소 읽기만 가능</h2><p>파일과 오류를 찾아 원인·수정안을 설명합니다.</p><p>실제 수정과 테스트는 사람이 합니다.</p></section>
<section><h2>특정 저장소 수정·테스트 허용</h2><p>수정과 테스트를 실행하고 결과를 반영해 다음 단계를 선택합니다.</p><p>커밋·배포는 별도 승인으로 남길 수 있습니다.</p></section>
</div>
<p class="note">결과 차이를 볼 때는 모델뿐 아니라 도구 설명·자료·권한·과제·사람의 개입도 비교해야 합니다.</p>
<SeminarSource href="https://www.anthropic.com/engineering/building-effective-agents" label="Anthropic · 도구와 에이전트 설계" page="21 / 32" />

<!--
동일 조건의 실험 결과를 주장하는 장이 아니라, 작업 경로가 권한과 도구에서 달라질 수 있음을 설명하는 사고 실험입니다.
-->

---
layout: seminar
title: "자율성과 권한은 서로 다른 축입니다"
---

<h1>자율성과 권한은 서로 다른 축입니다</h1>
<table class="compact"><thead><tr><th>과제</th><th>스스로 고르는 정도</th><th>실행 권한</th><th>사람이 확인할 점</th></tr></thead><tbody>
<tr><td>문서 요약</td><td>여러 문서를 탐색</td><td>읽기만 허용</td><td>인용·해석 확인</td></tr>
<tr><td>버그 수정</td><td>오류별 수정 경로 선택</td><td>특정 저장소 수정·테스트</td><td>변경·테스트 검토</td></tr>
<tr><td>고객 답장</td><td>근거와 초안 구성</td><td>발송은 보류</td><td>외부 발송 승인</td></tr>
</tbody></table>
<p class="note">다음 단계를 스스로 고르는 능력이 커도, 외부로 실행할 권한은 제한할 수 있습니다.</p>
<SeminarSource href="https://reports.weforum.org/docs/WEF_AI_Agents_in_Action_Foundations_for_Evaluation_and_Governance_2025.pdf" label="WEF 2025 · 자율성·권한" page="22 / 32" />

<!--
표의 설정은 블로그에 제시된 설계 예시이며 특정 제품의 기본 권한을 설명하지 않습니다.
-->

---
layout: seminar
title: "평가 전에 에이전트의 과제와 환경을 분류합니다"
---

<h1>평가 전에 에이전트의 과제와 환경을 분류합니다</h1>
<div class="columns divided">
<section><h2>에이전트 특성</h2><p><b>기능</b> 무엇을 수행하나?<br><b>역할</b> 어떤 책임을 맡나?<br><b>예측 가능성</b> 행동을 얼마나 예상할 수 있나?<br><b>자율성</b> 다음 단계를 얼마나 스스로 고르나?<br><b>권한</b> 어디까지 실행할 수 있나?</p></section>
<section><h2>사용 맥락</h2><p><b>쓰임새</b><br>어떤 과제에 사용하나?</p><p><b>운영 환경</b><br>어떤 데이터·서비스·시스템과 연결되나?</p></section>
</div>
<p class="note">같은 모델이어도 과제와 연결 환경이 다르면 적절한 평가 기준이 달라집니다.</p>
<SeminarSource href="https://reports.weforum.org/docs/WEF_AI_Agents_in_Action_Foundations_for_Evaluation_and_Governance_2025.pdf" label="WEF 2025 · 분류 틀" page="23 / 32" />

<!--
WEF 2025가 제안하는 다섯 에이전트 특성과 두 맥락 축을 쉬운 질문으로 바꿨습니다.
-->

---
layout: seminar
title: "분류에서 평가·위험·거버넌스로"
---

<h1>분류에서 평가·위험·거버넌스로</h1>
<div class="timeline">
<div><h3>분류</h3><p>무엇을 어떤 환경에서 하는지 정리</p></div>
<div><h3>평가</h3><p>성공률·완료 시간·도구 호출 성공·예외 상황 확인</p></div>
<div><h3>위험 평가</h3><p>실패·오용 가능성과 피해 범위 점검</p></div>
<div><h3>거버넌스</h3><p>접근 통제·사람의 감독·기록·모니터링 결정</p></div>
</div>
<p class="note">답변 정확도뿐 아니라 실제 도구 사용과 실패 상황에서의 행동도 평가합니다.</p>
<SeminarSource href="https://reports.weforum.org/docs/WEF_AI_Agents_in_Action_Foundations_for_Evaluation_and_Governance_2025.pdf" label="WEF 2025 · 평가·위험 평가·거버넌스" page="24 / 32" />

<!--
슬라이드는 WEF 제안 흐름을 요약합니다. 이 발표는 어떤 실제 제품의 성능 수치도 측정하지 않습니다.
-->

---
layout: seminar
title: "코드 작업용 에이전트 예시"
---

<h1>코드 작업용 에이전트 예시</h1>
<table><thead><tr><th>제품</th><th>블로그에서 설명한 주요 맥락</th></tr></thead><tbody>
<tr><td>Claude Code</td><td>저장소를 읽고 수정하며 명령을 실행하는 코딩 에이전트</td></tr>
<tr><td>Codex</td><td>파일을 읽고 고치고 실행하며, CLI는 로컬 저장소와 도구를 사용</td></tr>
<tr><td>OpenCode</td><td>모델·도구 접근을 설정하고 작업용·계획용 에이전트를 구성</td></tr>
</tbody></table>
<p class="note">제품별 지원 기능은 변할 수 있습니다. 이 표는 2026년 9월 23일 공식 자료를 확인한 개요이며 성능 순위가 아닙니다.</p>
<SeminarSource href="https://code.claude.com/docs/en/overview" label="공식 문서 · Claude Code · Codex CLI · OpenCode" page="25 / 32" />

<!--
공식 문서 확인 날짜를 표기해 시간 민감성을 드러냅니다. 발표 전 기능 변화가 있다면 확인 날짜와 표 내용을 함께 갱신해야 합니다.
-->

---
layout: seminar
title: "확장과 메시징 연결을 다루는 프로젝트"
---

<h1>확장과 메시징 연결을 다루는 프로젝트</h1>
<table class="compact"><thead><tr><th>프로젝트</th><th>주요 역할</th></tr></thead><tbody>
<tr><td>Pi</td><td>작은 터미널 하네스에 확장·스킬을 더하는 방식</td></tr>
<tr><td>Oh My Pi</td><td>Pi와 별개로 개발되는 코딩 에이전트, LSP·디버거 통합</td></tr>
<tr><td>Hermes Agent</td><td>터미널 에이전트, 세션 간 메모리·스킬·메시징 연결</td></tr>
<tr><td>OpenClaw</td><td>메시지 앱을 세션·도구·자동화에 연결하는 게이트웨이</td></tr>
</tbody></table>
<p class="note">Hermes Agent는 에이전트 프로젝트입니다. Hermes 언어 모델과 이름을 구분하고, Pi와 Oh My Pi도 별도 프로젝트로 봅니다.</p>
<SeminarSource href="https://hermes-agent.nousresearch.com/docs/" label="공식 프로젝트 문서 · Pi · Oh My Pi · Hermes Agent · OpenClaw" page="26 / 32" />

<!--
블로그가 2026-09-23 확인한 공식 자료 기준입니다. 로컬 모델을 연결해도 검색·외부 API·메시징 도구의 데이터 흐름은 별도로 확인해야 합니다.
-->

---
layout: seminar
title: "MCP·스킬·메모리는 서로 다른 층입니다"
---

<h1>MCP·스킬·메모리는 서로 다른 층입니다</h1>
<table><thead><tr><th>구성</th><th>무엇을 제공하나?</th><th>쉬운 예</th></tr></thead><tbody>
<tr><td>MCP</td><td>앱이 외부 도구·자료와 연결되는 프로토콜</td><td>검색 서버의 자료 조회 기능</td></tr>
<tr><td>스킬</td><td>업무 절차와 참고 자료</td><td>문서 비교 시 확인할 단계</td></tr>
<tr><td>메모리</td><td>다음 세션에서 다시 쓸 기록</td><td>사용자가 정한 출력 선호</td></tr>
</tbody></table>
<p class="note">지침을 기록하는 것만으로 도구 권한이 생기지 않고, 저장된 기억도 모델 입력에 포함되어야 판단에 쓰입니다.</p>
<SeminarSource href="https://modelcontextprotocol.io/specification/2025-11-25/architecture" label="MCP 사양 · Pi Skills · Hermes Memory" page="27 / 32" />

<!--
MCP는 에이전트나 모델 자체가 아닙니다. 스킬에 실행 코드가 포함된 제품에서는 설명 문서와 실제 권한을 구분해 살펴봐야 합니다. 메모리는 토큰 계산을 재사용하는 KV Cache와 다릅니다.
-->

---
layout: seminar
title: "작은 실제 과제부터 맡기고 기록을 봅니다"
---

<h1>작은 실제 과제부터 맡기고 기록을 봅니다</h1>
<blockquote class="quote">“이 저장소의 로그인 테스트가 왜 실패하는지 찾아 주세요.<br>외부 전송이나 배포는 하지 말아 주세요.”</blockquote>
<div class="columns divided">
<section><h2>진행 중</h2><p>요청한 도구와 실제 허용 범위<br>테스트 결과와 다음 선택</p></section>
<section><h2>완료 후</h2><p>변경된 파일과 테스트 범위<br>해결되지 않은 문제</p></section>
</div>
<SeminarSource href="https://blog29.vercel.app/blog/ai-agent-harness" label="블로그 원문 · 실제 과제" page="28 / 32" />

<!--
작은 범위를 지정하면 모델 요청, 하네스 승인, 도구 결과의 왕복을 추적하기 쉽습니다. 실제 사용 시에는 조직 정책과 적절한 테스트 환경을 따라야 합니다.
-->

---
layout: seminar
title: "문서·데이터 작업에는 더 단순한 방법도 있습니다"
---

<h1>문서·데이터 작업에는 더 단순한 방법도 있습니다</h1>
<table class="compact"><thead><tr><th>상황</th><th>먼저 고려할 방식</th><th>확인할 결과</th></tr></thead><tbody>
<tr><td>문서 한 번 비교</td><td>모델 한 번 호출</td><td>근거 링크·원문과 해석의 일치</td></tr>
<tr><td>정해진 반복 처리</td><td>스크립트·고정 워크플로</td><td>검사 결과와 재현성</td></tr>
<tr><td>결과에 따라 다음 단계가 달라짐</td><td>도구를 연결한 에이전트</td><td>도구 사용·예외 대응·변경 내역</td></tr>
</tbody></table>
<p class="note">외부 발송·결제·운영 배포는 별도 승인 경계를 둡니다. 기존 방식이 충분하면 유지할 수도 있습니다.</p>
<SeminarSource href="https://www.anthropic.com/engineering/building-effective-agents" label="Anthropic · Building effective agents" page="29 / 32" />

<!--
Anthropic 글은 단순한 방식으로 해결되는지 먼저 살펴볼 것을 권합니다. 여기서는 에이전트 도입을 기본값으로 두지 않습니다.
-->

---
layout: seminar
title: "이 블로그 글은 이렇게 쓰였습니다"
---

<h1>이 블로그 글은 이렇게 쓰였습니다</h1>
<SeminarDiagram kind="writing" />
<p class="small">두 경로 모두 변경을 검토하고 커밋한 다음, 배포 결과와 실제 페이지를 확인합니다.</p>
<SeminarSource href="https://blog29.vercel.app/blog/ai-agent-harness" label="블로그 원문 · 작성 과정" page="30 / 32" />

<!--
사용자가 설명한 글 작성 경로를 간단히 나타냈습니다. GitHub 연결에서 대상 저장소와 쓰기 권한을 확인하고, Vercel에서는 저장소·빌드 설정·배포 브랜치를 확인해야 합니다.
-->

---
layout: seminar
title: "정리: 도구 요청이 작업이 되기까지"
---

<h1>정리: 도구 요청이 작업이 되기까지</h1>
<p class="lead">목표 → 도구 요청 → 권한 확인 → 실행 결과 → 다음 판단</p>
<div class="columns divided">
<section><h2>구조를 읽는 질문</h2><p>누가 다음 요청을 만들었나?<br>누가 실행을 허용했나?<br>누가 파일·명령을 실제로 다뤘나?</p></section>
<section><h2>결과를 검토하는 질문</h2><p>무엇이 바뀌었나?<br>어떤 테스트 범위가 통과했나?<br>언제 사람의 확인이 필요한가?</p></section>
</div>
<p class="note">LLM·하네스·실행 환경을 나누어 보면 제품 이름 뒤의 작동 방식을 이해할 수 있습니다.</p>
<SeminarSource label="AI 에이전트와 하네스 세미나" page="31 / 32" />

<!--
결론의 근거는 앞의 호출·실행 왕복과 코드 예제입니다. 반증 조건은 실제 구현에서 요청·승인·실행의 역할이 어떻게 나뉘는지를 확인하는 것입니다. 제품 구조는 바뀔 수 있으므로 개별 제품 설명은 확인 날짜를 함께 봅니다.
-->

---
layout: seminar
title: "참고 자료"
---

<h1>참고 자료</h1>
<div class="references">
<p><a href="https://blog29.vercel.app/blog/ai-agent-harness" target="_blank">블로그 원문</a><small>AI 에이전트와 하네스</small></p>
<p><a href="https://qwen.readthedocs.io/en/latest/getting_started/concepts.html" target="_blank">Qwen3 Key Concepts</a><small>Hermes-style tool calling</small></p>
<p><a href="https://qwen.readthedocs.io/en/latest/framework/function_call.html" target="_blank">Qwen Function Calling</a><small>도구 설명·호출·결과 처리</small></p>
<p><a href="https://www.weforum.org/publications/navigating-the-ai-frontier-a-primer-on-the-evolution-and-impact-of-ai-agents/" target="_blank">WEF 2024</a><small>에이전트 구조</small></p>
<p><a href="https://reports.weforum.org/docs/WEF_AI_Agents_in_Action_Foundations_for_Evaluation_and_Governance_2025.pdf" target="_blank">WEF 2025</a><small>소프트웨어 층·평가·거버넌스</small></p>
<p><a href="https://developers.openai.com/api/docs/guides/function-calling" target="_blank">OpenAI</a><small>Function calling</small></p>
<p><a href="https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview" target="_blank">Anthropic</a><small>Tool use</small></p>
<p><a href="https://www.anthropic.com/engineering/building-effective-agents" target="_blank">Building effective agents</a><small>워크플로와 에이전트</small></p>
</div>
<p class="small">제품 개요의 공식 문서 확인일: 2026년 9월 23일</p>
<SeminarSource label="AI 에이전트와 하네스 세미나" page="32 / 32" />

<!--
상세 제품별 공식 링크는 블로그 원문과 발표자 노트의 출처를 확인합니다.
-->