---
theme: default
title: "상시 작업 에이전트: 채팅 턴에서 지속되는 작업으로"
author: ""
layout: deck
class: cover
section: "Engineering Seminar · 2026-09"
info: "Meta Muse, xAI Grok Bot, Manus Cloud Computer와 미확인 OpenAI Aeon/o 보도를 공개 자료 기준으로 비교합니다."
colorSchema: dark
favicon: /favicon.svg
fonts:
  provider: none
transition: none
aspectRatio: 16/9
canvasWidth: 1280
routerMode: hash
drawings:
  persist: false
mdc: true
---

<h1>채팅이 끝나도<br><span class="accent">일은 계속된다</span></h1>
<p class="lead">상시 작업(Persistent Work) 에이전트 비교 —<br>클라우드 컴퓨터, 백그라운드 작업, 승인 구조를 중심으로</p>
<div class="chips">
<span class="chip" data-p="muse">Meta Muse</span>
<span class="chip" data-p="grok">xAI Grok Bot</span>
<span class="chip" data-p="manus">Manus Cloud Computer</span>
<span class="chip dashed" data-p="aeon">OpenAI Aeon / “o” · 미확인</span>
</div>

<!--
이 발표는 2026-09-29 기준 공개 자료만 사용한다.
성능, 사용자 수, 순위 같은 수치는 공식 자료에 없으므로 다루지 않는다.
OpenAI의 Aeon / "o"는 공식 발표가 없는 보도 수준 정보이며 가설로만 다룬다.
-->

---
layout: deck
section: "Agenda"
---

<h1>오늘 다룰 세 가지</h1>
<div class="agenda">
<div class="card" data-p="muse">
<div class="num">01</div>
<h2>개요: 무엇이 바뀌었나</h2>
<p>채팅 턴 단위 에이전트에서 계속 살아 있는 작업 단위 에이전트로. 컴퓨터·백그라운드·승인.</p>
</div>
<div class="card" data-p="grok">
<div class="num">02</div>
<h2>제품별 특징과 장단점</h2>
<p>Muse · Grok Bot · Manus · Aeon(미확인). 비교 매트릭스와 격리 모델.</p>
</div>
<div class="card" data-p="manus">
<div class="num">03</div>
<h2>가까운 추세</h2>
<p>공식 자료에서 관찰되는 방향과, 그 위에 세운 가설을 분리해서 봅니다.</p>
</div>
</div>
<div class="legend">
<div><Ev kind="fact" /><span>공식 발표·문서에 적힌 내용. 출처를 하단에 표기.</span></div>
<div><Ev kind="hypothesis" /><span>보도·유출 또는 발표자의 해석. 확인되지 않음.</span></div>
<div><Ev kind="unavailable" /><span>공식 자료가 존재하지 않거나 공개되지 않음.</span></div>
</div>

<!--
모든 슬라이드에서 세 가지 라벨을 구분한다. 라벨이 없는 서술은 발표자의 요약이다.
-->

---
layout: deck
class: section
section: "Part 1 · Overview"
---

<div class="sec-num">01</div>
<h1>채팅 턴에서 지속 작업으로</h1>
<p class="lead">에이전트가 “대답하는 창”이 아니라 “계속 일하는 컴퓨터 위의 동료”로 설계되기 시작했습니다.</p>

---
layout: deck
section: "Part 1 · Overview"
sources:
  - name: "xAI · Designing Grok Bot"
    url: "https://x.ai/news/designing-grok-bot"
  - name: "Manus · Cloud Computer"
    url: "https://manus.im/blog/manus-cloud-computer"
---

<div class="title-row"><h1>작업의 단위가 “세션”에서 “에이전트”로</h1><Ev kind="fact" note="설계 문서 인용 기반" /></div>
<div class="vs">
<div class="lane">
<div class="lane-title">채팅 턴 에이전트</div>
<div class="step"><i>01</i>사용자가 프롬프트로 세션을 시작</div>
<div class="step"><i>02</i>임시 환경에서 도구 실행, 사용자가 지켜봄</div>
<div class="step"><i>03</i>답변 반환</div>
<div class="step end"><i>✕</i>대화가 멈추면 작업·환경도 끝남</div>
</div>
<div class="arrow">→</div>
<div class="lane" data-p="grok" style="--accent: var(--grok)">
<div class="lane-title">상시 작업 에이전트</div>
<div class="step"><i>01</i>프롬프트 · 일정 · 이벤트 · 다른 에이전트가 작업을 시작</div>
<div class="step"><i>02</i>지속되는 클라우드 컴퓨터에서 파일·브라우저·로그인 유지</div>
<div class="step gate"><i>!</i>민감 단계에서 사용자 승인·인계 요청</div>
<div class="step"><i>∞</i>앱·노트북을 닫아도 계속, 결과를 다음 작업에 이어 씀</div>
</div>
</div>
<p class="note push">xAI: “Most AI interfaces are organized around a chat session… ends when the conversation stops.” / “A prompt can start a session, but so can a schedule, an event, or another Bot.”<br>Manus: “Every regular Manus chat starts from a blank slate… A Cloud Computer works more like your own laptop.”</p>

<!--
좌측은 공식 자료가 대비 대상으로 설명한 기존 채팅 세션 구조, 우측은 각 제품 문서에 공통으로 나타나는 요소를 요약한 것이다.
"모든 제품이 이 구조"라는 일반화가 아니라 세 제품의 공통 서술을 정리한 것이다.
-->

---
layout: deck
section: "Part 1 · Overview"
sources:
  - name: "Meta · Introducing Muse"
    url: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/"
  - name: "xAI Docs · Computer and apps"
    url: "https://docs.x.ai/grok-bot/computer-and-apps"
  - name: "Manus Help · Cloud Computer"
    url: "https://help.manus.im/en/articles/15392111-what-is-the-cloud-computer"
---

<div class="title-row"><h1>상시 작업 에이전트의 세 기둥</h1><Ev kind="fact" /></div>
<div class="g3">
<div class="card pillar" data-p="muse">
<span class="tag">① Computer</span>
<div class="big">에이전트 전용 클라우드 컴퓨터</div>
<div class="quote-line" style="--accent: var(--muse)"><b>Muse</b>사람마다 전용 Secure VM, 자체 브라우저</div>
<div class="quote-line" style="--accent: var(--grok)"><b>Grok Bot</b>계정 단위 지속 컴퓨터: 브라우저·파일·터미널</div>
<div class="quote-line" style="--accent: var(--manus)"><b>Manus</b>항상 켜진 Ubuntu VM (CLI 전용)</div>
</div>
<div class="card pillar" data-p="grok">
<span class="tag">② Background</span>
<div class="big">사용자가 떠나도 이어지는 작업</div>
<div class="quote-line" style="--accent: var(--muse)"><b>Muse</b>앱을 닫아도 계속, 변화나 승인 필요 시 복귀</div>
<div class="quote-line" style="--accent: var(--grok)"><b>Grok Bot</b>노트북을 닫아도 백그라운드 턴·Routine 유지</div>
<div class="quote-line" style="--accent: var(--manus)"><b>Manus</b>24/7 봇, 예약 스크래퍼, 상시 DB</div>
</div>
<div class="card pillar" data-p="hyp">
<span class="tag">③ Approval</span>
<div class="big">민감 행동 전 사람에게 되묻기</div>
<div class="quote-line" style="--accent: var(--muse)"><b>Muse</b>이메일 전송·구매 전 확인, 감사 기록</div>
<div class="quote-line" style="--accent: var(--grok)"><b>Grok Bot</b>비밀번호·2FA·결제 단계는 사용자 인계</div>
<div class="quote-line" style="--accent: var(--manus)"><b>Manus</b>세션 권한은 마지막 메시지 발신자 기준</div>
</div>
</div>
<p class="note push">각 줄은 해당 제품 공식 문서의 서술을 짧게 옮긴 것입니다. 세 기둥이라는 분류 자체는 이 발표의 정리 방식입니다.</p>

<!--
Muse: "Muse keeps working after people close the app, and comes back when something changes or when it needs approval, like before it sends an email or makes a purchase."
Grok Bot: "Closing the Grok Bot app or your laptop does not stop cloud work." Takeover 대상: password/passkey, 2FA, CAPTCHA, payment/identity check.
Manus: FAQ "Permissions are based on who sent the last message in a session."
-->

---
layout: deck
class: section
section: "Part 2 · Products"
---

<div class="sec-num">02</div>
<h1>제품별 특징과 장단점</h1>
<p class="lead">같은 “상시 작업”이라도 컴퓨터를 누구와 공유하는지, 무엇이 작업을 깨우는지가 다릅니다.</p>
<div class="chips">
<span class="chip" data-p="muse">Muse</span>
<span class="chip" data-p="grok">Grok Bot</span>
<span class="chip" data-p="manus">Manus</span>
<span class="chip dashed" data-p="aeon">Aeon / “o”</span>
</div>

---
layout: deck
section: "Part 2 · Meta Muse"
sources:
  - name: "Meta Newsroom · Introducing Muse (2026-09-08)"
    url: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/"
  - name: "Meta AI · Muse"
    url: "https://ai.meta.com/muse/"
---

<div class="product-head" data-p="muse"><span class="logo-dot">M</span><h1>Meta Muse — 개인용 에이전트</h1><Ev kind="fact" /></div>
<div class="product" data-p="muse">
<div class="facts">
<div class="fact"><b>지속 모델</b><span>앱을 닫아도 작업 지속, 변화·승인 필요 시 복귀</span></div>
<div class="fact"><b>컴퓨터</b><span><strong>Muse Secure VM</strong>: 사람마다 전용 클라우드 VM, 자체 브라우저. 데이터·자격 증명 보관</span></div>
<div class="fact"><b>가드</b><span><strong>Sentinel</strong> 에이전트가 같은 VM에서 시스템 수준으로 분리, 외부 통신 승인</span></div>
<div class="fact"><b>승인</b><span>이메일 전송·구매 전 확인, 수행·예정 작업의 감사 기록</span></div>
<div class="fact"><b>채널</b><span>Muse 앱(iOS·Android)·muse.ai·WhatsApp, AI 안경은 예정</span></div>
<div class="fact"><b>출시</b><span>미국 순차 출시, 무료(사용량 제한) + 유료 구독</span></div>
</div>
<div class="pc">
<div class="pc-box pro"><h3>Pros</h3><ul>
<li>사람 단위 전용 VM과 별도 Sentinel로 격리 경계가 명확</li>
<li>에이전트가 비밀번호·결제 수단을 보지 않도록 보안 저장소 사용</li>
<li>메신저 대화 방식이라 사용 진입 장벽이 낮음</li>
</ul></div>
<div class="pc-box con"><h3>Cons / 한계</h3><ul>
<li>출시 지역이 미국으로 한정</li>
<li>사용자만 키를 가진 Confidential VM은 “올해 후반” 예정 — 아직 아님</li>
<li>여러 에이전트 협업 모델은 발표문에 설명 없음<Ev kind="unavailable" /></li>
<li>잦은 승인 요청이 체감 마찰이 될 수 있음<Ev kind="hypothesis" /></li>
</ul></div>
</div>
</div>

<!--
원문: "Muse runs on its own dedicated computer in the cloud, contained so no one else's agent can reach it."
"A separate Sentinel agent runs on that same machine, kept apart from Muse at the system level. Nothing Muse does reaches the internet unless the Sentinel approves it."
"Later this year, Meta will introduce Muse Confidential VM..."
결제: Link built by Stripe, 일회용 카드. Shop Pay·1Password 지원은 예정(coming soon).
모델: Muse Spark. 성능 수치는 발표문에 없으므로 언급하지 않는다.
-->

---
layout: deck
section: "Part 2 · xAI Grok Bot"
sources:
  - name: "xAI Docs · Grok Bot overview"
    url: "https://docs.x.ai/grok-bot/overview"
  - name: "xAI Docs · Computer and apps"
    url: "https://docs.x.ai/grok-bot/computer-and-apps"
  - name: "xAI · Designing Grok Bot"
    url: "https://x.ai/news/designing-grok-bot"
---

<div class="product-head" data-p="grok"><span class="logo-dot">G</span><h1>xAI Grok Bot — 이름 있는 Bot 팀</h1><Ev kind="fact" /></div>
<div class="product" data-p="grok">
<div class="facts">
<div class="fact"><b>지속 모델</b><span>이름·역할·메모리를 가진 Bot 명단(roster). 대화 목록이 아닌 Bot이 주 객체</span></div>
<div class="fact"><b>컴퓨터</b><span>계정 단위 <strong>공유</strong> 지속 컴퓨터: 파일·브라우저 세션·CLI 자격 증명을 모든 Bot이 공유</span></div>
<div class="fact"><b>트리거</b><span><strong>Routine</strong>: 일정·이벤트(이슈, PR, 메시지, webhook 등)로 Bot을 깨움</span></div>
<div class="fact"><b>재사용</b><span>시연한 경로를 <strong>Skill</strong>로 저장, 일정 실행. 역할별 use case·스타터 프롬프트 문서</span></div>
<div class="fact"><b>협업</b><span>Bot 간 메시지·그룹 채팅·작업 소유권 이전</span></div>
<div class="fact"><b>채널</b><span>macOS·Windows·Linux 데스크톱, iOS·Android 앱</span></div>
</div>
<div class="pc">
<div class="pc-box pro"><h3>Pros</h3><ul>
<li>공유 컴퓨터 덕분에 Bot 간 인계 시 재설정이 필요 없음</li>
<li>Routine으로 프롬프트 없이 시작되는 작업을 1급 기능으로 제공</li>
<li>Status → Preview → Takeover 3단계로 개입 수준을 선택</li>
</ul></div>
<div class="pc-box con"><h3>Cons / 한계</h3><ul>
<li>Bot별 화면은 “보안 경계가 아님” — 자격 증명이 계정 내 모든 Bot에 노출</li>
<li>계정당 약 50 Bot, 그룹 채팅당 6 Bot의 실무 한도</li>
<li>사이트의 자동화 차단·세션 만료 시 사람이 처리해야 함</li>
</ul></div>
</div>
</div>

<!--
문서: "The computer is assigned to your user account, not an individual Bot. Do not place a credential or file on it if another Bot on your account should not be able to use it."
"The screens are separate work surfaces, not separate security boundaries."
"one Bot can run only one computer-use task on its screen at a time."
설계 글: "practical limits of roughly 50 Bots per account and six per group chat."
Tools·Skills는 계정 수준, Memory·Routine은 Bot 수준(설계 글).
과금: 문서 기준 유료 Cursor 개인 플랜·Teams 플랜에 포함, 또는 SuperGrok 구독 연결. 주간 사용량 리셋. 문서에 "The computers Bots work on run in Cursor's cloud"라고 적혀 있다.
-->

---
layout: deck
section: "Part 2 · Manus"
sources:
  - name: "Manus Blog · Introducing Cloud Computer"
    url: "https://manus.im/blog/manus-cloud-computer"
  - name: "Manus Help · What is the Cloud Computer? (2026-06-05)"
    url: "https://help.manus.im/en/articles/15392111-what-is-the-cloud-computer"
---

<div class="product-head" data-p="manus"><span class="logo-dot">m</span><h1>Manus — 작업별로 고르는 세 환경</h1><Ev kind="fact" /></div>
<div class="envs" data-p="manus">
<div class="env"><b>Temporary Sandbox</b><span>기본값. 작업마다 생성, 세션 종료 후 사라짐. 산출물은 채팅 기록에 남음</span></div>
<div class="env on"><b>Cloud Computer</b><span>전용·지속 Ubuntu VM, 24/7. 파일·설치 도구·프로세스 유지. SSH·웹 터미널</span></div>
<div class="env"><b>Manus Desktop</b><span>“My Computer”. 사용자의 로컬 기기 파일·앱을 직접 제어</span></div>
</div>
<div class="g2" data-p="manus">
<div class="pc-box pro"><h3>Pros</h3><ul>
<li>지속 환경을 필요할 때만 쓰는 구조 — 기본은 임시 Sandbox</li>
<li>지속성이 필요한 작업이면 Cloud Computer를 자동 제안·할당</li>
<li>로컬 기기와 완전히 분리되어 로컬 파일에 접근하지 않음</li>
<li>SSH 접근, CPU·메모리·스토리지 대시보드</li>
</ul></div>
<div class="pc-box con"><h3>Cons / 한계</h3><ul>
<li>GUI 없음, 현재 명령줄 전용</li>
<li>결제 중단 시 지속 환경과 작업 파일 삭제(최종 산출물은 채팅에 남음)</li>
<li>플랜 업그레이드 시 VM 재시작, 실행 중 작업 잠시 중단</li>
<li>세 환경의 차이를 사용자가 이해해야 함<Ev kind="hypothesis" /></li>
</ul></div>
</div>

<!--
블로그 FAQ: "Every task starts in a temporary sandbox. Manus decides on a task-by-task basis whether to use the sandbox or the Cloud Computer."
"The standard sandbox is temporary—it spins up for a task and disappears when the session ends. The Cloud Computer is persistent."
플랜 이름: Basic / Standard / Advanced. 가격 수치는 이 발표에서 다루지 않는다.
-->

---
layout: deck
section: "Part 2 · OpenAI Aeon / “o”"
sources:
  - name: "TestingCatalog (2026-09-26, 2차 보도)"
    url: "https://www.testingcatalog.com/openai-to-announce-o-always-on-agent-during-devday/"
  - name: "RuntimeWire (2026-09-28, 2차 보도)"
    url: "https://runtimewire.com/article/what-openai-might-announce-at-devday-from-an-o-agent-to-new-models"
---

<div class="product-head" data-p="aeon" style="position:relative"><span class="logo-dot dashed">?</span><h1>OpenAI Aeon / “o” — 출시 전 소문</h1><Ev kind="unavailable" note="공식 제품 페이지 없음" /></div>
<div class="rumor" style="position:relative">
<div class="col">
<h3><Ev kind="hypothesis" note="2차 보도 · 유출" />보도된 내용</h3>
<ul>
<li>ChatGPT 설정에서 “o” 표시 이름과 “-o” 이메일 접미사가 발견되었다는 보도</li>
<li>Pro 업그레이드 화면에 “always-on assistant”로 잠시 노출되었다는 보도</li>
<li>“Aeon”은 ChatGPT Workspace의 기존 custom agents 구현을 가리키는 내부 이름이라는 보도</li>
<li>DevDay(2026-09-29, 샌프란시스코)는 일정만 공개. 발표 내용은 확인되지 않음</li>
</ul>
</div>
<div class="col">
<h3><Ev kind="unavailable" />알 수 없는 것</h3>
<ul>
<li>실제 출시 여부, 시기, 제품명</li>
<li>컴퓨터 모델(전용·공유), 지속 방식, 스케줄링</li>
<li>권한·승인 구조, 메모리, 이메일 처리 범위</li>
<li>가격·요금제·지역</li>
</ul>
</div>
</div>
<p class="callout push" style="--accent: var(--hyp)"><b>이 슬라이드는 기능 소개가 아닙니다.</b> 특징·장단점은 공식 자료가 나오기 전까지 평가하지 않습니다. 발표 당일 공식 발표가 있으면 원문으로 교체합니다.</p>

<!--
확인 시점: 2026-09-29 UTC 오전. OpenAI 공식 제품 페이지나 문서는 찾지 못했다.
TestingCatalog는 "-o" 접미사를 이메일 처리의 근거로 해석했지만, 이는 보도 매체의 해석이다.
RuntimeWire: "Claims about email access, scheduling and work continuing after a user leaves the chat remain speculation."
이 슬라이드에서 가격, 요금제, 기능을 확정적으로 말하지 않는다.
-->

---
layout: deck
section: "Part 2 · Comparison"
sources:
  - name: "Meta · Muse"
    url: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/"
  - name: "xAI Docs · Grok Bot"
    url: "https://docs.x.ai/grok-bot/overview"
  - name: "Manus · Cloud Computer"
    url: "https://manus.im/blog/manus-cloud-computer"
  - name: "TestingCatalog (보도)"
    url: "https://www.testingcatalog.com/openai-to-announce-o-always-on-agent-during-devday/"
---

<div class="title-row"><h1>한 장 비교</h1><div class="ev-row"><Ev kind="fact" note="Muse · Grok Bot · Manus" /><Ev kind="unavailable" note="Aeon / o" /></div></div>
<table class="matrix">
<thead><tr><th style="width:13%">제품</th><th style="width:21%">Persistence model</th><th style="width:22%">Computer model</th><th style="width:15%">Multi-agent</th><th style="width:15%">Channels</th><th>Maturity</th></tr></thead>
<tbody>
<tr data-p="muse"><td><b>Muse</b></td><td>개인 에이전트 1개, 목표·메모리 유지, 앱 종료 후 백그라운드 지속</td><td>사람별 전용 Secure VM + 분리된 Sentinel</td><td>발표문에 설명 없음</td><td>Muse 앱·웹·WhatsApp</td><td>미국 출시 (2026-09-08), 무료+구독</td></tr>
<tr data-p="grok"><td><b>Grok Bot</b></td><td>Bot별 메모리·Routine, 일정·이벤트 트리거</td><td>계정 단위 공유 컴퓨터, Bot별 화면(보안 경계 아님)</td><td>병렬 실행, 메시지, 그룹 채팅, 인계</td><td>데스크톱 3 OS·모바일 앱</td><td>공개 문서·팀 도입 가이드 있음</td></tr>
<tr data-p="manus"><td><b>Manus</b></td><td>기본은 임시 Sandbox, 필요 시 Cloud Computer에서 24/7</td><td>전용 지속 Ubuntu VM (CLI), 로컬용 Desktop 별도</td><td>공식 자료에 협업 구조 설명 없음</td><td>Manus 앱, SSH·웹 터미널</td><td>출시, 유료 플랜 필요</td></tr>
<tr class="rumor-row" data-p="aeon"><td><b>Aeon / “o”</b></td><td>“always-on”이라는 보도뿐</td><td>알 수 없음</td><td>알 수 없음</td><td>알 수 없음</td><td>미출시 · 미확인</td></tr>
</tbody>
</table>
<p class="note push">Maturity 열은 출시 상태만 적습니다. 품질·성능 순위가 아닙니다. “설명 없음”은 기능이 없다는 뜻이 아니라 인용한 공식 자료에서 찾지 못했다는 뜻입니다.</p>

<!--
Grok Bot 도입 가이드: overview의 "read how teams roll it out" 및 Teams and Enterprise 문서.
Manus 멀티 에이전트: Cloud Computer 블로그와 도움말에는 여러 에이전트 협업 설명이 없다.
-->

---
layout: deck
section: "Part 2 · Isolation model"
sources:
  - name: "Meta · Muse Secure VM"
    url: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/"
  - name: "xAI Docs · Computer and apps"
    url: "https://docs.x.ai/grok-bot/computer-and-apps"
  - name: "Manus Help · Cloud Computer"
    url: "https://help.manus.im/en/articles/15392111-what-is-the-cloud-computer"
---

<div class="title-row"><h1>누가 컴퓨터를 공유하는가</h1><Ev kind="fact" note="구조 · 발표자 도식" /></div>
<div class="iso">
<div data-p="muse">
<div class="box-outer">
<span class="box-label">Muse · 1 person = 1 VM</span>
<div class="box-row"><div class="box-inner">Muse</div><div class="box-inner guard">Sentinel</div></div>
<div class="box-row"><div class="box-inner soft">브라우저 · 연결 앱 데이터</div></div>
<div class="box-row"><div class="box-inner soft">자격 증명 보안 저장소</div></div>
</div>
<p class="iso-caption">외부로 나가는 행동은 Sentinel 승인을 거칩니다. 다른 사람의 에이전트가 닿을 수 없습니다.</p>
</div>
<div data-p="grok">
<div class="box-outer">
<span class="box-label">Grok Bot · 1 account = 1 computer</span>
<div class="box-row"><div class="box-inner">Bot A 화면</div><div class="box-inner">Bot B 화면</div><div class="box-inner">Bot C 화면</div></div>
<div class="box-row"><div class="box-inner shared">공유: 파일 · 쿠키 · CLI 자격 증명 · 커넥터</div></div>
<div class="box-row"><div class="box-inner soft">/workspace</div></div>
</div>
<p class="iso-caption">인계는 쉽지만, 한 Bot에게 준 권한은 계정의 모든 Bot이 쓸 수 있습니다. 사용자 간 격리는 엄격합니다.</p>
</div>
<div data-p="manus">
<div class="box-outer">
<span class="box-label">Manus · task sandbox + cloud VM</span>
<div class="box-row"><div class="box-inner soft">임시 Sandbox (작업마다)</div></div>
<div class="box-row"><div class="box-inner">Cloud Computer (지속)</div></div>
<div class="box-row"><div class="box-inner soft">Desktop = 로컬 기기 (별도)</div></div>
</div>
<p class="iso-caption">지속 환경은 로컬 기기와 분리됩니다. 작업마다 Sandbox와 Cloud Computer 중 하나가 선택됩니다.</p>
</div>
</div>
<p class="callout push">공유 모델은 <b>인계 비용</b>을 줄이고, 전용 모델은 <b>권한 범위</b>를 줄입니다. 어느 쪽이 낫다는 공식 비교는 없습니다.</p>

<!--
박스 도식은 공식 문서 서술을 발표자가 그림으로 옮긴 것이다. 실제 내부 아키텍처 다이어그램이 아니다.
Grok Bot: "between users, isolation is strict."
-->

---
layout: deck
class: section
section: "Part 3 · Trends"
---

<div class="sec-num">03</div>
<h1>가까운 추세</h1>
<p class="lead">공식 자료에서 <b>관찰된 것</b>과 그로부터 추론한 <em>가설</em>을 나란히 둡니다. 예측의 근거는 각 줄에 적습니다.</p>

---
layout: deck
section: "Part 3 · Trends"
sources:
  - name: "xAI · Designing Grok Bot"
    url: "https://x.ai/news/designing-grok-bot"
  - name: "Manus · Cloud Computer"
    url: "https://manus.im/blog/manus-cloud-computer"
  - name: "Meta · Muse"
    url: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/"
---

<h1>런타임과 거버넌스</h1>
<div class="trend">
<div class="n">T1</div>
<div>
<h2>지속성이 기본 런타임이 된다 <Ev kind="hypothesis" note="추세" /></h2>
<p>세 제품 모두 “세션이 끝나도 남는 컴퓨터”를 핵심 개념으로 제시했습니다. 다만 Manus는 여전히 임시 Sandbox를 기본값으로 둡니다.</p>
<p class="basis"><Ev kind="fact" /> Muse Secure VM · Grok Bot 지속 컴퓨터 · Manus “Every task starts in a temporary sandbox”</p>
</div>
</div>
<div class="trend">
<div class="n">T2</div>
<div>
<h2>승인·감사가 제품 표면으로 올라온다 <Ev kind="hypothesis" note="추세" /></h2>
<p>사람이 지켜보지 않는 시간이 길어질수록, “언제 멈추고 묻는가”가 기능 목록의 앞쪽에 옵니다. 모델 품질이 아니라 정책 설계가 차별점이 될 수 있습니다.</p>
<p class="basis"><Ev kind="fact" /> Muse의 Sentinel·감사 기록 · Grok Bot의 Takeover·Approvals·Auto Review 문서 · Manus의 메시지 발신자 기반 권한</p>
</div>
</div>
<div class="trend">
<div class="n">T3</div>
<div>
<h2>작업을 깨우는 주체가 사람만이 아니게 된다 <Ev kind="hypothesis" note="추세" /></h2>
<p>일정·이벤트·다른 에이전트가 세션을 시작하면, “프롬프트 입력창”보다 “책임 목록(Routine)”이 주 인터페이스가 될 수 있습니다.</p>
<p class="basis"><Ev kind="fact" /> xAI: Routine을 부가 설정에서 Bot 메인 화면으로 이동 · Manus 예약 스크래퍼 예시</p>
</div>
</div>

<!--
T2의 Auto Review는 Grok Bot overview의 Security 항목 "Network policy, approvals and Auto Review, logging, and data handling"에서 이름만 확인했다. 세부 동작은 이 발표에서 설명하지 않는다.
-->

---
layout: deck
section: "Part 3 · Trends"
sources:
  - name: "xAI Docs · Computer and apps"
    url: "https://docs.x.ai/grok-bot/computer-and-apps"
  - name: "xAI · Designing Grok Bot"
    url: "https://x.ai/news/designing-grok-bot"
  - name: "Meta · Muse"
    url: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/"
---

<h1>컴퓨터 모델과 재사용 단위</h1>
<div class="g2">
<div class="card" data-p="grok">
<span class="tag">T4 · Shared vs Dedicated</span>
<div class="ev-row" style="margin-bottom:10px"><Ev kind="hypothesis" note="트레이드오프 해석" /></div>
<div class="spectrum"></div>
<div class="spectrum-labels"><span>DEDICATED · Muse</span><span>SHARED · Grok Bot</span></div>
<ul style="margin-top:14px">
<li><b>전용</b>: 권한 범위가 작고 설명하기 쉬움. 대신 에이전트 간 인계 수단은 따로 필요</li>
<li><b>공유</b>: 로그인·파일을 한 번만 준비. 대신 자격 증명 분리가 사용자 책임</li>
<li>다음 단계는 “공유 컴퓨터 안의 세분화된 권한”일 가능성 — 아직 공식 자료 없음</li>
</ul>
</div>
<div class="card" data-p="manus">
<span class="tag">T5 · Templates · Skills · Routines</span>
<div class="ev-row" style="margin-bottom:10px"><Ev kind="hypothesis" note="추세" /></div>
<ul>
<li>한 번 시연 → <b>Skill</b>로 저장 → <b>Routine</b>으로 예약. 반복 가능한 절차가 재사용 단위</li>
<li>역할별 스타터 프롬프트·“메시지로 설정”이 워크플로 빌더를 대신함</li>
<li>재사용 단위가 생기면 조직 공유·검토·버전 관리 요구가 뒤따를 가능성</li>
</ul>
<p class="note" style="margin-top:10px"><Ev kind="fact" /> Grok Bot: “Setup is a message, not a workflow builder.” Skill은 계정 수준, Memory·Routine은 Bot 수준</p>
</div>
</div>

<!--
"shared vs dedicated" 스펙트럼에 Manus를 두지 않은 이유: Manus Cloud Computer는 전용 VM이지만 여러 작업이 같은 디스크를 공유하는 구조라 한 축에 놓기 어렵다. 이 점을 질문으로 받으면 설명한다.
-->

---
layout: deck
section: "Part 3 · Trends"
sources:
  - name: "Manus Help (2026-06-05)"
    url: "https://help.manus.im/en/articles/15392111-what-is-the-cloud-computer"
  - name: "Meta Newsroom (2026-09-08)"
    url: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/"
  - name: "TestingCatalog (2026-09-26, 보도)"
    url: "https://www.testingcatalog.com/openai-to-announce-o-always-on-agent-during-devday/"
---

<div class="title-row"><h1>T6 · 소비자용 상시 에이전트 경쟁</h1><Ev kind="hypothesis" note="경쟁 구도 해석" /></div>
<div class="timeline">
<div class="tl" data-p="manus" style="--accent: var(--manus)">
<div class="date">2026-06-05</div>
<b>Manus Cloud Computer</b>
<p>도움말 문서 게시일 기준. 24/7 Ubuntu VM</p>
<Ev kind="fact" />
</div>
<div class="tl" data-p="muse" style="--accent: var(--muse)">
<div class="date">2026-09-08</div>
<b>Meta Muse</b>
<p>개인 에이전트 발표, 미국 출시 시작</p>
<Ev kind="fact" />
</div>
<div class="tl dashed" data-p="grok" style="--accent: var(--grok)">
<div class="date">날짜 미기재</div>
<b>xAI Grok Bot</b>
<p>공개 문서·설계 글 확인. 출시일은 인용 자료에 없음</p>
<Ev kind="fact" note="문서 존재" />
</div>
<div class="tl dashed" data-p="aeon" style="--accent: var(--aeon)">
<div class="date">2026-09-29 (일정)</div>
<b>OpenAI DevDay</b>
<p>일정만 공개. “o” 발표 여부는 보도 수준</p>
<Ev kind="hypothesis" />
</div>
</div>
<div class="g2 push" style="margin-top:22px">
<p class="callout" style="--accent: var(--fact)"><b>관찰</b>: 개인 대상 제품이 “전용 컴퓨터 + 백그라운드 + 승인”을 같은 시기에 전면에 내세웠습니다.</p>
<p class="callout" style="--accent: var(--hyp)"><b>가설</b>: 다음 경쟁 축은 모델 성능보다 채널(메신저·OS·안경), 결제·자격 증명 연동, 신뢰 구조일 수 있습니다.</p>
</div>

<!--
날짜는 각 자료에 적힌 게시일이다. 출시 순서로 시장 선도 여부를 판단하지 않는다.
Grok Bot 출시일은 인용한 문서에 날짜가 없어 표기하지 않는다.
-->

---
layout: deck
section: "Wrap-up"
---

<div class="title-row"><h1>도입을 검토할 때 물어볼 질문</h1><Ev kind="hypothesis" note="발표자 제안" /></div>
<div class="checklist">
<div><p><b>무엇이 작업을 시작하나?</b><span>사람의 메시지만인가, 일정·이벤트·다른 에이전트도인가</span></p></div>
<div><p><b>컴퓨터를 누구와 공유하나?</b><span>사람별 전용인가, 계정 내 모든 에이전트가 공유하나</span></p></div>
<div><p><b>어디서 멈추고 묻나?</b><span>이메일·구매·로그인·결제 단계의 승인 정책과 감사 기록</span></p></div>
<div><p><b>자격 증명은 누가 보나?</b><span>에이전트가 값을 볼 수 있는가, 보안 저장소를 쓰는가</span></p></div>
<div><p><b>끊겼을 때 무엇이 남나?</b><span>결제 중단·복구·리셋 시 파일과 상태의 보존 범위</span></p></div>
<div><p><b>반복 작업을 어떻게 고정하나?</b><span>Skill·Routine·템플릿으로 검토 가능한 절차를 만들 수 있는가</span></p></div>
</div>
<p class="callout push">상시 작업 에이전트가 적합하지 않은 작업도 있습니다. 한 번 끝나는 질문은 채팅, 정해진 절차는 스크립트·워크플로가 더 단순할 수 있습니다.</p>

<!--
이 체크리스트는 공식 문서에서 각 제품이 다르게 답한 항목을 질문으로 뒤집은 것이다. 효과나 생산성 수치는 제시하지 않는다.
-->

---
layout: deck
section: "References"
---

<h1>출처 (확인 2026-09-29)</h1>
<div class="refs">
<div class="ref"><div class="ref-head"><Ev kind="fact" />Meta · Introducing Muse (2026-09-08)</div><a href="https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/" target="_blank" rel="noreferrer">about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/</a></div>
<div class="ref"><div class="ref-head"><Ev kind="fact" />Meta AI · Muse</div><a href="https://ai.meta.com/muse/" target="_blank" rel="noreferrer">ai.meta.com/muse/</a></div>
<div class="ref"><div class="ref-head"><Ev kind="fact" />xAI Docs · Grok Bot overview</div><a href="https://docs.x.ai/grok-bot/overview" target="_blank" rel="noreferrer">docs.x.ai/grok-bot/overview</a></div>
<div class="ref"><div class="ref-head"><Ev kind="fact" />xAI Docs · Computer and apps</div><a href="https://docs.x.ai/grok-bot/computer-and-apps" target="_blank" rel="noreferrer">docs.x.ai/grok-bot/computer-and-apps</a></div>
<div class="ref"><div class="ref-head"><Ev kind="fact" />xAI · Designing Grok Bot</div><a href="https://x.ai/news/designing-grok-bot" target="_blank" rel="noreferrer">x.ai/news/designing-grok-bot</a></div>
<div class="ref"><div class="ref-head"><Ev kind="fact" />Manus · Introducing Cloud Computer</div><a href="https://manus.im/blog/manus-cloud-computer" target="_blank" rel="noreferrer">manus.im/blog/manus-cloud-computer</a></div>
<div class="ref"><div class="ref-head"><Ev kind="fact" />Manus Help · What is the Cloud Computer?</div><a href="https://help.manus.im/en/articles/15392111-what-is-the-cloud-computer" target="_blank" rel="noreferrer">help.manus.im/en/articles/15392111-what-is-the-cloud-computer</a></div>
<div class="ref"><div class="ref-head"><Ev kind="hypothesis" note="2차 보도" />TestingCatalog · “o” always-on agent</div><a href="https://www.testingcatalog.com/openai-to-announce-o-always-on-agent-during-devday/" target="_blank" rel="noreferrer">testingcatalog.com/openai-to-announce-o-always-on-agent-during-devday/</a></div>
<div class="ref"><div class="ref-head"><Ev kind="hypothesis" note="2차 보도" />RuntimeWire · DevDay preview</div><a href="https://runtimewire.com/article/what-openai-might-announce-at-devday-from-an-o-agent-to-new-models" target="_blank" rel="noreferrer">runtimewire.com/article/what-openai-might-announce-at-devday-…</a></div>
<div class="ref"><div class="ref-head"><Ev kind="unavailable" />OpenAI · Aeon / “o” 공식 제품 페이지</div><a>확인 시점 기준 존재하지 않음</a></div>
</div>

<!--
출처 원문 발췌와 확인 방법은 docs/SOURCES_2026-09-29.md에 기록했다.
-->
