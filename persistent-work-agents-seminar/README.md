# Persistent Work Agents Seminar

한국어 제목: 채팅이 끝나도 일은 계속된다 — 상시 작업 에이전트 비교

채팅 턴 단위 에이전트에서 상시 작업(Persistent Work / Always-on) 에이전트로의 변화를 다룬다. Meta Muse, xAI Grok Bot, Manus Cloud Computer를 공식 자료 기준으로 비교하고, 공식 발표가 없는 OpenAI Aeon / “o”는 보도 수준의 가설로만 다룬다.

## 구성 (18장)

1. 표지, 목차와 증거 라벨 범례
2. Part 1 개요: 세션 → 에이전트, 세 기둥(Computer · Background · Approval)
3. Part 2 제품: Muse, Grok Bot, Manus, Aeon / “o”(미확인), 비교 매트릭스, 격리 모델
4. Part 3 추세: 런타임·거버넌스, Shared vs Dedicated, Skill·Routine, 소비자 경쟁 타임라인
5. 도입 질문 체크리스트, 출처

## 증거 라벨

슬라이드마다 `FACT`(공식 자료), `HYPOTHESIS`(가설·보도), `UNAVAILABLE`(공식 자료 없음)을 표시한다. 규칙은 docs/EVIDENCE_POLICY.md, 원문 발췌는 docs/SOURCES_2026-09-29.md에 있다.

## 로컬 실행

    cd persistent-work-agents-seminar
    npm ci
    npm run dev

검증과 빌드:

    npm run validate
    npm run build

`validate`는 필수 파일, 빈 슬라이드, 슬라이드 수(14~18), FACT 슬라이드의 sources frontmatter, Aeon / “o” 슬라이드의 가설 라벨을 검사한다.

## GitHub Pages

    npm run build:pages
    npm run preview:pages

`build:pages`는 저장소 루트 `_pages/persistent-work-agents-seminar/`만 교체하고 Landing Page를 다시 쓴다. 다른 세미나의 staging 결과는 지우지 않는다. 이 덱은 `routerMode: hash`를 사용하므로 슬라이드 직접 링크에 404 fallback이 필요 없다.

## 디자인

- 어두운 배경, 제품별 고정 색(Muse 파랑, Grok Bot 보라, Manus 주황, Aeon 회색 점선)
- 레이아웃은 `layouts/deck.vue` 하나에 `class: cover`, `class: section` 변형
- 폰트는 ai-agent-harness-seminar와 같은 Noto Sans KR 서브셋(OFL, public/fonts/)
