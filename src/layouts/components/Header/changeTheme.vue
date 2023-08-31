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
    <el-switch
        :modelValue="isLight"
        @update:modelValue="handleChangeTheme"
        active-text="黑"
        inactive-text="白"
        inline-prompt
    >
    </el-switch>
  </div>
</template>

<script lang="ts" setup>
import {computed, ComputedRef, onMounted} from "vue";
import {settingStore} from "@/store";

const isLight:ComputedRef<boolean> = computed(() => settingStore.theme === 'dark')
const handleChangeTheme = (val:boolean | string | number):any => {
  const theme: 'light' | 'dark' = String(val) === 'true' ? 'dark' : 'light'
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

