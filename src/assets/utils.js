/**
 * Created by zwwill on 2017/8/27.
 */
const resLocateURL = 'file://';
const resRemoteURL = 'http://cdn.rzico.com/weex/';
const websiteURL = 'http://mopian.1xx.me';
const event = weex.requireModule('event');
const debug = true;//删掉该属性时请查找该页所有debug变量并删除变量
let utilsFunc = {
    initIconFont () {
        let domModule = weex.requireModule('dom');
        domModule.addRule('fontFace', {
            'fontFamily': "iconfont",
            'src': "url('"+resLocateURL+"resources/fonts/iconfont.ttf')"
        });
    },
    //获取本地资源
    locate(url) {
        const newUrl = resLocateURL + url;
        return newUrl;
    },
    //获取远程资源
    remote(url) {
        const newUrl = resRemoteURL + url;
        return newUrl;
    },
    //获取网站资源
    website(url) {
        const newUrl = websiteURL + url;
        return newUrl;
    },
    //获取URL参数
    getUrlParameter(name,dataUrl) {
        let url;
        if(dataUrl == null || dataUrl == undefined || dataUrl == '' ){
            url = weex.config.bundleUrl;
        }else{
            url = dataUrl;
        }
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = url.slice(url.indexOf('?')+1).match(reg);
        if (r != null) {
            try {
                return decodeURIComponent(r[2]);
            } catch (_e) {
                return null;
            }
        }
        return null;
    },
    message (_type,_content,_data) {
        return {
            type:_type,
            content:_content,
            data:_data
        }
    },
    //判空
    isNull (value) {
        if (value == null || value == undefined || value == ''  || value == 'undefined') {
            return true
        } else {
            return false
        }
    },
    //获取缩略图
    thumbnail(url,w,h) {
        //获取屏幕宽度计算得出比例
        let proportion = weex.config.env.deviceWidth/750;
//                获取缩略图的宽高
        w = parseInt(w * proportion);
        h = parseInt(h * proportion);
        if (url.substring(0,11) == "http://cdnx") {
            return url+"?x-oss-process=image/resize,w_"+w+",h_"+h+"";
        } else
        if (url.substring(0,10) == "http://cdn") {
            return url+"@"+w+"w_"+h+"h_1e_1c_100Q";
        } else {
            return url;
        }
    },
    //获取全屏的高度尺寸,可传入父组件的导航栏高度进行适配
    fullScreen(topHeight){
        //减1是为了能触发loading，不能够高度刚刚好
        topHeight = topHeight == '' ? 0 : topHeight - 1;
        return 750/weex.config.env.deviceWidth * weex.config.env.deviceHeight - topHeight;
    },
    //模糊图片，r , s  为 1-50，超大超模糊
    blur(url,r,s) {
        if (url.substring(0,10) == "http://cdn") {
            return url+"@"+r+"-"+s+"bl";
        } else {
            return url;
        }
    },
    //获取文章URL地址
    articleUrl(template,id) {
        template = template == '' ? 't1001' : template;
        return websiteURL + "/" + template + "?id=" + id;
    },
    debug(msg) {
        if (debug) {
            event.toast(msg);
        }
    },
    //  获取字符串的字符总长度
    getLength(e){
        var name = e;
        var len = 0;
        for (let i = 0; i < name.length; i++) {
            var a = name.charAt(i);
            if (a.match(/[^\x00-\xff]/ig) != null) {
                len += 2;
            }
            else {
                len += 1;
            }
        }
        return len;
    },
//    将过长的字符串换成 XXX...XXX格式
    changeStr(e){
        return e.substr(0,4) + '...' + e.substr(-4);
    },
    //js中用正则表达式 过滤特殊字符, 校验所有输入域是否含有特殊符号 (无法过滤 \ )
    //  searchFilter(s) {
    //         event.toast(s);
    //         var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]");
    //         var rs = "";
    //         for (var i = 0; i < s.length; i++) {
    //             rs = rs + s.substr(i, 1).replace(pattern,'');
    //         }
    //         return rs;
    //     }

    //老的二维码转换成新格式
    qr2scan(e) {
        let type = this.getUrlParameter("type",e);
        let code = this.getUrlParameter("no",e);
        if (type=="paybill") {
            return websiteURL + "/q/818804"+code+".jhtml";
        } else
        if (type=="card_active") {
            return websiteURL + "/q/818801"+code+".jhtml";
        } else {
            return e;
        }
    },
//    二维码读取内容
    readScan(e,callback){
        e = this.qr2scan(e);
        let backData = {};
        //二维码字段截取. indexOf 没找到时返回-1， 此时如果2个indexof都没找到 那么 e.substring（-1 + 3 ，-1）,e的长度会变为2
        // let subData = e.substring(e.indexOf("/q/8") + 3,e.indexOf(".jhtml"));

        let start = e.indexOf("/q/8");
        let end = e.indexOf(".jhtml");
        var subData = null;
        if (start != -1 && end != -1) {
            subData = e.substring(start + 3,end);
        }
        //判断是不是web  code'000000'为无效二维码 '999999'为webView；
        if(subData == null){
            //如果没有找到q/ 和 .jhtml中的字端，就执行该段代码
            if(e.substring(0,4) == 'http' && debug){
                let data = {
                    type:'webView',
                    code:'999999'
                }
                backData = this.message('success','webView',data);
            }else{
                let data = {
                    type:'error',
                    code:'000000'
                }
                backData = this.message('error','无效二维码',data);
            }
            callback(backData);
        }else{
            //截取11位的判断码
            let type = subData.substring(0,6);
            let code = subData.slice(6);
            let data = {
                type:type,
                code:code
            }
            if(code == '000000'){
                backData = this.message('error','无效二维码',data);
            }else{
                backData = this.message('success','扫描成功',data);
            }
            callback(backData);
        }
    },
    //判断用户是否只输入了空格
    isAllEmpty(str){
        if(str.replace(/ /g,"").length == 0){
            return true;
        }else{
            return false;
        }
    },
    //判断设备型号
    device:function () {
        let s = weex.config.env.deviceModel;
        if (this.isNull(s)) {
            return ""
        } else {
            if (s.indexOf("V1")>0) {
                return "V1"
            }else if(s.indexOf("10,3")>0 || s.indexOf("10,6")>0){
                return 'IPhoneX'
            } else {
                return s;
            }
        }
    },

//    登录主页的轮播图控制
    indexMt(){
        let s = this.device();
        if (this.isNull(s)) {
            return ""
        } else {
            if(s == 'V1'){
                return 'indexMtV1';
            }else if(s == 'IPhoneX'){
                return 'indexMtIPhoneX';
            }else{
                return s;
            }
        }
    },

//    判断设备型号为fix定位的元素添加高度 (会员首页 作者专栏 顶部设置跟返回按钮)
    addTop:function () {
        let s = this.device();
        if (this.isNull(s)) {
            return ""
        } else {
            if(s == 'V1'){
                return 'addTopV1';
            }else if(s == 'IPhoneX'){
                return 'addTopIPhoneX';
            }else{
                return s;
            }
        }
    },
    //   会员首页 作者专栏 顶部信息栏
    addInfo:function () {
        let s = this.device();
        if (this.isNull(s)) {
            return ""
        } else {
            if(s == 'V1'){
                return 'addInfoV1';
            }else if(s == 'IPhoneX'){
                return 'addInfoIPhoneX';
            }else{
                return s;
            }
        }
    },
    //    判断设备型号为fix定位的元素添加高度 (会员首页 作者专栏 顶部设置跟返回按钮)
    addBgImg:function () {
        let s = this.device();
        if (this.isNull(s)) {
            return ""
        } else {
            if(s == 'V1'){
                return 'addBgImgV1';
            }else if(s == 'IPhoneX'){
                return 'addBgImgIPhoneX';
            }else{
                return s;
            }
        }
    },
    //    控制滑动时文集box的显示
    hideCorpus:function () {
        let s = this.device();
        if (this.isNull(s)) {
            return ""
        } else {
            if(s == 'V1'){
                return 'hideCorpusV1';
            }else if(s == 'IPhoneX'){
                return 'hideCorpusIPhoneX';
            }else{
                return s;
            }
        }
    },
    //    控制滑动时文集box的显示
    pageTop:function () {
        let s = this.device();
        if (this.isNull(s)) {
            return ""
        } else {
            if(s == 'V1'){
                return 'pageTopV1';
            }else if(s == 'IPhoneX'){
                return 'pageTopIPhoneX';
            }else{
                return s;
            }
        }
    },

//判断设备系统是不是ios
    isIosSystem:function () {
        let s = weex.config.env.osName;
        if(s == 'iOS'){
            return true;
        }else{
            return false;
        }
    },

    resolvetimefmt:function (value) {
//value 传进来是个整数型，要判断是10位还是13位需要转成字符串。这边的方法是检测13位的时间戳 所以要*1000；并且转回整型。安卓下，时间早了8个小时
        if(value.toString().length == 10){
            value = parseInt(value) * 1000;
        }else{
            value = parseInt(value);
        }
// 返回处理后的值
        var    date = new Date(value);

        var    d2 = Date.UTC(date.getUTCFullYear(),date.getUTCMonth(),date.getUTCDate(),date.getUTCHours(),date.getUTCMinutes(),date.getUTCSeconds());

        date = new Date(d2+28800000);

        var    y = date.getUTCFullYear();
        var    m = date.getUTCMonth() + 1;
        var    d = date.getUTCDate();
        var    h = date.getUTCHours();
        var    i = date.getUTCMinutes();
        var    s = date.getUTCSeconds();
        if (m < 10) {
            m = '0' + m;
        }
        if (d < 10) {
            d = '0' + d;
        }
        if (h < 10) {
            h = '0' + h;
        }
        if (i < 10) {
            i = '0' + i;
        }
        if (s < 10) {
            s = '0' + s;
        }
        let timeObj = {
            y:y,
            m:m,
            d:d,
            h:h,
            i:i,
            s:s
        }
        return timeObj;
    },
    //返回格式 2017-09-01
    ymdtimefmt:function(value){
        if(value == '' || value == null || value == undefined){
            return value;
        }
        let timeObj = this.resolvetimefmt(value);
        return timeObj.y + '-' + timeObj.m + '-' + timeObj.d
    },
    //返回格式 2017-09-01 06:35:59
    ymdhistimefmt:function(value){
        if(value == '' || value == null || value == undefined){
            return value;
        }
        let timeObj = this.resolvetimefmt(value);

        return timeObj.y + '-' + timeObj.m + '-' + timeObj.d + ' ' + timeObj.h + ':' + timeObj.i + ':' + timeObj.s;
    },
    //返回格式 06:35:59
    histimefmt:function(value){
        if(value == '' || value == null || value == undefined){
            return value;
        }
        let timeObj = this.resolvetimefmt(value);
        return timeObj.h + ':' + timeObj.i + ':' + timeObj.s;
    },
};

export default utilsFunc;
