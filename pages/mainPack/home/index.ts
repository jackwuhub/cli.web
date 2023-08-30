// index.ts


import request from "@/utils/request/index";
import {APIS, SERVERS} from "@/requestApis";
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    request.post({
      api: APIS.login,
      service: SERVERS.baseUrl,
      isFormData: true,
      data:{
        username: 13333333333,
        password: 13333333333
      },
      success: () => {
        request.get({
          api: APIS.userInfo,
          service: SERVERS.baseUrl,
          success:(res) => {
            console.log(res)
          }
        })
      }
    })
  },
})
