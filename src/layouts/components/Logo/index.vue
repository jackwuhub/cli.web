<style scoped lang="less">
@text-color: var(--td-text-color-primary);
@text-size: 14px;
.Logo {
  height: var(--admin-layout-header-height);
  line-height:  var(--admin-layout-header-height);
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 0 16px;
  &__image{
    width: 32px;
    height: 32px;
    flex-shrink: 0;
  }
  &__label{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 10px;
    //flex: 1;
    text-align: center;
    color: @text-color;
    line-height: @text-size;
    font-size: @text-size;
    font-weight: 600;
    user-select: none;
  }
}
</style>
<template>
  <div class="Logo">
    <el-image fit="cover" class="Logo__image" :src="Config.logo"></el-image>
    <div class="Logo__label" v-if="!props.collapse">{{Config.title}}</div>
  </div>
</template>

<script lang="ts" setup>
import Config from "@/config";
interface Props {
  collapse: boolean
}
const props = defineProps<Props>()
</script>

