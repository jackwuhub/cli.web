<style scoped lang="less">
.user {
  cursor: pointer;
  &_wrapper {
    width: 140px;
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

          line-height: 16px;
        }
        &_label{
          font-size: 14px;
          line-height: 14px;
        }
      }
      &:hover {
        background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
        color: #fff;
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
    <a-popover placement="bottomRight" showArrow>
      <template #content>
        <div class="user_wrapper">
          <!-- 基本信息 -->
          <div class="user_wrapper_info">
            <a-avatar alt="头像" :src="info.avatar" size="large">{{info.avatarText}}</a-avatar>
            <div class="user_wrapper_info_name">{{ info.name }}</div>
          </div>
        </div>
        <div class="user_list">
          <!-- 操作列表 -->
          <div  class="user_list_operation">
            <div class="user_list_operation_item" @click="accountCenter">
              <a-icon class="user_list_operation_item_icon" name="email"></a-icon>
              <span class="user_list_operation_item_label">个人中心</span>
            </div>
          </div>
          <div class="user_list_operation">
            <a-popconfirm title="确认退出?" @confirm="handleOut">
              <div class="user_list_operation_item" >
                <a-icon class="user_list_operation_item_icon" name="logout"></a-icon>
                <span class="user_list_operation_item_label">退出系统</span>
              </div>
            </a-popconfirm>
          </div>
        </div>
      </template>
      <a-avatar alt="头像" :src="info.avatar" size="default">{{info.avatarText}}</a-avatar>
    </a-popover>
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

