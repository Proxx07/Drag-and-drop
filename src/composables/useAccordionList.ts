import type {IAccordionItem} from "@/types";
import {computed, ref} from "vue";
export interface IProps {
  list: IAccordionItem[]
}

export interface IEmits {
  (e: 'onmousedown', item: IAccordionItem): void;
  (e: 'onmouseleave'): void;
  (e: 'onmousemove'): void;
}
export const useAccordionList = (props: IProps, emit: IEmits) => {
  const openedIndex = ref<number>();
  const activeItemIndex = ref<number | null>(null);

  const mouseY = ref<number>()

  const itemsCount = computed(() => Array.from(Array(props.list.length).keys()));

  let timeout: number | undefined = undefined;
  const mouseMoveHandler = (event: MouseEvent) => {
    //if (activeItemIndex.value === null) return
    mouseY.value = event.clientY
  }

  const mouseLeaveHandler = (event: MouseEvent) => {
    //if (activeItemIndex.value === null) return
  }

  const mouseDownHandler = (index: number) => {
    timeout = setTimeout(() => {
      activeItemIndex.value = index
    }, 100)
  }

  const mouseUpHandler = () => {
    activeItemIndex.value = null
    clearTimeout(timeout)
  }

  return {
    openedIndex,
    itemsCount,
    activeItemIndex,
    mouseY,

    mouseUpHandler,
    mouseDownHandler,
    mouseMoveHandler,
    mouseLeaveHandler,
  }
}