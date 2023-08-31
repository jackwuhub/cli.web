<template>
  <div class="shrink">
    <el-button
        shape="square"
        type="primary"
        @click="settingStore.toggleCollapse()"
        size="default"
    >
      <template #icon>
        <component :is="icon"></component>
      </template>
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { Expand, Fold} from '@element-plus/icons-vue'
import {settingStore} from "@/store";
import {computed, ComputedRef, VNode} from "vue";

const icon = computed(() => settingStore.$state.menu.collapse
    ? Expand
    : Fold
)

</script>

