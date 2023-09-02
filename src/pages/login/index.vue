<template>
  <t-icon name="home"></t-icon>
</template>

<script lang="ts" setup>
import {url2query} from "@/helper";
import {onMounted} from "vue";
import {goOauth, replaceLocation, setCookie} from "@/pages/login/types";
import { useRoute } from 'vue-router'
import {userStore} from "@/store";

onMounted(() => {
 const { corpId,code,redirect } = url2query(window.location.href)?.query // 获取页面基础数据
  if(code) { // oauth跳转回调
    const route = useRoute()
    const { redirect,corpId } = route?.query
    setCookie(code,<string>corpId).
    then(() =>
        userStore.upgradeUserInfo().
        then(() => replaceLocation(<string>redirect,{corpId})))
  }else goOauth(corpId, redirect) // 无code进入
})
</script>