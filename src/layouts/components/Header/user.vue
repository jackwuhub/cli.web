<style scoped lang="less">
.user {
  cursor: pointer;
  &_wrapper {
    &_info {
      text-align: center;
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
    color: var(--el-color-primary-rgb);
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
          width: 16px;
          height: 16px;
          color: var(--el-color-primary);
          line-height: 16px;
        }
        &_label{
          font-size: 14px;
          line-height: 14px;
        }
      }
      &:hover {
        background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
        color: var(--el-color-white);
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
    <el-popover placement="bottom" showArrow>
      <template #reference>
        <el-avatar alt="头像" :src="info.avatar" size="default">{{info.avatarText}}</el-avatar>
      </template>
      <div class="user_wrapper">
        <!-- 基本信息 -->
        <div class="user_wrapper_info">
          <el-avatar alt="头像" :src="info.avatar" size="large">{{info.avatarText}}</el-avatar>
          <div class="user_wrapper_info_name">{{ info.name }}</div>
        </div>
      </div>
      <div class="user_list">
        <!-- 操作列表 -->
        <div  class="user_list_operation">
          <div class="user_list_operation_item" @click="accountCenter">
            <el-icon class="user_list_operation_item_icon" name="user"></el-icon>
            <span class="user_list_operation_item_label">个人中心</span>
          </div>
        </div>
        <div  class="user_list_operation">
          <el-popconfirm title="确认退出?" @confirm="handleOut">
            <template #reference>
              <div class="user_list_operation_item" >
                <el-icon class="user_list_operation_item_icon" name="logout"></el-icon>
                <span class="user_list_operation_item_label">退出系统</span>
              </div>
            </template>
          </el-popconfirm>
        </div>
      </div>
    </el-popover>
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

