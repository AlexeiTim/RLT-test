<script setup lang="ts">
import AppSkeleton from './AppSkeleton.vue'
import CloseIcon from './icons/CloseIcon.vue'
import AppDriver from './AppDriver.vue'
import AppFlex from './AppFlex.vue'
import AppButton from './AppButton.vue'
import AppInput from './AppInput.vue'
import { ref, watch } from 'vue'
import { useBoardStore } from '@/stores/board'
import type { IBoardCell } from '@/types/board-cell'
import BoardCell from './BoardCell.vue'

const props = defineProps<{
  cell: IBoardCell | null
}>()
const boardStore = useBoardStore()

const panel = ref()
const show = defineModel<boolean>({ default: false })
const showCounter = ref(false)
const deletedCount = ref()
const lastValue = ref()

function handleDicrementCount() {
  if (!props.cell?.item) return
  if (Number.isNaN(+deletedCount.value)) return

  boardStore.dicrementCellCount(props.cell?.id, deletedCount.value)
  reset()
}

function reset() {
  deletedCount.value = ''
  lastValue.value = ''
  showCounter.value = false
}

function handleCancel() {
  reset()
}

watch(
  () => boardStore.selectedCell,
  (newValue) => {
    console.log(newValue?.item)
    if (!newValue?.item) show.value = false
  }
)
</script>

<template>
  <div ref="panel" class="board-control">
    <div class="board-control__header">
      <div class="icon board-control__header_close" @click="show = false">
        <CloseIcon />
      </div>
    </div>
    <div class="board-control__content content">
      <div class="cell-wrapper">
        <AppFlex align="center" justify="center">
          <BoardCell
            style="margin-bottom: 30px"
            width="130px"
            height="130px"
            v-if="props.cell?.item"
            :colors="props.cell.item.colors"
            :count="props.cell.item.count"
            hideCount
          />
        </AppFlex>
      </div>

      <AppDriver style="margin-bottom: 16px" />
      <AppFlex direction="column" align="center" gap="24px">
        <AppSkeleton rounded="8px" width="211px" height="30px" />
        <AppFlex direction="column" align="center" gap="16px">
          <AppSkeleton rounded="4px" width="211px" height="10px" />
          <AppSkeleton rounded="4px" width="211px" height="10px" />
          <AppSkeleton rounded="4px" width="211px" height="10px" />
          <AppSkeleton rounded="4px" width="180px" height="10px" />
          <AppSkeleton rounded="4px" width="80px" height="10px" />
        </AppFlex>
        <AppDriver />
      </AppFlex>
    </div>
    <div class="board-control__footer">
      <AppButton :class="{ blur: showCounter }" @click="showCounter = true" variant="danger">
        <span>Удалить предмет</span>
      </AppButton>
    </div>
    <Transition name="fade">
      <div v-if="showCounter" class="board-control__counter">
        <div>
          <AppFlex direction="column" gap="20px">
            <AppInput v-model.number="deletedCount" placeholder="Введите количество" />
            <AppFlex gap="10px" justify="space-between">
              <AppButton style="height: 30px; width: 88px" @click="handleCancel">Отмена</AppButton>
              <AppButton
                class="board-contro__counter_confirm"
                style="height: 30px"
                variant="danger"
                @click="handleDicrementCount"
                >Подтвердить</AppButton
              >
            </AppFlex>
          </AppFlex>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.blur {
  filter: blur(4px);
}

.cell-wrapper {
  width: 100%;
  height: 100%;
  background-color: inherit;
}

.board-control {
  z-index: 10;
  align-items: center;
  padding: 55px 15px 18px;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 250px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-sub-opacity-color);
  backdrop-filter: blur(16px);
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;

  &__counter {
    position: absolute;
    backdrop-filter: blur(16px);
    filter: blur(0);
    bottom: 0;
    right: 0;
    left: 0;
    height: 133px;
    background-color: var(--bg-sub-opacity-color-2);
    border: 1px solid var(--border-color);
    padding: 20px 21px;

    &_confirm {
      background: var(--danger-color);
    }
  }

  &__header {
    &_close {
      padding: 6px;
      position: absolute;
      top: 8px;
      right: 8px;
      color: white;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        color: var(--border-color);
      }
    }
  }

  &__footer {
    margin-top: 17px;
  }
}

.content {
  &__img {
    margin: 0 auto;
    margin-bottom: 30px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  transition: all 0.3s ease;
  opacity: 0;
  visibility: hidden;
}
</style>
