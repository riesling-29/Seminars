<template>
  <div class="slidev-layout section-layout">
    <div class="section-marker">SECTION</div>
    <slot />
  </div>
</template>

<style scoped>
.section-layout {
  position: relative;
  padding: 3.5rem 4rem;
  background:
    linear-gradient(135deg, rgba(37, 99, 235, 0.06), transparent 45%),
    #ffffff;
}
.section-marker {
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  color: #2563eb;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.22em;
}
</style>

