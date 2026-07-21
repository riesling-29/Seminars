# Demo Plan

두 데모는 **설계 초안**이며 이번 단계에서 구현하지 않는다. 모든 입력·코드·Trace는 합성 자료만 사용한다. 성공률, 실행 시간, 수치 허용 오차는 구현과 리허설 전에는 **알 수 없음**이다.

## 공통 원칙

- 입력 원본은 읽기 전용으로 취급한다.
- Agent 쓰기는 지정 output 또는 허용 소스 경로로 제한한다.
- 외부망, 실제 장비, 생산 환경, 회사 데이터에 접근하지 않는다.
- 완료는 Agent 메시지가 아니라 Validator와 사람 검토가 판정한다.
- Trace에는 도구 입력·결과·오류·승인·중단 사유를 남기되 비밀정보는 기록하지 않는다.
- 재시도 한도와 Live Demo 전환 조건은 구현 후 측정해 확정한다.

## 메인 데모: 합성 진동 신호 분석 Agent

### 합성 입력

- vibration.csv: time_s와 acceleration_m_s2 열을 가진 합성 시계열. 실제 장비·설비·고장 데이터가 아니다.
- metadata.yaml: dataset_id, sampling_frequency_hz, unit, signal_kind, generator_version, synthetic: true
- acceptance_criteria.md: 필요한 입력, 산출물 스키마, 허용 경로, 수치 재계산, 중단 규칙

합성 신호의 성분·노이즈·샘플 수는 구현 시 명시하고 seed를 고정한다. 특정 고장 모드나 실제 설비 상태를 대표한다고 주장하지 않는다.

### Agent 목표

입력 계약을 검사하고, 충분한 메타데이터가 있을 때만 합성 신호의 기본 시간영역·주파수영역 지표를 계산해 지정 Artifact를 만든다. 데이터에서 관찰한 특징과 가능한 해석을 분리하고 실제 설비 진단을 단정하지 않는다.

### 허용 도구와 경로

- demos/vibration-agent/input/ 읽기
- demos/vibration-agent/work/ 및 output/ 쓰기
- 고정된 로컬 Python 환경에서 승인된 분석·그림 스크립트 실행
- 로컬 Validator 실행

### 금지 행동

- sampling frequency, 단위, 센서 방향 등 필수 메타데이터 임의 추정
- 외부망·API·패키지 설치
- 입력 파일 수정
- 프로젝트 밖 쓰기
- 실제 설비 또는 고장 원인 확정
- Validator 삭제·완화 또는 acceptance criteria 수정

### 예상 Artifact

- metrics.json: 입력 식별자, 샘플 수, duration, RMS 등 명세된 지표와 단위
- time_waveform.png: 시간축·단위·합성 표시가 있는 파형
- spectrum.png: sampling frequency에 근거한 주파수축과 방법 표기
- report.md: 확인된 관찰, 해석 가설, 한계, Validator 결과
- trace.json: 단계, Tool, 상태, 승인, 오류, 최종 중단/성공

### 결정론적 Validator

1. 입력 hash 또는 고정 fixture 식별자와 synthetic 표기를 확인한다.
2. 필수 파일과 JSON/YAML 스키마를 검사한다.
3. metadata와 CSV의 시간 간격·샘플 수 정합성을 검사한다.
4. 독립 구현으로 명세 지표를 재계산하고 명시된 수치 허용 오차 안인지 검사한다.
5. PNG 존재·크기·축 메타데이터 또는 companion manifest를 검사한다.
6. report에 관찰/해석/한계/합성 데이터 표시가 있는지 검사한다.
7. trace 이벤트 순서와 stop/approval 상태를 검사한다.
8. 허용 경로 밖 Diff와 입력 변경이 없는지 검사한다.

허용 오차 값은 부동소수점 형식과 참조 알고리즘을 정한 뒤 acceptance_criteria.md에 근거와 함께 기록한다. 현재 수치는 미확정이다.

### 실패 주입: sampling frequency 누락

첫 실행 fixture에서는 metadata.yaml의 sampling_frequency_hz를 제거한다. Agent는 다음을 수행해야 한다.

1. 필요한 값이 없다는 **관찰 사실**을 기록한다.
2. 주파수축과 관련 지표를 신뢰성 있게 만들 수 없다는 **영향**을 설명한다.
3. 값을 추정하거나 vibration.csv를 바꾸지 않는다.
4. 상태를 blocked-needs-input으로 남기고 필요한 필드·단위·출처를 요청한다.
5. 불완전한 spectrum.png 또는 성공 report를 만들지 않는다.

### 재시도와 사용자 확인

- 사용자가 명시적 sampling frequency와 출처를 metadata.yaml에 제공한 경우에만 새 실행으로 재시도한다.
- CSV 시간 간격과 제공 값이 불일치하면 자동 선택하지 않고 사용자 확인을 요청한다.
- 필수 입력이 계속 없거나 동일 검사가 반복 실패하면 정해진 한도에서 중단한다.
- 재시도 횟수는 구현 후 리허설 근거로 정하며 현재는 미확정이다.

### Live 실행 절차

1. 합성 fixture와 hash, Sandbox, 허용 경로를 화면에 보여준다.
2. 누락 metadata 실행으로 blocked Trace를 확인한다.
3. 미리 준비한 유효 metadata를 사람이 승인해 교체한다.
4. Agent를 재실행하고 Artifact 생성 과정을 관찰한다.
5. 별도 Validator를 실행해 pass/fail을 확인한다.
6. report의 관찰·가설·한계와 trace의 경로를 검토한다.

### 대체 Trace

public/traces/에는 리허설에서 생성한 합성 Trace, 입력 manifest, Tool 버전, Validator 결과만 저장한다. Live 실행이 시간 제한을 넘거나 환경 오류가 나면 해당 Trace를 재생한다. 녹화 실행임을 화면에 표시하고 Live 성공으로 표현하지 않는다.

### 진단 제한

이 데모는 분석 과정과 Harness를 설명한다. 기계 상태, 고장 원인, 잔여 수명, 안전 여부를 판정하지 않는다. 합성 신호에서 특정 peak가 보이더라도 관찰과 가능한 해석만 분리해 기록하며 전문가 승인 없이는 진단 결론으로 승격하지 않는다.

### 직군별 관련성

- 하드웨어: 단위·센서 메타데이터·입력 무결성
- Edge Computing: 제한 환경, 로컬 실행, Artifact 크기와 재현성
- 진동진단: sampling frequency, 주파수축, 해석 한계
- 플라즈마 시뮬레이션: 수치 입력 provenance, 설정 누락, 독립 재계산

## 보조 데모: 합성 Build/Test Failure 조사 Agent

### 합성 코드 저장소

demos/edge-build-agent/ 아래 별도 fixture 디렉터리에 작고 독립적인 합성 코드와 테스트를 둔다. 실제 회사 코드, 실제 로그, 취약한 의존성 또는 네트워크 서비스는 사용하지 않는다. 이 fixture는 Git 저장소가 아니며 중첩 .git을 만들지 않는다.

### 의도적 실패

명세와 구현 사이의 작은 경계 조건 불일치로 테스트 한 개가 실패하도록 설계한다. 실패 메시지는 해답을 직접 주지 않되 로컬 재현이 가능해야 한다. 테스트 삭제나 기대값 완화는 해법으로 인정하지 않는다.

### 조사 범위

- README, package/build 설정, 관련 소스, 테스트 읽기
- 지정된 로컬 테스트 명령 재현
- 실패와 직접 관련된 파일의 최소 수정
- 전체 허용 테스트 재실행과 Diff 검사

### 수정 가능 범위

초기 제안은 fixture/src/ 아래 관련 구현 파일 하나다. 실제 경로는 fixture 작성 후 Task Contract에 고정한다. 테스트, package lock, CI, validator, 프로젝트 밖 파일은 기본 읽기 전용이다.

### 최소 수정 원칙

- 실패를 재현한 뒤 가장 작은 원인 가설을 세운다.
- 관련 없는 리팩터링·포맷 변경·의존성 교체를 금지한다.
- 한 가설당 작은 Diff를 만들고 테스트 결과로 유지 또는 철회한다.
- 통과를 위해 테스트를 건너뛰거나 삭제하지 않는다.

### 테스트 기반 완료 판정

Validator는 명시된 실패 테스트와 전체 허용 테스트, 수정 경로, Diff 크기/파일, 금지 파일 hash를 검사한다. 모든 검사를 통과해도 의미적 적합성은 사람이 Diff로 최종 확인한다.

### 승인 요구

다음은 실행 전에 Human Approval을 요구한다.

- 새 패키지 설치 또는 lockfile 변경
- 네트워크 접근
- 테스트 삭제·skip·기대값 변경
- 허용 경로 밖 수정
- 생성물 정리 목적을 포함한 삭제
- 테스트 명령 이외의 광범위 Shell 실행

승인되지 않으면 우회하지 않고 blocked 상태로 중단한다.

### 예상 Diff

실패 원인과 직접 관련된 구현 파일 한 곳의 작은 수정과 설명을 예상한다. 정확한 줄 수는 fixture 전에는 **알 수 없음**이며 목표 수치로 만들지 않는다. 테스트 파일, 패키지 설정, lockfile 변경은 기대하지 않는다.

### 실패 시 대체 Trace

리허설에서 기록한 합성 failing-run과 fixed-run Trace, 테스트 출력, Diff, Validator report를 저장한다. Tool 버전과 fixture hash를 함께 기록하고 실제 회사 로그처럼 보이는 문자열을 넣지 않는다.

## 구현 전 승인 기준

다음이 모두 충족될 때만 데모 구현 단계로 이동한다.

- 실제 발표 시간과 데모 할당 시간 확인
- 사용할 Agent 도구와 Sandbox 강제 범위 확인
- 합성 fixture와 라이선스 검토
- Validator가 Agent와 독립적으로 실행 가능
- 민감정보 검사와 대체 Trace 보관 정책 승인
- Live 실패 시 전환 기준과 비상 중단 키 확인

조건이 충족되지 않으면 데모 구현을 보류하고 정적 Trace 설명 또는 데모 없음 대안을 유지한다.

