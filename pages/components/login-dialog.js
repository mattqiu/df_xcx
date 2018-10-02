var app = getApp();
Component({
    properties : {
    },
    data : {
      show : false
    },
    methods : {
      show : function() {
        //如果不是手动调取，那么就肯定是微信自动登录就失败的用户，那么直接使用手机号授权
          var obj = app.globalData.user;
          console.log(obj);
          var is_true = obj.is_true;
          if(!is_true){
            this.setData({
              show : true,
              isWxPhone : true,
              phone : obj['phone'] || ''
            })
          }else{
            //这里直接设置内容，其实只有退出登录才会有这个弹框信息，所以重新弹框就是首先自动登录判断
            this.setData({
              show : true,
              isWxPhone : false
            })
          }
      },
      getUserInfo : function() {
        //console.log(app.globalData._user);
        //这里做相关处理trigger
        //这里做设置用户信息
        var user = app.globalData.wxUser;
        this.Global.initUidLogin(user.uid).then(obj=>{
          this.triggerEvent('refreshuser');
          this.hide();
        });
      },
      hide : function() {
        this.setData({
          show : false
        })
      },
      getPhoneNumber : function(e) {
        var user = app.globalData.wxUser;
        var session_key = user.session_key;
        var detail = e.detail;
        if(detail.iv){
          detail.accessKey = session_key;
          this.Api.decode(detail).then(obj=>{
            var phone = obj.trim();
            this.goReg(phone);
            this.hide();
          })
        }
      },
      goLogin : function() {
        wx.navigateTo({
          url : '/pages/login/reg',
          success : ()=> {
            this.hide()
          }
        });
      },
      goRegUserPhone: function() {
        var phone = this.data.phone;
        wx.navigateTo({
          url : '/pages/login/bind?phone=' + phone,
          success : ()=>{
            this.hide();
          }
        });
      },
      goReg : function(phone) {
        wx.navigateTo({
          url : '/pages/login/bind?phone=' + phone,
          success : ()=>{
            this.hide();
          }
        });
      }
    },
    ready : function() {
      this.Global = app.Global;
      this.WxService = this.Global.WxService;
      this.Api = this.Global.Api;
      this.Global.getConfig().then(obj=>{
        this.setData({
          config : obj
        })
      })
    }
})
