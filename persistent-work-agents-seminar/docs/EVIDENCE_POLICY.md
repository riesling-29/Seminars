# 증거 라벨 정책

이 덱의 모든 주장은 세 가지 중 하나로 분류한다.

| 라벨 | 컴포넌트 | 기준 |
| --- | --- | --- |
| FACT · 공식 자료 | `<Ev kind="fact" />` | 제조사 공식 발표, 공식 문서, 공식 도움말에 적힌 내용 |
| HYPOTHESIS · 가설 | `<Ev kind="hypothesis" />` | 2차 보도, 유출, 또는 발표자의 해석·추세 판단 |
| UNAVAILABLE · 공식 자료 없음 | `<Ev kind="unavailable" />` | 공식 자료가 없거나, 인용한 공식 자료에서 찾지 못한 항목 |

## 규칙

- `note` 속성으로 라벨의 부제를 바꿀 수 있다. 예: `<Ev kind="hypothesis" note="2차 보도" />`
- FACT 라벨이 있는 슬라이드는 frontmatter `sources`에 `name`과 `https` URL을 둔다. `npm run validate`가 이를 검사한다.
- “Aeon” 또는 “o”를 언급하는 슬라이드는 HYPOTHESIS 또는 UNAVAILABLE 라벨이 있어야 한다. `npm run validate`가 이를 검사한다.
- “설명 없음”은 기능이 없다는 뜻이 아니라, 인용한 공식 자료에서 확인하지 못했다는 뜻으로 쓴다.
- 도식(격리 모델, 스펙트럼, 타임라인)은 공식 서술을 발표자가 그림으로 옮긴 것이며 제조사의 내부 아키텍처 도면이 아니다. 슬라이드에 그 점을 밝힌다.
- 가격, 사용자 수, 벤치마크, 순위는 사용하지 않는다.

## 발표 당일 갱신

OpenAI가 DevDay 등에서 공식 발표를 하면 Aeon / “o” 슬라이드를 공식 원문으로 교체하고, 라벨을 FACT로 바꾸기 전에 원문 URL과 확인 시각을 docs/SOURCES_2026-09-29.md에 추가한다.
