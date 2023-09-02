<style scoped lang="less">
.main{
  padding-bottom: var(--td-tab-bar-height);
}
</style>
<template>
  <div class="main">
    <router-view />
    <t-tab-bar shape="round" theme="tag" :split="false" :value="value" @change="router.push">
      <t-tab-bar-item v-for="tab of list" :key="tab.route" :value="tab.route">
        {{tab.label}}
        <template #icon v-if="tab.icon">
          <t-icon :name="tab.icon"></t-icon>
        </template>
      </t-tab-bar-item>
    </t-tab-bar>
  </div>
</template>
<script setup lang="ts">
import {settingStore} from "@/store";
import {computed} from "vue";
import {useRoute,useRouter} from "vue-router";
const route = useRoute()
const router = useRouter()
const list = computed(() => settingStore.tabs)
const value = computed(() => route.path )
</script>



