<style scoped lang="less">
.changeTheme {
  margin-right: 20px;
  &__icon{
    font-size: 20px;
    margin-right: 4px;
    color:var( --td-text-color-primary)
  }
}
</style>
<template>
  <div class="changeTheme">
    <t-switch :value="isLight" @update:value="handleChangeTheme">
      <template #label="slotProps">{{ slotProps.value ? '黑' : '白' }}</template>
    </t-switch>
  </div>
</template>

<script lang="ts" setup>
import {computed, ComputedRef, onMounted} from "vue";
import {settingStore} from "@/store";

const isLight:ComputedRef<boolean> = computed(() => settingStore.theme === 'dark')
const handleChangeTheme = (dark:boolean) => {
  const theme: 'light' | 'dark' = dark ? 'dark' : 'light'
  settingStore.setTheme(theme)
  window.localStorage.setItem('theme',theme)
}
onMounted(() => {
  handleChangeTheme((window.localStorage.getItem('theme') === 'dark'))
})
/** 监听浏览器切换颜色模式 */
window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', event => {
      handleChangeTheme(event.matches)
    })
</script>

