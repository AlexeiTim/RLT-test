<script setup lang="ts">
import { nextTick, ref } from 'vue'
import BoardPanel from '@/components/BoardPanel.vue'
import type { BoardCell } from '@/types/board-cell'
import { useBoardStore } from '@/stores/board'
import { storeToRefs } from 'pinia'

const boardStore = useBoardStore()
const { cells, selectedCell } = storeToRefs(boardStore)

const showBoardControl = ref(false)

const activeCell = ref<BoardCell | null>(null)

function dragStart(event: DragEvent, index: number) {
  if (!event.dataTransfer) return

  event.dataTransfer.setData('dragbleCellIndex', String(index))
}

function handleSelectCell(cell: BoardCell) {
  if (!cell.item) return

  boardStore.setSelectedCell(cell)
  showBoardControl.value = true
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

function dragOver(cell: BoardCell) {
  activeCell.value = cell
}
</script>

<template>
  <div class="board-wrapper">
    <div class="board">
      <div
        ref="cell"
        draggable="true"
        @dragover.prevent="dragOver(cell)"
        @dragstart="($event) => dragStart($event, index)"
        @drop="($event) => drop($event, index)"
        @dragend="dragEnd"
        class="board__cell draggble"
        :class="{ dragging: cell.id === activeCell?.id }"
        @click="handleSelectCell(cell)"
        v-for="(cell, index) in cells"
        :key="cell.id"
      >
        <img draggable="false" v-if="cell.item" :src="cell.item.src" />
        <div draggable="false" v-if="cell.item" class="badge">
          <span draggable="false">
            {{ cell.item.count }}
          </span>
        </div>
      </div>
    </div>
    <div :class="{ show: showBoardControl }" class="panel">
      <BoardPanel v-model="showBoardControl" :cell="selectedCell" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.draggble {
  transition: all 0.3s ease;
  background-color: var(--bg-sub-color);
}
.dragging {
  background-color: var(--success-color);
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
