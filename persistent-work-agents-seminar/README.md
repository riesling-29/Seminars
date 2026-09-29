# Persistent Work Agents Seminar

한국어 제목: 채팅이 끝나도 일은 계속된다 — 상시 작업 에이전트 비교

채팅 턴 단위 에이전트에서 상시 작업(Persistent Work / Always-on) 에이전트로의 변화를 다룬다. Meta Muse, xAI Grok Bot, Manus Cloud Computer, OpenAI Dots(DevDay 2026, 2026-09-29 발표)를 공식 자료 기준으로 비교한다.

ai-agent-harness-seminar 본편 뒤에 붙는 짧은 후속 섹션이다. 독립된 긴 발표가 아니며 8~12장(현재 10장)을 유지한다.

## 구성 (10장)

1. 표지: 세 파트 안내와 증거 라벨 범례
2. 01 변화 개요: 세션 → 에이전트
3. 01 변화 개요: 세 기둥(Computer · Background · Approval)
4. 02 제품 비교: 네 제품 장단점 한눈에 보기
5. 02 제품 비교: 비교 매트릭스 (persistence, computer, multi-agent, channels, maturity)
6. 02 제품 비교: 누가 컴퓨터를 공유하는가 (격리 모델)
7. 02 제품 비교: OpenAI Dots — DevDay 2026 공식 발표 (특징·제약·확인 못 한 것)
8. 03 추세: 지속성 기본값, 승인·감사, Shared vs Dedicated, Skill·Routine
9. 03 추세: 소비자용 상시 에이전트 경쟁 타임라인
10. 도입 전 질문과 출처

## 증거 라벨

슬라이드마다 `FACT`(공식 자료), `HYPOTHESIS`(가설·보도), `UNAVAILABLE`(공식 자료 없음)을 표시한다. 규칙은 docs/EVIDENCE_POLICY.md, 원문 발췌는 docs/SOURCES_2026-09-29.md에 있다.

## 로컬 실행

    cd persistent-work-agents-seminar
    npm ci
    npm run dev

검증과 빌드:

    npm run validate
    npm run build

`validate`는 필수 파일, 빈 슬라이드, 슬라이드 수(8~12), FACT 슬라이드의 sources frontmatter, Aeon / “o” 슬라이드의 가설 라벨을 검사한다.

## GitHub Pages

    npm run build:pages
    npm run preview:pages

`build:pages`는 저장소 루트 `_pages/persistent-work-agents-seminar/`만 교체하고 Landing Page를 다시 쓴다. 다른 세미나의 staging 결과는 지우지 않는다. 이 덱은 `routerMode: hash`를 사용하므로 슬라이드 직접 링크에 404 fallback이 필요 없다.

## 디자인

- 어두운 배경, 제품별 고정 색(Muse 파랑, Grok Bot 보라, Manus 주황, Dots 흰색)
- 레이아웃은 `layouts/deck.vue` 하나에 `class: cover`, `class: section` 변형
- 폰트는 ai-agent-harness-seminar와 같은 Noto Sans KR 서브셋(OFL, public/fonts/)
