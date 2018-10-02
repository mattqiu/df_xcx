const app = getApp();
Page({
  data:{
    tab : 0
  },
  onLoad: function(options){
    this.Global = app.Global;
    this.Api = this.Global.Api;
    this.init();
    this.Global.pubsub.on('genjin',()=>{
      this.init();
    })
  },
  changeTab : function(e) {
    console.log(e);
    var tab = e.currentTarget.dataset.index;
    console.log(tab);
    this.setData({
      tab : tab
    });
  },
  init : function() {
    var id = this.options.id;
    return this.Api.subInfo({
      id : id
    }).then(obj=>{
      var data = obj.data;
      data.firstArr = this.Global._.isEmpty(data.firstArr) ? false : data.firstArr;
      data.secondArr = this.Global._.isEmpty(data.secondArr) ? false : data.secondArr;
      this.Global._.each(data.pros,(v,k)=> {
        console.log(v);
        this.Global.wxParse.wxParse('_note[' + k + ']','html',v.note,this,15);
      });
      this.setData(data);
      console.log(data);
    })
  },
  call : function(e) {
    var phone = e.currentTarget.dataset.phone;
    this.Global.makePhone(phone);
  },
  upload : function() {
    var cp = this.getUploadCompoent();
    var images = cp.getImages();
    var addimages = cp.getAddImages();
    var imgs = this.Global._.map(addimages,function(v,k) {
      return v.key;
    })
    //console.log(imgs);
    this.Api.addSubImg({
      sid : this.options.id,
      imgs : imgs.join(','),
      uid : this.Global.getUid(),
      type : 0
    }).then(obj=>{
      if(obj.status === 'success'){
        //这里需要更新数据
        this.Global.showOkMsg(obj.msg);
        this.init().then(obj=>{
          this.setData({
            tab : 0
          })
        });
        //cp.updateLockLen();
      }else{
        this.Global.showErrorMsg(obj.msg);
      }
    });
  },
  upload2 : function() {
    var cp = this.getUploadCompoent();
    var images = cp.getImages();
    var imgs = this.Global._.map(images,function(v,k) {
      return v.key;
    })
    //console.log(imgs);
    this.Api.addSubImg({
      sid : this.options.id,
      imgs : imgs.join(',')
    }).then(obj=>{
      if(obj.status === 'success'){
      }else{
      }
    });
  },
  getUploadCompoent : function() {
    var cp = this.selectComponent('#cupload');
    return cp;
  },
  previewPhoto : function(e) {
    var item = e.currentTarget.dataset.item;
    var image = item;
    wx.previewImage({
      urls : this.data.imgs,
      current : image
    });
  }
})
