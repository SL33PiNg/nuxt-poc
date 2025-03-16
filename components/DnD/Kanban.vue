<template>
  <div class="w-100 h-100 d-flex justify-space-between">
    <DnDKanbanColumn @on-drop="onDrop" v-for="s in status" :key="s" :card="getItemsByStatus(s)" :status="s" :color="getColor(s)"  />
  </div>
</template>

<script lang="ts" setup generic="T extends string">
import type { Item } from './kanbanType';
type Props = {
  items: Item[]
  status: T[]
  getColor: (status: T) => string
}

const { items, status, getColor } = defineProps<Props>()

const emits = defineEmits<{
  onDrop: [id: string, status: string]
}>()

const {  draggingItem } = useKanbanStore()

function onDrop(status: string) {
  if(!draggingItem.value) {
    return
  }
  emits('onDrop', draggingItem.value.id, status)
}
function getItemsByStatus(s: string) {
  return items.filter(item => item.status === s)
}

</script>

<style></style>