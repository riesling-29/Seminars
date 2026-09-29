---
theme: default
title: "상시 작업 에이전트: 채팅 턴에서 지속되는 작업으로"
author: ""
layout: deck
class: cover
section: "AI 에이전트와 하네스 · 후속 섹션"
info: "하네스 세미나 뒤에 붙는 짧은 후속 섹션. Meta Muse, xAI Grok Bot, Manus Cloud Computer, OpenAI Dots(DevDay 2026 발표)를 공식 자료 기준으로 비교합니다."
colorSchema: dark
favicon: /favicon.svg
fonts:
  provider: none
transition: none
aspectRatio: 16/9
canvasWidth: 1100
routerMode: hash
drawings:
  persist: false
mdc: true
---

<h1>채팅이 끝나도<br><span class="accent">일은 계속된다</span></h1>
<p class="lead">하네스 다음 단계: 세션이 끝나도 남는 컴퓨터 위에서 일하는<br>상시 작업(Persistent Work) 에이전트</p>
<div class="cover-parts">
<div data-p="muse"><b>01</b>변화 개요</div>
<div data-p="grok"><b>02</b>Muse · Grok Bot · Manus · Dots 비교</div>
<div data-p="manus"><b>03</b>가까운 추세</div>
</div>
<div class="ev-row cover-legend"><Ev kind="fact" /><Ev kind="hypothesis" /><Ev kind="unavailable" /><span class="muted small">모든 슬라이드에 근거 수준을 표시합니다</span></div>

<!--
하네스 세미나 본편 뒤에 붙는 약 10장 분량의 후속 섹션이다.
본편에서 "하네스 = 모델과 도구를 연결하고 작업을 제어하는 운영 코드"를 다뤘다면, 여기서는 그 하네스가 세션 밖에서 계속 돌아가는 제품들을 본다.
2026-09-29 기준 공개 자료만 사용한다(OpenAI DevDay 2026 발표 반영). 성능, 사용자 수, 순위 같은 수치는 다루지 않는다.
FACT = 제조사 공식 발표·문서, HYPOTHESIS = 보도·유출 또는 발표자 해석, UNAVAILABLE = 공식 자료 없음.
OpenAI Dots는 DevDay 2026(2026-09-29)에서 공식 발표되어 openai.com·help.openai.com 원문 기준 FACT로 다룬다.
DevDay 전의 Aeon / "o" 보도와 Dots의 관계는 공식 자료에 없으므로 연결하지 않는다.
-->

---
layout: deck
section: "01 · 변화 개요"
sources:
  - name: "xAI · Designing Grok Bot"
    url: "https://x.ai/news/designing-grok-bot"
  - name: "Manus · Cloud Computer"
    url: "https://manus.im/blog/manus-cloud-computer"
---

<div class="title-row"><h1>작업의 단위가 “세션”에서 “에이전트”로</h1><Ev kind="fact" note="설계 문서 인용 기반" /></div>
<div class="vs fill">
<div class="lane">
<div class="lane-title">채팅 턴 에이전트</div>
<div class="step"><i>01</i>사용자가 프롬프트로 세션을 시작</div>
<div class="step"><i>02</i>임시 환경에서 도구 실행, 사용자가 지켜봄</div>
<div class="step"><i>03</i>답변 반환</div>
<div class="step end"><i>✕</i>대화가 멈추면 작업·환경도 끝남</div>
</div>
<div class="arrow">→</div>
<div class="lane" style="--accent: var(--grok)">
<div class="lane-title">상시 작업 에이전트</div>
<div class="step"><i>01</i>프롬프트 · 일정 · 이벤트 · 다른 에이전트가 작업을 시작</div>
<div class="step"><i>02</i>지속되는 클라우드 컴퓨터에서 파일·브라우저·로그인 유지</div>
<div class="step gate"><i>!</i>민감 단계에서 사용자 승인·인계 요청</div>
<div class="step"><i>∞</i>앱·노트북을 닫아도 계속, 결과를 다음 작업에 이어 씀</div>
</div>
</div>
<p class="note push">xAI: “Most AI interfaces are organized around a chat session… ends when the conversation stops.” / “A prompt can start a session, but so can a schedule, an event, or another Bot.”<br>Manus: “Every regular Manus chat starts from a blank slate… A Cloud Computer works more like your own laptop.”</p>

<!--
본편의 하네스 루프(입력 구성 → 호출 연결 → 결과 반영 → 작업 제어)가 한 세션 안에서 끝나던 것이, 이제는 세션 밖의 지속 컴퓨터와 트리거로 확장된다는 연결로 시작한다.
좌측은 공식 자료가 대비 대상으로 설명한 기존 채팅 세션 구조, 우측은 세 제품 문서에 공통으로 나타나는 요소를 요약한 것이다. 모든 제품이 이 구조라는 일반화는 아니다.
-->

---
layout: deck
section: "01 · 변화 개요"
sources:
  - name: "Meta · Introducing Muse"
    url: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/"
  - name: "xAI Docs · Computer and apps"
    url: "https://docs.x.ai/grok-bot/computer-and-apps"
  - name: "Manus Help · Cloud Computer"
    url: "https://help.manus.im/en/articles/15392111-what-is-the-cloud-computer"
---

<div class="title-row"><h1>상시 작업 에이전트의 세 기둥</h1><Ev kind="fact" /></div>
<div class="g3 fill">
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
section: "02 · 제품 비교"
sources:
  - name: "Meta · Muse"
    url: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/"
  - name: "xAI Docs · Grok Bot"
    url: "https://docs.x.ai/grok-bot/overview"
  - name: "xAI · Designing Grok Bot"
    url: "https://x.ai/news/designing-grok-bot"
  - name: "Manus · Cloud Computer"
    url: "https://manus.im/blog/manus-cloud-computer"
  - name: "OpenAI · Introducing dots"
    url: "https://openai.com/index/introducing-dots/"
  - name: "OpenAI Help · Getting started with your dot"
    url: "https://help.openai.com/en/articles/20001530"
---

<div class="title-row"><h1>한눈에 보는 장단점</h1><Ev kind="fact" note="특징·제약" /></div>
<div class="glance fill">
<div class="card" data-p="muse">
<span class="tag">Meta Muse</span>
<p class="one">개인 에이전트 1개 + 사람별 전용 VM</p>
<ul class="pro"><li>전용 VM과 분리된 Sentinel로 격리 경계가 명확</li><li>메신저(WhatsApp) 방식이라 진입 장벽이 낮음</li></ul>
<ul class="con"><li>미국 한정 출시, Confidential VM은 예정</li><li>다중 에이전트 협업은 발표문에 설명 없음</li></ul>
</div>
<div class="card" data-p="grok">
<span class="tag">xAI Grok Bot</span>
<p class="one">이름 있는 Bot 여러 개 + 계정 공유 컴퓨터</p>
<ul class="pro"><li>공유 컴퓨터로 Bot 간 인계에 재설정 불필요</li><li>Routine·Skill로 프롬프트 없이 시작되는 작업</li></ul>
<ul class="con"><li>Bot별 화면은 보안 경계가 아님 — 자격 증명 공유</li><li>계정당 약 50 Bot, 그룹 채팅당 6 Bot 한도</li></ul>
</div>
<div class="card" data-p="manus">
<span class="tag">Manus</span>
<p class="one">기본 임시 Sandbox + 선택형 Cloud Computer</p>
<ul class="pro"><li>지속 환경을 필요할 때만 사용, 자동 제안·할당</li><li>로컬 기기와 분리, SSH·리소스 대시보드</li></ul>
<ul class="con"><li>GUI 없음, 명령줄 전용</li><li>결제 중단 시 지속 환경과 작업 파일 삭제</li></ul>
</div>
<div class="card" data-p="dots">
<span class="tag">OpenAI Dots</span>
<p class="one">GPT-6 Astra 기반 always-on 에이전트 + 자체 클라우드 컴퓨터</p>
<ul class="pro"><li>ChatGPT·Slack·Teams 등 기존 채널에서 메시징</li><li>Custom Rules·Activity View·auto-review로 통제</li></ul>
<ul class="con"><li>Pro·Business Premium 대상, Pro는 EEA·스위스·영국 제외</li><li>문자(SMS) 채널은 coming soon</li></ul>
</div>
</div>
<p class="note push">+ 장점 / − 단점·한계는 공식 문서에 적힌 특징과 제약에서 골랐습니다. 품질·성능 비교가 아닙니다.</p>

<!--
Muse 원문: "Muse runs on its own dedicated computer in the cloud, contained so no one else's agent can reach it." / "A separate Sentinel agent runs on that same machine, kept apart from Muse at the system level." / "Later this year, Meta will introduce Muse Confidential VM". 미국 iOS·Android·muse.ai 출시, 무료(사용량 제한) + 구독.
Grok Bot 문서: "The screens are separate work surfaces, not separate security boundaries." 설계 글: "practical limits of roughly 50 Bots per account and six per group chat." 과금은 문서 기준 유료 Cursor 개인 플랜·Teams 플랜 포함 또는 SuperGrok 연결이며, 문서에 "The computers Bots work on run in Cursor's cloud"라고 적혀 있다.
Manus FAQ: "Every task starts in a temporary sandbox." / 결제 중단 시 "its working files are deleted" / 업그레이드 시 VM 재시작 / Ubuntu, command-line only.
Dots(Introducing dots · Help): GPT-6 Astra, 자체 클라우드 컴퓨터·브라우저, ChatGPT(데스크톱·웹·모바일)·Slack·Teams. Pro는 EEA·스위스·영국 제외 시장, Business Premium은 ChatGPT 지원 전 지역, Enterprise·Edu·Healthcare는 관리자 활성화 베타(기본 off).
가설로 볼 만한 단점(잦은 승인 요청의 마찰, 세 환경 구분의 학습 부담)은 슬라이드에서 빼고 질문이 나오면 가설로 답한다.
-->

---
layout: deck
section: "02 · 제품 비교"
sources:
  - name: "Meta · Muse"
    url: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/"
  - name: "xAI Docs · Grok Bot"
    url: "https://docs.x.ai/grok-bot/overview"
  - name: "Manus · Cloud Computer"
    url: "https://manus.im/blog/manus-cloud-computer"
  - name: "OpenAI · DevDay 2026 Recap"
    url: "https://openai.com/index/devday-2026-recap/"
  - name: "OpenAI · Introducing dots"
    url: "https://openai.com/index/introducing-dots/"
---

<div class="title-row"><h1>한 장 비교</h1><Ev kind="fact" note="네 제품 공식 자료" /></div>
<table class="matrix">
<thead><tr><th style="width:13%">제품</th><th style="width:21%">Persistence model</th><th style="width:22%">Computer model</th><th style="width:15%">Multi-agent</th><th style="width:14%">Channels</th><th>Maturity</th></tr></thead>
<tbody>
<tr data-p="muse"><td><b>Muse</b></td><td>개인 에이전트 1개, 목표·메모리 유지, 앱 종료 후 백그라운드 지속</td><td>사람별 전용 Secure VM + 분리된 Sentinel</td><td>발표문에 설명 없음</td><td>Muse 앱·웹·WhatsApp</td><td>미국 출시 (2026-09-08), 무료+구독</td></tr>
<tr data-p="grok"><td><b>Grok Bot</b></td><td>Bot별 메모리·Routine, 일정·이벤트 트리거</td><td>계정 단위 공유 컴퓨터, Bot별 화면(보안 경계 아님)</td><td>병렬 실행, 메시지, 그룹 채팅, 인계</td><td>데스크톱 3 OS·모바일 앱</td><td>공개 문서·팀 도입 가이드 있음</td></tr>
<tr data-p="manus"><td><b>Manus</b></td><td>기본은 임시 Sandbox, 필요 시 Cloud Computer에서 24/7</td><td>전용 지속 Ubuntu VM (CLI), 로컬용 Desktop 별도</td><td>공식 자료에 협업 구조 설명 없음</td><td>Manus 앱, SSH·웹 터미널</td><td>출시, 유료 플랜 필요</td></tr>
<tr data-p="dots"><td><b>Dots</b></td><td>always-on, 백그라운드 리서치는 읽기 전용 도구만</td><td>자체 클라우드 컴퓨터·브라우저 (공유·전용 설명 없음)</td><td>Specialist dots 파일럿, 협업 구조 설명 없음</td><td>ChatGPT·Slack·Teams</td><td>발표 (2026-09-29), Pro·Business Premium</td></tr>
</tbody>
</table>
<p class="note push">Maturity 열은 출시 상태만 적습니다. 품질·성능 순위가 아닙니다. “설명 없음”은 기능이 없다는 뜻이 아니라 인용한 공식 자료에서 찾지 못했다는 뜻입니다.</p>

<!--
Grok Bot 도입 가이드: overview의 "read how teams roll it out" 및 Teams and Enterprise 문서.
Manus 멀티 에이전트: Cloud Computer 블로그와 도움말에는 여러 에이전트 협업 설명이 없다.
Dots: Introducing dots·DevDay Recap 기준. Specialist dots는 조직 내 역할·자체 신원·자격 증명을 갖는 엔터프라이즈 파일럿이며, Dot 간 협업 방식이나 컴퓨터 공유 여부는 인용 자료에서 찾지 못했다.
-->

---
layout: deck
section: "02 · 제품 비교"
sources:
  - name: "Meta · Muse Secure VM"
    url: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/"
  - name: "xAI Docs · Computer and apps"
    url: "https://docs.x.ai/grok-bot/computer-and-apps"
  - name: "Manus Help · Cloud Computer"
    url: "https://help.manus.im/en/articles/15392111-what-is-the-cloud-computer"
---

<div class="title-row"><h1>누가 컴퓨터를 공유하는가</h1><Ev kind="fact" note="구조 · 발표자 도식" /></div>
<div class="iso fill">
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
본편의 "하네스와 실행 환경은 분리될 수 있다"는 설명과 연결: 여기서는 실행 환경을 누구와 공유하느냐가 권한 설계의 핵심이 된다.
Grok Bot: "between users, isolation is strict."
-->

---
layout: deck
section: "02 · 제품 비교 · OpenAI Dots"
sources:
  - name: "OpenAI · Introducing dots"
    url: "https://openai.com/index/introducing-dots/"
  - name: "OpenAI · DevDay 2026 Recap"
    url: "https://openai.com/index/devday-2026-recap/"
  - name: "OpenAI Help · Getting started with your dot"
    url: "https://help.openai.com/en/articles/20001530"
---

<div class="product-head" data-p="dots"><span class="logo-dot">•</span><h1>OpenAI Dots — DevDay 2026 발표</h1><Ev kind="fact" note="공식 발표 · 2026-09-29" /></div>
<div class="product" data-p="dots">
<div class="facts">
<div class="fact"><b>Model</b><span>GPT-6 Astra 기반 always-on 개인 에이전트</span></div>
<div class="fact"><b>Computer</b><span>자체 클라우드 컴퓨터·브라우저, 플러그인으로 앱 연결</span></div>
<div class="fact"><b>Channels</b><span>ChatGPT(데스크톱·웹·모바일) 메시지·음성, Slack·Teams 메시징. 문자는 coming soon</span></div>
<div class="fact"><b>Approval</b><span>Custom Rules · Activity View · auto-review(계정 영향·정보 공유 행위 점검). 비밀번호 변경 등 민감 작업은 사용자에게 남김</span></div>
<div class="fact"><b>Access</b><span>Pro: EEA·스위스·영국 제외 시장 · Business Premium: ChatGPT 지원 전 지역 · Enterprise·Edu·Healthcare: 관리자 활성화 베타(기본 off)</span></div>
</div>
<div class="pc">
<div class="pc-box pro"><h3>+ 문서에 적힌 특징</h3><ul>
<li>Slack·Teams처럼 이미 쓰는 업무 채널로 들어옴</li>
<li>백그라운드 선제 리서치는 연결 앱에 읽기 전용 도구만 사용</li>
<li>Specialist dots: 조직 내 역할·자체 신원·자격 증명 (엔터프라이즈 파일럿)</li>
</ul></div>
<div class="pc-box con"><h3>− 제약 · 확인 못 한 것</h3><ul>
<li>플랜·지역 제한: Pro는 EEA·스위스·영국 제외</li>
<li>컴퓨터 공유·전용 구분, Dot 간 협업 방식<Ev kind="unavailable" note="설명 없음" /></li>
<li>DevDay 전 보도된 Aeon / “o”와의 관계<Ev kind="unavailable" note="공식 언급 없음" /></li>
</ul></div>
</div>
</div>
<p class="callout push" style="--accent: var(--hyp)"><Ev kind="hypothesis" note="2차 보도" /> Meta Muse의 경쟁 제품이라는 구도는 언론의 해석입니다. OpenAI 공식 자료에는 제품 간 비교가 없습니다.</p>

<!--
확인: OpenAI DevDay 2026 (2026-09-29) Primary 원문 — Introducing dots, DevDay 2026 Recap, Help「Getting started with your dot」. 발췌는 docs/SOURCES_2026-09-29.md.
OpenAI 표현: "remarkably capable, always-on agents built to handle everything."
문자(SMS)는 Help 기준 미국 Pro 한정 제한 베타이며 Business/Enterprise 워크스페이스는 미지원.
사용량 산입은 Introducing(대화 미산입, Codex·ChatGPT Work 작업은 산입)과 Help(출시 후 한 달간 dots usage 미산입)의 표현이 겹친다. 런치 특례와 상시 정책을 구분해야 하므로 슬라이드에 넣지 않는다. 가격도 쓰지 않는다.
Microsoft Agent 365 거버넌스 통합은 "추진" 단계로만 언급되어 있다.
Muse 경쟁 프레이밍 출처(2차): TechCrunch, The Verge, WIRED, The Decoder.
DevDay 전 Aeon / "o" 보도(TestingCatalog, RuntimeWire)는 슬라이드에서 뺐다. Dots가 그 보도의 제품이라는 공식 확인은 없다.
-->

---
layout: deck
section: "03 · 가까운 추세"
sources:
  - name: "xAI · Designing Grok Bot"
    url: "https://x.ai/news/designing-grok-bot"
  - name: "xAI Docs · Grok Bot"
    url: "https://docs.x.ai/grok-bot/overview"
  - name: "Manus · Cloud Computer"
    url: "https://manus.im/blog/manus-cloud-computer"
  - name: "Meta · Muse"
    url: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/"
  - name: "OpenAI · Introducing dots"
    url: "https://openai.com/index/introducing-dots/"
---

<div class="title-row"><h1>가까운 추세 네 가지</h1><Ev kind="hypothesis" note="추세 판단" /></div>
<div class="trends-2x2 fill">
<div class="trend">
<div class="n">T1</div>
<div>
<h2>지속성이 기본 런타임이 된다</h2>
<p>세 제품 모두 “세션이 끝나도 남는 컴퓨터”를 핵심 개념으로 제시. 단, Manus는 여전히 임시 Sandbox가 기본값.</p>
<p class="basis"><Ev kind="fact" /> Muse Secure VM · Grok Bot 지속 컴퓨터 · Manus “Every task starts in a temporary sandbox”</p>
</div>
</div>
<div class="trend">
<div class="n">T2</div>
<div>
<h2>승인·감사가 제품 표면으로</h2>
<p>사람이 지켜보지 않는 시간이 길수록 “언제 멈추고 묻는가”가 차별점이 될 수 있음.</p>
<p class="basis"><Ev kind="fact" /> Muse Sentinel·감사 기록 · Grok Bot Takeover·Approvals·Auto Review · Dots auto-review·Activity View · Manus 발신자 기반 권한</p>
</div>
</div>
<div class="trend">
<div class="n">T3</div>
<div>
<h2>Shared vs Dedicated 트레이드오프</h2>
<p>공유는 인계가 쉽고 자격 증명 분리가 사용자 책임, 전용은 그 반대. 다음 단계는 공유 컴퓨터 안의 세분화된 권한일 가능성.</p>
<p class="basis"><Ev kind="fact" /> Grok Bot “Do not place a credential … if another Bot … should not be able to use it”</p>
</div>
</div>
<div class="trend">
<div class="n">T4</div>
<div>
<h2>Skill · Routine이 재사용 단위로</h2>
<p>한 번 시연 → Skill로 저장 → Routine으로 예약. 일정·이벤트·다른 에이전트가 작업을 시작하면 프롬프트 창보다 책임 목록이 주 인터페이스가 될 수 있음.</p>
<p class="basis"><Ev kind="fact" /> xAI: Routine을 Bot 메인 화면으로 이동 · “Setup is a message, not a workflow builder.”</p>
</div>
</div>
</div>

<!--
각 추세의 제목과 첫 문장은 발표자의 해석(HYPOTHESIS)이고, 회색 줄의 FACT는 그 해석의 근거가 된 공식 서술이다.
T2의 Auto Review는 Grok Bot overview의 Security 항목에서 이름만 확인했다. 세부 동작은 설명하지 않는다.
T3 스펙트럼에 Manus를 두지 않는 이유: Cloud Computer는 전용 VM이지만 여러 작업이 같은 디스크를 공유해 한 축에 놓기 어렵다.
-->

---
layout: deck
section: "03 · 가까운 추세"
sources:
  - name: "Manus Help (2026-06-05)"
    url: "https://help.manus.im/en/articles/15392111-what-is-the-cloud-computer"
  - name: "Meta Newsroom (2026-09-08)"
    url: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/"
  - name: "xAI Docs · Grok Bot"
    url: "https://docs.x.ai/grok-bot/overview"
  - name: "OpenAI · DevDay 2026 Recap (2026-09-29)"
    url: "https://openai.com/index/devday-2026-recap/"
---

<div class="title-row"><h1>T5 · 소비자용 상시 에이전트 경쟁</h1><Ev kind="hypothesis" note="경쟁 구도 해석" /></div>
<div class="timeline" style="margin-block: auto">
<div class="tl" style="--accent: var(--manus)">
<div class="date">2026-06-05</div>
<b>Manus Cloud Computer</b>
<p>도움말 문서 게시일 기준. 24/7 Ubuntu VM</p>
<Ev kind="fact" />
</div>
<div class="tl" style="--accent: var(--muse)">
<div class="date">2026-09-08</div>
<b>Meta Muse</b>
<p>개인 에이전트 발표, 미국 출시 시작</p>
<Ev kind="fact" />
</div>
<div class="tl dashed" style="--accent: var(--grok)">
<div class="date">날짜 미기재</div>
<b>xAI Grok Bot</b>
<p>공개 문서·설계 글 확인. 출시일은 인용 자료에 없음</p>
<Ev kind="fact" note="문서 존재" />
</div>
<div class="tl" style="--accent: var(--dots)">
<div class="date">2026-09-29</div>
<b>OpenAI Dots</b>
<p>DevDay 2026 발표, Pro·Business Premium 롤아웃 시작</p>
<Ev kind="fact" />
</div>
</div>
<div class="g2 push">
<p class="callout" style="--accent: var(--fact)"><b>관찰</b>: 개인 대상 제품이 “전용 컴퓨터 + 백그라운드 + 승인”을 같은 시기에 전면에 내세웠습니다.</p>
<p class="callout" style="--accent: var(--hyp)"><b>가설</b>: 다음 경쟁 축은 모델 성능보다 채널(메신저·OS·안경), 결제·자격 증명 연동, 신뢰 구조일 수 있습니다.</p>
</div>

<!--
날짜는 각 자료에 적힌 게시일이다. 출시 순서로 시장 선도 여부를 판단하지 않는다.
Grok Bot 출시일은 인용한 문서에 날짜가 없어 표기하지 않는다.
Dots는 DevDay 2026 Recap·Introducing dots 기준 2026-09-29 발표. 가용 지역·플랜 세부는 Help「Getting started with your dot」.
-->

---
layout: deck
section: "Wrap-up · References"
---

<div class="title-row"><h1>도입 전에 물어볼 질문과 출처</h1><Ev kind="hypothesis" note="질문은 발표자 제안" /></div>
<div class="wrap fill">
<div class="checklist compact">
<div><p><b>무엇이 작업을 시작하나?</b><span>메시지만인가, 일정·이벤트·다른 에이전트도인가</span></p></div>
<div><p><b>컴퓨터를 누구와 공유하나?</b><span>사람별 전용인가, 계정 내 모든 에이전트가 공유하나</span></p></div>
<div><p><b>어디서 멈추고 묻나?</b><span>이메일·구매·로그인·결제 단계의 승인과 감사 기록</span></p></div>
<div><p><b>끊겼을 때 무엇이 남나?</b><span>결제 중단·복구·리셋 시 파일과 상태의 보존 범위</span></p></div>
</div>
<div class="refs compact">
<div class="ref"><div class="ref-head"><Ev kind="fact" />Meta · Introducing Muse</div><a href="https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/" target="_blank" rel="noreferrer">about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/</a></div>
<div class="ref"><div class="ref-head"><Ev kind="fact" />Meta AI · Muse</div><a href="https://ai.meta.com/muse/" target="_blank" rel="noreferrer">ai.meta.com/muse/</a></div>
<div class="ref"><div class="ref-head"><Ev kind="fact" />xAI Docs · Grok Bot</div><a href="https://docs.x.ai/grok-bot/overview" target="_blank" rel="noreferrer">docs.x.ai/grok-bot/overview · /computer-and-apps</a></div>
<div class="ref"><div class="ref-head"><Ev kind="fact" />xAI · Designing Grok Bot</div><a href="https://x.ai/news/designing-grok-bot" target="_blank" rel="noreferrer">x.ai/news/designing-grok-bot</a></div>
<div class="ref"><div class="ref-head"><Ev kind="fact" />Manus · Cloud Computer</div><a href="https://manus.im/blog/manus-cloud-computer" target="_blank" rel="noreferrer">manus.im/blog/manus-cloud-computer · help.manus.im</a></div>
<div class="ref"><div class="ref-head"><Ev kind="fact" />OpenAI · DevDay 2026 Recap · Introducing dots</div><a href="https://openai.com/index/devday-2026-recap/" target="_blank" rel="noreferrer">openai.com/index/devday-2026-recap/</a> · <a href="https://openai.com/index/introducing-dots/" target="_blank" rel="noreferrer">/introducing-dots/</a></div>
</div>
</div>
<p class="callout push">상시 작업 에이전트가 늘 답은 아닙니다. 한 번 끝나는 질문은 채팅, 정해진 절차는 스크립트·워크플로가 더 단순할 수 있습니다.</p>

<!--
본편의 결론(Do Nothing, Chat, Script, Workflow 대안도 판단에 유지)과 같은 방향으로 닫는다.
체크리스트는 공식 문서에서 각 제품이 다르게 답한 항목을 질문으로 뒤집은 것이다. 효과나 생산성 수치는 제시하지 않는다.
전체 원문 발췌와 확인 방법은 docs/SOURCES_2026-09-29.md에 있다.
DevDay 전 Aeon / "o" 보도(TestingCatalog 2026-09-26, RuntimeWire 2026-09-28)는 Dots 공식 발표 이후 참고 목록에서 뺐고, 기록은 SOURCES 문서에 이력으로만 남긴다.
-->
