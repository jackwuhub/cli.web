<style scoped lang="less">
.shrink {

}
</style>
<template>
  <div class="shrink">
    <t-button shape="square" variant="text" @click="settingStore.toggleCollapse()">
      <template #icon>
        <ViewListIcon />
      </template>
    </t-button>
  </div>
</template>

<script lang="ts" setup>
import { ViewListIcon } from 'tdesign-icons-vue-next';
import {settingStore} from "@/store";

</script>

