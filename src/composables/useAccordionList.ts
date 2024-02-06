import type {IAccordionItem} from "@/types";
import {computed, ref} from "vue";
export interface IProps {
  parentIndex?: number | string // more than 0
  modelValue: IAccordionItem[]
}

export interface IEmits {
  (e: 'onmousedown', index: number): void;
  (e: 'onmouseleave'): void;
  (e: 'onmousemove'): void;
}
export const useAccordionList = (props: IProps, emit: IEmits) => {
  let timeout: NodeJS.Timeout;

  const openedIndex = ref<number>();
  const activeItemIndex = ref<number | null>(null);

  const mouseY = ref<number>()

  const itemsCount = computed(() => {
    return Array.from(Array(props.modelValue.length).keys())
  });

  const isChildItem = computed(() => !!props.parentIndex)

  const mouseMoveHandler = (event: MouseEvent) => {
    if (activeItemIndex.value === null) return
    mouseY.value = event.clientY
    //emit('onmousemove')
  }

  const mouseLeaveHandler = (event: MouseEvent) => {
    if (activeItemIndex.value === null) return
    activeItemIndex.value = null
    console.log('Mouse leaved parent accordion')
    //emit('onmouseleave')
  }

  const mouseDownHandler = (index: number) => {
    timeout = setTimeout(() => {
      activeItemIndex.value = index
      //emit('onmousedown', index)
    }, 100)
  }

  const mouseUpHandler = () => {
    activeItemIndex.value = null
    clearTimeout(timeout)
  }

  const mouseOverHandler = (event: MouseEvent) => {
    if (activeItemIndex.value === null) return
    console.log((event.target as HTMLElement).closest('.accordion-layout'))
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
