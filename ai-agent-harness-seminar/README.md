# AI 에이전트와 하네스: 처음부터 설명하기

[웹 슬라이드 열기](https://riesling-29.github.io/Seminars/ai-agent-harness-seminar/) · [블로그 원문](https://blog29.vercel.app/blog/ai-agent-harness)

Attention과 KV Cache를 배운 청중을 위한 **28장 Slidev 세미나**입니다. 블로그 본문의 정의·설명 순서·예제를 따라 구성했습니다.

## 구성

| 장 | 내용 |
| --- | --- |
| 1–6 | 도입, WEF의 정의와 감지·판단·행동, LLM·하네스·에이전트의 관계 |
| 7–14 | 도구 설명과 호출·실행 왕복, 합성 Python 기록, 공개 API 형식 |
| 15–20 | 역할 구분, WEF 소프트웨어 구조, 자율성·권한과 평가 |
| 21–25 | 실제 제품, MCP·스킬·메모리, 작은 과제와 간단한 대안 |
| 26–28 | 블로그 작성 경로, 정리, 참고 자료 |

설명과 기록 시연을 포함해 약 60–75분을 예상합니다. 실제 시간은 리허설로 조정하며 Q&A는 별도입니다. [본문 대응표](docs/BLOG_TO_SLIDES.md)에서 각 장이 어느 절을 옮겼는지 확인할 수 있습니다.

## 발표 조작

- 방향키 또는 화면의 이동 버튼으로 장을 넘깁니다.
- 11번 장의 **이전 / 다음** 버튼은 합성 코드의 실행 기록 4단계를 전환합니다.
- 실행 기록 재생은 새 LLM 호출이나 라이브 명령 실행이 아닙니다. 재현 코드는 [예제 README](demos/edge-build-agent/example/README.md)에 있습니다.
- 각 장의 HTML 주석은 Slidev 발표자 노트입니다. 개발 서버의 `/presenter`에서 확인할 수 있습니다.

회사 발표를 위해 기본 화면은 밝은 아이보리 배경, 짙은 녹색과 큰 본문 글자로 구성했습니다. 켄자쿠는 6번 장 하단의 작은 이미지와 짧은 비유 한 곳에만 표시합니다.

## 실행과 빌드

Node.js 20.12 이상과 npm이 필요합니다.

```bash
cd ai-agent-harness-seminar
npm ci
npm run dev
npm run validate
npm run build
```

Windows에서 필요하면 `npm.cmd`를 사용합니다. GitHub Pages 빌드는 `npm run build:pages`이며 저장소의 origin 이름으로 하위 경로를 정합니다. main에 반영하면 기존 GitHub Actions Workflow가 검증·빌드·배포합니다.

## 수정할 파일

- `slides.md`: 화면 원고와 발표자 노트
- `styles/seminar.css`: 이번 덱의 디자인
- `components/SeminarDiagram.vue`: WEF와 도구 호출·블로그 작성 흐름의 편집 가능한 도식
- `components/RecordedTrace.vue`: 합성 코드 실행 기록 재생
- `components/KenjakuAside.vue`: 작은 보조 비유
- `docs/SOURCES_2026-09-26.md`: 출처

실제 회사 데이터·계정·토큰·내부 로그를 포함하지 않습니다. 이전 기획 문서는 이력으로 남기며 현재 본편 구성은 `docs/SEMINAR_CONTEXT.md`와 본문 대응표를 따릅니다.
