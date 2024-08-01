<script setup lang="ts">
import { ref } from 'vue'
import BoardPanel from '@/components/BoardPanel.vue'
import { useBoardStore } from '@/stores/board'
import { storeToRefs } from 'pinia'
import BoardCell from './BoardCell.vue'
import type { IBoardCell } from '@/types/board-cell'

const boardStore = useBoardStore()
const { cells, selectedCell } = storeToRefs(boardStore)

const showBoardControl = ref(false)

const activeCell = ref<IBoardCell | null>(null)

function dragStart(event: DragEvent, index: number) {
  if (!event.dataTransfer) return

  event.dataTransfer.setData('dragbleCellIndex', String(index))
}

function handleSelectCell(cell: IBoardCell) {
  if (cell.item) {
    boardStore.setSelectedCell(cell)
    showBoardControl.value = true
    return
  }

  boardStore.createCell(cell.id)
}

function drop(event: DragEvent, index: number) {
  activeCell.value = null
  if (!event.dataTransfer) return

  const transferCellIndex = +event.dataTransfer.getData('dragbleCellIndex')
  if (typeof transferCellIndex !== 'number') return

  boardStore.swapCells(index, transferCellIndex)
}

function dragEnd() {
  activeCell.value = null
}

function dragOver(cell: IBoardCell) {
  activeCell.value = cell
}
</script>

<template>
  <div class="board-wrapper">
    <div class="board">
      <div
        draggable="true"
        @dragover.prevent="dragOver(cell)"
        @dragstart="($event) => dragStart($event, index)"
        @drop="($event) => drop($event, index)"
        @dragend="dragEnd"
        class="board__cell"
        :class="{ dragging: cell.id === activeCell?.id }"
        @click="handleSelectCell(cell)"
        v-for="(cell, index) in cells"
        :key="cell.id"
      >
        <BoardCell
          v-if="cell.item"
          :colors="cell.item.colors"
          :count="cell.item.count"
          draggable="false"
        />
      </div>
    </div>
    <div :class="{ show: showBoardControl }" class="panel">
      <BoardPanel v-model="showBoardControl" :cell="selectedCell" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.cell {
  background: var(--bg-sub-color);
  &:hover {
    background: red;
  }
}

.panel {
  transition: all 0.4s ease;
  right: -250px;
  position: absolute;
  top: 0;
  height: 100%;
}

.panel.show {
  right: 0;
}

.board-wrapper {
  overflow: hidden;
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
      transition: all 0.3s ease;
      &.dragging {
        background-color: var(--success-color);
      }
      width: 100%;
      height: 100%;
      background-color: var(--bg-sub-color);
      cursor: pointer;
      position: relative;
      overflow: hidden;
      border: 1px solid var(--border-color);

      &:hover {
        background-color: var(--bg-hover-color);
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
</style>
