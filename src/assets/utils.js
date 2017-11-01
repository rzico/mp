/**
 * Created by zwwill on 2017/8/27.
 */
const resLocateURL = 'file://';
const resRemoteURL = 'http://cdn.rzico.com/weex/';
const dataURL = 'http://weex.rzico.com:8088/';

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
    //获取URL参数
    getUrlParameter(name) {
        let url = weex.config.bundleUrl;
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
    dayfmt (value) {
        let date = new Date(value);
        let tody = new Date();
        let m = tody.getDay() - date.getDay();
        if (m<1) {
            return "今天"
        }
        if (m<3) {
            return "近三天"
        }
        if (m<7) {
            return "近七天"
        }
        return "七天前"
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
        if (value == null || value == undefined || value == '' ) {
            return true
        } else {
            return false
        }
    },
    //本地缓存查找多条数据。
    findList(value,start,size,callback){
        const partevent = weex.requireModule('event'); //在ios无法识别出该语句，考虑弃用该方法
        partevent.findList({
            type:'article',
            keyword:value,
            orderBy:'desc',
            current:start,
            pageSize:size
        },callback)
    },
    save(datatype,datakey,datavalue,datasort,datakeyword,callback){
        const partevent = weex.requireModule('event');
        partevent.save({
            type:datatype,
            key:datakey,
            value:datavalue,
            sort:datasort,
            keyword:datakeyword
        },callback)
    },
    //时间戳
    timeChange(value) {
        if(value.toString().length == 10){
            value = value * 1000;
        }
        let date = new Date(value);
        let   Y = date.getFullYear();
        let    m = date.getMonth() + 1;
        let    d = date.getDate();
        let    H = date.getHours();
        let    i = date.getMinutes();
        let   s = date.getSeconds();
        if (m < 10) {
            m = '0' + m;
        }
        if (d < 10) {
            d = '0' + d;
        }
        if (H < 10) {
            H = '0' + H;
        }
        if (i < 10) {
            i = '0' + i;
        }
        if (s < 10) {
            s = '0' + s;
        }
        var t = Y+'-'+m+'-'+d+' '+H+':'+i+':'+s;
        // var t = Y + '-' + m + '-' + d;
        return t;
    },
    thumbnail(url,w,h) {
        if (url.substring(0,10) == "http://cdn") {
            return url+"@"+w+"w_"+h+"h_1e_1c_100Q";
        } else {
            return url;
        }
    },
    blur(url,r,s) {
        if (url.substring(0,10) == "http://cdn") {
            return url+"@"+r+"-"+s+"bl";
        } else {
            return url;
        }
    },
    //获取文章URL地址
    articleUrl(template,id) {
            return dataURL+"article/#/"+template+"?id="+id;
    }
};

export default utilsFunc;
