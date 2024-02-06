<script setup lang="ts">
import VAccordionHeader from "@/components/VAccordionHeader.vue";
import {useAccordionList, type IProps, type IEmits} from "@/composables/useAccordionList";

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const {
  activeItemIndex,
  openedIndex,
  itemsCount,
  mouseY,
  isChildItem,

  mouseDownHandler,
  mouseMoveHandler,
  mouseLeaveHandler,
  mouseUpHandler,
  mouseOverHandler
} = useAccordionList(props, emit)

</script>

<template>
  <div class="accordion" @mousemove.stop="mouseMoveHandler" @mouseleave.stop="mouseLeaveHandler">
    <div class="accordion-layout" v-for="i in itemsCount" :key="modelValue[i].id" @mouseover.stop="mouseOverHandler" @mouseup.stop="mouseUpHandler">
      <div
          :class="{
          'accordion__item': true,
          'accordion__item--child': isChildItem,
          'accordion__item--fixed': activeItemIndex === i
        }"
          :style="{
          '--top': activeItemIndex === i ? mouseY : '',
          '--cursor': activeItemIndex === i ? 'grabbing' : 'grab'
        }"
          @mousedown.stop="mouseDownHandler(i)"
      >

        <v-accordion-header
            v-model:openedIndex="openedIndex"
            :key="modelValue[i].id"
            :name="modelValue[i].title"
            :index="parentIndex ? parentIndex + '.' + (i + 1) : i + 1"
            :order="i + 1"
            :folders="modelValue[i]?.childs"
            :class="[isChildItem && 'child-item']"
        />
<!--        <Transition name="fade">-->
          <div class="accordion__item-body" v-if="openedIndex === i">
            <v-accordion
                v-if="modelValue[i]?.childs"
                v-model="modelValue[i].childs"
                :parent-index="parentIndex ? parentIndex + '.' + (i + 1) : i + 1"
            />
          </div>
<!--        </Transition>-->
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.accordion-layout {
  background: var(--secondary);
  border-radius: var(--border-radius-s);
  min-height: 8rem;
  margin-bottom: .6rem;
  border: 1px solid var(--primary-bg);

  &:has(> .accordion__item--fixed) {
    border-color: var(--primary);
    border-style: dashed;
  }

  &:has(> .accordion__item--child) {
    margin-bottom: 0;
    border-radius: 0;
  }
}

.accordion {
  width: 100%;
  user-select: none;

  &__item {
    width: 100%;
    max-width: 165rem;
    margin: -1px 0;

    &--fixed {
      position: fixed;
      pointer-events: none;
      top: calc(var(--top) * 1px);
      transform: translateY(-30%);
    }
  }
}
</style>
