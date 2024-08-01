<script setup lang="ts">
import type { BoardCell } from '@/types/board-cell'
import AppSkeleton from './AppSkeleton.vue'
import CloseIcon from './icons/CloseIcon.vue'
import AppDriver from './AppDriver.vue'
import AppFlex from './AppFlex.vue'
import AppButton from './AppButton.vue'
import AppInput from './AppInput.vue'
import { ref } from 'vue'

const props = defineProps<{
  cell: BoardCell
}>()

const panel = ref()
const show = defineModel<boolean>({ default: false })
const showCounter = ref(false)
</script>

<template>
  <div ref="panel" class="board-control">
    <div class="board-control__header">
      <div class="icon board-control__header_close" @click="show = false">
        <CloseIcon />
      </div>
    </div>
    <div class="board-control__content content">
      <AppFlex align="center" justify="center">
        <img
          class="content__img"
          v-if="props.cell.item"
          :src="props.cell.item.src"
          width="130"
          height="130"
        />
      </AppFlex>

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
            <AppInput placeholder="Введите количество" />
            <AppFlex gap="10px" justify="space-between">
              <AppButton style="height: 30px; width: 88px" @click="showCounter = false"
                >Отмена</AppButton
              >
              <AppButton class="board-contro__counter_confirm" style="height: 30px" variant="danger"
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

.board-control {
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
