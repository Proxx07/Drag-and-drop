<script setup lang="ts">
import {ref} from "vue";
import type {IAccordionItem} from "@/types";
import {list as arr} from "@/data";

const list = ref<IAccordionItem[]>(arr)
</script>

<template>
<v-accordion :list="list" parent-key="acc"/>
</template>

<style lang="scss" scoped>

</style>
