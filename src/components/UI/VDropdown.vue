<script setup lang="ts"></script>

<template>
<ul class="dropdown">
  <slot/>
</ul>
</template>

<style scoped lang="scss">
.dropdown {
  list-style: none;
  position: absolute;
  padding: .4rem;
  border-radius: var(--border-radius-s);
  background: var(--primary-bg);
  right: 0;
  width: auto;
  top: 100%;
  box-shadow: var(--shadow);
}
</style>
