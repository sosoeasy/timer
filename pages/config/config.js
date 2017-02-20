// pages/two/two.js
Page({
  data:{
    configs:{}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var configs= wx.getStorageSync('configs')
    this.setData({configs:configs})
    // for(var config in configs){
    //     if(config.voice==10)
    //     config["10"].checked="true"
    // }
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
  switchChange:function(e){

    var id=e.target.id;
    var configs=this.data.configs;
    var config=configs[id];
    config.state=e.detail.value;
    this.setData({configs:configs});
    wx.setStorage({
      key:'configs',
      data:configs
    })
  },
  sliderChange:function(e){
    console.log(e)
   var id=e.target.id;
    var configs=this.data.configs;
    var config=configs[id];
    if(!config){
        var config=new Object();
        configs[id]=config;
    }
    config.time=e.detail.value;
    this.setData({configs:configs})
    wx.setStorage({
      key:"configs",
      data:configs
    })
  },
  radioChange:function(e){
    console.log(e)
    var id=e.target.id;
    var configs=this.data.configs;
    var config=configs[id];
    if(!config){
        var config=new Object();
        configs[id]=config;
    }
    config.voice=e.detail.value;
    this.setData({configs:configs})
    wx.setStorage({
      key:"configs",
      data:configs
    })
  }
})