# Persistent Work Agents Seminar 작업 규칙

이 디렉터리와 그 하위 파일을 수정하는 Coding Agent는 다음을 따른다.

1. 작업 전에 Git 상태, 파일 구조, 패키지 관리자와 기존 설정을 실제로 확인한다.
2. docs/EVIDENCE_POLICY.md를 내용 규칙의 기준으로 삼는다. 다른 문서와 충돌하면 임의로 통합하지 말고 충돌을 보고한다.
3. 슬라이드의 주장에는 FACT, HYPOTHESIS, UNAVAILABLE 라벨(`<Ev kind="..." />`)을 붙여 구분한다.
4. FACT는 제조사 공식 발표·문서만 근거로 한다. 슬라이드 frontmatter `sources`에 짧은 이름과 URL을 적고, 발췌와 확인 날짜를 docs/SOURCES_2026-09-29.md에 기록한다.
5. OpenAI Dots(DevDay 2026 발표)는 openai.com·help.openai.com·chatgpt.com 원문에 있는 내용만 FACT로 쓴다. 언론 보도는 HYPOTHESIS로 둔다. DevDay 전 Aeon / “o” 보도는 가설로만 다루고 Dots와 같은 제품으로 연결하지 않는다.
6. 공식 자료에 없는 수치, 순위, 성능 비교, 생산성 효과를 만들지 않는다. Maturity는 출시 상태만 적는다.
7. 장단점은 제품 문서에 적힌 제약과 발표자의 해석을 구분해 균형 있게 쓴다. 마케팅 문구를 그대로 옮기지 않는다.
8. 회사 내부 정보, 실제 업무 데이터, 내부 주소, 계정, 토큰, API Key, 비공개 코드와 실제 로그를 포함하지 않는다.
9. 발표자료는 한국어 중심으로 작성하되 제품명과 번역하면 의미가 약해지는 용어(Routine, Skill, Sandbox 등)는 영어를 유지한다.
10. 가능한 검증 명령(`npm run validate`, `npm run build`)을 실제로 실행한 뒤 완료를 보고한다.
11. 결과 보고에서 변경 내용, 검증 내용, 미해결 사항을 구분한다.
12. 이 디렉터리에서 git init을 실행하거나 중첩 저장소·Submodule을 만들지 않는다.
