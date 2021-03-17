//index.js
//获取应用实例
var app = getApp();
var account,pwd;
Page({
  data: {
    motto: '每天记录生命中的一点点,在未来的日子里慢慢品味',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  startRecordVideo:function(){
    wx.navigateTo({
      url: '../video/videorecord'
    })
  },
  onLoad: function () { 
    if (app.globalData.token) {//直接登录跳转
      wx.showToast({
        title: '自动登录',
        icon: 'loading',
        duration: 2000
      });
      //刷新token
      wx.request({
        method: 'GET',
        header: { Authorization: 'time' + app.globalData.token },
        url: 'https://www.mytime.net.cn/refresh',
        data: { Authorization:app.globalData.token},
        success: res => {
          wx.hideToast();
          if (res.data&&res.data.message!='Access Denied') {

            app.globalData.token = res.data.token;
            //存储token到本地
            try {
              wx.setStorageSync('token', res.data.token);
            } catch (e) {
              console.log(e);
            }
            // 完成注册
            wx.showToast({
              title: '登录成功',
              icon: 'success'
            });
            wx.navigateTo({
              url: '../video/videorecord'
            });
          } else {
            wx.showModal({
              title: '自动登录失败',
              showCancel: false,
              content:'请手动登录',
            });
          }
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }
  },
  register:function(){
    //注册,跳转到注册页面
    wx.navigateTo({
      url: "../register/register"
    })
  },
  login:function(){

    console.log(app.getHeader())
      //点击登录
      console.log(account)
      console.log(pwd)
    wx.request({
      method: 'POST',
      url: app.getHeader()+'/wx/toLogin',
      data: { uAccount: account, uPass: pwd },
      header: {
        // 'content-type': 'application/json' // get请求默认值
        'content-type': 'application/x-www-form-urlencoded' // post请求

      },
      success: res => {
        console.log(res);
        if(res.data.code==200){
          app.globalData.token = res.data.extData;
          //存储token到本地
          try {
            wx.setStorageSync('token', res.data.extData);
          } catch (e) {
            console.log(e);
          }
          // 完成注册
          wx.showToast({
            title: '登录成功',
            icon: 'success'
          });
          wx.navigateTo({
            url: '../shou/shou'
          });
        }else{
          wx.showModal({
            title: '登录失败',
            showCancel: false,
            content: res.data.message+',请核对账号密码信息后重新登录',
          });
        }     
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  accountInput: function (e) {
    account = e.detail.value
  },
  pwdInput: function (e) {
    pwd = e.detail.value
  },
  getBackPassPage:function(){
    wx.navigateTo({
      url: 'getpassword'
    })
  }
})
