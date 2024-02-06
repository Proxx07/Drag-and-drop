<script setup lang="ts">
const props = defineProps<{
  icon: string
}>()
</script>

<template>
  <span class="icon" v-html="props.icon"/>
</template>

<style scoped lang="scss">
.icon {
  display: inline-block;
  font-size: 0;

  &:not(.no-fill) {
    :deep(svg path[stroke]) {
      stroke: currentColor;
    }
  }

  &:not(.no-fill) {
    :deep(svg path[fill]) {
      fill: currentColor;
    }
  }
}
</style>
