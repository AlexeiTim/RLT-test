<script setup lang="ts">
import { ref } from 'vue'
import testIMG from '@/assets/test-img.png'
import AppSkeleton from './components/common/AppSkeleton.vue'
import ThemeProvider from './components/ThemeProvider.vue'
import { useTheme } from './composables/useTheme'
import GreenItem from '@/assets/green-item.png'
import PrimaryItem from '@/assets/primary-item.png'
import OrangeItem from '@/assets/orage-item.png'
import CloseIcon from './components/icons/CloseIcon.vue'
import BoardPanel from './components/BoardPanel.vue'
import type { BoardCell } from './types/board-cell'

const { toggleTheme } = useTheme()

const cells = ref<BoardCell[]>([
  { id: 1, item: GreenItem, count: 4 },
  { id: 2, item: PrimaryItem, count: 2 },
  { id: 3, item: OrangeItem, count: 5 },
  { id: 4, item: null, count: 0 },
  { id: 5, item: null, count: 0 },
  { id: 6, item: null, count: 0 },
  { id: 7, item: null, count: 0 },
  { id: 8, item: null, count: 0 },
  { id: 9, item: null, count: 0 },
  { id: 10, item: null, count: 0 },
  { id: 11, item: null, count: 0 },
  { id: 12, item: null, count: 0 },
  { id: 13, item: null, count: 0 },
  { id: 14, item: null, count: 0 },
  { id: 15, item: null, count: 0 },
  { id: 16, item: null, count: 0 },
  { id: 17, item: null, count: 0 },
  { id: 18, item: null, count: 0 },
  { id: 19, item: null, count: 0 },
  { id: 20, item: null, count: 0 },
  { id: 21, item: null, count: 0 },
  { id: 22, item: null, count: 0 },
  { id: 23, item: null, count: 0 },
  { id: 24, item: null, count: 0 },
  { id: 25, item: null, count: 0 }
])
const showBoardControl = ref(false)
const selectedCell = ref<BoardCell | null>(null)
function dragStart(event: DragEvent, index: number) {
  if (!event.dataTransfer) return
  event.dataTransfer.setData('dragbleCellIndex', String(index))
}

function handleSelectCell(cell: BoardCell) {
  if (!cell.item) return

  selectedCell.value = cell
  showBoardControl.value = true
}

function swapCells(prevIndex: number, nextIndex: number) {
  ;[cells.value[prevIndex], cells.value[nextIndex]] = [
    cells.value[nextIndex],
    cells.value[prevIndex]
  ]
}

function drop(event: DragEvent, index: number) {
  if (!event.dataTransfer) return

  const transferCellIndex = +event.dataTransfer.getData('dragbleCellIndex')
  if (typeof transferCellIndex !== 'number') return

  swapCells(index, transferCellIndex)
}
</script>

<template>
  <ThemeProvider>
    <button @click="toggleTheme">toggle</button>

    <div class="app">
      <div class="container layout">
        <main class="main">
          <div class="sidebar">
            <img :src="testIMG" alt="test-img" />
            <div class="skeletons">
              <AppSkeleton class="skeletons__top" width="190px" height="26px" rounded="8px" />
              <div class="skeletons__sub">
                <AppSkeleton
                  width="155px"
                  height="10px"
                  rounded="4px"
                  class="skeletons__sub_item"
                />
                <AppSkeleton
                  width="190px"
                  height="10px"
                  rounded="4px"
                  class="skeletons__sub_item"
                />
                <AppSkeleton
                  width="170px"
                  height="10px"
                  rounded="4px"
                  class="skeletons__sub_item"
                />
                <AppSkeleton
                  width="160px"
                  height="10px"
                  rounded="4px"
                  class="skeletons__sub_item"
                />
                <AppSkeleton
                  width="140px"
                  height="10px"
                  rounded="4px"
                  class="skeletons__sub_item"
                />
              </div>
              <AppSkeleton width="80px" height="10px" rounded="8px" class="skeletons__footer" />
            </div>
          </div>
          <div class="board-wrapper">
            <div class="board">
              <div
                ref="cell"
                draggable="true"
                @dragover.prevent
                @dragstart="($event) => dragStart($event, index)"
                @drop="($event) => drop($event, index)"
                class="board__cell"
                @click="handleSelectCell(cell)"
                v-for="(cell, index) in cells"
                :key="cell.id"
              >
                <img v-if="cell.item" :src="cell.item" />
                <div v-if="cell.item" class="badge">
                  <span>
                    {{ cell.count }}
                  </span>
                </div>
              </div>
            </div>
            <BoardPanel v-if="selectedCell" v-model="showBoardControl" :cell="selectedCell" />
          </div>
        </main>
        <footer class="footer">2</footer>
      </div>
    </div>
  </ThemeProvider>
</template>

<style scoped lang="scss">
.app {
  background-color: var(--bg-color);
}
.board-wrapper {
  position: relative;

  .board {
    display: grid;
    grid-template-columns: repeat(5, 105px);
    grid-template-rows: repeat(5, 100px);
    overflow: hidden;
    &__panel {
      position: absolute;
    }
    &__cell {
      cursor: pointer;
      position: relative;
      overflow: hidden;
      border: 1px solid var(--border-color);
      padding: 23px 25px;
      transition: all 0.4s easy;

      &:hover {
        background-color: var(--bg-sub-color);
      }
    }

    &__cell:nth-child(1) {
      border-top-left-radius: 12px;
    }
    &__cell:nth-child(5) {
      border-top-right-radius: 12px;
    }
    &__cell:nth-child(21) {
      border-bottom-left-radius: 12px;
    }
    &__cell:nth-child(25) {
      border-bottom-right-radius: 12px;
    }
  }
}

.skeletons {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;

  &__sub {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
}

.main {
  display: flex;
  gap: 24px;

  .sidebar {
    background-color: var(--bg-sub-color);
    border-color: var(--border-color);
    border-radius: 12px;
    width: 236px;
    padding: 18px 14px 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}

.badge {
  position: absolute;
  bottom: -1px;
  right: -1px;
  width: 16px;
  height: 16px;
  border-top-left-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color);
  font-size: 10px;
  color: var(--border-color);
}

.footer {
  height: 72px;
}
</style>
