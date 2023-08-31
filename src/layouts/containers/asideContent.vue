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
      padding: 0 !important;
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
  <a-layout class="aside-content" :class="{'default-contain':props.useBackGround}">
    <a-layout-sider
        class="aside-content__aside"
        :theme="themeMode"
        :collapsible="props.collapsible"
        :collapsed="collapsed"
        @update:collapsed="settingStore.toggleCollapse()"
    >
      <template v-if="props.lockAsideScroll">
        <slot name="aside"></slot>
      </template>
      <template v-else>
        <ScrollBar><slot name="aside"></slot></ScrollBar>
      </template>
    </a-layout-sider>
    <a-layout class="aside-content__main">
      <a-layout-header class="aside-content__main__header" :style="{background: themeColor}">
        <slot name="header"></slot>
      </a-layout-header>
      <div class="aside-content__main__main">
        <template v-if="props.lockScroll">
          <slot name="content"></slot>
        </template>
        <template v-else>
          <ScrollBar><slot name="content"></slot></ScrollBar>
        </template>
      </div>
      <div class="aside-content__main__footer">
        <slot name="footer"></slot>
      </div>
      <slot name="dialog"></slot>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import {computed} from "vue";
import {settingStore} from "@/store";
import {theme} from "ant-design-vue";

interface Props {
  lockScroll?:boolean
  lockAsideScroll?:boolean
  useBackGround?:boolean
  collapsible:boolean
}
const props = defineProps<Props>()

const themeMode = computed(() =>
    settingStore.theme?.algorithm === theme.defaultAlgorithm
        ? 'light'
        : 'dark')
const themeColor = computed(( ) => themeMode.value === 'light'
    ? '#fff'
    : '')

const collapsed = computed(() => settingStore.collapse)
</script>

