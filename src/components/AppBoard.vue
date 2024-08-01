<script setup lang="ts">
import { ref } from 'vue'
import BoardPanel from '@/components/BoardPanel.vue'
import type { BoardCell } from '@/types/board-cell'
import { useBoardStore } from '@/stores/board'
import { storeToRefs } from 'pinia'

const boardStore = useBoardStore()
const { cells } = storeToRefs(boardStore)

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

function drop(event: DragEvent, index: number) {
  if (!event.dataTransfer) return

  const transferCellIndex = +event.dataTransfer.getData('dragbleCellIndex')
  if (typeof transferCellIndex !== 'number') return

  boardStore.swapCells(index, transferCellIndex)
}
</script>

<template>
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
        <img v-if="cell.item" :src="cell.item.src" />
        <div v-if="cell.item" class="badge">
          <span>
            {{ cell.item.count }}
          </span>
        </div>
      </div>
    </div>
    <BoardPanel v-if="selectedCell" v-model="showBoardControl" :cell="selectedCell" />
  </div>
</template>

<style scoped lang="scss">
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
</style>
