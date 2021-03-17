//app.js
var app=getApp()
App({

data:{
users:[

]
}
,
  onLaunch: function () {
    //this.globalData.basePath = 'http://localhost:8080';//https://www.mytime.net.cn
    // 展示本地存储能力
   
    var token = wx.getStorageSync('token') ;
    this.globalData.token = token;
  },
  globalData:{
    userInfo:null,
    messages :[],
    openid:'',
    uid:'',
    protocol: "http://",
    // host: "47.106.168.136",
    // port: "8888",
    host: "192.168.43.3", 
    port: 8080,
    openid: '',//用户唯一标志ids
  },

getHeader() {
  var protocol = this.globalData.protocol
  var host = this.globalData.host
  var port = this.globalData.port
  var header = protocol + host + ':' + port
  console.log('header:' + header)
  return header;
},
 fliteremoji: function (str) {
  str = str.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "")
},
showToast(title, duration, icon) {
  wx.showToast({
    title: title ? title : '网络繁忙，请扫后重试！',
    duration: duration || 1000,
    icon: icon || 'none'
  })
}
})