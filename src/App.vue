<script setup lang="ts">
import {ref} from "vue";
import type {IAccordionItem} from "@/types";
import {list as arr} from "@/data";
import VChip from "@/components/UI/VChip.vue";

const list = ref<IAccordionItem[]>(arr)
</script>

<template>
  <div class="wrapper">
    <h1>
      Список тем обращения и продуктов
      <v-chip :text="`Найдено: ${list.length}`"/>
    </h1>
    <v-accordion v-model="list"/>
  </div>
</template>

<style lang="scss" scoped>

h1 {
  font: var(--font-l);
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 4rem
}
</style>
