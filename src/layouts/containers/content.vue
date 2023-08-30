<style scoped lang="less">
.content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-flow: column nowrap;
  &__header{
    flex-shrink: 0;
  }
  &__main{
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    flex: 1;
  }
  &__footer{
    flex-shrink: 0;
  }
}
</style>
<template>
  <div class="content" :class="{'default-contain':props.useBackGround}">
    <div class="content__header">
      <slot name="header"></slot>
    </div>
    <div class="content__main">
      <template v-if="props.lockScroll">
        <slot name="content"></slot>
      </template>
      <template v-else>
        <Scrollbar><slot name="content"></slot></Scrollbar>
      </template>
    </div>
    <div class="content__footer">
      <slot name="footer"></slot>
    </div>
    <slot name="dialog"></slot>
  </div>
</template>

<script lang="ts" setup>
import Scrollbar from "@/components/Scrollbar/src/Scrollbar.vue";
interface Props {
  lockScroll?:boolean
  useBackGround?:boolean
}
const props = defineProps<Props>()
</script>

