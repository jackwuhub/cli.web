<style scoped lang="less">
.aside-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  &__aside{
    flex-shrink: 0;
  }
  &__main{
    width: 0;
    flex: 1;
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
}
</style>
<template>
  <div class="aside-content" :class="{'default-contain':props.useBackGround}">
    <!--  侧边  -->
    <div class="aside-content__aside">
      <template v-if="props.lockAsideScroll">
        <slot name="aside"></slot>
      </template>
      <template v-else>
        <Scrollbar><slot name="aside"></slot></Scrollbar>
      </template>
    </div>
    <!--  主内容  -->
    <div class="aside-content__main">
      <div class="aside-content__main__header">
        <slot name="header"></slot>
      </div>
      <div class="aside-content__main__main">
        <template v-if="props.lockScroll">
          <slot name="content"></slot>
        </template>
        <template v-else>
          <Scrollbar><slot name="content"></slot></Scrollbar>
        </template>
      </div>
      <div class="aside-content__main__footer">
        <slot name="footer"></slot>
      </div>
      <slot name="dialog"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Scrollbar from "@/components/Scrollbar/src/Scrollbar.vue";
interface Props {
  lockScroll?:boolean
  lockAsideScroll?:boolean
  useBackGround?:boolean
}
const props = defineProps<Props>()
</script>

