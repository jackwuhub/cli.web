<style scoped lang="less">
.admin-layout{
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-flow: row nowrap;
  &__aside{
    height: 100vh;
    overflow: hidden;
    transition: width ease-in-out .3s;
    flex-shrink: 0;
    &-collapse{
      width: var(--admin-layout-aside-collapse-width);
    }
    &__menu{
      height: calc(100% - var(--admin-layout-header-height));
    }
    background: var(--td-bg-color-container);
  }
  &__main{
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    padding: 10px;
    height: 100%;
    background: var(--td-bg-color-page);
  }
}
</style>

<template>
    <AsideContent :lock-scroll="props.lockScroll">
        <template #aside>
            <div class="admin-layout__aside" :class="{'admin-layout__aside-collapse': settingStore.collapse}">
                <Logo :collapse="settingStore.collapse"/>
                <ScrollBar class="admin-layout__aside__menu">
                    <Menu :collapse="settingStore.collapse" />
                </ScrollBar>
            </div>
        </template>
        <template #header>
            <Header />
        </template>
        <template #content>
            <div class="admin-layout__main">
                <router-view v-slot="{ Component }">
                    <transition name="container-fade">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </div>
        </template>
    </AsideContent>
</template>

<script setup lang="ts">
import Logo from './components/Logo/index.vue'
import Menu from './components/AsideMenu/index'
import Header from "./components/Header/index.vue";
import {settingStore} from "@/store";
import AsideContent from "./containers/asideContent.vue";

interface Props {
    lockScroll?: boolean
}

const props = withDefaults(defineProps<Props>(),{
    lockScroll: false
})
</script>

