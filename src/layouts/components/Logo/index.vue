<style scoped lang="less">
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
  &-center{
    justify-content: center;
  }
  &__image{
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    object-fit: cover
  }
}
</style>
<template>
  <div class="Logo" :class="{'Logo-center': props.collapse}">
    <img class="Logo__image" :src="Config.logo"  alt=""/>
    <a-space align="center" direction="vertical" style="flex: 1">
      <a-typography-text  v-if="!props.collapse">{{Config.title}}</a-typography-text>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
import Config from "@/config";
interface Props {
  collapse: boolean
}
const props = defineProps<Props>()
</script>

