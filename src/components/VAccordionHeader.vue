<script setup lang="ts">
import {arrow, dots} from "@/assets/icons";
import {useAccordionHeader, type IProps, type IEmits} from "@/composables/useAccordionHeader";

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const {
  isDropdownOpened,
  headings,

  toggleDropdown,
  closeDropdown,
  arrowClickHandler,
  editHandler,
  deleteHandler
} = useAccordionHeader(props, emit);
</script>

<template>
  <div :class="['accordion__item-title', openedIndex === order - 1 && 'opened']">

    <div class="item" v-for="item in headings" :key="item.name">
      <div class="title" v-if="item.value">
        <v-icon v-if="item.icon" class="no-fill" :icon="item.icon"/>
        {{item.name}}
      </div>

      <div :class="['value', item.boldName && 'bold']" v-if="item.value">
        {{item.value}}
      </div>
    </div>

    <div class="actions">
      <v-chip v-if="folders?.length" :text="folders.length" type="secondary"/>
      <span/>
      <v-button
          v-if="folders?.length"
          :class="['primary', openedIndex === order - 1 && 'active']"
          :icon="arrow"
          @click="arrowClickHandler(order - 1)"
      />

      <div class="dropdown-wrapper" v-outside-click="closeDropdown">
        <v-button :class="['secondary', isDropdownOpened && 'active']" :icon="dots" @click="toggleDropdown"/>
        <Transition name="fade">
          <v-dropdown v-if="isDropdownOpened">
            <v-dropdown-item @click="editHandler(index)"> Редактировать </v-dropdown-item>
            <v-dropdown-item @click="deleteHandler(index)"> Удалить </v-dropdown-item>
          </v-dropdown>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.accordion__item-title {
  padding: 1.8rem 2rem 2.1rem 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr 5fr 14fr 5fr;
  gap: 1.2rem;
  box-shadow: var(--shadow);
  background: var(--primary-bg);
  border-radius: var(--border-radius-s);
  cursor: var(--cursor);
  &.opened {
    border-radius: var(--border-radius-s) var(--border-radius-s) 0 0;
  }
  &.child-item {
    border-radius: 0;
    border-top: 1px solid #E1E1E1;
  }

  .title {
    font: var(--font-s);
    color: var(--secondary-color);
    margin-bottom: .9rem;
  }

  .value {
    font: var(--font-m-m);
    color: var(--primary-color);
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    &.bold {
      font-weight: bold;
    }
  }
}

.actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.2rem;
  button {
    width: 3.2rem;
    height: 3.2rem;
    font-size: 0;
    border-radius: var(--border-radius-s);
    z-index: 1;
  }
}

.dropdown-wrapper {
  position: relative;
}
</style>
