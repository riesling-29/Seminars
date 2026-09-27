# AI 에이전트와 하네스: 처음부터 설명하기

[웹 슬라이드](https://riesling-29.github.io/Seminars/ai-agent-harness-seminar/) · [블로그 원문](https://blog29.vercel.app/blog/ai-agent-harness)

Attention과 KV Cache를 배운 청중을 위한 **34장 Slidev 발표자료**입니다. 블로그 원문을 바탕으로 2026-09-27에 내용과 레이아웃을 새로 작성했습니다.

첫 7장에서 LLM·하네스·도구·실행 환경·에이전트를 정의합니다. 이후 할인·세금 계산 오류 하나를 따라 목표, 도구 설명, 모델의 호출 요청, 실제 실행, 실패, 수정과 재검증을 설명합니다. 발표자 노트 없이도 화면의 정의와 예시를 읽을 수 있도록 구성했습니다.

## 구성

| 장 | 내용 |
| --- | --- |
| 1–7 | LLM, 할 수 있는 일, 하네스, 에이전트 전체, WEF 감지·판단·행동과 소프트웨어 층 |
| 8–13 | 주문 계산 9,900원의 맥락, 도구 명세, 요청, 실제 실패, 수정과 재검증 |
| 14–18 | Qwen3 Hermes-style, OpenAI·Claude의 발신자·수신자, Hermes Agent 실행 기록 |
| 19–24 | 채팅·워크플로·에이전트, 연결된 도구, 자율성과 권한, 분류·평가·통제 |
| 25–28 | 실제 제품, MCP, 스킬과 지속 메모리 |
| 29–32 | 코딩·문서·데이터 과제, 단순한 대안, 블로그 작성·공개 과정 |
| 33–34 | 역할 요약과 참고 자료 |

전체 대응은 [블로그 대응표](docs/BLOG_TO_SLIDES.md)에 있습니다. 켄자쿠 비유와 이름 표기는 최신 사용자 요청에 따라 제외했습니다.

## 발표 조작

- 방향키로 장을 넘깁니다. 코드와 실행 기록은 화면에 모두 표시합니다.
- 각 장 하단의 출처와 제품명은 공식 자료 링크입니다.
- HTML 주석은 Slidev 발표자 노트입니다. /presenter에서 확인할 수 있습니다.
- 실행 기록은 설명용으로 정리한 기록이며 웹 슬라이드가 실제 모델이나 셸을 호출하지 않습니다.
- 재현 코드는 [예제 폴더](demos/edge-build-agent/example/README.md)에 있습니다.

## 실행과 검증

Node.js 20.12 이상과 npm이 필요합니다.

~~~bash
cd ai-agent-harness-seminar
npm ci
npm run dev
npm run validate
npm run build:pages
~~~

Windows에서는 필요하면 npm.cmd를 사용합니다. validate는 필수 파일과 실제 Slidev 파서의 빈 슬라이드를 확인합니다. build:pages는 GitHub Pages 경로와 자산을 확인합니다. main에 반영하면 기존 GitHub Actions가 검증·빌드·배포합니다.

빌드 성공과 실제 화면 검토는 별개입니다. 본문 영역과 출처 영역을 분리했으며, 1280×720 기준으로 모든 장을 렌더링해 넘침과 화면 가독성을 검토합니다. 검증 기록은 [QA 문서](docs/QA_2026-09-27.md)에 남깁니다.

## 수정할 파일

- slides.md: 화면 원고, 출처, 발표자 노트
- layouts/lesson.vue: 공통 본문 영역과 페이지·출처 푸터
- styles/lesson.css: 새 덱 전용 스타일
- components/AgentSystem.vue: 에이전트 전체와 구성 요소 관계도
- public/fonts/: Noto Sans KR 웹 글꼴과 OFL 라이선스
- docs/BLOG_TO_SLIDES.md: 원문 대응표

실제 회사 데이터·계정·토큰·내부 로그는 포함하지 않습니다. 이전 레이아웃·컴포넌트·기획 문서는 이력으로 남아 있지만 현재 덱에서는 사용하지 않습니다.
