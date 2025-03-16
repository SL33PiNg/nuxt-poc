import type { Item } from "~/components/DnD/kanbanType"

export const useKanbanStore = () => {

  const draggingItem = useState<Item | null>('draggingItem', () => null)

  return { draggingItem }
}
