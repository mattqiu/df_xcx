let extConfig = {
    "env": "production",
    "app_id" : 1,
    // "host": "http://zd.com",
    "host": "https://xwl.jj58.com.cn",
    // "host": "https://meat.madridwine.cn",
    // "host": "https://gr.jjqapp.com",
    "static_path": "http://hangjiayun.oss-cn-shanghai.aliyuncs.com/family/jc/images/"
}
extConfig = Object.assign(extConfig, wx.getExtConfigSync ? wx.getExtConfigSync() : {})
module.exports = extConfig;
