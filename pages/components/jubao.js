const app = getApp();
Component({
    properties : {
      hid : {
        type : String
      }
    },
    data : {
      reasonId : -1,
      show : false
    },
    methods : {
      hide : function() {
        this.setData({
          'show' : false
        })
      },
      show : function() {
        this.setData({
          'show' : true
        })
      },
      tijiao : function() {
        var hid = this.data.hid;
        var reason = '';
        var reasonId = this.data.reasonId;
        var uid = this.Global.getUid();
        var reasons = this.data.reasons;
        

        if(reasonId == -1){
          this.Global.showErrorMsg('请选择举报内容');
        }else if(reasonId == reasons.length - 1){
          reason = this.data._reason;
        }else{
          reason = this.data.reasons[reasonId];
        }

        this.Api.addReport({
          hid : hid,
          reason : reason,
          uid : uid
        }).then(obj=>{
          if(obj['status'] === 'error'){
            this.Global.showErrorMsg(obj.msg);
          }else{
            this.hide();
            this.Global.showOkMsg(obj.msg);
            this.setData({
              value : ''
            });
          }
        });

      },
      setReason : function(e) {
        var index = e.currentTarget.dataset.index;
        this.setData({
          reasonId : index
        })
      },
      onInputReason : function(e) {
        var value = e.detail.value;
        this.setData({
          _reason : value
        });
      }
    },
    ready : function() {
      this.Global = app.Global;
      this.Api = this.Global.Api;
      this.Global.getNoteList().then(obj=>{
        var other=  this.Global._.clone(obj || []);
        console.log(other);
        other.push('其他');
        this.setData({
          reasons : other
        })
      })
    }
})
