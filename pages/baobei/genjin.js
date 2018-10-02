const app = getApp();
Page({
  data:{
  },
  onLoad: function(options){
    this.Global = app.Global;
    this.Api = this.Global.Api;
    var WxValidate = this.Global.WxValidate;
    const rules = {
        'note': {
            required: true,
        }
    }
    const messages = {
        'note': {
            required: '请输入跟进内容',
        }
    }
    this.WxValidate = new WxValidate(rules,messages);
  },
  add : function(e) {
    if (!this.WxValidate.checkForm(e)) {
        const error = this.WxValidate.errorList[0];
        this.Global.showErrorMsg(error.msg);
    }else{
    this.Global.getUser().then(obj=>{
      console.log(e.detail);
      this.Api.addSubPro({
        sid : this.options.id,
        uid : obj.id,
        note : e.detail['value']['note']
      }).then(obj=>{
        if(obj.status == 'success'){
          this.Global.pubsub.emit('genjin');
          this.Global.showOkMsg(obj.msg).then(obj=>{
            wx.navigateBack();
          });
        }else{
          this.Global.showErrorMsg(obj.msg);
        }
      });
    })
    }
  }
})
