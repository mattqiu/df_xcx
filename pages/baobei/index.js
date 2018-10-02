var dateTimePicker = require('../../utils/dateTimePicker.js');
const app = getApp();
Page({
  data:{
    isMore : false,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: new Date().getFullYear(),
    endYear: new Date().getFullYear() + 1,
    qs_index : 0,
    qs : [{
      name : '+86(中国)',
      value : '+86'
    },{
      name : '+852(香港)',
      value : '+852'
    },{
      name : '+853(澳门)',
      value : '+853'
    },{
      name : '+886(台湾)',
      value : '+886'
    }],
    form : {
      gender : 1,
      phone_origin : [],
      phone : '',
      phone_hide : true
    },
    visit_ways : [{
      name : '自驾',
      value : 1
    },{
      name : '班车',
      value : 2
    }],
    visit_num_array : app.Global._.range(1,11),
    hid : [],
    visit_ways_index : -1,
    rule : false
  },
  //区号修改
  changeQs : function(e) {
    var value = e.detail.value;
    this.setData({
      qs_index : value
    });
  },
  setRule : function() {
    var rule = this.data.rule;
    rule = !rule;
    this.setData({
      rule : rule
    });

    this.setData({
      'form.phone_hide' : !rule
    });
  },
  changeVisitNum : function(e) {
    var value = +e.detail.value;
    this.setData({
      visit_num : value + 1
    });
  },
  onLoad: function(options){
    app.setPage('baobei/index',this);
    var id = options.id;
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
    this.Global = app.Global;
    this.Api = this.Global.Api;
    var WxValidate = this.Global.WxValidate;
    this.Global.pubsub.on('my.manage',this.setPerson);
    this.Global.pubsub.on('xinfang.select',this.setPlot);
    var phoneType = app.globalData.phoneType;
    this.setData({
      phoneType : phoneType,
      'form.phone_hide' : !phoneType
    });
    // 验证字段的规则
    const rules = {
        'name': {
            required: true,
        },
        //'visit_way': {
            //required: true
        //},
        //'visit_num': {
            //required: true
        //},
        'phone': {
            required: true
        }
    }
    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
        'name': {
            required: '请填写姓名',
        },
        'visit_way': {
            //required: '请填写来访方式',
        },
        'visit_num': {
            //required: '请填写来访人数',
        },
        'phone': {
            required: '请填写手机号码',
        }
    }
    this.WxValidate = new WxValidate(rules,messages);

    this.setData({
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime,
      showTime : false,
      isLoad : true,
      hid : id ? [id] : []
    });
  },
  onUnload : function() {
    this.Global.pubsub.off('my.manage',this.setPerson);
    this.Global.pubsub.off('xinfang.select',this.setPlot);
  },
  onChangePhone(e){
    var checked = e.detail.value;
    //if(checked){
      //var phone = this.data.form.phone;
      //this.setData({
        //'form.phone' : phone.slice(0,4) + '****' + phone.slice(8)
      //})
    //}
    this.setData({
      'form.phone_hide' : checked
    })
  },
  onInputPhone(e){
    var detail = e.detail;
    var value = detail.value;
    var checked = this.data.form.phone_hide;
    var last_phone = this.data.form.phone;
    var phone_origin = this.data.form.phone_origin;
    var len = last_phone.length;
    var inputValue = value.slice(len);
    //console.log(inputValue,cursor);
    //if(inputValue.length > 0){
      //phone_origin[cursor] = inputValue;
    //}else{
      //phone_origin.splice(cursor,1);
    //}
    //console.log(phone_origin);

    if(checked){
      if(value.length > 7){
        value = value.slice(0,3) + '****' + value.slice(7);
      }
      if(value.length >= 3 && value.length <=7){
        value = value.slice(0,3) + '****'.slice(0,value.length-3);
      }
      this.setData({
        'form.phone' : value
      })
    }else{
      this.setData({
        'form.phone' : value
      })
    }
    //console.log(detail);
  },
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({ 
      dateTimeArray1: dateArr
    });
  },
  show(e) {
    this.setData({
      showTime : true
    })
  },
  changeVisit(e) {
    var value = +e.detail.value;
    this.setData({
      visit_ways_index : value
    });
  },
  changeGender(e){
    var gender = e.currentTarget.dataset.id;
    this.setData({
      'form.gender' : gender
    })
  },
  //设置用户信息
  setPerson(e){
    var reg = new RegExp("(\\d{3})(\\d{4})(\\d{4})");
    var tel = e.phone.replace(reg, "$1****$3");
    var phone_hide = this.data.form.phone_hide;
    this.setData({
      'form.name' : e.name,
      'form.gender' : e.sex,
      'form.phone' : phone_hide ? tel : e.phone
    })
  },
  //设置楼盘信息
  setPlot(e){
    var _ = this.Global._;
    var ids = _.map(e,function(v,k) {
      return v.id;
    });
    var hid = this.data.hid;
    var obj = _.union(hid,ids);
    obj = _.uniq(obj);
    this.setData({
      hid : obj
    })
  },
  //表单提交
  submitform(e){
    //if(!this.data.showTime){
      //this.Global.showErrorMsg('请填写到访时间');
      //return;
    //}
    if (!this.WxValidate.checkForm(e)) {
        const error = this.WxValidate.errorList[0];
        this.Global.showErrorMsg(error.msg);
        return false
    }else{
      //这里判断是不是手机号码
      var phone_hide = this.data.form.phone_hide;
      var phone = this.data.form.phone;
      //校验剩下7位
      if(phone_hide){
        var diff_phone = phone.slice(0,3) + phone.slice(7);
        var flag = /1[0-9]{6}/.test(diff_phone);
        if(!flag){
          this.Global.showErrorMsg('请输入正确的手机号');
          return;
        }
      }else{
        //校验11位
        var flag = /1[0-9]{10}/.test(phone);
        if(!flag){
          this.Global.showErrorMsg('手机号格式错误');
          return;
        }
      }
      var params = this.Global._.extend({},e.detail.value,{
        uid : this.Global.getUid()
      })
      var qs_index = this.data.qs_index;
      var qs = this.data.qs;
      if(qs_index != 0){
        params.phone = qs[qs_index]['value'] + params.phone;
      }
      this.Api.addSub(params).then(obj=>{
        if(obj['status'] === 'error'){
          this.Global.showErrorMsg(obj.msg);
        }else{
          this.Global.showOkMsg(obj.msg);
          setTimeout(()=> {
            this.Global.WxService.navigateTo('/pages/my/baobei');
          },1500);
        }
      })
    }
  },
  showMore : function() {
    this.setData({
      isMore : true
    });
  },
  delHid : function(e) {
    var hid = e.detail;
    var index = this.data.hid.indexOf(hid);
    this.data.hid.splice(index,1);
    this.setData({
      'hid' : this.data.hid
    });
  }
})
