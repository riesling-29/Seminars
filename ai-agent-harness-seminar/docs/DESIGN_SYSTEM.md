# Technical Systems Editorial Design System

## 상태와 범위

**확인된 사실:** 현재 Slidev 덱은 `default` Theme을 사용하며 26장이다. 공통 스타일은 `style.css`, `styles/components.css`, 전용 Layout과 Vue Component로 분리되어 있다.

**설계 결정:** 28장 확장 Storyboard 중 모델 기초→행동→Harness를 연결하는 20장 이론 경로, 1장 Audit 원칙과 일반 청중이 자신의 첫 작업을 고르는 5장 적용 사례를 구현한다. 기존 8장 Prototype의 Visual Language를 유지하고, 중복 슬라이드는 삭제하지 않고 새 논리 순서에 통합한다.

**범위 제한:** Headmatter의 `colorSchema: light`는 유지한다. Dark Theme은 `.slidev-layout.tech-system`을 가진 전용 Layout 내부에만 적용하며 Slidev Presenter UI를 전역 변경하지 않는다. 21번은 발표자의 경험에서 도출한 잠정 원칙이고, 22–26번은 합성 시나리오이며 실제 업무 데이터, 실제 예약·결제와 제품별 기능 보장을 포함하지 않는다.

## 시각 방향

Technical Systems Editorial은 기술 시스템의 경계, 흐름, 상태와 근거를 편집 디자인의 계층으로 보여준다. 미래적인 인상은 정밀한 선, 좌표감 있는 작은 레이블, 제한된 색과 넓은 여백으로 만든다. 게임 HUD, 과도한 Cyberpunk 표현, 지속적인 Glow와 장식 Animation은 사용하지 않는다.

## 색상 토큰

| 역할 | Token | 값 | 사용 규칙 |
| --- | --- | --- | --- |
| Canvas | `--ts-bg` | `#07111f` | Prototype Layout 배경 |
| Raised Surface | `--ts-bg-raised` | `#0b1928` | Card와 Node |
| Primary Text | `--ts-ink` | `#f5f7fa` | 제목과 핵심 텍스트 |
| Secondary Text | `--ts-ink-soft` | `#c5d0dc` | 설명 |
| Muted Text | `--ts-ink-muted` | `#8797a8` | Source와 보조 레이블 |
| Agent / Tool / Flow | `--ts-cyan` | `#44d7e8` | Agent, Tool, 데이터 흐름 |
| Approval / Warning | `--ts-amber` | `#f4b85a` | Human Approval과 경고 |
| Validation Success | `--ts-green` | `#67d69a` | Validator 통과 |
| Failure / Forbidden | `--ts-red` | `#f07178` | 누락, 실패, 금지에만 제한 |

색만으로 상태를 구분하지 않는다. `StatusBadge`의 점과 텍스트, Node의 레이블과 테두리를 함께 사용한다. 한 슬라이드의 핵심 Accent는 최대 두 색으로 제한한다.

## Typography와 간격

- 외부 폰트를 추가하지 않고 OS의 `system-ui`와 `Segoe UI` 계열을 사용한다.
- 시스템 레이블과 Source에는 `ui-monospace` 계열을 사용한다.
- 제목은 최대 두 줄이며 본문을 줄여 억지로 맞추지 않는다.
- 기본 Canvas 여백은 좌우 `3.5rem`, 상단 `3rem`이다.
- Card는 한 화면에 최대 4개다. Harness의 기존 6개 항목은 의미를 삭제하지 않고 관찰·실행·판정·기록의 4개 그룹으로 묶었다.

## Diagram 규칙

- Node는 `FlowNode`를 사용하며 얇은 1px 선, 동일 반경과 동일한 Step/Title 계층을 유지한다.
- Edge는 Cyan 단방향 화살표를 사용한다.
- Agent와 Tool은 Cyan, Approval은 Amber, 검증 통과는 Green, 실제 실패나 금지만 Red를 사용한다.
- Harness 경계는 내부 Node보다 강한 선으로 표시하되 Shadow나 Glow로 강조하지 않는다.
- 흐름은 정적 캡처에서도 의미가 유지되어야 하며 장식 Animation을 추가하지 않는다.

## Layout

| Layout | 용도 | 현재 적용 |
| --- | --- | --- |
| `cover-tech` | Cover | 1번 |
| `split-compare` | 두 경계, 실행 형태와 요청 Template 비교 | 8·10·16·18·26번 |
| `process-flow` | 모델 경로, Token Chain, Tool 흐름, Agent Loop와 적용 사례 | 2·6·9·11·12·22–25번 |
| `concept` | Attention, Probability, Harness 경계, 구성요소와 Audit 원칙 | 3·4·5·7·13·14·15·17·20·21번 |
| `evidence` | Trace와 디버깅 근거 | 19번 |

## Component

| Component | 역할 |
| --- | --- |
| `ConceptCard` | 하나의 개념과 보조 설명을 묶는 절제된 Card |
| `FlowNode` | Diagram의 공통 Node |
| `StatusBadge` | 잠정·경고·성공·실패 상태를 색과 레이블로 표시 |
| `EvidenceTag` | Artifact, 용어, 근거 대상을 작은 Tag로 표시 |
| `SourceFooter` | 내용보다 낮은 위계로 출처와 상태 표시 |
| `TakeawayBox` | 슬라이드의 한 메시지를 하단에 고정된 구조로 요약 |
| `AttentionHeatmap` | Self-Attention의 문맥 의존 가중치를 Heatmap으로 표현 |
| `CausalMaskDiagram` | 미래 토큰 접근이 차단되는 삼각 Mask를 표현 |
| `TokenProbabilityBars` | 다음 Token 분포와 진실 확률의 차이를 표현 |
| `TokenChain` | Autoregressive 조건부 선택의 연쇄를 표현 |
| `CodexSlidevFlow` | 현재 Codex·Slidev 작업의 실행 경로를 표현 |
| `HarnessBoundaryDiagram` | Agent Loop와 Harness 통제 경계를 분리해 표현 |

## 적용 및 철회 조건

이 설계 판단은 **2026-07-23 현재 26장 덱**에 유효하다. 1280×720 이상 브라우저와 실제 프로젝터에서 다음 중 하나가 확인되면 관련 Layout 또는 Token을 수정하거나 철회한다.

- Navy 배경에서 본문·Source 대비가 충분하지 않음
- 제목이 두 줄을 넘거나 Card 본문이 잘림
- Flow Node 레이블이나 Edge가 겹침
- Cyan과 Green 또는 Amber의 상태 구분이 프로젝터에서 사라짐
- Presenter UI에 덱 전용 CSS가 누출됨
- 발표 장소 조도와 촬영 조건에서 Light Theme이 더 읽기 쉬움

프로젝터 해상도·조도·관람 거리는 현재 **알 수 없음**이다. Build 성공은 Pixel 수준의 시각 품질을 증명하지 않으며 브라우저와 실제 발표 환경 확인이 필요하다.
