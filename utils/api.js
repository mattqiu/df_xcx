import WxRequest from '../libs/wx-request/lib/core/WxRequest';
import Promise from '../libs/es6-promise';
import config from '../config';

class Api{
  constructor(){
      this.request = new WxRequest({
          baseURL : config.host + '/api'
      });
      this.request.interceptors.use({
        // 统一全局拦截
        responseError(responseError) {
          wx.showToast({
            title : '接口错误',
            icon : 'none'
          })
          return Promise.reject(responseError)
        }
      });
  }
  index(){
    var url = '/index/index';
    return this.request.getRequest(url,{
      data : {
      }
    }).then(function(obj) {
      return obj.data.data;
    });
  }
  city(){
    var url = '/index/cityList';
    return this.request.getRequest(url,{
      data : {
      }
    }).then(function(obj) {
      return obj.data.data;
    });
  }
  //新房列表
  xfList(data){
    var url = '/plot/list';
    return this.request.getRequest(url,{
      data : data
    }).then(function(obj) {
      return obj.data.data;
    });
  }
  //新房详情
  xfDetail(data){
    var url = '/plot/info';
    return this.request.getRequest(url,{
      data : data
    }).then(function(obj) {
      return obj.data.data;
    });
  }
  //获取openid
  getOpenid(data){
    var url = '/index/getOpenid';
    return this.request.getRequest(url,{
      data : data
    }).then(function(obj) {
      return obj.data.data;
    });
  }
  //发送验证码
  getSmsCode(data){
    var url = '/index/getSmsCode';
    return this.request.getRequest(url,{
      data : data
    }).then(function(obj) {
      return obj.data;
    });
  }
  //验证验证码
  checkCode(data){
    var url = '/index/checkCode';
    return this.request.getRequest(url,{
      data : data
    }).then(function(obj) {
      return obj.data;
    });
  }
  //获取用户信息
  getUserInfo(data){
    var url = '/index/getUserInfo';
    return this.request.getRequest(url,{
      data : data
    }).then(function(obj) {
      return obj.data;
    });
  }
  //筛选
  filter(data){
    var url = '/tag/list';
    return this.request.getRequest(url,{
      data : data
    }).then(function(obj) {
      return obj.data.data;
    });
  }
  //解密
  decode(data){
    var url = '/index/decode';
    return this.request.postRequest(url,{
      data : data
    }).then(function(obj) {
      return obj.data;
    });
  }
  //绑定门店吗
  regis(data){
    var url = '/user/regis';
    return this.request.postRequest(url,{
      data : data
    }).then(function(obj) {
      return obj.data;
    })
  }
  //动态
  newsList(data){
    var url = '/plot/getNewsList';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data.data;
    })
  }
  //我的报备列表
  subList(data){
    var url = '/user/subListNew';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data.data;
    })
  }
  //新增报备
  addSub(data){
    var url = '/plot/addSub';
    return this.request.postRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data;
    })
  }
  //新增公司
  subCompany(data){
    var url = '/plot/subCompany';
    return this.request.postRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data;
    })
  }
  //客户列表
  getUserList(data){
    var url = '/plot/getUserList';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data.data;
    })
  }
  //新增举报
  addReport(data){
    var url = '/plot/addReport';
    return this.request.postRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data;
    })
  }
  //个人中心
  userIndex(data){
    var url = '/user/index';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data;
    })
  }
  //新增收藏
  addSave(data){
    var url = '/plot/addSave';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data;
    })
  }
  //展示客户码
  showCode(data){
    var url = '/user/showCode';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data.data;
    })
  }
  //报备详情
  subInfo(data){
    var url = '/user/subInfo';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data;
    })
  }
  //添加跟进
  addSubPro(data){
    var url = '/user/addSubPro';
    return this.request.postRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data;
    })
  }
  //获取报备状态
  getSubTag(){
    var url = '/user/getSubTag';
    return this.request.getRequest(url).then(obj=>{
      return obj.data;
    });
  }
  //新增分销签约
  addCo(data){
    var url = '/plot/addCo';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data;
    });
  }
  //上传带看资料
  addSubImg(data){
    var url = '/user/addSubImg';
    return this.request.postRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data;
    });
  }
  //更换公司
  leave(data){
    var url = '/user/leave';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data;
    })
  }
  //获取用户类型
  getUserType(){
    var url = '/index/getUserType';
    return this.request.getRequest(url).then(obj=>{
      return obj.data.data;
    })
  }
  //添加楼盘信息
  getPlotsById(data){
    var url = '/plot/getPlotsById';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data.data;
    })
  }
  //添加楼盘信息
  getPlotAllPhoneById(data){
    var url = '/plot/getPlotAllPhoneById';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data.data;
    })
  }
  //添加楼盘信息
  getNeedIdById(data){
    var url = '/plot/getNeedIdById';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data.data;
    })
  }
  //是否开启身份证接口
  getIsOpenSfz(data){
    var url = '/index/getIsOpenSfz';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data.data;
    })
  }
  //获取投诉建议接口
  getNoteList(data){
    var url = '/plot/getNoteList';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data.data;
    })
  }
  //获得门店码下面的介绍
  getCodeNote(data){
    var url = '/index/getCodeNote';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data.data;
    })
  }
  //站点配置
  config(){
    var url = '/config/index';
    return this.request.getRequest(url).then(obj=>{
      return obj.data.data;
    })
  }
  //底部配置
  getBottom(){
    var url = '/index/getBottom';
    return this.request.getRequest(url).then(obj=>{
      return obj.data.data;
    });
  }
  //快速报备接口
  getPhoneType(){
    var url = '/index/getPhoneType';
    return this.request.getRequest(url).then(obj=>{
      return obj.data.data;
    })
  }
  //获取标题
  getTitle(data) {
    var url = '/user/getMultiTitle';
    return this.request.getRequest(url, {
      data: data
    }).then(obj => {
      return obj.data.data;
    })
  }
  //快速报备提交
  getSumit(data){
    var url = '/user/multiSub';
    return this.request.postRequest(url, {
      data: data
    }).then(obj => {
      return obj.data;
    })
  }
  //分享页面图片
  getSharePic(data) {
    var url = '/user/getSharePic';
    return this.request.getRequest(url, {
      data: data
    }).then(obj => {
      return obj.data.data;
    })
  }
  revisename(data) {
    var url = '/user/editName';
    return this.request.getRequest(url, {
      data: data
    }).then(obj => {
      return obj.data;
    })
  }
  subpros(data) {
    var url = '/user/getSubPros';
    return this.request.getRequest(url, {
      data: data
    }).then(obj => {
      return obj.data.data;
    })
  }
}
export default Api;
