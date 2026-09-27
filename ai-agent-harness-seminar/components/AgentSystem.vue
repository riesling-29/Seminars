<template>
  <div class="agent-system" aria-label="사용자 목표를 받은 하네스가 LLM에 맥락을 전달하고 도구 호출을 받아 실행 환경에 연결하는 에이전트 구조">
    <div class="system-goal"><b>사용자 목표 → 하네스</b><span>“주문 금액 계산 오류를 고쳐 주세요.”</span></div>
    <div class="system-boundary">
      <div class="boundary-name">AI 에이전트</div>
      <div class="system-loop">
        <div class="system-model"><b>LLM</b><span>결과를 읽고<br>다음 도구 요청 또는 답변 생성</span></div>
        <div class="system-exchange"><span>← 맥락·도구 설명·실행 결과</span><span>도구 호출 요청·최종 답변 →</span></div>
        <div class="system-harness"><b>하네스</b><span>입력 구성 · 모델 호출<br>권한 확인 · 도구 연결 · 종료</span></div>
      </div>
      <div class="system-tool-line"><span>하네스 → 도구 실행 요청</span><b>도구 구현<small>파일 읽기·편집·명령 실행</small></b><span>실행 결과 → 하네스</span></div>
    </div>
    <div class="system-environment"><b>도구가 작업하는 실행 환경</b><span>저장소 파일 · 터미널 프로세스 · 연결된 서비스</span></div>
  </div>
</template>
