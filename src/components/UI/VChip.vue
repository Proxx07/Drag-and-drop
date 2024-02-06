<script setup lang="ts">
defineProps<{
  text: string | number
  type?: 'primary' | 'secondary'
}>()
</script>

<template>
  <span :class="['chip', type ?? 'primary']">
    {{text}}
  </span>
</template>

<style scoped lang="scss">
.chip {
  --bg: var(--primary-bg);
  --color: var(--primary);
  &.secondary {
    --bg: var(--secondary-bg);
    --color: var(--primary-bg);
  }

  padding: .4rem 1rem;
  color: var(--color);
  background: var(--bg);
  display: inline-block;
  font: var(--font-s);
  border-radius: var(--border-radius-s);
}
</style>
