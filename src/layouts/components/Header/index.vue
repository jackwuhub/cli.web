<style scoped lang="less">
.header {
  box-sizing: border-box;
  height: var(--admin-layout-header-height);
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 0 20px 0 0;
  background: var(--td-bg-color-container);
  &__content{
    flex: 1;
    height: 100%;
  }
}
</style>
<template>
  <div class="header">
    <Shrink />
    <div class="header__content"></div>
    <ChangeTheme />
    <User />
  </div>
</template>

<script lang="ts" setup>
import User from "./user.vue";
import Shrink from "./shrink.vue";
import ChangeTheme from './changeTheme.vue'
</script>

