
<template>
  <a-config-provider :theme="theme" :locale="locale">
    <component :is="layout" :key="layoutId" v-bind="layoutOption"></component>
  </a-config-provider>
</template>

<script lang="ts" setup>
import Layout from '@/layouts/index'
import {useRoute} from "vue-router";
import {computed, ref, shallowRef, watchEffect} from "vue";
import {LayoutEnum} from "@/layouts/types";
import {settingStore} from "@/store";
import zhCN from 'ant-design-vue/es/locale/zh_CN';

const locale = ref(zhCN)



const route = useRoute()
const layoutId = shallowRef<LayoutEnum>(LayoutEnum.default)
const layoutOption = shallowRef({})
const layout = computed(() => Layout?.[layoutId.value] ?? Layout[LayoutEnum.default])

const theme = computed(() => settingStore.theme)

watchEffect(() => {
  const { layout:layoutEnum,layoutOptions: options} = route?.meta ?? {}
  layoutOption.value = options ?? {}
  if(layoutId.value !== layoutEnum) layoutId.value = layoutEnum as unknown as LayoutEnum
})
</script>
