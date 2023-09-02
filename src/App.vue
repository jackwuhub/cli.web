
<template>
  <component :is="layout" :key="layoutId" v-bind="layoutOption"></component>
</template>

<script lang="ts" setup>
import Layout from '@/layouts/index'
import {useRoute} from "vue-router";
import {computed, shallowRef, watchEffect} from "vue";
import {LayoutEnum} from "@/layouts/types";

const route = useRoute()
const layoutId = shallowRef<LayoutEnum>(LayoutEnum.default)
const layoutOption = shallowRef({})
const layout = computed(() => Layout?.[layoutId.value] ?? Layout[LayoutEnum.default])

watchEffect(() => {
  const { layout:layoutEnum,layoutOptions: options} = route?.meta ?? {}
  layoutOption.value = options ?? {}
  if(layoutId.value !== layoutEnum) layoutId.value = layoutEnum as unknown as LayoutEnum
})
</script>
