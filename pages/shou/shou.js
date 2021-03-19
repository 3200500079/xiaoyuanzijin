//index.js
//获取应用实例
var app = getApp()
Page({ 
  data: {
    imgUrls: [
      '../../images/message_1.jpeg',
      '../../images/message_2.png',
      '../../images/message_3.jpeg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goods: function() {
    wx.navigateTo({
      url: '../second_level/secondhand/goods'
    })
  },
  notice: function() {
    wx.navigateTo({
      url: '../second_level/notice/notice'
    })
  },
  repairs: function() {
    wx.navigateTo({
      url: '../second_level/repairs/repairs'
    })
  },
  pay: function() {
    wx.navigateTo({
      url: '../second_level/pay/pay'
    })
  },
  pay: function() {
    wx.navigateTo({
      url: '../second_level/pay/pay'
    })
  },
  survey: function() {
    wx.navigateTo({
      url: '../survey/survey'
    })
  },
  wodekaoqing: function() {
    wx.navigateTo({
      url: '../wodekaoqing/wodekaoqing'
    })
  },

  wentishangbao:function(){
    wx.navigateTo({
      url: '../wentishangbao/wentishangbao',
    })
  }
  ,
  onLoad: function () {
    console.log('onLoad')
    
  },
  tapName: function(event) {
    console.log(event)
  }
})

