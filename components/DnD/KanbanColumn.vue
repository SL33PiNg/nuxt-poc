<template>
  <v-card :variant="isDragOver ? 'outlined' : 'elevated'" class="ga-1 mx-2 pa-1 d-flex flex-column  w-100 "
    @drop="onDrop" @dragenter="onDragEnter" @dragleave="onDragLeave" @dragover.prevent>
    <div class="d-flex">
      <p class="text-h5 font-weight-bold text-uppercase mr-1">{{ status }}</p>
      <v-chip :color="color" variant="elevated">{{ card.length }}</v-chip>
    </div>
    <v-divider :thickness="4" class="my-1" opacity="75"></v-divider>

    <DnDKanbanCard v-for="item in card" :item :key="item.id" />

  </v-card>
</template>

<script setup lang="ts">
import type { Item } from './kanbanType';

type Props = {
  card: Item[]
  status: string
  color: string
}

const { card, status, color } = defineProps<Props>()
const emits = defineEmits<{
  onDrop: [status: string]
}>()

const { draggingItem } = useKanbanStore()
const isDragOver = ref(false)


function onDrop() {
  emits('onDrop', status)
  isDragOver.value = false
}

function onDragEnter(e: DragEvent) {
  isDragOver.value = true
  if (draggingItem.value?.status !== status) {

  }
}

function onDragLeave(e: DragEvent) {
  isDragOver.value = false
}



</script>