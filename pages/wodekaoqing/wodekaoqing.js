var app = getApp();
var uid;
Page({
  data: {
    // tab 切换
    surveyArray: [],
    dakajilu:[
      
    ],
    idList:"",
    index:0,
    daka:'点击打卡',
    dakastat:''
  },
  changeSurvey: function (e) {
    this.setData({
      index: e.detail.value,
    })
  },
  onLoad: function () {
    var that = this
    var idArr = []
    var surveyArr = []
    uid=app.globalData.uid;
    // uid=4;
    // 判断是否打卡
    wx.request({
      url: app.getHeader() + '/wx/PdpuncdCard',
      data:{id:uid},
      method: 'POST',
      header: {
        // 'content-type': 'application/json;charset=UTF-8' // 默认值
        'content-type': 'application/x-www-form-urlencoded' // post请求
      },
      contentType: 'application/json',
      success: function (res) {
        console.log(res)
        if(res.data.code==200){
           console.log("今日已打卡")
          // 如果打卡过了设置打卡按钮禁用和显示已打卡文字
          that.setData({
            daka:'今日已打卡',
            dakastat:'disabled'
          })
        }      
        var json = JSON.stringify(res.data)
        console.log("surveyArray:" + json)
        for (var i = 0; i < res.data.length;i++){
          surveyArr.push(res.data[i])
          idArr.push(res.data[i].id)
        }
        console.log("surveyArr:" + idArr[0])
        that.setData({
          surveyArray: surveyArr,
          idList: idArr
        })
      },
      fail() {
        console.log('xxsad')
      }
    })
  },
  submitSurvey:function(e){


   // 点击打卡
   uid=app.globalData.uid;
    
    wx.request({
      url: app.getHeader() + '/wx/puncdCard',
      data:{id:uid},
      method: 'POST',
      header: {
        // 'content-type': 'application/json;charset=UTF-8' // 默认值
        'content-type': 'application/x-www-form-urlencoded' // post请求
      },
      contentType: 'application/json',
      success: function (res) {
        console.log(res)
        if(res.data.code=200){
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '打卡成功',
          });
         
         // 如果打卡过了设置打卡按钮禁用和显示已打卡文字
         that.setData({
          daka:'今日已打卡',
          dakastat:'disabled'
        })

        }
     


        
        var json = JSON.stringify(res.data)
        console.log("surveyArray:" + json)
        for (var i = 0; i < res.data.length;i++){
          surveyArr.push(res.data[i])
          idArr.push(res.data[i].id)
        }
        console.log("surveyArr:" + idArr[0])
        that.setData({
          surveyArray: surveyArr,
          idList: idArr
        })
      },
      fail() {
        console.log('xxsad')
      }
    })









    var that = this
    var id = that.data.idList[e.detail.value.id]
    var title = that.data.surveyArray[e.detail.value.id].title
    console.log("title:" + title)
    //参数值太长要编码解码传递和接受：encodeURIComponent(title)
    uid = app.globalData.uid
    console.log("uid:" + uid)
    if (uid == '') {
      wx.showToast({
        title: '请先注册或登录',
        duration: 1000,
        icon: 'none'
      })
    } else{
      wx.navigateTo({
        url: '../qs/qs?id=' + id + '&title=' + encodeURIComponent(title),
      })
    }
  },
  chadakajilu:function(){

    var that = this
    var arr=[]
    // 查看打卡记录
   uid=app.globalData.uid;
    console.log(uid)
   wx.request({
     url: app.getHeader() + '/wx/queryall',
     data:{id:uid},
     method: 'POST',
     header: {
       // 'content-type': 'application/json;charset=UTF-8' // 默认值
       'content-type': 'application/x-www-form-urlencoded' // post请求
     },
     contentType: 'application/json',
     success:function(res){
 console.log(res)
       if(res.data.code==200){
       wx.showToast({
         title: '查询成功',
         icon:'success',
         duration:2000
       })
         for (let index = 0; index < res.data.data.length; index++) {
          arr.push(res.data.data[index])          
         }
         for (let index = 0; index < arr.length; index++) {
            console.log(arr[index]) 
         }
         console.log("array数组:"+arr);
          that.setData({
            dakajilu:arr
          })
       }
      
     },
     fail:function(){
      wx.showModal({
        title:"提示",
        showCancel:false,
        content:"服务器异常",
      })
     }
    })
  }

})



