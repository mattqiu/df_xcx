const app = getApp();
Component({
    properties : {
      hid : {
        type : String
      },
      status : {
        type : Number,
        value : 0
      },
      options : {
        type : Object
      }
    },
    data : {
    },
    methods : {
      fav : function() {
        this.Global.getUser().then(obj=>{
          if(obj.id){
            this.Api.addSave({
              uid : obj.id,
              hid : this.data.hid
            }).then(obj=>{
              this.Global.showOkMsg(obj.msg);
              this.setData({
                'status' : obj.data
              });
              var options = this.data.options;
              if(options.from == 'fav'){
                this.Global.pubsub.emit('fav');
              }
            })
          }else{
            this.Global.showLoginDialog();
          }
        })
      }
    },
    ready : function() {
      this.Global = app.Global;
      this.Api = this.Global.Api;
    }
})
