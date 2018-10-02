const app = getApp();
Page({
  data:{
  },
  quit : function() {
    this.Global.showLoginDialog(1);
  },
  relogin : function() {
        
  },
  refreshuser :function() {
    this.init();
  },
  changeCompany : function() {
    var cdialog = this.selectComponent('#cdialog');
    cdialog.show();
  },
  joinCompany : function() {
    this.Global.WxService.navigateTo('/pages/login/bind?phone=' + this.data._user.phone);
  },
  ok : function() {
    var user = this.data._user;
    this.Api.leave({
      uid : user.id
    }).then(obj=>{
      if(obj['status'] === 'success'){
        this.Global.showOkMsg(obj.msg).then(obj=>{
          //这里重新刷新数据
          var uid = user.id;
          this.Global.initUidLogin(uid).then(obj=>{
            this.init();
            console.log(obj);
          });
        });
        //this.Global.showOkMsg(obj.msg).then(obj=>{
          //this.Global.WxService.switchTab('/pages/index/index');
        //});
      }else{
        this.Global.showErrorMsg(obj.msg);
      }
    });
  },
  cancel : function() {
    
  },
  getUserIndex : function(id) {
    this.Api.userIndex({
      uid : id
    }).then(obj=>{
      this.setData({
        user : obj.data
      })
    })
  },
  onLoad: function(options){
    this.Global = app.Global;
    this.Api = this.Global.Api;

    //var uid = 2;
    //this.Api.getUserInfo({
      //kw : uid
    //}).then(obj=>{
      //this.setData({
        //user : obj
      //})
    //})
  },
  call : function() {
    this.Global.makePhone(this.data.user.tel);
  },
  login :function() {
    this.Global.showLoginDialog();
  },
  init : function() {
    this.Global.getUser().then(obj=>{
      if(obj.id){
        this.setData({
          _user : obj,
          isLoad : true
        });
        this.Global.hideLoginDialog();
        this.getUserIndex(obj.id);
      }else{
        this.Global.showLoginDialog();
      }
    })
  },
  goLink : function(e) {
    var item = e.currentTarget.dataset.item;
    this.Global.link(item.url);
  },
  onShow : function() {
    this.init();
  }
})
