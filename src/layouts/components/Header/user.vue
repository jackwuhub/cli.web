<style scoped lang="less">
.user {
  cursor: pointer;
  &_wrapper {
    &_info {
      text-align: center;
      padding: 10px 30px;
      &_name{
        margin: 10px 0 0 0;
        font-size: 16px;
        line-height: 16px;
      }
    }
  }
  &_list{
    display: flex;
    flex-flow: column wrap;
    margin-top: 10px;
    color: var(--td-text-color-primary);
    &_operation {
      border-radius: 10px;
      &_item {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding:8px 16px;
        &_icon {
          margin-right: 8px;
          font-size: 16px;
          line-height: 16px;
        }
        &_label{
          font-size: 14px;
          line-height: 14px;
        }
      }
      &:hover {
        background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
        color: var(--td-text-color-anti);
      }
    }
  }
  &_inner{
    background-color: red;
  }
}
</style>
<style lang="less">
.user-popup-overlay-inner{
  box-shadow: 20px 30px 30px rgb(0 0 0 / 20%);
  width: 200px;
  padding-bottom: 10px;
}
</style>
<template>
  <div class="user">
    <t-popup placement="bottom-right" showArrow overlay-inner-class-name="user-popup-overlay-inner">
      <template #content>
        <div class="user_wrapper">
          <!-- 基本信息 -->
          <div class="user_wrapper_info">
            <t-avatar alt="头像" :image="info.avatar" size="64px">{{info.avatarText}}</t-avatar>
            <div class="user_wrapper_info_name">{{ info.name }}</div>
          </div>
        </div>
        <div class="user_list">
          <!-- 操作列表 -->
          <div  class="user_list_operation">
            <div class="user_list_operation_item" @click="accountCenter">
              <t-icon class="user_list_operation_item_icon" name="user"></t-icon>
              <span class="user_list_operation_item_label">个人中心</span>
            </div>
          </div>
          <div  class="user_list_operation">
            <t-popconfirm content="确认退出系统吗?" @confirm="handleOut">
              <div class="user_list_operation_item"  >
                <t-icon class="user_list_operation_item_icon" name="logout"></t-icon>
                <span class="user_list_operation_item_label">退出系统</span>
              </div>
            </t-popconfirm>
          </div>
        </div>
      </template>
      <t-avatar alt="头像" :image="info.avatar">{{info.avatarText}}</t-avatar>
    </t-popup>
  </div>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {useUser} from "./methods"
import {watchEffect} from "vue";
import {userStore} from "@/store";
const router = useRouter();
const {info,setInfo } = useUser(router);

watchEffect(() => {
  setInfo({
    name:userStore.userInfo?.name ,
    avatar:userStore.userInfo?.photo,
    avatarText: userStore.userInfo?.name.slice(0,1)
  })
})

/*个人中心*/
const accountCenter = () => router.push({name:'my'})
/*登出*/
const handleOut = () => userStore.logout()
</script>

