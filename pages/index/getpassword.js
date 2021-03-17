// pages/index/getpassword.js
var app = getApp()
var maxTime = 60
var currentTime = -1 //倒计时的事件（单位：s）
var interval = null

var check = require("../register/check.js");
var webUtils = require("../register/registerWebUtil.js");

var account = null, phoneNum = null, identifyCode = null, password = null, rePassword = null,Un=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: 250,
    windoeHeight: 250,
    icon_phone: "/imaegs/icon_phone.png",
    icon_account: "/images/login_name.png",
    icon_password: "/images/login_pwd.png",
    icon_verify: '/images/login_verify.png',
    location: "中国(+86)"//,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    currentTime = -1 //倒计时的事件（单位：s）
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth < 200 ? 250 : res.windowWidth,
          windowHeight: res.windowHeight,
          nextButtonWidth: res.windowWidth - 20,
          reSendBtn: '获取验证码',
          time: ''
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    currentTime = maxTime
    if (interval != null) {
      clearInterval(interval)
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  input_account: function (e) {
    account = e.detail.value
  },
  input_phoneNum: function (e) {
    phoneNum = e.detail.value
  },
  input_identifyCode: function (e) {
    identifyCode = e.detail.value
  },
  input_password: function (e) {
    password = e.detail.value
  },
  input_rePassword: function (e) {
    rePassword = e.detail.value
  },
  input_Un:function(e){
     Un=e.detail.value
  }
  ,
  reSendPhoneNum: function () {
    var that = this
    if (currentTime < 0) {
      console.log(phoneNum);
      if (!check.checkPhoneNum(phoneNum)) {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: "请输入正确的电话号码!",
        });
        return false
      }
      // 此处调用wx中的网络请求的API，完成电话号码的提交
      wx.request({
        method: 'GET',
        url: 'https://www.mytime.net.cn/auth/sms',
        data: { phone: phoneNum,flag:'resetpwd'},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          if (res && res.data) {
            if (res.data.result == 1) {
              wx.showToast({
                title: '已发送验证码',
                icon: 'success'
              });
              currentTime = maxTime
              interval = setInterval(function () {
                currentTime--
                that.setData({
                  reSendBtn: '重新获取',
                  time: '(' + currentTime + 's)'
                })

                if (currentTime <= 0) {
                  currentTime = -1
                  that.setData({
                    reSendBtn: '重新获取',
                    time: ''
                  })
                  clearInterval(interval)
                }
              }, 1000)

            } else {
              wx.showToast({
                title: '发送验证码失败',
                icon: 'fail'
              });
              console.log(res);
            }
          }
        },
        fail: function (res) {
          console.log(res);
        }
      });
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: "验证码已发送,请稍后重试",
      });
    }
  },
  reSetPws: function () {
    var that = this

    if (!phoneNum) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: "验证凭证不能为空",
      });
      return false
    }
    if (!Un) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: "用户名不能为空",
      });
      return false
    }
    if (!check.isContentEqual(password, rePassword)) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: "两次密码不一致！",
      });
      return false
    }
    this.setData({
      loading: true
    });


         //点击重置密码
         wx.request({
          method: 'POST',
          url: app.getHeader()+'/wx/getpass',
          data: { uAccount:Un,uName: phoneNum, newpass: password },
          header: {
            // 'content-type': 'application/json' // 默认值
            'content-type': 'application/x-www-form-urlencoded' // post请求
    
          },
          success: res => {

            console.log("访问成功")
        console.log(res)
            this.setData({
              loading: false
            });
    
            console.log(res);
            if(res.data.code==200){
             console.log("返回的结果值为200")
              // 完成注册
              wx.showModal({
                title: '重置成功',
                showCancel: false,
                // content:"您的登录账号是："+ res.data.uAccount+"您找回密码的凭证是："+res.data.data.uName,
                success: function (res) {
                   wx.navigateTo({
                url: '../index/index'
              });
                }
              });
              // wx.navigateTo({
              //   url: '../shou/shou'
              // });
            }else{
              wx.showModal({
                title: '重置失败',
                showCancel: false,
                content: res.data.message+',服务器异常',
              });
            }     
          },
          fail: function (res) {
            console.log(res);
          }
        }); 




    if (webUtils.resetPassword(phoneNum, password, phoneNum, identifyCode, function (res) {
      that.setData({
        loading: false
      });
      if (res.data.result == 1) {
        app.globalData.token = res.data.message;
        //存储token到本地
        try {
          wx.setStorageSync('token', res.data.message);
        } catch (e) {
          console.log(e);
        }
        wx.showModal({
          title: '重置成功',
          showCancel: false,
          content: '即将自动登录...',
          success: function (res) {
            if (res.confirm) {
              wx.redirectTo({
                url: '../video/videorecord'
              });
            } 
          }
        });
      } else {
        wx.showModal({
          title: '修改失败',
          showCancel: false,
          content: res.data.message,
        });
      }
    })) {
      this.setData({
        loading: false
      });
    }

  }
})