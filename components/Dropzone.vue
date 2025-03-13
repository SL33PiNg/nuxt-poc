<template>
  <div ref="dropZoneRef" class="drop-zone ga-1 mx-1 pa-1 d-flex w-100 flex-column">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useDropZone } from '@vueuse/core'
const dropZoneRef = ref<HTMLDivElement>()

const emits = defineEmits<{
  onDrop: [id: number, status: string]
}>()

function onDrop(files: File[] | null, e: DragEvent) {
  console.log({ files })
  console.log({ e })
  // emits('onDrop', )
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  multiple: false,
  dataTypes: (d) =>  { console.log(d.includes('itemid')); return true} ,
  preventDefaultForUnhandled: true
})

</script>

<style></style>