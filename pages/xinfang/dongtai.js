const app = getApp();
Page({
  data:{
  },
  onLoad: function(options){
    this.Global = app.Global;
    this.Api = this.Global.Api;
    var id = options.id;
    this.Api.newsList({
      hid : id
    }).then(obj=>{
      console.log(obj);
      this.setData({
        list : obj
      });
    })
  }
})
