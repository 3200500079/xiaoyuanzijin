var app = getApp()
var maxTime = 60
var currentTime = -1 //倒计时的事件（单位：s）
var interval = null

var check = require("../register/check.js");
var webUtils = require("../register/registerWebUtil.js");

var account=null,phoneNum = null, identifyCode = null, password = null, rePassword = null;

Page({
  data: {
    windowWidth: 250,
    windoeHeight: 250,
    icon_phone: "/images/icon_phone.png",
    icon_account: "/images/login_name.png",
    icon_password: "/images/login_pwd.png",
    icon_verify:'/images/login_verify.png',
    location: "中国(+86)"//,
    //time: '('+currentTime+'s)'
  },
  onLoad: function () {
    var that = this
    currentTime = -1 //倒计时的事件（单位：s）
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth < 200 ? 250 : res.windowWidth,
          windowHeight: res.windowHeight,
          nextButtonWidth: res.windowWidth - 20,
          reSendBtn:'获取验证码',
          time:''
        })
      }
    })
  },
  onUnload: function () {
    currentTime = maxTime
    if (interval != null) {
      clearInterval(interval)
    }
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
        data: { phone: phoneNum,flag:'register' },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          if(res&&res.data){
            if (res.data.result==1){
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

            }else{
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
  register:function(){
    var that = this

    if (!phoneNum) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: "你找回密码的凭证不能为空",
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


    console.log("开始注册")
    console.log(app.getHeader())

    console.log(phoneNum)
    console.log(password)
            //点击注册
    wx.request({
      method: 'POST',
      url: app.getHeader()+'/wx/registerUser',
      data: { uName: phoneNum, uPass: password },
      header: {
        // 'content-type': 'application/json' // 默认值
        'content-type': 'application/x-www-form-urlencoded' // post请求

      },
      success: res => {

        this.setData({
          loading: false
        });

        console.log(res);
        if(res.data.code==200){
         
          // 完成注册
          wx.showModal({
            title: '注册成功',
            showCancel: false,
            content:"您的登录账号是："+ res.data.data.uAccount+"您找回密码的凭证是："+res.data.data.uName,
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
            title: '注册失败',
            showCancel: false,
            content: res.data.message+',服务器异常',
          });
        }     
      },
      fail: function (res) {
        console.log(res);
      }
    });   






   
    this.setData({
      loading: true
    });

  

  },
  showContract:function(){
    wx.downloadFile({
      url: 'https://www.mytime.net.cn/readme.pdf',
      success: function (res) {
        console.log(res);
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      }
    })
  }
})


