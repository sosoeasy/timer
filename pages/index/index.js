// pages/one/frist.js
Page({
  leftmovie:0,
  rightmovie:0,
  data:{
    title1:"",
    actionSheetName:[],
    nowConfigs:[],
    title:"",
    desc:"",
    voice:0,
    leftTime:0,
    rightTime:0,
    // configs:[]

    src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46'

  },
  onLoad:function(options){
  //   // 页面初始化 options为页面跳转所带来的参数
 
  },
  onReady:function(){
    // 页面渲染完成

     // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  onShow:function(){
      var that=this;
     var c= wx.getStorageSync('configs')
      wx.getStorage({
          key: "configs",
          success: function(res) {
              var configs=res.data;
              var actionSheetNames=[];
              var nowConfigs=[];
              var frist=true;
              for(var i in configs){
                var config=configs[i];
                  if(config.state){
                    if(frist){
                      var desc=config.desc.replace(/@/g,config.time+"秒")
                      that.setData({title:config.name,desc:desc,voice:config.voice})
                      var leftT=config.time
                      that.setData({leftTime:leftT})
                       var rightT=config.time
                      that.setData({rightTime:rightT})
                      frist=false
                    }
                      console.log(config)
                      actionSheetNames.push(config.name);
                      nowConfigs.push(config)
                  }
              }
              that.setData({nowConfigs:nowConfigs})
              that.setData({actionSheetName:actionSheetNames})
          } 
})
      console.log(this.data.actionSheetName)
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  showActionSheet:function(e){
    this.leftStop();
    this.rightStop();
      var that=this;
          wx.showActionSheet({
      itemList: that.data.actionSheetName,
      success: function(res) {
        console.log(res)
        var desc=that.data.nowConfigs[res.tapIndex].desc.replace(/@/g,that.data.nowConfigs[res.tapIndex].time+"秒")
         that.setData({title:that.data.nowConfigs[res.tapIndex].name,desc:desc,voice:config.voice});
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },
  leftStop:function(){
    if(this.leftInterval&&this.leftInterval!=0){
      clearInterval(this.leftInterval);
      this.leftInterval=0;
      this.audioPause();
    }
  },
      leftStart:function(){
        if(this.data.leftTime==0){
          return;
        }
         if(this.leftInterval&&this.leftInterval!=0){
            this.leftStop();
            return;
        }
        if(this.rightInterVal&&this.rightInterVal!=0){
            this.rightStop();
        }
        var that=this;
          var leftAnimation = wx.createAnimation({
              duration: 1000,
              timingFunction: "ease"
            })
    
           var leftInterval = setInterval(function(){
                  that.leftmovie+=360/that.data.voice;
              leftAnimation.rotate(that.leftmovie).step()
              that.setData({
                leftAnimationData:leftAnimation.export()
              })
              var leftT=that.data.leftTime-1;
              that.setData({leftTime:leftT})
              if(that.data.leftTime<=that.data.voice){
                  that.audioPlay();
              }
              if(leftT==0){
                that.leftStop();
                return;
              }
            },1000);
            this.leftInterval=leftInterval;
      },
      rightStop:function(){
        if(this.rightInterVal&&this.rightInterVal!=0){
          clearInterval(this.rightInterVal);
          this.rightInterVal=0;
           this.audioPause();
        }
      },
      rightStart:function(){
        if(this.data.rightTime==0){
          return;
        }
          if(this.rightInterVal&&this.rightInterVal!=0){
            this.rightStop();
            return;
        }
          if(this.leftInterval&&this.leftInterval!=0){
            this.leftStop();
        }
          var that=this
          var rightAnimation = wx.createAnimation({
              duration: 1000,
              timingFunction: "ease"
            })
          var  rightInterVal =  setInterval(function(){
                that.rightmovie+=360/that.data.voice
                rightAnimation.rotate(that.rightmovie).step()
                that.setData({
                  rightAnimationData:rightAnimation.export()
                })
              var rightT=that.data.rightTime-1;
              that.setData({rightTime:rightT})
              if(that.data.rightTime<=that.data.voice){
                  that.audioPlay();
              }
              if(rightT==0){
                that.rightStop()
                return
              }
            },1000) 
            this.rightInterVal=rightInterVal
      },

  audioPlay:function(){
       this.audioCtx.play()
  },
  audioPause:function(){
       this.audioCtx.pause()
  }
})