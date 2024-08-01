import { ref } from 'vue'
import { defineStore } from 'pinia'
import { generateTwoColors } from '@/lib/generateColors'
import type { IBoardCell } from '@/types/board-cell'
const CELLS_KEY = 'cells'

const INIT_CELLS: IBoardCell[] = [
  { id: 1, item: { colors: generateTwoColors(), count: 4 } },
  { id: 2, item: { colors: generateTwoColors(), count: 2 } },
  { id: 3, item: { colors: generateTwoColors(), count: 5 } },
  { id: 4, item: null },
  { id: 5, item: null },
  { id: 6, item: null },
  { id: 7, item: null },
  { id: 8, item: null },
  { id: 9, item: null },
  { id: 10, item: null },
  { id: 11, item: null },
  { id: 12, item: null },
  { id: 13, item: null },
  { id: 14, item: null },
  { id: 15, item: null },
  { id: 16, item: null },
  { id: 17, item: null },
  { id: 18, item: null },
  { id: 19, item: null },
  { id: 20, item: null },
  { id: 21, item: null },
  { id: 22, item: null },
  { id: 23, item: null },
  { id: 24, item: null },
  { id: 25, item: null }
]
const INIT_COUNT = 5

export const useBoardStore = defineStore('boardStore', () => {
  const savedCells = localStorage.getItem(CELLS_KEY)
  const selectedCell = ref<IBoardCell | null>(null)
  const cells = ref<IBoardCell[]>(savedCells ? JSON.parse(savedCells) : INIT_CELLS)
  if (!savedCells) saveCells()

  function setSelectedCell(cell: IBoardCell) {
    selectedCell.value = cell
  }

  function saveCells() {
    localStorage.setItem(CELLS_KEY, JSON.stringify(cells.value))
  }

  function createCell(id: number) {
    const cellIndex = cells.value.findIndex((c) => c.id === id)
    if (cellIndex === -1) return

    cells.value[cellIndex].item = {
      colors: generateTwoColors(),
      count: INIT_COUNT
    }
    setSelectedCell(cells.value[cellIndex])
    saveCells()
  }

  function swapCells(prevIndex: number, nextIndex: number) {
    ;[cells.value[prevIndex], cells.value[nextIndex]] = [
      cells.value[nextIndex],
      cells.value[prevIndex]
    ]
    saveCells()
  }

  function dicrementCellCount(id: number, count: number) {
    const cellIndex = cells.value.findIndex((c) => c.id === id)
    if (cellIndex === -1) return

    const item = cells.value[cellIndex].item
    if (!item) return

    item.count -= count
    if (item?.count <= 0) cells.value[cellIndex].item = null

    selectedCell.value = null
    saveCells()
  }
  return {
    cells,
    selectedCell,
    setSelectedCell,
    swapCells,
    dicrementCellCount,
    createCell
  }
})
