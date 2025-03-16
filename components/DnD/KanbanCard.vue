<template>
  <v-card draggable="true" @dragstart="startDrag($event, item)" @dragend="endDrag" class="card-transition "
    :class="[isDraging ? 'cursor-grabbing' : 'cursor-grab']">
    <v-card-title>{{ item.title }}</v-card-title>
    <v-card-text style="user-select: none;">{{ item.status }}</v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import type { Item } from './kanbanType';

type Props = {
  item: Item
}
const { item } = defineProps<Props>()

const { draggingItem } = useKanbanStore()

const isDraging = computed(() => draggingItem.value === item)

function startDrag(e: DragEvent, item: Item) {
  draggingItem.value = item
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.effectAllowed = 'move';
  }
}

function endDrag() {
  draggingItem.value = null
}

const cardName = ref(`card-${item.id}`)

</script>

<style>
.card-transition {
  view-transition-name: v-bind(cardName);
}
</style>