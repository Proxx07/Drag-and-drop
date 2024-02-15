import {computed} from "vue";
import {folder, file} from "@/assets/icons";
import type {IAccordionHeadings, IAccordionItem} from "@/types";

import {useDropDown} from "@/composables/UI/useDropDown";

export interface IProps {
  openedIndex?: number
  index: string
  name: string
  order: number
  folders?: IAccordionItem[]
}

export interface IEmits {
  (e: 'update:openedIndex', index: number | string | null): void
  (e: 'delete', index: string): void
  (e: 'edit', index: string): void
}

export const useAccordionHeader = (props: IProps, emit: IEmits) => {
  const {isDropdownOpened, closeDropdown, toggleDropdown} = useDropDown()

  const hasChild = computed(() => Array.isArray(props.folders) && props.folders.length > 0)

  const nameIcon = computed(() => hasChild.value ? folder : file)

  const folderNames = computed<string>(() => {
    return props.folders && hasChild.value ? props.folders?.reduce((acc, {title}) => acc + title + ' / ', "") : ""
  });

  const headings = computed<IAccordionHeadings[]>(() => {
    return [
      {
        name: '№',
        value: props.index
      },

      {
        name: 'Название',
        value: props.name,
        icon: nameIcon.value,
        boldName: hasChild.value
      },

      {
        name: "Очерёдность",
        value: props.order
      },

      {
        name: "Подкатегории",
        value: folderNames.value
      }
    ]
  })

  const arrowClickHandler = (index: number | string) => {
    const value = props.openedIndex === index ? null : index
    emit('update:openedIndex', value)
  }

  const editHandler = (index: string) => {
    closeDropdown()
    emit('edit', index)
  }
  const deleteHandler = (index: string) => {
    closeDropdown()
    emit('delete', index)
  }

  return {
    nameIcon,
    folderNames,
    isDropdownOpened,
    headings,

    toggleDropdown,
    closeDropdown,
    arrowClickHandler,
    editHandler,
    deleteHandler
  }
}