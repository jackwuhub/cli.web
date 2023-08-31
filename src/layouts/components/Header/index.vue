<style scoped lang="less">
.header {
  box-sizing: border-box;
  height: var(--admin-layout-header-height);
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 0 20px 0 0;
  &__content{
    flex: 1;
    height: 100%;
  }
}
</style>
<template>
  <div class="header">
    <div class="header__content"></div>
    <ChangeTheme />
    <User />
  </div>
</template>

<script lang="ts" setup>
import User from "./user.vue";
import ChangeTheme from './changeTheme.vue'
</script>

