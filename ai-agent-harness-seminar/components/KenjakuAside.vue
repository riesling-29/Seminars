<script setup lang="ts">
const imageUrl = import.meta.env.BASE_URL + 'images/kenjaku.webp'
</script>
<template>
  <aside class="kenjaku-aside">
    <img :src="imageUrl" alt="주술회전의 켄자쿠. 뇌와 몸의 관계를 설명하는 작은 참고 이미지" />
    <div>
      <p class="aside-label">짧은 비유 · 주술회전의 켄자쿠</p>
      <p>뇌를 다른 몸으로 옮겨 그 몸의 능력을 사용하는 캐릭터입니다.</p>
      <p><b>뇌는 LLM</b>, <b>몸은 하네스</b>, <b>함께 움직이는 상태는 에이전트</b>에 빗댈 수 있습니다.</p>
      <p class="aside-limit">실제 소프트웨어에서는 하네스와 실행 환경을 나누어 설계할 수 있습니다.</p>
    </div>
  </aside>
</template>
