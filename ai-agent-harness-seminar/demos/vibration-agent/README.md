# 합성 진동 신호 분석 데모

이 디렉터리는 향후 메인 데모를 구현할 경계다. 현재는 설계만 존재하며 데이터, 분석 코드, Validator는 구현하지 않았다.

- 합성 데이터만 사용한다.
- 입력은 읽기 전용, 출력은 제한 경로에 둔다.
- sampling frequency 누락 시 임의 추정하지 않고 중단한다.
- 실제 설비 상태나 고장 원인을 진단하지 않는다.
- 구현 전 docs/DEMO_PLAN.md와 handouts/SAFETY_CHECKLIST.md를 검토한다.

구현·실행 방법과 의존성은 아직 **알 수 없음**이다. 결정론적 Validator와 발표 환경이 확인되지 않으면 Do Nothing 또는 정적 대체 Trace를 선택한다.

