<template>
  <div class="w-100 h-100 pa-1">
    <DnDKanban @on-drop="onDrop" :items="items" select-item-key="status" :status="[ItemStatus.TODO, ItemStatus.DOING, ItemStatus.DONE]" :get-color="getColor" />
      
  </div>
</template>
<script lang="ts" setup>
import type { Item } from '~/components/DnD/kanbanType'
enum ItemStatus {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE'
}



function getColor(status: ItemStatus): string {
  switch (status) {
    case ItemStatus.TODO:
      return 'red'
    case ItemStatus.DOING:
      return 'yellow'
    case ItemStatus.DONE:
      return 'green'
    default:
      return 'gray' // or any default color
  }
}

function setItemStatus(id: string, status: ItemStatus) {
  items.value = items.value.map(item => {
    if (item.id === id) {
      item.status = status
    }
    return item
  })
}

function onDrop(id: string, status: string) {
  document.startViewTransition(() => {
    setItemStatus(id, status as ItemStatus)
  })

}
const items = ref<Item[]>([
  { id: '1', title: 'Task 1', status: ItemStatus.TODO },
  { id: '2', title: 'Task 2', status: ItemStatus.DOING },
  { id: '3', title: 'Task 3', status: ItemStatus.DONE },
  { id: '4', title: 'Task 4', status: ItemStatus.TODO },
  { id: '5', title: 'Task 5', status: ItemStatus.DOING },
  { id: '6', title: 'Task 6', status: ItemStatus.DONE },
  { id: '7', title: 'Task 7', status: ItemStatus.TODO },
  { id: '8', title: 'Task 8', status: ItemStatus.DOING },
  { id: '9', title: 'Task 9', status: ItemStatus.DONE },
  { id: '10', title: 'Task 10', status: ItemStatus.TODO },
  { id: '11', title: 'Task 11', status: ItemStatus.DOING },
  { id: '12', title: 'Task 12', status: ItemStatus.DONE },
  { id: '13', title: 'Task 13', status: ItemStatus.TODO },
  { id: '14', title: 'Task 14', status: ItemStatus.DOING },
  { id: '15', title: 'Task 15', status: ItemStatus.DONE },
  { id: '16', title: 'Task 16', status: ItemStatus.TODO },
  { id: '17', title: 'Task 17', status: ItemStatus.DOING },
  { id: '18', title: 'Task 18', status: ItemStatus.DONE },
  { id: '19', title: 'Task 19', status: ItemStatus.TODO },
  { id: '20', title: 'Task 20', status: ItemStatus.DOING }
])




</script>