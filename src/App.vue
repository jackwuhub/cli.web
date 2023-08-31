
<template>
  <el-config-provider :locale="locale">
    <component :is="layout" :key="layoutId" v-bind="layoutOption"></component>
  </el-config-provider>
</template>

<script lang="ts" setup>
import Layout from '@/layouts/index'
import {useRoute} from "vue-router";
import {computed, ref, shallowRef, watchEffect} from "vue";
import {LayoutEnum} from "@/layouts/types";
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const route = useRoute()
const layoutId = shallowRef<LayoutEnum>(LayoutEnum.default)
const layoutOption = shallowRef({})
const layout = computed(() => Layout?.[layoutId.value] ?? Layout[LayoutEnum.default])
const locale = ref(zhCn)
watchEffect(() => {
  const { layout:layoutEnum,layoutOptions: options} = route?.meta ?? {}
  layoutOption.value = options ?? {}
  if(layoutId.value !== layoutEnum) layoutId.value = layoutEnum as unknown as LayoutEnum
})
</script>
