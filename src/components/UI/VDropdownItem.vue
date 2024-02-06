<script setup lang="ts"></script>

<template>
<li>
  <slot/>
</li>
</template>

<style scoped lang="scss">
li {
  cursor: pointer;
  padding: 1rem 2.4rem;
  transition: var(--transition);
  background: transparent;
  border-radius: var(--border-radius-s);
  font: var(--font-m-m);
  &:hover {
    background: var(--secondary);
  }
}
</style>
