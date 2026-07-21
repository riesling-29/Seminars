# Decision Log

모든 항목은 잠정 결정이다. Status는 Proposed 또는 Accepted for prototype만 사용하며 Final로 표시하지 않는다.

## D-001

- **Date:** 2026-07-21
- **Decision:** Slidev 52.18.0과 npm을 초기 발표 기반으로 사용한다.
- **Status:** Accepted for prototype
- **Rationale or evidence:** 공식 npm 메타데이터의 Node 요구사항과 현재 Node 24.18.0이 호환되며 Markdown, Presenter Note, Vue Component, Mermaid 요구를 한 도구에서 다룬다. 확인: 2026-07-21, https://www.npmjs.com/package/@slidev/cli 및 https://sli.dev/guide/syntax
- **Alternatives considered:** 정적 Markdown, PowerPoint, 별도 Vite/Vue 앱, Do Nothing
- **Consequences:** 최초 설치에 npm registry가 필요하며 버전과 빌드를 재검증해야 한다. 별도 vite.config.ts는 현재 만들지 않는다.
- **Reversal conditions:** 오프라인 발표 환경에서 사전 설치물을 쓸 수 없거나, 빌드/표시 호환성이 실패하거나, 운영자가 PowerPoint를 필수로 요구함
- **Review date:** 본편 제작 시작 전

## D-002

- **Date:** 2026-07-21
- **Decision:** 별도 저장소가 아닌 현재 Monorepo의 ai-agent-harness-seminar/ 하위 프로젝트로 관리한다.
- **Status:** Accepted for prototype
- **Rationale or evidence:** 사용자 지정 저장소 경계와 기존 Git root 확인
- **Alternatives considered:** 독립 저장소, Submodule, 작업 보류
- **Consequences:** 중첩 .git을 금지하고 모든 의존성·산출물 경로를 프로젝트 안에 둔다.
- **Reversal conditions:** 저장소 관리자가 별도 저장소 이전을 명시적으로 승인함
- **Review date:** 저장소 정책 변경 시

## D-003

- **Date:** 2026-07-21
- **Decision:** 발표 시간은 75분으로 설계한다.
- **Status:** Proposed
- **Rationale or evidence:** 사용자 요청의 잠정 가정
- **Alternatives considered:** 45분, 60분, 90분, 시간 확정까지 구성 보류
- **Consequences:** 25~32장과 데모 2개 후보를 시간표에 배치한다.
- **Reversal conditions:** 실제 세션 길이 또는 Q&A 포함 시간이 확정됨
- **Review date:** 일정 확정 즉시

## D-004

- **Date:** 2026-07-21
- **Decision:** 합성 진동 신호 분석을 메인 데모로 사용한다.
- **Status:** Proposed
- **Rationale or evidence:** 청중 직무 연결성, metadata 누락과 Validator를 한 흐름에서 설명 가능
- **Alternatives considered:** Build/Test Failure만 사용, 문서 조사, 데모 없음
- **Consequences:** sampling frequency 누락 시 추정하지 않고 중단하는 경로를 핵심으로 삼는다.
- **Reversal conditions:** 결정론적 Validator를 정의할 수 없거나 리허설 안정성이 기준 미달임
- **Review date:** 데모 spike 완료 후

## D-005

- **Date:** 2026-07-21
- **Decision:** Build 또는 Test Failure 조사를 보조 데모로 둔다.
- **Status:** Proposed
- **Rationale or evidence:** Edge/소프트웨어 청중에게 파일 범위·최소 Diff·테스트 판정을 보여줄 수 있음
- **Alternatives considered:** 시뮬레이션 설정 검사, 보조 데모 없음
- **Consequences:** 실제 회사 코드 대신 작은 합성 저장소가 필요하다.
- **Reversal conditions:** 발표 시간 부족, 도구체인 설치 불가, 메인 데모와 메시지 중복
- **Review date:** 발표 시간 확정 후

## D-006

- **Date:** 2026-07-21
- **Decision:** 공식 GitHub Pages Actions로 Root Landing Page와 세미나 하위 경로를 배포하도록 구성하되 실제 공개는 별도 승인 전까지 수행하지 않는다.
- **Status:** Accepted for prototype
- **Rationale or evidence:** 사용자 요청과 실제 Git remote의 repository name, GitHub 공식 Custom Workflow 문서. Base Path는 /<repository-name>/ai-agent-harness-seminar/로 동적 계산한다.
- **Alternatives considered:** 로컬 전용, 사내 정적 호스팅, PDF 배포
- **Consequences:** 일반 dist/와 별도 _pages/ staging을 사용하고, Pages Source 활성화와 공개 범위 확인이 사용자 작업으로 남는다.
- **Reversal conditions:** Private Pages 정책 불가, 공개 금지, 다른 호스팅 지정, 원격 기본 브랜치 변경, Node 24 LTS 종료, 사용 중인 공식 Pages Action Major의 지원 종료
- **Review date:** 첫 실제 배포 직전과 2026-10-21 중 빠른 시점

## D-007

- **Date:** 2026-07-21
- **Decision:** 저장소의 데모와 캡처에는 합성 데이터만 사용한다.
- **Status:** Accepted for prototype
- **Rationale or evidence:** 사용자 보안 요구사항
- **Alternatives considered:** 익명화 실제 데이터, 외부 공개 데이터, 데모 없음
- **Consequences:** 실제 업무 성능을 대표한다고 주장할 수 없고 이를 명시해야 한다.
- **Reversal conditions:** 더 엄격한 정책이면 데모 제거; 실제 데이터 사용은 별도 서면 승인과 저장소 밖 통제가 있을 때만 재검토
- **Review date:** 각 데모 구현 전

## D-008

- **Date:** 2026-07-21
- **Decision:** Multi-Agent와 MCP 상세 설명은 부록 후보로 제한하고 구현하지 않는다.
- **Status:** Proposed
- **Rationale or evidence:** 입문 청중과 현재 작업 범위에서 핵심 Agent Loop/Harness를 우선
- **Alternatives considered:** 본편 상세 설명, 완전 제외
- **Consequences:** 본편의 인지 부하와 구현 범위를 줄인다.
- **Reversal conditions:** 청중 사전 조사에서 해당 개념이 핵심 요구로 확인됨
- **Review date:** 사전 설문 후

## D-009

- **Date:** 2026-07-21
- **Decision:** 발표자료는 한국어 중심, 핵심 기술 용어는 영어를 유지한다.
- **Status:** Accepted for prototype
- **Rationale or evidence:** 사용자 요구와 용어 경계의 일관성
- **Alternatives considered:** 완전 한국어화, 완전 영어
- **Consequences:** 첫 등장에 작업 정의가 필요하다.
- **Reversal conditions:** 청중 언어 또는 공식 템플릿 요구가 달라짐
- **Review date:** 콘텐츠 리뷰 시

## D-010

- **Date:** 2026-07-21
- **Decision:** 저장소는 초기 Private 운영을 가정한다.
- **Status:** Proposed
- **Rationale or evidence:** 사용자 요청의 잠정 가정이며 실제 원격 공개 설정은 저장소에서 알 수 없음
- **Alternatives considered:** Public, 사내 전용 호스팅, 배포 보류
- **Consequences:** 공개 가능성은 별도 검토하며 민감정보 금지는 Private 여부와 무관하게 적용한다.
- **Reversal conditions:** 저장소 관리자와 보안 담당자가 공개 범위를 확정함
- **Review date:** 첫 배포 전

## D-011

- **Date:** 2026-07-21
- **Decision:** npm audit 경고에 대해 자동 downgrade를 적용하지 않고 현재 Slidev 버전을 유지한 채 위험을 기록한다.
- **Status:** Accepted for prototype
- **Rationale or evidence:** npm audit이 전이 의존성 monaco-editor/dompurify 경로에서 low 5개와 moderate 1개를 보고했으며 자동 수정은 @slidev/cli 52.18.0을 52.9.1로 바꾸도록 제안했다. 현재 자료는 로컬에서 관리자가 작성한 정적 콘텐츠만 사용하고 외부 입력 HTML을 받지 않는다.
- **Alternatives considered:** npm audit fix --force, Slidev downgrade, dependency override, Slidev 사용 보류
- **Consequences:** 알려진 경고가 남으며 공개 배포 또는 외부 콘텐츠 처리 전에 재평가해야 한다.
- **Reversal conditions:** 수정된 공식 릴리스가 제공됨, 보안 정책이 경고 0건을 요구함, 외부 입력 콘텐츠를 렌더링하게 됨, 영향 분석에서 현재 사용 경로가 취약함이 확인됨
- **Review date:** 본편 제작 전 또는 다음 Slidev 보안 릴리스 시
