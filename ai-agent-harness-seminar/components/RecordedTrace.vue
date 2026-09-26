<script setup lang="ts">
import { computed, ref } from 'vue'
const step = ref(0)
const steps = [
  {
    title: '관련 파일 확인',
    command: "rg -n 'def total|return|test_discount_first|assertEqual' order.py test_order.py",
    output: 'order.py:5: return round(price * (1 + tax_rate) - price * discount_rate)\ntest_order.py:11: self.assertEqual(total(10000, 0.1, 0.1), 9900)',
    interpretation: '기대값 9,900원과 현재 계산식을 확인한 뒤 테스트를 요청합니다.',
  },
  {
    title: '실패 재현',
    command: 'python -m unittest -v',
    output: 'test_discount_first ... FAIL\ntest_no_discount ... ok\nAssertionError: 10000 != 9900\nFAILED (failures=1) · 종료 코드 1',
    interpretation: '실패 결과를 읽고, 할인 후 금액에 세금을 적용하도록 수정을 요청합니다.',
  },
  {
    title: '계산식 수정',
    command: 'apply_patch · order.py의 계산식 변경',
    output: 'discounted_price = price * (1 - discount_rate)\nreturn round(discounted_price * (1 + tax_rate))',
    interpretation: '파일 수정 도구가 변경을 적용했습니다. 같은 테스트를 다시 요청합니다.',
  },
  {
    title: '재검증',
    command: 'python -m unittest -v',
    output: 'test_discount_first ... ok\ntest_no_discount ... ok\nRan 2 tests in 0.000s\nOK · 종료 코드 0',
    interpretation: '두 테스트의 통과와 변경된 파일을 근거로 이 작은 작업의 결과를 확인합니다.',
  },
]
const current = computed(() => steps[step.value])
</script>
<template>
  <div class="recorded-trace">
    <div class="trace-controls">
      <button @click.stop="step = Math.max(0, step - 1)" :disabled="step === 0" aria-label="이전 실행 기록">이전</button>
      <span class="trace-step">{{ step + 1 }} / {{ steps.length }} · {{ current.title }}</span>
      <button @click.stop="step = Math.min(steps.length - 1, step + 1)" :disabled="step === steps.length - 1" aria-label="다음 실행 기록">다음</button>
    </div>
    <div class="columns">
      <section>
        <p class="code-label">요청한 도구 작업</p>
        <pre class="code">{{ current.command }}</pre>
      </section>
      <section>
        <p class="code-label">도구가 반환한 결과 · 발췌</p>
        <pre class="code trace-output" aria-live="polite">{{ current.output }}</pre>
      </section>
    </div>
    <p class="trace-next">{{ current.interpretation }}</p>
  </div>
</template>
