import type {IAccordionItem} from "@/types";
import {computed, ref} from "vue";
export interface IProps {
  parentIndex?: number | string // more than 0
  modelValue: IAccordionItem[]
}

export interface IEmits {
  (e: 'update:modelValue', list: IAccordionItem[]): void;
}
export const useAccordionList = (props: IProps, emit: IEmits) => {
  let timeout: NodeJS.Timeout;

  const openedIndex = ref<number | null>(null);
  const activeItemIndex = ref<number | null>(null);

  const mouseY = ref<number | null>()

  const itemsCount = computed(() => {
    return Array.from(Array(props.modelValue.length).keys())
  });

  const isChildItem = computed(() => !!props.parentIndex)

  const mouseMoveHandler = (event: MouseEvent) => {
    if (activeItemIndex.value === null) return
    mouseY.value = event.clientY
  }

  const mouseLeaveHandler = () => {
    if (activeItemIndex.value === null) return
    activeItemIndex.value = null
    console.log('Mouse leaved parent accordion')
  }

  const mouseDownHandler = (index: number) => {
    timeout = setTimeout(() => {
      activeItemIndex.value = index
      openedIndex.value = null
    }, 250)
  }

  const mouseUpHandler = () => {
    activeItemIndex.value = null
    mouseY.value = null
    clearTimeout(timeout)
  }

  const mouseOverHandler = (layoutIndex: number) => {
    if (activeItemIndex.value === null || activeItemIndex.value === layoutIndex) return
    const sortedList = JSON.parse(JSON.stringify(props.modelValue))
    sortedList[activeItemIndex.value] = props.modelValue[layoutIndex]
    sortedList[layoutIndex] = props.modelValue[activeItemIndex.value]
    activeItemIndex.value = layoutIndex
    emit('update:modelValue', sortedList)

  }

  return {
    openedIndex,
    itemsCount,
    activeItemIndex,
    mouseY,
    isChildItem,

    mouseUpHandler,
    mouseDownHandler,
    mouseMoveHandler,
    mouseLeaveHandler,
    mouseOverHandler,
  }
}
