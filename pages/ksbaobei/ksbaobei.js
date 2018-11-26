const app = getApp();
Page({
  data: {
    pic: '',
    title: ''
  },
  backhome: function() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  onLoad: function(options) {
    this.Global = app.Global;
    this.Api = this.Global.Api;
    this.Api.getTitle({
      type: 1
    }).then(obj => {
      this.setData({
        title: obj
      })
      // console.log(obj)
      wx.setNavigationBarTitle({
        title: obj
      })
    });
    var WxValidate = this.Global.WxValidate;
    const rules = {
      'note': {
        required: true,
      }
    }
    const messages = {
      'note': {
        required: '请填写报备内容',
      }
    }
    this.WxValidate = new WxValidate(rules, messages);
    this.Api.getSharePic({

    }).then(obj => {
      this.setData({
        pic: obj
      })
    });
  },

  onShareAppMessage: function() {
    return {
      title: this.data.title,
      imageUrl: this.data.pic
    }
    
  },
  copy: function() {
    wx.setClipboardData({
      data: '报备项目：龙湖滟澜山\n客户信息：刘先生186****9892 李先生187****2924\n带看人姓名：刘先生\n带看人电话：13800008888\n分销公司全称：钉房网络科技(上海)有限公司\n自驾车牌号码：沪A88888',
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  add: function(e) {
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0];
      this.Global.showErrorMsg(error.msg);
    } else {
      this.Global.getUser().then(obj => {
        var app = getApp();
        var user = app.globalData.wxUser;
        var str1 = e.detail['value']['note'].replace(/\n/g, "tt");
        // console.log(e.detail);
        this.Api.getSumit({
          uid: obj.id !== undefined ? obj.id : '',
          note: str1,
          openid: user.openid,
        }).then(obj => {
          if (obj.status == 'success') {
            this.Global.wxLogin().then(obj1 => {
              //   app.globalData.wxUser = obj1;
              app.globalData.user = obj.data;
              this.Global.showOkMsg(obj.msg).then(obj => {
                wx.navigateTo({
                  url: '/pages/my/baobei'
                })
              });
            });
            // this.Global.showErrorMsg('请重新登录小程序');
          } else {
            this.Global.showErrorMsg(obj.msg);
          }

        });
      })
    }
  },

})