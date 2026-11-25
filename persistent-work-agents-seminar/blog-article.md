# 대화에서 상주로: 계속 일하는 AI 에이전트

블로그 게시일: 2026-09-29  
최신화: 2026-11-25  
원문: https://blog29.vercel.app/blog/persistent-work-agents  
발표자료: https://riesling-29.github.io/Seminars/persistent-work-agents-seminar/

> 2026-11-25 기준으로 공식 자료를 다시 확인했습니다. Muse의 호주·영국 출시, Dots의 GPT-6.1 Terra와 엔터프라이즈 기본 제공, Manus 2.0의 Automations와 Cue를 반영합니다.

[앞선 글](../ai-agent-harness-seminar/blog-article.md)에서는 LLM이 도구 호출을 제안하고, 하네스가 권한을 확인해 실행 환경에 전달하는 구조를 살펴봤습니다. 그 설명의 예시는 대부분 "사용자가 요청하고, 에이전트가 몇 단계를 수행한 뒤, 답을 돌려주는" 한 번의 대화였습니다. 이 글이 보는 질문은 그 다음입니다. 사용자가 창을 닫은 뒤에도 에이전트가 일을 계속한다면, 하네스는 무엇을 더 책임져야 할까요?

제품 설명은 각 제공자의 공식 발표문과 문서에 적힌 내용입니다. 제공자가 자사 제품을 설명한 것이며, 독립적으로 검증한 성능이나 안전성을 뜻하지는 않습니다. 순위나 성능 비교는 하지 않습니다. 같은 조건에서 측정한 자료가 없기 때문입니다. 확인한 날짜는 2026년 11월 25일입니다.

## 대화 턴에서 상주하는 작업으로

앞선 글의 하네스 루프 자체는 그대로입니다. 모델이 다음 행동을 고르고, 하네스가 도구를 실행하고, 결과를 다시 모델에 넣습니다. 달라지는 것은 그 루프를 둘러싼 조건입니다.

작업 공간이 세션보다 오래 남습니다. 대화마다 새로 뜨고 사라지는 샌드박스 대신, 파일·설치한 도구·로그인 세션이 유지되는 클라우드 컴퓨터를 에이전트에 붙입니다. 어제 만든 파일을 오늘 이어서 쓸 수 있다는 뜻이지만, 동시에 어제 저장한 자격증명도 오늘 그대로 남아 있다는 뜻입니다.

작업을 시작시키는 주체가 늘어납니다. 사용자의 메시지뿐 아니라 일정, 외부 이벤트, 다른 에이전트가 작업을 시작할 수 있습니다. 사람이 화면을 보고 있지 않은 시간에 실행되는 작업이 기본값이 됩니다.

사람의 역할은 매 턴의 지시에서 승인과 인계로 옮겨 갑니다. 에이전트는 백그라운드에서 일하다가 이메일 발송, 결제, 로그인처럼 정해진 지점에서만 사용자를 부릅니다. 앞선 글에서 "도구 호출 요청이 있다는 사실만으로 실행이 허용된 것은 아니다"라고 했던 경계가, 이제는 사용자가 자리에 없을 때도 작동해야 합니다.

이 조건을 합친 형태를 이 글에서는 상주형 작업 에이전트(persistent work agent)라고 부릅니다. 업계 표준 용어는 아니며, 제품마다 "personal AI agent", "persistent agents", "always-on" 같은 표현을 씁니다.

## 제품별로 무엇이 공개되었나

| 제품 | 작업 컴퓨터 | 백그라운드 실행 | 사람이 개입하는 지점 |
| --- | --- | --- | --- |
| Meta Muse | 사용자별 전용 VM(Muse Secure VM), 자체 브라우저 포함 | 앱을 닫은 뒤에도 계속 작업 | 이메일 발송·구매 같은 민감한 행동 전 확인, 전체 작업 기록 제공 |
| xAI Grok Bot | 계정당 하나의 클라우드 컴퓨터를 모든 Bot이 공유, Bot마다 별도 화면 | 노트북을 닫아도 작업과 루틴이 계속 실행 | 승인 요청, 비밀번호·2단계 인증·결제 단계에서 사용자가 화면을 넘겨받음 |
| Manus Cloud Computer | 상시 켜져 있는 Ubuntu VM, 명령줄 전용 | 봇·스크립트·예약·이벤트 트리거 작업을 세션 밖에서 실행 | 팀 접근 권한은 세션의 마지막 메시지 발신자 기준. Cue는 사용자가 방향을 정하고 마지막 결정을 한다고 설명 |
| OpenAI Dots | 자체 클라우드 컴퓨터·브라우저, 플러그인으로 4,000개 이상 앱 연결 | always-on 에이전트, 스스로 하는 백그라운드 조사는 연결된 앱의 읽기 전용 도구만 사용 | Custom Rules, Activity View, auto-review, 비밀번호 변경 같은 민감한 작업은 사용자가 처리 |

### Meta Muse: 전용 컴퓨터와 별도의 감시 에이전트

Meta는 2026년 9월 8일 Muse를 발표하면서, 에이전트와 사용자 데이터가 함께 들어가는 사용자별 전용 가상 머신인 Muse Secure VM에서 Muse가 실행된다고 설명했습니다. 시간이 걸리는 작업은 사용자가 앱을 닫은 뒤에도 계속되고, 상황이 바뀌거나 이메일 발송·구매 전처럼 승인이 필요할 때 돌아온다고 합니다. 같은 VM 안에서 Muse와 시스템 수준으로 분리된 Sentinel 에이전트가 돌며, Sentinel이 승인하지 않으면 Muse의 행동이 인터넷에 도달하지 않는다고 설명합니다. 자격증명은 별도 저장소에 두어 Muse가 값을 보지 않고 사용하게 한다고 밝혔습니다. [Introducing Muse](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/)

같은 발표문은 데이터 전체를 사용자만 가진 키로 암호화하는 Muse Confidential VM을 "올해 안에" 도입할 예정이라고 적었습니다.

출시 범위는 넓어졌습니다. 호주에는 2026년 11월 17일, 영국에는 11월 23일 공식 출시했습니다. 영국은 18세 이상 이용자를 대상으로 iOS, Android, muse.ai, WhatsApp에서 제공한다고 적습니다. [호주 출시](https://about.fb.com/news/2026/11/muse-is-now-available-in-australia/) · [영국 출시](https://about.fb.com/news/2026/11/introducing-muse-in-the-uk-a-personal-ai-agent-you-control/)

2026년 11월 5일 글에서 Meta는 Muse 앱의 실시간 음성과 아바타를 미국에서 먼저 제공한다고 밝혔고, 호주·영국 출시 글은 현지에서도 음성과 Spaces를 쓸 수 있다고 적습니다. Spaces는 Muse 안에 사용자가 설명해서 만드는 맞춤 화면입니다. [Give Your Muse a Voice](https://about.fb.com/news/2026/11/introducing-muse-ai-voice-expressive-avatars/) · [Design the Muse App](https://about.fb.com/news/2026/11/introducing-spaces-customize-muse-app/)

11월 6일 Meta AI Research는 Muse와 Meta AI에 Active Memory와 Active Focus를 가진 특화 모델을 넣는다고 썼습니다. Active Memory는 무엇이 오래 남고 무엇이 철 지났는지를 구분해 기억한다고 설명하고, Active Focus는 예상하지 못한 문제가 생겨도 목표를 향해 작업을 이어 간다고 설명합니다. 이 글은 그 글에 적힌 성능 숫자는 옮기지 않습니다. [Specialized Models for Muse and Meta AI](https://research.meta.ai/blog/specialized-models-for-muse-and-metaai)

영국 출시 글은 결제에 Stripe의 Onelink와, 지원 매장에서 Shop Pay를 쓴다고 적으며, 비밀번호와 결제 수단을 Muse가 보지 못한다는 설명을 반복합니다.

### xAI Grok Bot: 공유 컴퓨터와 역할별 기억

Grok Bot 문서는 각 Bot이 브라우저·파일 시스템·터미널을 갖춘 지속형 클라우드 컴퓨터에서 일하며, 앱이나 노트북을 닫아도 백그라운드 작업과 루틴이 멈추지 않는다고 설명합니다. 컴퓨터는 Bot이 아니라 사용자 계정에 속합니다. 한 계정의 모든 Bot이 같은 컴퓨터를 쓰며 파일, 브라우저 쿠키, 명령줄 자격증명을 공유합니다. 문서는 Bot마다 주어지는 화면이 "보안 경계가 아니다"라고 명시하고, 다른 Bot이 쓰면 안 되는 자격증명은 그 컴퓨터에 두지 말라고 안내합니다. 2026년 11월 23일 갱신본에서도 이 구조는 그대로입니다. [Grok Bot 개요](https://docs.x.ai/grok-bot/overview) · [컴퓨터와 앱 사용](https://docs.x.ai/grok-bot/computer-and-apps)

비밀번호, 2단계 인증, CAPTCHA, 결제·신원 확인 같은 단계에서는 Bot이 사용자에게 화면을 넘기고, 사용자가 그 단계만 처리한 뒤 다시 맡기는 방식입니다. 사용자의 로컬 컴퓨터에서 명령을 실행하는 것은 해당 기능을 켜고 승인한 경우로 제한된다고 설명합니다.

xAI의 디자인 글은 대화 기록 대신 이름과 기억을 가진 Bot 목록을 제품의 중심에 두었다고 설명합니다. 도구와 스킬은 계정 단위로 공유하고, 기억과 루틴은 Bot별로 둔다는 원칙도 밝힙니다. 루틴은 일정이나 이벤트로 Bot을 깨웁니다. [Designing Grok Bot](https://x.ai/news/designing-grok-bot) · [Skills and routines](https://docs.x.ai/grok-bot/skills-routines-and-automations)

디자인 글에는 "각 Bot이 자기 컴퓨터를 가진다"는 표현이 있지만, 문서는 계정당 하나의 컴퓨터를 공유한다고 적습니다. 이 글은 더 구체적인 문서 쪽 설명을 따릅니다.

### Manus Cloud Computer: 임시 샌드박스 옆의 상시 서버

Manus는 기본적으로 작업마다 임시 샌드박스에서 일하고, 세션이 끝나면 그 환경을 닫습니다. Cloud Computer는 여기에 더해진 상시 가동 VM으로, 파일·설치한 도구·실행 중인 프로세스가 세션 사이에 유지됩니다. Ubuntu 기반이며 그래픽 데스크톱 없이 명령줄로만 동작합니다. Cloud Computer가 있어도 기본값은 임시 샌드박스이고, 작업별로 Manus가 어느 쪽을 쓸지 정한다고 설명합니다. 구독을 중단하면 작업 파일이 삭제되고 채팅에 전달된 결과물만 남습니다. 공식 블로그 FAQ는 팀의 Cloud Computer 접근 권한이 "세션에서 마지막 메시지를 보낸 사람"을 기준으로 한다고 적습니다. [Introducing Cloud Computer](https://manus.im/blog/manus-cloud-computer) · [What is the Cloud Computer?](https://help.manus.im/en/articles/15392111-what-is-the-cloud-computer)

2026년 9월 28일 공개된 Manus 2.0은 이 위에 Automations와 Cue를 올렸습니다. Automations는 정해진 시각뿐 아니라, 연결된 서비스의 새 메일, 광고 성과 변화, 캘린더, Slack, Notion 업데이트 같은 신호로 작업을 시작한다고 설명합니다. Cue는 같은 인프라 위의 별도 앱으로, 에이전트마다 이메일·전화번호·지갑·컴퓨터를 두고, 여러 에이전트를 하나의 그룹 대화에 넣어 일을 넘기게 할 수 있다고 합니다. 사용자는 방향을 정하고 마지막 결정을 한다고 적혀 있습니다. 공식 글은 Cue를 초대 코드가 필요한 선행 체험으로 소개했습니다. [Introducing Manus 2.0](https://manus.im/blog/introducing-manus-2-0) · [What is new in Manus 2.0?](https://help.manus.im/en/articles/17190150-what-is-new-in-manus-2-0)

Muse와 Grok Bot이 사용자를 대신해 앱과 웹을 다루는 동료에 가깝다면, Cloud Computer 공개 자료의 예시는 봇 호스팅, 데이터베이스, 예약 작업, 게임 서버처럼 에이전트가 대신 구축하고 관리하는 서버에 가깝습니다. Cue는 그 옆에서 개인 에이전트 쪽에 더 가깝습니다.

### OpenAI Dots: 구독 안에 들어온 상주 에이전트

OpenAI는 2026년 9월 29일 DevDay 2026에서 Dots를 발표했습니다. "always-on" 에이전트로 소개하며, 자체 클라우드 컴퓨터와 브라우저를 갖고 플러그인으로 4,000개 이상의 앱에 연결된다고 설명합니다. 발표 당시 기본 모델은 GPT-6 Astra였고, 2026년 11월 3일 업데이트는 GPT-6.1 Terra를 함께 쓰며 작업 부위마다 다른 모델을 고를 수 있다고 적습니다. 사용자는 ChatGPT(데스크톱·웹·모바일)에서 메시지나 음성 통화로, Slack과 Teams에서는 메시지로 Dot과 대화합니다. 공식 문서는 문자 메시지를 미국 Pro 사용자 대상 베타로 소개합니다. [Introducing dots](https://openai.com/index/introducing-dots/) · [DevDay 2026 Recap](https://openai.com/index/devday-2026-recap/) · [Meet dots](https://learn.chatgpt.com/docs/dots)

백그라운드 동작의 경계도 설명합니다. Dot이 스스로 하는 백그라운드 조사(proactive research)는 연결된 앱에서 읽기 전용 도구만 쓰며, 메시지를 보내거나 콘텐츠를 바꾸거나 브라우저·컴퓨터를 제어하지 않는다고 합니다. 통제 수단으로는 Custom Rules, Activity View, 그리고 계정에 영향을 주거나 정보를 공유하는 행동을 점검하는 auto-review를 제시합니다. 비밀번호 변경 같은 민감한 작업은 사용자에게 남깁니다. 조직용 Specialist dots는 자체 신원과 IT가 지급한 하드웨어를 갖는 형태로, 여전히 엔터프라이즈 파일럿으로 소개됩니다.

이용 범위는 2026년 9월 29일 글보다 넓어졌습니다. 공식 도움말과 제품 문서는 다음과 같이 적습니다. Pro(100·200·500)는 EEA·스위스·영국을 제외한 지역에서 18세 이상에게 제공되고, Plus는 같은 지역에서 일부 계정에 순차 제공됩니다. Business Premium은 지원 지역의 적격 워크스페이스에서, Business Standard는 구성원당 개인 Dot 1개(사용량 제한)로 제공됩니다. Enterprise·Edu·Healthcare는 적격 워크스페이스에서 일반 제공이며, 관리자 미리보기는 2026년 11월 18일에 끝나고, 그날부터 관리자가 끄지 않으면 기본으로 켜진다고 합니다. UAE 데이터·추론 레지던시 워크스페이스에는 제공되지 않습니다. 엔터프라이즈 Dot 자체 요금은 2027년 1월 13일까지 받지 않고, 1월 14일부터 청구를 시작한다고 적혀 있습니다. [Getting started with your dot](https://help.openai.com/en/articles/20001530-getting-started-with-your-dot) · [Enterprise and Edu release notes](https://help.openai.com/en/articles/10128477-chatgpt-enterprise-and-edu-release-notes) · [Pricing and billing for dots in ChatGPT Enterprise](https://help.openai.com/en/articles/20001641-pricing-and-billing-for-dots-in-chatgpt-enterprise)

앞의 두 제품이 컴퓨터를 어떻게 나누느냐로 경계를 그었다면, 공개된 Dots 설명은 누가 작업을 시작했느냐로 권한을 나누는 쪽에 가까워 보입니다. 에이전트가 스스로 시작한 조사는 읽기 전용이고, 바깥에 영향을 주는 행동은 auto-review를 거칩니다.

## 가까운 흐름: 무엇을 지켜볼까

컴퓨터의 경계가 곧 권한의 경계가 되는 경우가 많습니다. Muse는 사용자별 전용 VM에 감시 에이전트를 따로 두었고, Grok Bot은 한 계정 안에서 컴퓨터를 공유하되 그 사실과 위험을 문서에 적었습니다. 공유는 Bot 사이의 인계를 쉽게 하고, 분리는 한 에이전트의 실수가 번지는 범위를 줄입니다. 제품을 볼 때 "에이전트가 무엇을 할 수 있나"만큼 "그 컴퓨터에 무엇이 저장되고 누가 함께 쓰나"를 먼저 묻는 편이 낫다고 봅니다. 제품들이 에이전트별 격리를 기본값으로 모으면 이 질문의 비중은 줄어듭니다.

사람이 매 턴을 보지 않으면, 어떤 행동에서 멈출지를 승인 정책으로 미리 정해 두어야 합니다. 공식 자료에서 반복되는 지점은 외부 발송, 결제, 로그인·인증입니다. 그리고 멈추지 않고 실행한 일을 나중에 확인할 수 있는 작업 기록이 함께 요구됩니다.

작업은 프롬프트 없이 시작됩니다. Grok Bot의 루틴, Manus Automations, Dots의 선제 조사처럼, 일정과 이벤트 트리거가 늘면 사용자가 기억하지 못하는 시점에 시작된 작업이 많아집니다. "누가 이 작업을 시작했는가"가 사람, 일정, 다른 에이전트 중 무엇인지 기록에 남는지가 중요해질 것입니다.

같은 기간에 비슷한 조건의 공식 제품이 더 늘었습니다. Anthropic은 2026년 10월 6일부터 Pro·Max·Ultra 요금제의 새 Cowork 작업을 클라우드에서 실행하며, 노트북을 닫아도 작업이 이어지고, 예약 작업은 기기가 꺼져 있어도 돌아간다고 적습니다. 예약 작업은 매번 별도의 Cowork 세션으로 실행됩니다. 이름 붙은 개인 에이전트와 전용 컴퓨터를 내세운 위 네 제품과는 형태가 달라, 비교 표에는 넣지 않았습니다. [Use Claude Cowork on web, desktop, and mobile](https://support.claude.com/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile) · [Schedule recurring tasks in Claude Cowork](https://support.claude.com/en/articles/13854387-schedule-recurring-tasks-in-claude-cowork)

이제 지켜볼 것은 제공자 수보다, 전용 VM과 감시 에이전트(Muse), 공유 컴퓨터(Grok Bot), 시작 주체에 따른 읽기 전용 구분(Dots), 이벤트 트리거와 에이전트별 컴퓨터를 나란히 둔 Manus 2.0처럼, 서로 다른 경계 설계가 한쪽으로 모이는지입니다.

## 정리

상주형 작업 에이전트에서 바뀐 것은 하네스의 조건입니다. 세션보다 오래 남는 컴퓨터, 사람 없이 시작되는 작업, 승인 지점에서만 돌아오는 사용자라는 조건입니다. 그래서 제품을 비교할 때도 모델 이름보다 "어떤 컴퓨터에서, 무엇을 공유하며, 어디서 멈추는가"를 먼저 확인하는 편이 도움이 됩니다. 이 글의 제품 설명은 2026년 11월 25일 기준 공식 자료에 근거합니다.

## 이 글에서 확인하지 못한 것

Muse Confidential VM의 실제 출시 여부는 공식 출시 글에서 확인하지 못했습니다. DevDay 전에 보도된 "o"나 "Aeon"이라는 이름과 Dots의 관계는 공식 자료에서 찾지 못했습니다. DevDay 키노트 영상은 보지 않았고, 같은 행사의 Codex·Agents API 발표는 다루지 않습니다. Cue의 공식 소개는 초대 코드가 필요한 선행 체험이며, 그 뒤 일반 공개로 바뀌었는지는 공식 블로그에서 확인하지 못했습니다. `ai.meta.com/muse` 제품 페이지는 스크립트로 본문이 그려져, 이 글의 Muse 설명은 뉴스룸과 연구 블로그에 기댑니다.

## 바뀐 점 (2026-11-25)

Muse의 호주·영국 출시와 음성·Spaces, Dots의 GPT-6.1 Terra와 11월 18일 엔터프라이즈 기본 제공·문자 베타, Manus 2.0의 Automations·Cue, Claude Cowork의 클라우드 예약 작업을 공식 자료로 반영했고, 본문의 근거 수준 라벨은 글 끝의 확인하지 못한 항목으로 모았습니다.

## 참고 자료

- [Meta: Introducing Muse (2026-09-08, 페이지 갱신 2026-11-10)](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/)
- [Meta: Muse Is Now Available in Australia (2026-11-17)](https://about.fb.com/news/2026/11/muse-is-now-available-in-australia/)
- [Meta: Introducing Muse in the UK (2026-11-23)](https://about.fb.com/news/2026/11/introducing-muse-in-the-uk-a-personal-ai-agent-you-control/)
- [Meta: Give Your Muse a Voice (2026-11-05)](https://about.fb.com/news/2026/11/introducing-muse-ai-voice-expressive-avatars/)
- [Meta: Design the Muse App, Just for You (Spaces)](https://about.fb.com/news/2026/11/introducing-spaces-customize-muse-app/)
- [Meta AI Research: Specialized Models for Muse and Meta AI (2026-11-06)](https://research.meta.ai/blog/specialized-models-for-muse-and-metaai)
- [xAI: Grok Bot 개요](https://docs.x.ai/grok-bot/overview)
- [xAI: Grok Bot: Use the computer and apps (문서 갱신 2026-11-23)](https://docs.x.ai/grok-bot/computer-and-apps)
- [xAI: Skills and routines](https://docs.x.ai/grok-bot/skills-routines-and-automations)
- [xAI: Designing Grok Bot for a world of persistent agents](https://x.ai/news/designing-grok-bot)
- [Manus: Introducing Cloud Computer](https://manus.im/blog/manus-cloud-computer)
- [Manus Help Center: What is the Cloud Computer? (2026-06-05)](https://help.manus.im/en/articles/15392111-what-is-the-cloud-computer)
- [Manus: Introducing Manus 2.0 (2026-09-28)](https://manus.im/blog/introducing-manus-2-0)
- [Manus Help Center: What is new in Manus 2.0? (2026-10-01)](https://help.manus.im/en/articles/17190150-what-is-new-in-manus-2-0)
- [OpenAI: DevDay 2026 Recap (2026-09-29)](https://openai.com/index/devday-2026-recap/)
- [OpenAI: Introducing dots (2026-09-29, 2026-11-03 업데이트)](https://openai.com/index/introducing-dots/)
- [ChatGPT Learn: Meet dots](https://learn.chatgpt.com/docs/dots)
- [OpenAI Help Center: Getting started with your dot](https://help.openai.com/en/articles/20001530-getting-started-with-your-dot)
- [OpenAI Help Center: ChatGPT Enterprise and Edu release notes](https://help.openai.com/en/articles/10128477-chatgpt-enterprise-and-edu-release-notes)
- [OpenAI Help Center: Pricing and billing for dots in ChatGPT Enterprise](https://help.openai.com/en/articles/20001641-pricing-and-billing-for-dots-in-chatgpt-enterprise)
- [Anthropic: Use Claude Cowork on web, desktop, and mobile](https://support.claude.com/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile)
- [Anthropic: Schedule recurring tasks in Claude Cowork](https://support.claude.com/en/articles/13854387-schedule-recurring-tasks-in-claude-cowork)
