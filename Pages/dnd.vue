<template>
  <div class="d-flex w-100 h-75">

    <div v-for="status in statuss" :key="status" class="drop-zone ga-1 mx-1 pa-1 d-flex w-100 flex-column"
      @drop="onDrop($event, status)" @dragenter.prevent @dragover.prevent>
      <div class="d-flex ">
        <p class="text-h5 font-weight-bold text-uppercase mr-1">{{ status }}</p>
        <v-chip :color="getColor(status)" variant="elevated">{{ getList(status).length }}</v-chip>
      </div>
      <v-divider :thickness="4" class="my-1" :color="getColor(status)" opacity="75"></v-divider>

      <v-card @dragstart="startDrag($event, item)" variant="tonal" draggable="true" height="50"
        v-for="item in getList(status)" :key="`${status}_${item.id}`" class="text-center cursor-move">{{ item.name
        }}</v-card>

    </div>

  </div>
  <Draggable v-slot="{x,y}" prevent-default :initial-value="{ x: 10, y: 10 }" class="position-absolute">
    {{ x }} - {{ y }}
  </Draggable>
  <div class="d-flex w-100 h-25">
    <v-card>
      <p v-for="item in items" :key="item.id">
        {{ item.name }} - {{ item.status }}
      </p>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { UseDraggable as Draggable } from '@vueuse/components'

enum ItemStatus {
  OPEN = 1,
  CONFIRM = 2,
  INPROGRESS = 3,
  DONE = 4
}
type Status = keyof typeof ItemStatus

type Item = {
  id: number
  name: string
  status: Status
}
const statuss = Object.values(ItemStatus).filter(v => typeof v === 'string') as Status[]

function getColor(status: Status) {
  switch (status) {
    case "OPEN":
      return 'gray'
    case 'CONFIRM':
      return 'indigo'
    case "INPROGRESS":
      return 'yellow'
    case "DONE":
      return 'teal'
  }
}

// create ref item list with 10 times random status
const items = ref<Array<Item>>([
  { id: 1, name: 'Item 1', status: "OPEN" },
  { id: 2, name: 'Item 2', status: "INPROGRESS" },
  { id: 3, name: 'Item 3', status: "OPEN" },
  { id: 4, name: 'Item 4', status: "DONE" },
  { id: 5, name: 'Item 5', status: "INPROGRESS" },
  { id: 6, name: 'Item 6', status: "CONFIRM" },
  { id: 7, name: 'Item 7', status: "INPROGRESS" },
  { id: 8, name: 'Item 8', status: "OPEN" },
  { id: 9, name: 'Item 9', status: "CONFIRM" },
  { id: 10, name: 'Item 10', status: "OPEN" }
])

function getList(status: Status) {
  return items.value.filter(i => i.status === status)
}

function startDrag(e: DragEvent, item: Item) {
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('itemid', item.id.toString());
  }
}

const dropTransition = ref('list-left')

function setDropTransition(from: Status, to: Status) {
  console.log(from, to)
  if (ItemStatus[from] < ItemStatus[to]) {
    console.log('right')
    dropTransition.value = 'list-right'
  } else {
    console.log('left')
    dropTransition.value = 'list-left'
  }
}

function onDrop(e: DragEvent, status: Status) {
  if (e.dataTransfer) {
    const itemId = e.dataTransfer.getData('itemId')
    const item = items.value.find(i => i.id.toString() === itemId)
    if (item) {
      // setDropTransition(item.status, status)
      item.status = status
    }
  }
}
onMounted(() => {

  // add animation when drag item
  document.addEventListener('dragstart', (e) => {
    if (e.target instanceof HTMLElement) {
      //other style
      e.target.classList.add('dragging')
    }
  })

  document.addEventListener('dragend', (e) => {
    if (e.target instanceof HTMLElement) {
      //other style
      e.target.classList.remove('dragging')
    }
  })


})

</script>
<style scoped>
.dragging {
  opacity: 0.5;
  transform: scale(0.9);
}

.list-left-enter-active,
.list-left-leave-active .list-right-enter-active,
.list-right-leave-active {
  transition: all 0.5s ease;
}

.list-left-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-left-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-right-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.list-right-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
