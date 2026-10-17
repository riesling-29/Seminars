# Blog29 연계 · 2026-10-17

## 탐색 구조

- Blog29에서 주제 → 세미나 안내 → 발표자료로 이동한다.
- 이 저장소의 랜딩은 같은 메뉴와 토스카나 팔레트를 사용하고, 해설/발표를 구분한다.
- Slidev의 기본 발표 컨트롤 안에 `해설 글`, `세미나 안내` 링크를 추가했다. 발표 본문에 별도 바를 겹치지 않으며, 기본 컨트롤과 함께 표시된다.
- SAIF에는 주제 경로, 대응 블로그 해설, 세미나 안내를 추가했다. 발표 모드에서는 주제 경로를 숨기고 안내 링크는 보기 설정 옆에 유지한다. 인쇄에는 탐색 UI가 나오지 않는다.
- 도메인 사이 이동은 명시적인 정상 링크다. 원래 블로그의 정확한 절/스크롤 복구를 보장하는 기능은 추가하지 않았다. 브라우저 뒤로 가기 또는 별도 탭 열기를 사용할 수 있다.

| 발표자료 경로 | Blog29 세미나 안내 | 해설 글 |
| --- | --- | --- |
| `/Seminars/ai-agent-harness-seminar/` | `/seminars/ai-agent-harness-seminar` | `/blog/ai-agent-harness` |
| `/Seminars/persistent-work-agents-seminar/` | `/seminars/persistent-work-agents-seminar` | `/blog/persistent-work-agents` |
| `/Seminars/saif-2026-seminar/` | `/seminars/saif-2026-seminar` | `/blog/saif-2026` |

Blog29 링크의 origin은 `https://blog29.vercel.app`이다. 발표 본문, 원문 출처, 슬라이드 순서와 URL은 그대로 유지한다. Harness는 history 라우터와 기존 공용 `404.html`을 유지하며, Persistent는 기존 hash 라우터를 유지한다.

## 빌드와 확인

두 Slidev 폴더에서 각각 `npm ci`, `npm run validate`, `npm run build:pages`를 실행한다. 두 빌드는 `_pages/`의 자기 세미나 폴더만 교체한다. 공유 랜딩과 사이트맵은 같은 템플릿에서 복사한다.

이후 저장소 루트에서:

```sh
node saif-2026-seminar/validate.mjs
mkdir -p _pages/saif-2026-seminar
cp saif-2026-seminar/index.html _pages/saif-2026-seminar/index.html
node .github/pages/validate-output.mjs
```

실제 workflow도 동일한 순서다. 브라우저에서는 390px/데스크톱 목록, 해설 링크, 슬라이드 다음/이전, 하네스 `/6` 직접 접속 및 새로고침, Persistent `#/6`, SAIF 읽기/발표/목차/인쇄를 확인한다.

### 이번 변경에서 실행한 검증

- 두 Slidev 프로젝트: `npm ci`, `npm run validate`, `npm run build:pages` 성공. 하네스 35장, 후속 10장과 기존 증거 라벨·출처 규칙을 확인했다.
- SAIF: `node saif-2026-seminar/validate.mjs` 성공. 30개 절, 74개 고유 ID, 외부 링크 86개를 확인하고 스크립트 구문을 검사했다.
- 전체 staging: `node .github/pages/validate-output.mjs` 성공. 사이트맵 네 URL과 상대 경로의 실제 파일, 하네스 fallback을 확인했다.
- 두 빌드의 JavaScript 번들에 세미나 안내·대응 글 링크가 포함된 것을 확인했다.
- 로컬 HTTP: 사이트맵은 200 및 XML MIME, 하네스 `/6`은 기존 GitHub Pages 동작과 같은 404 상태의 앱 HTML을 반환한다.
- `git diff --check` 통과. 원문 `slides.md`와 의존성 lockfile은 변경하지 않았다.
- 실제 브라우저의 시각·인터랙션 검증은 이번 환경에서 실행하지 못했다. 위 브라우저 확인 항목은 배포 전 남은 검증이며, 빌드 성공만으로 화면 품질을 확정하지 않는다.

사이트맵은 `/Seminars/sitemap.xml`에 공개되며 현재 랜딩과 세 발표자료의 실제 URL 네 개를 담는다. 도메인 루트에 접근 권한이 없는 프로젝트 저장소이므로 `/Seminars/robots.txt`를 루트 robots로 취급하지 않는다. 사이트맵만으로 색인 완료나 시점을 보장하지 않는다.

## 반영 순서와 되돌리기

Blog29의 세미나 안내 경로가 준비된 후 이 저장소를 배포한다. GitHub Pages 공개 배포는 기존 workflow를 사용한다. 이 개편은 정적 파일과 탐색 추가라 데이터 마이그레이션이 없다. 문제가 생기면 개편 커밋을 되돌리고 기존 workflow로 재배포한다. 기존 외부 발표 주소를 다른 주소로 리다이렉트하지 않는다.

## 구현 근거

2026-10-17 확인. 공식 문서는 현재 버전이므로 설치된 `@slidev/cli` 52.18.0의 `NavControls.vue`에서도 `CustomNavControls` 슬롯을 확인했다. 의존성 버전은 변경하지 않았다.

- [Slidev · Global Layers](https://sli.dev/features/global-layers): `custom-nav-controls.vue` 자동 연결
- [Slidev · Directory Structure](https://sli.dev/custom/directory-structure): 전역 레이어와 스타일 범위
- [Slidev · Global Context](https://sli.dev/guide/global-context): 공개 탐색 컨텍스트 API
