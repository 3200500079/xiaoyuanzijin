var app = getApp()
var total = [];
var tempFilePaths;
var uid;
Page({
  data:{
    imageUrl: [],
    _num:3,
    suggestsList:[],
    
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log("repaire.js的uid:" + app.globalData.uid)
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  bindFormSubmit: function(e) {
    console.log(e.detail.value.textarea)
  },
  formSubmit: function(e) {

    console.log(e.detail.value.my_content)
    console.log("tempFilePaths:" + tempFilePaths)
    console.log("userinfo"+app.globalData.userInfo)

    // if (app.globalData.userInfo.length==0){
    //     console.log("sssfkwn;")
    // }
    // var that = this;
    // //var suggestsList = [];
    // uid = app.globalData.uid
    // console.log("uid:"+uid)
    // console.log("repair:" + json)
    // if(uid==''){
    //   wx.showToast({
    //     title: '请先注册或登录',
    //     duration: 1000,
    //     icon: 'none'
    //   })
    // }else{
      e.detail.value.uid = uid
      e.detail.value.imageUrl = tempFilePaths
      var repair = e.detail.value;
      //var currentSuggestsList = suggestsList.push(suggest);
      var json = JSON.stringify(repair)
      console.log(app.getHeader())
      console.log("=======获得id信息===============")
      console.log(app.globalData.uid)
      uid=app.globalData.uid;
      console.log(uid)
      wx.request({
        url: app.getHeader() + '/wx/feedbackinf', // 拼接接口地址
        method: 'POST',
        data: { id: uid, text: e.detail.value.my_content },
        header: {
          // 'content-type': 'application/json' // get请求默认值
          'content-type': 'application/x-www-form-urlencoded' // post请求
  
        },
        success:res=> {
          console.log(res)
          console.log('res:' + res)
          if (res.data.code == 200) {
         

            wx.showModal({
              title: '提示',
              showCancel: false,
              content: "信息提交成功",
              success:function(res){
                wx.navigateTo({
                  url: '../shou/shou'
                });
              }
            });
          
          } else {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: "服务器异常",
            });
          }
        }
      })
    // }
  } 
})