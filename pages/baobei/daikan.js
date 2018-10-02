const app = getApp();
Page({
  data:{
    imgs: []
  },
  hidePhone : function() {
    var phone = this.data.phone;
    var d_phone= phone.slice(0,4) + '****' + phone.slice(8);
    this.setData({
      phone : d_phone,
      phone_hide : true
    });
  },
  onLoad: function(options){
    this.Global = app.Global;
    this.Api = this.Global.Api;
    this.init();
  },
  init : function() {
    this.Api.showCode({
      id : this.options.id
    }).then(obj=>{
      console.log(obj);
      this.setData(obj);
    })
  },
  getUploadCompoent : function() {
    var cp = this.selectComponent('#cupload');
    return cp;
  },
  upload : function() {
    var cp = this.getUploadCompoent();
    var images = cp.getImages();
    var imgs = this.Global._.map(images,function(v,k) {
      return v.key;
    })
    this.Api.addSubImg({
      sid : this.options.id,
      imgs : imgs.join(',')
    }).then(obj=>{
      if(obj.status === 'success'){
        this.Global.showOkMsg(obj.msg);
      }else{
        this.Global.showErrorMsg(obj.msg);
      }
    });
  }
})
