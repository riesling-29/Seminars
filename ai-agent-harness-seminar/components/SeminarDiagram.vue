<script setup lang="ts">
defineProps<{ kind: 'overview' | 'core' | 'sequence' | 'layers' | 'writing' }>()
</script>
<template>
  <svg v-if="kind === 'overview'" class="diagram" viewBox="0 0 870 285" role="img" aria-label="모델이 도구 요청을 보내고 실행 프로그램이 결과를 되돌려주는 왕복">
    <defs><marker id="ov-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="currentColor" /></marker></defs>
    <rect x="30" y="80" width="220" height="105" rx="3" class="tint" />
    <text x="140" y="117" text-anchor="middle" class="title">LLM</text>
    <text x="140" y="150" text-anchor="middle" class="body">다음 출력을 생성</text>
    <rect x="530" y="80" width="300" height="105" rx="3" class="box" />
    <text x="680" y="117" text-anchor="middle" class="title">하네스와 실행 환경</text>
    <text x="680" y="150" text-anchor="middle" class="body">요청 확인 · 도구 실행</text>
    <path d="M250 105H530" class="edge" marker-end="url(#ov-arrow)" />
    <text x="390" y="87" text-anchor="middle" class="body">도구 이름과 입력값</text>
    <path d="M530 166H250" class="edge" marker-end="url(#ov-arrow)" />
    <text x="390" y="204" text-anchor="middle" class="body">파일 내용 · 실행 결과</text>
    <text x="435" y="261" text-anchor="middle" class="title accent">목표에 따라 이 왕복을 이어 가는 전체 시스템 = 에이전트</text>
  </svg>
  <svg v-else-if="kind === 'core'" class="diagram" viewBox="0 0 870 318" role="img" aria-label="에이전트 경계 안의 센서, 제어센터, 이펙터가 바깥 환경을 관측하고 바꾸는 구조">
    <defs><marker id="core-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="currentColor" /></marker></defs>
    <rect x="13" y="103" width="126" height="142" rx="3" class="box" />
    <text x="76" y="145" text-anchor="middle" class="title">환경</text><text x="76" y="181" text-anchor="middle" class="body">저장소</text><text x="76" y="208" text-anchor="middle" class="body">연결 서비스</text>
    <rect x="190" y="65" width="662" height="182" rx="6" class="boundary" />
    <text x="210" y="94" class="title accent">AI 에이전트 전체</text>
    <text x="536" y="21" text-anchor="middle" class="body">사용자의 목표</text>
    <path d="M536 29V114" class="edge" marker-end="url(#core-arrow)" />
    <rect x="219" y="118" width="149" height="94" rx="3" class="box" /><text x="293" y="151" text-anchor="middle" class="title">센서</text><text x="293" y="183" text-anchor="middle" class="body">입력과 결과 수집</text>
    <rect x="425" y="118" width="222" height="94" rx="3" class="tint" /><text x="536" y="151" text-anchor="middle" class="title">제어센터</text><text x="536" y="183" text-anchor="middle" class="body">모델 · 계획 · 기억 · 도구</text>
    <rect x="704" y="118" width="122" height="94" rx="3" class="box" /><text x="765" y="151" text-anchor="middle" class="title">이펙터</text><text x="765" y="183" text-anchor="middle" class="body">행동 전달</text>
    <path d="M139 157H219M368 166H425M647 166H704" class="edge" marker-end="url(#core-arrow)" />
    <text x="178" y="144" text-anchor="middle" class="label">관측</text>
    <path d="M765 212V281H76V245" class="edge" marker-end="url(#core-arrow)" />
    <text x="435" y="307" text-anchor="middle" class="body">행동이 환경을 바꾸고, 그 결과를 다시 관측합니다.</text>
  </svg>
  <svg v-else-if="kind === 'sequence'" class="diagram" viewBox="0 0 870 338" role="img" aria-label="하네스가 도구 설명을 모델에 전달하고 모델의 호출을 실행한 뒤 결과를 다시 모델에 전달하는 순서">
    <defs><marker id="seq-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="currentColor" /></marker></defs>
    <text x="130" y="25" text-anchor="middle" class="title">LLM</text><text x="435" y="25" text-anchor="middle" class="title">하네스</text><text x="750" y="25" text-anchor="middle" class="title">도구 / 실행 환경</text>
    <path d="M130 41V327M435 41V327M750 41V327" stroke="var(--line)" stroke-dasharray="4 5" />
    <path d="M435 72H130" class="edge" marker-end="url(#seq-arrow)" /><text x="280" y="61" text-anchor="middle" class="body">① 목표와 도구 설명</text>
    <path d="M130 121H435" class="edge" marker-end="url(#seq-arrow)" /><text x="280" y="110" text-anchor="middle" class="body">② 도구 호출 요청</text>
    <rect x="334" y="136" width="202" height="29" rx="3" class="tint" /><text x="435" y="156" text-anchor="middle" class="label">형식 · 권한 · 승인 확인</text>
    <path d="M435 193H750" class="edge" marker-end="url(#seq-arrow)" /><text x="594" y="182" text-anchor="middle" class="body">③ 명령 실행</text>
    <path d="M750 242H435" class="edge" marker-end="url(#seq-arrow)" /><text x="594" y="231" text-anchor="middle" class="body">④ 출력 · 오류 · 종료 코드</text>
    <path d="M435 291H130" class="edge" marker-end="url(#seq-arrow)" /><text x="280" y="280" text-anchor="middle" class="body">⑤ 결과를 다음 입력에 포함</text>
    <text x="130" y="329" text-anchor="middle" class="label">수정 / 추가 조사 / 종료 선택</text>
  </svg>
  <svg v-else-if="kind === 'layers'" class="diagram" viewBox="0 0 870 319" role="img" aria-label="응용, 오케스트레이션, 추론 층을 포함한 에이전트가 MCP로 외부 앱, A2A로 다른 에이전트와 연결되는 개념도">
    <defs><marker id="layer-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="currentColor" /></marker></defs>
    <rect x="15" y="12" width="570" height="295" rx="6" class="boundary" /><text x="38" y="42" class="title accent">에이전트 전체</text>
    <rect x="42" y="59" width="512" height="62" rx="3" class="box" /><text x="62" y="84" class="title">응용</text><text x="62" y="108" class="label">사용자의 목표를 받고 결과를 보여 줍니다.</text>
    <rect x="42" y="144" width="512" height="62" rx="3" class="tint" /><text x="62" y="170" class="title">오케스트레이션</text><text x="62" y="194" class="label">계획 · 메모리 · 도구 · 작업 흐름을 조정합니다.</text>
    <rect x="42" y="230" width="512" height="60" rx="3" class="box" /><text x="62" y="255" class="title">추론</text><text x="62" y="279" class="label">LLM 등의 모델이 다음 출력을 만듭니다.</text>
    <path d="M300 121V143M300 206V230" class="edge" marker-start="url(#layer-arrow)" marker-end="url(#layer-arrow)" />
    <rect x="700" y="68" width="157" height="66" rx="3" class="box" /><text x="778" y="97" text-anchor="middle" class="title">외부 앱·도구</text><text x="778" y="122" text-anchor="middle" class="label">자료와 기능 제공</text>
    <path d="M585 101H700" class="edge" marker-start="url(#layer-arrow)" marker-end="url(#layer-arrow)" /><text x="641" y="84" text-anchor="middle" class="body">MCP</text>
    <rect x="700" y="212" width="157" height="66" rx="3" class="box" /><text x="778" y="250" text-anchor="middle" class="title">다른 에이전트</text>
    <path d="M585 244H700" class="edge" marker-start="url(#layer-arrow)" marker-end="url(#layer-arrow)" /><text x="641" y="227" text-anchor="middle" class="body">A2A</text>
  </svg>
  <svg v-else class="diagram" viewBox="0 0 870 302" role="img" aria-label="로컬 모델과 Hermes에서 파일을 수정하는 경로와 GPT 및 GitHub 연결을 통해 수정하는 경로가 GitHub 저장소와 Vercel 배포로 이어지는 과정">
    <defs><marker id="write-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="currentColor" /></marker></defs>
    <text x="17" y="25" class="title">로컬에서 작업</text>
    <rect x="17" y="43" width="205" height="76" class="tint" /><text x="119" y="73" text-anchor="middle" class="body">Local LLM + Hermes</text><text x="119" y="100" text-anchor="middle" class="label">초안 · 파일 수정</text>
    <rect x="281" y="43" width="196" height="76" class="box" /><text x="379" y="73" text-anchor="middle" class="title">로컬 Git</text><text x="379" y="100" text-anchor="middle" class="label">변경 검토 · 커밋 · 푸시</text>
    <path d="M222 81H281" class="edge" marker-end="url(#write-arrow)" />
    <text x="17" y="167" class="title">GPT에서 GitHub 연결</text>
    <rect x="17" y="186" width="205" height="76" class="tint" /><text x="119" y="217" text-anchor="middle" class="title">GPT / Codex</text><text x="119" y="243" text-anchor="middle" class="label">수정 요청</text>
    <rect x="281" y="186" width="196" height="76" class="box" /><text x="379" y="217" text-anchor="middle" class="title">GitHub 도구 연결</text><text x="379" y="243" text-anchor="middle" class="label">허용된 저장소 수정</text>
    <path d="M222 224H281M477 81H531V151H577M477 224H531V151" class="edge" marker-end="url(#write-arrow)" />
    <rect x="579" y="119" width="112" height="67" class="box" /><text x="635" y="160" text-anchor="middle" class="title">GitHub</text>
    <path d="M691 151H744" class="edge" marker-end="url(#write-arrow)" />
    <rect x="745" y="119" width="112" height="67" class="tint" /><text x="801" y="147" text-anchor="middle" class="title">Vercel</text><text x="801" y="174" text-anchor="middle" class="label">빌드 · 배포</text>
    <text x="717" y="285" text-anchor="middle" class="body">게시된 글에서 결과 확인</text>
  </svg>
</template>
