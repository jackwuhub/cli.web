<style scoped lang="less">
.home{
  height: 30000px;
}
</style>

<template>
<div class="home">
  <el-button @click="settingStore.setTheme('dark')">测试</el-button>
  <el-icon name="plus" style="width: 20px;height: 20px;"></el-icon>
</div>
</template>

<script setup lang="ts">
import {settingStore} from "@/store";
</script>

