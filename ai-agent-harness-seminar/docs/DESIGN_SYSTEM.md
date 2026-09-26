# 블로그 기반 세미나 디자인

## 현재 덱 · 2026-09-26

- Slidev 28장, 980×551 기준 16:9 화면
- 아이보리 #f7f5ef, 본문 #272e29, 강조 #355946
- 제목 33px, 본문 21px, 표 18–19px. 보조 출처만 작은 글자 사용
- 한 장에는 하나의 설명 목적을 두고, 문장·비교표·도식 중 알맞은 형식을 사용
- 모델·하네스·실행 환경의 역할을 반복해서 같은 이름으로 표시
- WEF 도식에는 에이전트 전체 경계와 외부 환경/연결 대상 표시
- 6번 장 켄자쿠 이미지는 원본 비율을 보존해 72×90 CSS px에 표시
- 11번 장은 버튼으로 실행 기록을 차례로 보는 Vue 컴포넌트

구현: layouts/seminar.vue, layouts/seminar-cover.vue, styles/seminar.css, components/SeminarDiagram.vue.

이전 Technical Systems Editorial 컴포넌트는 과거 원고의 이력이며 현재 본편에서는 사용하지 않습니다.
