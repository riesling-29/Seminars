# AI 에이전트와 하네스: 처음부터 설명하기

[웹 슬라이드 열기](https://riesling-29.github.io/Seminars/ai-agent-harness-seminar/) · [블로그 원문](https://blog29.vercel.app/blog/ai-agent-harness)

Attention과 KV Cache를 배운 청중을 위한 **32장 Slidev 세미나**입니다. 블로그 본문을 따라 LLM의 역할, 에이전트 구조, 도구 호출과 실행, API 표현, 평가·사용 사례까지 설명합니다. 켄자쿠 비유는 포함하지 않습니다.

## 구성

| 장 | 내용 |
| --- | --- |
| 1–3 | 표지, LLM이 할 수 있는 일, ‘에이전트’ 정의의 여러 관점 |
| 4–8 | 전체 도구 왕복, 감지·판단·행동, 코딩 어시스턴트 예시, 소프트웨어 층, 하네스 역할 |
| 9–13 | 도구 명세, Qwen3 Hermes-style 호출·응답, 권한 확인과 다음 행동 |
| 14–19 | 할인·세금 합성 코드 예제, 실패 이유, 실행 기록, 공개 API 왕복 |
| 20–24 | 에이전트·하네스·실행 환경, 자율성·권한, 평가·거버넌스 |
| 25–29 | 실제 에이전트 프로젝트, MCP·스킬·메모리, 과제 예시와 단순한 대안 |
| 30–32 | 블로그 작성 경로, 정리, 참고 자료 |

현재 본문과 장의 연결은 [블로그 대응표](docs/BLOG_TO_SLIDES.md), 출처와 범위는 [출처표](docs/SOURCES_2026-09-26.md)에서 확인합니다.

## 발표 조작

- 방향키 또는 화면의 이동 버튼으로 장을 넘깁니다.
- 16번 장의 **이전 / 다음** 버튼은 합성 코드 실행 기록의 네 단계를 전환합니다.
- 실행 기록 재생은 새 LLM 호출이나 라이브 명령 실행이 아닙니다. 재현 코드는 [예제 README](demos/edge-build-agent/example/README.md)에 있습니다.
- 각 장의 HTML 주석은 Slidev 발표자 노트입니다. 개발 서버의 `/presenter`에서 확인할 수 있습니다.

밝은 아이보리 배경과 짙은 녹색을 사용합니다. 화면에 핵심 설명과 쉬운 예시를 담고, 발표자 노트는 보충 맥락과 출처를 맡습니다. 하단 출처는 본문과 겹치지 않도록 여백을 확보합니다.

## 실행과 빌드

Node.js 20.12 이상과 npm이 필요합니다.

```bash
cd ai-agent-harness-seminar
npm ci
npm run dev
npm run validate
npm run build
```

Windows에서는 필요하면 `npm.cmd`를 사용합니다. GitHub Pages 빌드는 `npm run build:pages`입니다. main에 반영하면 GitHub Actions가 검증·빌드·배포합니다.

## 수정할 파일

- `slides.md`: 화면 원고와 발표자 노트
- `styles/seminar.css`: 이 덱의 본문·여백·출처 스타일
- `components/SeminarDiagram.vue`: 에이전트 구조, 도구 왕복, 작성 흐름 도식
- `components/RecordedTrace.vue`: 합성 코드 실행 기록 재생
- `docs/BLOG_TO_SLIDES.md`: 본문 대응표와 편집 기준
- `docs/SOURCES_2026-09-26.md`: 출처표

실제 회사 데이터·계정·토큰·내부 로그를 포함하지 않습니다. 이전 기획 문서는 이력으로 남기며, 현재 본편 구성은 대응표와 slides.md를 따릅니다.
