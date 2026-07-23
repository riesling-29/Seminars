# 모델에서 시스템으로: AI Agent와 Agent Harness

**From Models to Systems: AI Agents and Agent Harnesses**

회사 내부 엔지니어가 AI Agent와 Agent Harness를 과장 없이 이해하고, 안전하게 검증 가능한 첫 작업을 설계하도록 돕는 웹 기반 세미나 프로젝트다. 발표자료와 예시는 실제 회사 정보가 아닌 합성 데이터만 사용한다.

## 세미나가 연결하는 지점

앞선 Self-Attention, Large Language Model, KV Cache 세미나가 모델 내부의 추론 구조를 설명했다면, 이 세미나는 LLM이 파일·코드·데이터·도구·실행 환경과 상호작용하는 시스템으로 확장되는 과정을 다룬다.

## 대상 청중

- 하드웨어 개발자
- Edge Computing 엔지니어
- 진동진단 전문가
- 플라즈마 시뮬레이션 엔지니어

Python, C/C++, 데이터 분석, 계측, 시뮬레이션 또는 실험에는 익숙하지만 Tool Use, Agent Loop, Harness, Sandbox, Approval, Trace, Evaluation은 처음일 수 있다고 가정한다.

## 발표 후 기대 결과

참가자는 Chat·Tool Use·Workflow·Agent를 구분하고, Harness의 통제 범위를 설명하며, Agent Task Contract와 검증 가능한 작은 후보 작업을 작성할 수 있어야 한다. Agent의 완료 선언 대신 Artifact와 Validator 결과를 확인하고, Agent보다 Script·Workflow·Do Nothing이 나은 경우도 구분하는 것이 목표다.

## 구조

- slides.md: 모델 기초→행동→Harness→Audit 원칙→생활·업무 적용을 연결하는 26장 덱
- docs/: Canonical Context, Storyboard, 근거 정책, 디자인, 데모, 의사결정 기록
- components/, layouts/: 최소 Slidev 공통 요소
- demos/: 구현 전 데모 경계와 안전 규칙
- handouts/: Task Contract, Use Case, Safety, Evaluation 템플릿
- speaker-notes/: 리허설과 발표 운영 체크리스트
- public/: 로컬 이미지와 대체 Trace를 둘 자리
- scripts/: 구조 검증, Pages staging build, 로컬 Pages preview

## 현재 구현 상태

본편 제작 단계다. 운영·기획 문서, Handout 초안, 20장 이론 슬라이드와 1장 Audit 원칙, 5장 적용 사례, GitHub Pages 배포 Workflow를 포함한다. 28장 확장 Storyboard 전체, 실제 진동/빌드 데모, 실제 Pages 게시와 Multi-Agent 예시는 구현하지 않았다. Slidev MCP는 제작·검토 경로에 사용했지만 프로젝트 자체 기능으로 포함한 것은 아니다.

## 로컬 설치

요구 환경은 Node.js 20.12.0 이상과 npm이다. Windows PowerShell에서 실행 정책으로 npm.ps1이 차단되면 아래처럼 npm.cmd를 사용한다.

    cd ai-agent-harness-seminar
    npm.cmd ci

다른 셸에서는 npm ci를 사용할 수 있다. package-lock.json을 변경하려는 의존성 갱신 작업에만 npm install을 사용한다. 설치 후 인터넷 연결 없이 기본 실행과 빌드가 가능하지만, 최초 설치에는 npm registry 접근이 필요하다.

## 개발 서버

    npm.cmd run dev

기본 주소는 터미널 출력에서 확인한다. Presenter Mode는 개발 서버 주소 뒤에 /presenter를 붙여 연다.

## 정적 빌드

    npm.cmd run build

결과는 기본 Base Path로 dist/에 생성된다. GitHub Pages용 Base Path와 staging은 아래의 별도 명령으로 생성해 일반 로컬 빌드와 분리한다.

## GitHub Pages용 빌드

    npm.cmd run build:pages

이 명령은 실제 origin remote에서 repository name을 확인하고 다음 Base Path로 Slidev를 빌드한다.

    /<repository-name>/ai-agent-harness-seminar/

일반 dist/와 충돌하지 않도록 결과는 저장소 루트의 _pages/ai-agent-harness-seminar/에 만들며, 저장소 Root Landing Page는 저장소 루트 _pages/index.html에 생성한다. 루트 .gitignore가 _pages/를 제외한다.

## 로컬 Pages Preview

    npm.cmd run preview:pages

Preview는 실제 GitHub Project Pages 경로를 흉내 낸다.

    http://127.0.0.1:4173/<repository-name>/
    http://127.0.0.1:4173/<repository-name>/ai-agent-harness-seminar/

build:pages를 먼저 실행해야 하며 서버는 Ctrl+C로 종료한다.

## GitHub Actions 배포

저장소 Root의 .github/workflows/deploy-seminars-pages.yml은 main 브랜치의 이 프로젝트 또는 Workflow/Landing Page 변경과 수동 workflow_dispatch에서 실행된다. npm ci, validation, Pages build, staging, 공식 Pages Artifact upload, github-pages environment deploy 순서다.

GitHub 저장소 Settings → Pages → Build and deployment → Source에서 GitHub Actions를 선택한 뒤 Actions 탭의 Workflow 결과를 확인한다. 예상 URL 형식은 다음과 같다.

    https://<github-owner>.github.io/<repository-name>/
    https://<github-owner>.github.io/<repository-name>/ai-agent-harness-seminar/

실패하면 npm ci 로그, Base Path의 양끝 slash, staging의 두 index.html, Pages Source, Actions/Pages 조직 정책과 github-pages environment를 확인한다.

## 프로젝트 검증

    npm.cmd run validate

문서 존재·빈 파일·Handout·데모 README·중첩 .git·TODO/TBD 목록을 검사한다. 정적 빌드까지 함께 확인하려면 다음을 사용한다.

    npm.cmd test

검증 상태와 실행 환경은 작업 완료 보고 및 이 문서의 변경 이력에서 확인해야 한다. 명령 성공을 다른 환경까지 보장하지 않는다.

### 현재 검증 기록

2026-07-21, Windows PowerShell, Node.js 24.18.0, npm 11.16.0에서 npm.cmd install, npm.cmd run validate, npm.cmd run build를 실행해 성공했다. 개발 서버는 포트 3030에서 기동하고 HTTP 200 응답을 확인했다. 브라우저 시각 검토는 사용할 수 있는 브라우저 인스턴스가 없어 확인하지 못했다.

npm audit은 Slidev의 전이 의존성 경로에서 low 5개와 moderate 1개를 보고했다. 자동 수정 제안은 현재 고정한 Slidev 52.18.0을 이전 버전으로 변경하므로 적용하지 않았다. 외부 입력 HTML을 받는 기능은 현재 범위에 없지만, 본편 제작 전 최신 Slidev 릴리스와 보안 권고를 다시 확인해야 한다.

같은 날짜에 npm.cmd ci, 일반 build, Pages build, staging index 검사와 로컬 preview를 실행했다. Root Landing, Seminar HTML, JavaScript entry와 로컬 favicon은 HTTP 200으로 확인했다. GitHub Actions에서의 실제 배포는 Commit·Push와 Pages 활성화를 수행하지 않았으므로 검증되지 않았다.

## 보안과 기밀정보

실제 업무 데이터, 회사 내부 주소, 계정, Token, API Key, 비공개 코드와 실제 로그를 추가하지 않는다. 데모는 합성 입력만 사용한다. 외부 전송, 네트워크, 쓰기·삭제, 패키지 설치, 장비·생산 환경 접근은 별도 승인 경계로 취급한다.

GitHub Pages는 정적 웹사이트를 외부에 게시하는 기능이다. Private Repository라고 해서 Pages 사이트가 자동으로 비공개가 되는 것은 아니며, 비공개 접근 제어는 계정과 조직의 GitHub Enterprise 설정에 따라 달라진다. 민감정보가 있거나 공개 범위가 승인되지 않았다면 배포를 중단하고 로컬 실행 또는 승인된 사내 정적 호스팅을 사용한다.

## 단계별 구현 계획

1. **현재 단계:** Canonical Context, Storyboard, 정책, Handout, 샘플 Slidev 기반
2. **콘텐츠 단계:** 출처 검증과 25~32장 본편 원고
3. **데모 단계:** 합성 진동 데이터와 결정론적 Validator의 작은 구현
4. **리허설 단계:** 발표 환경 검증, 대체 Trace, 시간 조정
5. **배포 단계:** Workflow 구성 완료, 공개 범위 승인 후 GitHub Pages 활성화

## 다음 작업

가장 먼저 Storyboard의 각 사실 주장에 공식 문서 또는 원출처를 연결하고, 발표 시간·실습 여부·발표 환경을 확인해 슬라이드 수와 데모 시간을 다시 산정한다.
