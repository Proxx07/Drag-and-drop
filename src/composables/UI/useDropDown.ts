import {ref} from "vue";

export const useDropDown = () => {
  const isDropdownOpened = ref<boolean>(false);

  const toggleDropdown = () => {
    isDropdownOpened.value = !isDropdownOpened.value
  }

  const closeDropdown = () => {
    isDropdownOpened.value = false
  }

  return {
    isDropdownOpened,
    closeDropdown,
    toggleDropdown,
  }
}