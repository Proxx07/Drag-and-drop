<script setup lang="ts">
import VIcon from "@/components/UI/VIcon.vue";

defineProps<{
  icon?: string
}>();

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
<button class="button" @click="emit('click')">
  <v-icon v-if="icon" :icon="icon"/>
  <slot/>
</button>
</template>

<style scoped lang="scss">
.button {
  color: var(--color);
  background: var(--bg);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: var(--transition);

  &.primary {
    --bg: var(--primary);
    --color: var(--primary-bg);
    --border: transparent;
    &:hover, &.active {
      --bg: var(--secondary-bg);
      --color: var(--primary);
      --border: var(--color);
    }
  }
  &.secondary {
    --bg: var(--primary-bg);
    --color: var(--primary);
    --border: var(--color);
    &:hover, &.active {
      --bg: var(--primary);
      --color: var(--primary-bg);
      --border: transparent;
    }
  }
}
</style>
