<script setup lang="ts">
import {computed, ref} from "vue";
import {folder, file, arrow, dots} from "@/assets/icons";

import type {IAccordionItem} from "@/types";

const props = defineProps<{
  openedIndex?: number
  index: number | string
  name: string
  order: number
  folders?: IAccordionItem[]
}>();

const emit = defineEmits<{
  (e: 'update:openedIndex', index: number | string | null): void
  (e: 'delete', index: string | number): void
  (e: 'edit', index: string | number): void
}>()

const folderNames = props.folders ? computed(() => props.folders?.reduce((acc, {title}) => acc + title + ' / ', "")) : ""

const nameIcon = computed(() => props.folders ? folder : file)

const dropdown = ref(false);

const arrowClickHandler = (index: number | string) => {
  const value = props.openedIndex === index ? null : index
  emit('update:openedIndex', value)
}

const editHandler = (index: string | number) => {
  dropdown.value = false
  emit('edit', index)
}
const deleteHandler = (index: string | number) => {
  dropdown.value = false
  emit('delete', index)
}
</script>

<template>
  <div :class="['accordion__item-title', openedIndex === order - 1 && 'opened']">
    <div class="number">
      <div class="title">№</div>
      <div class="value">{{index}}</div>
    </div>

    <div class="name">
      <div class="title">Название</div>
      <div :class="['value', folders?.length && 'bold']">
        <v-icon class="no-fill" :icon="nameIcon"/>
        {{name}}
      </div>
    </div>

    <div class="order">
      <div class="title">Очерёдность</div>
      <div class="value">{{order}}</div>
    </div>

    <div class="folders">
      <div class="title" v-if="folderNames">Подкатегории</div>
      <div class="value" v-if="folderNames">
        {{folderNames}}
      </div>
    </div>

    <div class="actions">
      <v-chip v-if="props.folders?.length" :text="props.folders.length" type="secondary"/>
      <span/>
      <v-button
          v-if="folders?.length"
          :class="['primary', openedIndex === order - 1 && 'active']"
          :icon="arrow"
          @click="arrowClickHandler(order - 1)"
      />

      <div class="dropdown-wrapper">
        <v-button :class="['secondary', dropdown && 'active']" :icon="dots" @click="dropdown = !dropdown"/>
        <Transition name="fade">
          <v-dropdown v-if="dropdown">
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
