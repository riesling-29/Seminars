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

## D-012

- **Date:** 2026-07-23
- **Decision:** 기존 8장 Prototype을 삭제하지 않고 재사용·재배치하여, Self-Attention 복습부터 Agent Harness까지 이어지는 20장 이론 경로로 통합한다.
- **Status:** Accepted for prototype
- **Rationale or evidence:** 사용자 요청의 21개 논리 항목은 일부를 한 장에 통합할 수 있으나 Self-Attention→조건부 Token 분포→행동→Agent Loop→Harness→Validator의 인과적 연결은 생략할 수 없다. Vaswani et al. (2017) §3.2.1·§3.2.3·§3.4, Brown et al. (2020) §2.1·§5, Anthropic의 2024·2025·2026 Agent/Harness 문서를 2026-07-23 확인했다.
- **Alternatives considered:** 기존 8장 유지, 16장 압축, 18장 압축, 요청 항목별 21장, 28장 Storyboard 전체 구현, Do Nothing
- **Consequences:** 실제 데모와 Handout 실습은 현재 덱 밖에 남는다. 각 슬라이드는 한 메시지를 유지하고 상세 근거는 Speaker Note로 이동한다.
- **Reversal conditions:** 리허설에서 60분 이내 전달이 불가능함, 앞선 세미나의 실제 범위가 현재 복습 가정과 다름, 프로젝터에서 Diagram·KaTeX 가독성이 실패함, 원출처의 관련 정의가 변경됨
- **Review date:** 첫 전체 리허설 직전 또는 원출처 변경 시

## D-013

- **Date:** 2026-07-23
- **Decision:** 20장 이론 경로 뒤에 일반 청중용 합성 적용 사례 4장과 첫 요청 Template 1장을 추가해 총 25장으로 구성한다.
- **Status:** Accepted for prototype
- **Rationale or evidence:** 사용자는 설치 직후 어떤 작업을 시킬 수 있는지 사례별로 이해하고 자신의 업무를 연상할 수 있는 구간을 요청했다. 파일 정리, 자료 조사, 표 변환, 생활 계획은 각각 Local File, Evidence, Deterministic Validator, Human Approval 경계를 보여준다.
- **Alternatives considered:** 기존 20장 유지, 사례를 한 장에 압축, 실제 제품 시연 추가, Handout만 제공, Do Nothing
- **Consequences:** 발표 시간이 늘어나며 사례는 실제 기능·효과 보장이 아닌 Tool·Permission 의존 합성 시나리오로 표시한다. 기존 20번의 비사용 판단 뒤에 배치해 Agent 만능론으로 읽히지 않게 한다.
- **Reversal conditions:** 75분 리허설에서 시간 초과, 일반 청중이 사례를 제품 기능 보장으로 오해함, 시각 검토에서 반복 Flow가 과밀함, 실제 발표 대상이 전문 개발자만으로 확정됨
- **Review date:** 첫 전체 리허설 직전

## D-014

- **Date:** 2026-07-23
- **Decision:** 적용 사례 앞에 “코드를 모두 읽기 어려워질수록 Audit 가능한 창구를 먼저 만든다”는 발표자 실무 원칙을 1장 추가한다.
- **Status:** Accepted for prototype
- **Rationale or evidence:** Agent가 생성하는 변경량이 늘어날 때 사람이 통제권을 유지하려면 Scope·Intent·Evidence·Authority를 한곳에서 확인할 수 있어야 한다는 사용자 경험을 반영한다. Transcript·Outcome·Validator와 Append-oriented Trace는 이 창구를 구성하는 보조 근거다.
- **Alternatives considered:** 사례 슬라이드의 Note에만 포함, 마지막 요청 Template에 통합, 별도 Handout으로 이동, Do Nothing
- **Consequences:** 총 26장이 되며 22–26번 사례는 “무엇을 시킬 수 있는가”와 함께 “어떻게 감사할 것인가”를 설명해야 한다. 이 원칙은 코드 리뷰의 대체물이 아니라 검토 범위와 근거를 조직하는 장치로 표현한다.
- **Reversal conditions:** 변경량이 작아 전수 리뷰가 충분함, Audit 신호가 중대한 결함을 반복적으로 놓침, 안전·규제·핵심 로직에서 전문 전수 리뷰가 요구됨, 리허설에서 사례와 연결되지 않음
- **Review date:** 첫 실제 Pilot과 전체 리허설 직전


## D-015

- **Date:** 2026-09-26
- **Decision:** 사용자의 새 지시에 따라 Slidev 본편을 30장으로 재구성하고, 합성 버그 수정 Trace를 실행 가능한 예제로 추가한다.
- **Status:** Accepted for prototype
- **Rationale or evidence:** 2026-07-21 Canonical Context의 ‘전체 발표자료·Commit·Push 비범위’ 및 메인 진동 데모 계획과 이번 사용자의 웹 슬라이드 제작 요청이 충돌한다. 현재 요청을 우선 적용한다. Attention·KV Cache를 배운 청중에게 모델 내부 복습을 한 장으로 줄이고 WEF 구조, 켄자쿠 비유, 도구 API, 제품·사용 사례를 넣는다.
- **Alternatives considered:** 기존 26장 유지, 별도 저장소, 진동 데모 전체 구현, Do Nothing
- **Consequences:** 발표 시간은 70–75분 잠정이며 Q&A는 별도다. 진동 메인 데모는 설계 문서에 남고, 이번 덱은 재현 가능한 합성 unittest Trace를 사용한다. GitHub Pages 활성화 및 공개 범위는 저장소 설정에 달려 있다.
- **Reversal conditions:** 발표 일정·보안 정책·공개 범위나 리허설 결과가 바뀜
- **Review date:** 첫 전체 리허설과 실제 공개 전


## D-016

- **Date:** 2026-09-26
- **Decision:** 블로그 본문 기준으로 본편을 28장으로 전면 재작성하고, 기존 덱의 별도 Audit·생활 활용 확장을 제외한다. 회사 발표용으로 켄자쿠 이미지와 설명을 6번 장 하단에 작게 포함한다.
- **Status:** Accepted for prototype
- **Rationale or evidence:** 사용자가 기존 30장의 내용 불일치와 이해하기 어려운 문장을 지적하고 전체 재작성을 요청했다. 이후 켄자쿠 내용·이미지를 작게 해 달라고 명시했다. 초기 범위·스타일·이미지 사용 지침과 충돌하는 부분은 현재 요청을 우선했다.
- **Alternatives considered:** 기존 자료 부분 수정, 이전 미완성 27장 초안, 새 PPTX, 기존 자료 유지
- **Consequences:** 본문과 슬라이드 대응표를 추가하고 별도 전용 레이아웃·CSS를 사용한다. 원본 제공 이미지는 원형 그대로 작게 표시한다. 실제 실행 기록은 정적 웹에서 단계별로 재생한다.
- **Reversal conditions:** 사용자 피드백 또는 회사 발표 환경에서 가독성 문제가 확인됨
- **Review date:** 다음 사용자 검토 및 발표 리허설



## D-017

- **Date:** 2026-09-27
- **Decision:** 블로그 기준 덱을 32장으로 다시 구성한다. 켄자쿠 비유와 이미지를 제외하고, 화면에 설명과 쉬운 예시를 충분히 남긴다.
- **Status:** Accepted for prototype
- **Rationale or evidence:** 사용자가 기존 장들의 설명 부족, 맥락 누락, 출처와 본문 중첩을 지적하고 전체를 끝까지 재작성하라고 요청했다. 특히 LLM의 가능/불가, WEF 구조를 코딩 어시스턴트에 대응한 예, 도구 호출과 API의 실제 요청·실행·응답 주체, 할인·세금 계산 오류의 맥락을 명시했다. Qwen3 공식 문서는 Hermes-style tool calling 형식을 안내한다.
- **Alternatives considered:** 28장 유지 후 일부 페이지 보수, 페이지 밀도를 유지한 발표자 노트 추가, Do Nothing
- **Consequences:** 도식에서 LLM·하네스·실행 환경을 따로 표시하고, 도구 호출·Qwen 형식·실제 API 왕복·코드 예제를 순서대로 설명한다. 본문 하단 공간을 늘려 출처 푸터와 겹치지 않게 한다. 웹 배포 뒤 실제 렌더링 확인이 필요하다.
- **Reversal conditions:** 리허설에서 장 수나 문장 밀도가 이해를 방해함, 실제 프로젝터에서 도식이나 본문이 읽히지 않음, Qwen·제품 공식 문서가 변경됨
- **Review date:** 다음 사용자 검토와 전체 리허설

## D-018

- **Date:** 2026-09-27
- **Decision:** Slidev의 첫 장 앞에 있던 단독 구분자를 제거하고 표지 본문을 첫 슬라이드에 연결한다.
- **Status:** Accepted for prototype
- **Rationale or evidence:** 공개 웹 슬라이드에서 1페이지가 비어 보인다는 사용자 보고. Slidev 공식 문서는 첫 YAML 블록을 덱 설정이자 첫 슬라이드의 frontmatter로 설명하며, 슬라이드 구분자는 실제 슬라이드 사이에 사용한다.
- **Alternatives considered:** 현재 구조 유지, 커버 레이아웃 콘텐츠만 수정
- **Consequences:** 첫 페이지부터 표지가 표시되어야 한다. Pages 배포 완료 후 공개 URL에서 확인한다.
- **Reversal conditions:** 실제 배포 렌더링에서 첫 페이지가 여전히 비어 있거나 레이아웃 문제가 발생함
- **Review date:** 다음 웹 확인 시

## D-019

- **Date:** 2026-09-27
- **Decision:** 기존 32장 덱의 내용과 레이아웃을 교체해 34장으로 제로베이스 재작성한다.
- **Status:** Accepted for prototype
- **Rationale or evidence:** 사용자가 기존 덱만 보고 LLM·하네스·에이전트를 이해할 수 없다고 지적하며 블로그 요점 중심의 전면 재작성을 명시했다. 원문 최신 blob 9286efa69583e10579a57eea5d8a244753123cb2를 전체 읽고 대응표를 새로 작성했다.
- **Alternatives considered:** 기존 덱 일부 보수, 기존 구성 유지, 원문과 무관한 새 교육과정. 최신 요청에 따라 전체 재작성을 선택했다.
- **Consequences:** 첫 7장에서 개념과 WEF 구조를 완결하고, 8–13장에서는 하나의 주문 계산 사례로 작업을 설명한다. API에는 발신자·수신자·실행자를 표시한다. 글꼴·본문 줄간격·푸터를 전용 레이아웃으로 관리하고 모든 장을 실제 렌더링해 검토한다. 앞서 승인된 main 반영·배포 작업의 수정으로 수행한다.
- **Reversal conditions:** 슬라이드만 읽었을 때 핵심 개념·호출/실행 구분을 설명하기 어렵거나, 원문 대응·실제 화면·API 형식 검증에서 오류가 확인됨
- **Review date:** 현재 배포 검증과 다음 사용자 검토. 제품 설명은 원문 2026-09-23 확인 시점, API·템플릿은 2026-09-27 문서 범위로 제한한다.


## D-020

- **Date:** 2026-09-29
- **Decision:** 표지 다음에 LLM 기본 구조·Attention·KV Cache 복습을 한 장 추가해 35장으로 구성한다.
- **Status:** Accepted
- **Rationale or evidence:** 사용자가 참석자들에게 물어보니 기존 내용을 잘 기억하지 못한다고 설명하며 한 장 추가를 요청했다. Hugging Face의 How caching works 및 Transformer Architectures를 2026-09-29 확인했다.
- **Consequences:** 새 2장은 토큰화·임베딩, Transformer 여러 층, 다음 토큰 확률·선택, Attention의 Q/K/V, 이전 층별 K/V 재사용과 새 K/V 추가를 설명한다. 기존 2–34장은 3–35장으로 이동한다. 발표자 노트에 복습 대본을 포함한다. 기존 승인된 main 반영·배포 작업의 연속으로 수행한다.
- **Scope:** 일반적인 decoder-only Transformer 추론의 교육용 요약. 정규화·잔차·위치 정보 등은 생략하며 새 Attention 계산은 계속 필요함을 명시한다.
- **Sources:** https://huggingface.co/docs/transformers/main/cache_explanation ; https://huggingface.co/learn/llm-course/en/chapter1/6
- **Reversal conditions:** 실제 화면에서 내용이 넘치거나, Q/K/V와 저장된 계산의 의미를 오해하게 하는 표현이 확인되면 수정한다.
- **Review date:** 현재 변경 검증 및 다음 사용자 리허설.
- **Validation:** Slidev 파서 35장·빈 장 없음, Pages 빌드·git diff --check 통과. 1280×720 브라우저에서 1·2·3·35장 확인 후 새 2장의 중복 하단 문구와 여백을 조정해 재검사: 본문 넘침·푸터 겹침·앱/리소스 오류 0.
