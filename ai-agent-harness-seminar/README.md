# AI Agent와 Agent Harness · 웹 세미나

앞선 Attention·KV Cache 세미나를 들은 청중을 위한 **Slidev 웹 슬라이드 30장**입니다. 모델 내부 계산은 한 장으로 복습하고, 에이전트의 경계·도구 호출·하네스·검증을 합성 사례로 설명합니다. 발표 원고는 각 장의 Speaker Notes(HTML 주석)에 있습니다.

## 발표 흐름 · 약 70–75분, 질의응답 별도

| 구간 | 장 | 예상 |
| --- | ---: | ---: |
| 모델에서 에이전트로, WEF와 켄자쿠 비유 | 1–6 | 12분 |
| 도구 호출, 작업 정의, 재현 가능한 합성 실패·수정 | 7–13 | 18분 |
| WEF 구조, Harness·권한·검증·Trace | 14–20 | 19분 |
| 제품 소개와 적용 판단 | 21–24 | 10분 |
| 실제 블로그 작업 경로와 첫 작업 설계 | 25–30 | 13분 |

시간은 실제 리허설 전 추정치입니다. 각 구간 사이 전환과 짧은 질의를 포함하면 약 70–75분이며, 긴 Q&A는 따로 잡으세요.

## 웹에서 보기

저장소 Settings → Pages → Build and deployment → Source가 **GitHub Actions**로 설정돼 있으면, `main` 변경 시 배포 Workflow가 빌드·배포합니다. 사이트 경로는 다음과 같습니다.

- https://riesling-29.github.io/Seminars/ai-agent-harness-seminar/

Pages 설정과 첫 배포 성공 여부는 Actions에서 확인해야 합니다. 저장소가 공개이므로 원고와 예제에는 합성 데이터만 넣었습니다.

## 로컬 실행

Node.js 20.12 이상과 npm이 필요합니다. 처음 설치는 네트워크가 필요합니다.

```bash
cd ai-agent-harness-seminar
npm ci
npm run dev
# 터미널이 표시하는 URL로 슬라이드 열기. 발표자 화면은 /presenter
npm run validate
npm run build
```

프로젝트 루트의 `npm run build:pages`는 저장소 `origin`을 읽어 Pages 하위 경로로 빌드합니다. 실제 온라인 배포는 저장소의 GitHub Actions Workflow가 담당합니다.

## 데모와 근거

- `demos/edge-build-agent/example/`: 할인·세금 순서에 관한 **합성** unittest 실패와 수정 구현. 별도의 임시 디렉터리에서 재현하는 방법은 해당 README에 있습니다.
- `docs/SOURCES_2026-09-26.md`: WEF 그림 재구성, API 형식, 제품 개요의 원출처와 확인 날짜.
- `docs/SEMINAR_CONTEXT.md`: 작업 정의와 발표 대상, 남은 가정.
- `docs/DECISION_LOG.md`: 초기 26장·진동 데모 설계에서 30장 본편으로 바꾼 이유.
- `handouts/`: Task Contract와 사례/안전/평가 양식.

켄자쿠는 LLM·몸(하네스)·결합된 에이전트를 구분하기 위한 한 장짜리 비유입니다. 저작권을 확인하지 못한 원작 그림은 포함하지 않았습니다. WEF 원본 그림을 넣지 않고 구조를 자체 도형으로 재구성했습니다.

## 발표 전 확인

프로젝터에서 글자 크기와 카드 줄바꿈을 보고, 합성 테스트 실행과 네트워크 불가 상황을 리허설하세요. 제품의 기능과 URL은 바뀔 수 있으니 공식 문서를 다시 확인하세요. 실제 회사 데이터·계정·토큰·내부 로그를 저장소나 데모에 넣지 않습니다.
