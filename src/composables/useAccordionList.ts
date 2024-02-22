import type {IAccordionItem} from "@/types";
import {computed, ref} from "vue";
export interface IProps {
  parentIndex?: number | string // more than 0
  modelValue: IAccordionItem[]
}

export interface IEmits {
  (e: 'update:modelValue', list: IAccordionItem[]): void
  (e: 'delete', index: string): void
  (e: 'edit', index: string): void
}
export const useAccordionList = (props: IProps, emit: IEmits) => {
  let timeout: NodeJS.Timeout;

  const openedIndex = ref<number>();
  const activeItemIndex = ref<number>();

  const mouseY = ref<number>()

  const itemsCount = computed(() => {
    return Array.from(Array(props.modelValue.length).keys())
  });

  const isChildItem = computed(() => !!props.parentIndex)

  const mouseMoveHandler = (event: MouseEvent) => {
    if (activeItemIndex.value === undefined) return
    mouseY.value = event.clientY
  }

  const mouseLeaveHandler = () => {
    if (activeItemIndex.value === undefined) return
    activeItemIndex.value = undefined
  }

  const mouseDownHandler = (event: MouseEvent, index: number) => {
    timeout = setTimeout(() => {
      activeItemIndex.value = index
      mouseY.value = event.clientY
      openedIndex.value = undefined
    }, 150)
  }

  const mouseUpHandler = () => {
    activeItemIndex.value = undefined
    mouseY.value = undefined
    clearTimeout(timeout)
  }

  const mouseOverHandler = (layoutIndex: number) => {
    if (activeItemIndex.value === undefined || activeItemIndex.value === layoutIndex) return
    const sortedList = JSON.parse(JSON.stringify(props.modelValue))
    sortedList[activeItemIndex.value] = props.modelValue[layoutIndex]
    sortedList[layoutIndex] = props.modelValue[activeItemIndex.value]
    activeItemIndex.value = layoutIndex
    emit('update:modelValue', sortedList)

  }

  const editHandler = (index: string) => {
    emit('edit', index)
  }

  const deleteHandler = (index: string) => {
    emit('delete', index)
  }

  return {
    openedIndex,
    itemsCount,
    activeItemIndex,
    mouseY,
    isChildItem,

    editHandler,
    deleteHandler,

    mouseUpHandler,
    mouseDownHandler,
    mouseMoveHandler,
    mouseLeaveHandler,
    mouseOverHandler,
  }
}
