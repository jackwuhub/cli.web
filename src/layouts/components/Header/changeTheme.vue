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
    <a-switch
        :checked="!isLight"
        @update:checked="handleChangeTheme"
        checked-children="黑"
        un-checked-children="白"
        inline-prompt
    >
    </a-switch>
  </div>
</template>

<script lang="ts" setup>
import {computed, ComputedRef, onMounted} from "vue";
import {settingStore} from "@/store";
import {theme} from "ant-design-vue";

const isLight:ComputedRef<boolean> = computed(() => settingStore.theme?.algorithm === theme.defaultAlgorithm)
const handleChangeTheme = (val:boolean):any => {
  const theme: 'light' | 'dark' = String(val) === 'true' ? 'dark' : 'light'
  settingStore.setThemeMode(theme)
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

