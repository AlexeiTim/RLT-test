import { ref } from 'vue'
import { defineStore } from 'pinia'
import GreenItem from '@/assets/green-item.png'
import PrimaryItem from '@/assets/primary-item.png'
import OrangeItem from '@/assets/orage-item.png'
import type { BoardCell } from '@/types/board-cell'
const CELLS_KEY = 'cells'

const INIT_CELLS = [
  { id: 1, item: { src: GreenItem, count: 4 } },
  { id: 2, item: { src: PrimaryItem, count: 2 } },
  { id: 3, item: { src: OrangeItem, count: 5 } },
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
export const useBoardStore = defineStore('boardStore', () => {
  const savedCells = localStorage.getItem(CELLS_KEY)
  const cells = ref<BoardCell[]>(savedCells ? JSON.parse(savedCells) : INIT_CELLS)

  function swapCells(prevIndex: number, nextIndex: number) {
    ;[cells.value[prevIndex], cells.value[nextIndex]] = [
      cells.value[nextIndex],
      cells.value[prevIndex]
    ]
    localStorage.setItem(CELLS_KEY, JSON.stringify(cells.value))
  }
  return {
    cells,
    swapCells
  }
})