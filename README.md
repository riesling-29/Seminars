# Engineering Seminars

여러 엔지니어링 세미나 프로젝트를 한 Git 저장소에서 관리한다. 각 세미나는 독립된 하위 디렉터리에 소스, 문서, 의존성과 빌드 명령을 둔다.

## 세미나 목록

### AI Agent and Agent Harness Seminar

- 한국어 제목: 모델에서 시스템으로: AI Agent와 Agent Harness
- 경로: ai-agent-harness-seminar/
- 상태: 초기 샘플 슬라이드와 기획 문서, GitHub Pages 배포 Workflow 구성
- 발표자료: GitHub Pages 활성화와 Workflow 성공 후 하위 경로에서 제공

## 로컬 실행

Windows PowerShell:

    cd ai-agent-harness-seminar
    npm.cmd ci
    npm.cmd run dev

일반 정적 빌드:

    npm.cmd run build

일반 빌드는 ai-agent-harness-seminar/dist/에 생성되며 Git에 포함하지 않는다.

## GitHub Pages 형태로 로컬 확인

Pages용 빌드는 실제 origin remote에서 repository name을 계산해 다음 Base Path를 적용한다.

    /<repository-name>/ai-agent-harness-seminar/

실행:

    cd ai-agent-harness-seminar
    npm.cmd ci
    npm.cmd run build:pages
    npm.cmd run preview:pages

Pages staging은 저장소 루트의 _pages/에 생성되며 Git에 포함하지 않는다. Preview 서버가 출력하는 다음 두 주소를 확인한다.

    http://127.0.0.1:4173/<repository-name>/
    http://127.0.0.1:4173/<repository-name>/ai-agent-harness-seminar/

서버는 Ctrl+C로 종료한다.

## 배포 구조

예상 공개 URL:

    https://<github-owner>.github.io/<repository-name>/
    https://<github-owner>.github.io/<repository-name>/ai-agent-harness-seminar/

Root URL은 정적 세미나 목록 페이지로 연결된다. 발표자료 링크는 ./ai-agent-harness-seminar/ 상대 경로를 사용한다. Owner와 repository name은 Workflow context 또는 Git remote에서 얻으므로 소스에 특정 계정을 고정하지 않는다.

## GitHub Pages 배포 흐름

.github/workflows/deploy-seminars-pages.yml은 원격 기본 브랜치의 관련 변경 또는 수동 실행에서 다음을 수행하도록 구성한다.

1. 저장소 checkout
2. Node.js 24 LTS 설정
3. package-lock.json 기반 npm ci
4. 프로젝트 validation
5. Repository와 Seminar 경로를 포함한 Slidev build
6. Root Landing Page와 발표자료를 _pages/에 staging
7. 공식 Pages Artifact upload
8. github-pages environment로 deploy

GitHub 공식 Custom Workflow 방식과 Pages Actions를 따른다:

- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## GitHub에서 활성화

Commit과 Push가 승인된 뒤 저장소 관리자 권한으로 다음을 수행한다.

1. GitHub 저장소의 Settings를 연다.
2. 왼쪽 Code and automation 영역에서 Pages를 연다.
3. Build and deployment의 Source를 GitHub Actions로 선택한다.
4. Actions 탭에서 Deploy engineering seminars to GitHub Pages Workflow를 연다.
5. main Push 실행을 기다리거나 Run workflow로 수동 실행한다.
6. build와 deploy Job이 모두 성공했는지 확인한다.
7. deploy Job의 github-pages environment URL에서 Root와 Seminar 경로를 확인한다.

## 실패 시 확인

- Pages Source가 GitHub Actions인지
- 실행 브랜치가 실제 기본 브랜치 main인지
- Workflow의 npm ci가 package-lock.json과 일치하는지
- PAGES_BASE_PATH가 시작·끝 slash를 포함하는지
- _pages/index.html과 _pages/ai-agent-harness-seminar/index.html이 생성됐는지
- upload-pages-artifact의 path가 저장소 루트 _pages인지
- Pages, environment, Actions 사용이 계정·조직 정책에서 허용되는지
- Actions 로그에 Token, 내부 주소 또는 실제 업무 데이터가 노출되지 않았는지

## 공개 범위와 기밀정보

GitHub Pages는 정적 웹사이트를 외부에 게시하는 기능이다. Private Repository라고 해서 Pages 사이트가 자동으로 비공개가 되는 것은 아니다. 비공개 Pages 접근 제어는 계정과 조직의 GitHub Enterprise 설정에 따라 달라진다.

회사 내부 정보, 실제 업무 데이터, 계정, Token, API Key, 비공개 주소, 비공개 코드 또는 실제 로그가 포함되면 Pages 배포를 중단한다. 공개 가능 여부가 확인되지 않으면 로컬 실행 또는 승인된 사내 정적 호스팅을 사용한다.

현재 Workflow 구성은 공개 범위에 대한 승인을 의미하지 않는다.

GitHub의 Pages 공개 범위 설명:

- https://docs.github.com/en/enterprise-cloud@latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site
