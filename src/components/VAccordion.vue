<script setup lang="ts">
import {useAccordionList, type IProps, type IEmits} from "@/composables/useAccordionList";

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const {activeItemIndex, openedIndex, itemsCount, mouseY, mouseDownHandler, mouseMoveHandler, mouseLeaveHandler, mouseUpHandler} = useAccordionList(props, emit)

</script>

<template>
  <div class="accordion" @mousemove="mouseMoveHandler" @mouseleave="mouseLeaveHandler">
    <div class="accordion-layout" ref="layout" v-for="index in itemsCount" :key="list[index].id">
      <div
        :class="{
          'accordion__item': true,
          'accordion__item--fixed': activeItemIndex === index
        }"
        :style="{
          '--top': activeItemIndex === index ? mouseY : '',
          '--cursor': activeItemIndex === index ? 'grabbing' : 'grab'
        }"
        @mousedown.stop="mouseDownHandler(index)"
        @mouseup="mouseUpHandler"
      >

        <div class="accordion__item-title">
          {{list[index].title}} index: {{index}}
          <button v-if="list[index].childs" @click.stop="openedIndex = index">Open</button>
        </div>

        <div class="accordion__item-body" v-if="list[index].childs && openedIndex === index">
          <!-- TS не обращает внимания на верхнюю проверку и ругается что childs может быть undefined -->
          <v-accordion :list="list[index].childs ?? []"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.accordion-layout {
  border: 1px dashed var(--primary);
  border-radius: 5px;
  min-height: 8rem;
  background: var(--secondary);
  margin-left: 1rem;
}

.accordion {
  width: 100%;
  user-select: none;

  &__item {
    width: 100%;
    min-height: 8rem;
    max-width: 1440px;
    &-title {
      padding: 1rem;
      cursor: var(--cursor);
      display: flex;
      align-items: center;
      background: var(--primary-bg);
      margin: -0.1rem;
      border-radius: 5px;
      min-height: 8rem;
    }

    &--fixed {
      position: fixed;
      top: calc(var(--top) * 1px);
      transform: translateY(-50%);
    }
  }
}
</style>